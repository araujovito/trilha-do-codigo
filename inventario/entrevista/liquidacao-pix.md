# Roteiro de entrevista: liquidacao-pix

## Pitch de 30 segundos

O problema: um motor que recebe pedidos de transferência instantânea no formato do PIX precisa aceitar o pedido em poucos milissegundos, liquidar de forma assíncrona e provar que nenhum pedido aceito se perde, nenhum é liquidado duas vezes e o dinheiro é conservado (docs/especificacao.md:3-8, :11-19). Eu construí a API, o relay, o worker e o conciliador em Go, com implementação e revisão cruzada entre agentes de IA (Claude e Codex), conforme docs/colaboracao-claude-codex.md. O Postgres é a fonte da verdade e o `202` só sai depois do commit da transferência e da outbox na mesma transação; o relay copia a outbox para o Redis Streams, e o worker absorve duplicidade por idempotência.

## Decisões que um entrevistador pode perguntar

**P:** Por que Go?
**R:** Go foi o pedido original do projeto; a memória técnica registra também a concorrência leve, com goroutines, e os binários estáticos.
**Fonte:** liquidacao-pix/MEMORIA_TECNICA.md:72 — "Pedido original; concorrência leve (goroutines) e binários estáticos"
**Custo admitido:** não documentado.

**P:** Por que o `202` só sai depois do commit no Postgres, com outbox, em vez de publicar direto na fila?
**R:** Porque, se a fila cair entre o "aceito" e a liquidação, o pedido aceito some e o cliente já ouviu que deu certo. Por isso o Postgres é a fonte da verdade e a outbox é gravada na mesma transação; o relay copia para o Redis. Descartei publicar direto na fila, Redis Pub/Sub e gravar no banco e na fila sem outbox.
**Fonte:** liquidacao-pix/docs/adr/0001-postgres-fonte-da-verdade-e-outbox.md (Contexto; Alternativas descartadas, linhas 23-27) — "Se a fila cair entre o 'aceito' e a liquidação, o pedido aceito some, e o cliente já ouviu que deu certo."
**Custo admitido:** "A latência da API inclui um commit no Postgres. É o preço da garantia." O relay pode publicar a mesma mensagem duas vezes, e o worker absorve isso por idempotência.

**P:** Por que Redis Streams e não Pub/Sub? E por que sem `MAXLEN`?
**R:** Porque o Pub/Sub não guarda mensagem; no Stream a mensagem fica guardada até o `XACK`. A confirmação é `XACK` + `XDEL` em MULTI, e não uso `MAXLEN` porque ele pode apagar mensagem não confirmada. Também descartei RabbitMQ e `XAUTOCLAIM`.
**Fonte:** liquidacao-pix/MEMORIA_TECNICA.md:75 e :81; docs/adr/0003-redis-streams-retentativas-e-orfas.md:36-40; commit c6a8a86 — "Streams em vez de Pub/Sub: a mensagem fica guardada até o XACK"
**Custo admitido:** o ADR recusa RabbitMQ por ser "mais um sistema para operar". Para retentativa: "Erros permanentes ... passam pelas mesmas retentativas que os temporários antes de morrer. É mais lento" (ADR 0003, Consequências).

**P:** Como você garante que a transferência não é liquidada duas vezes, e por que READ COMMITTED e não SERIALIZABLE?
**R:** A idempotência no consumo vem da trava de linha da transferência (`FOR UPDATE`), e as contas são travadas uma a uma em ordem crescente de id, o que evita deadlock entre transferências cruzadas. Uso READ COMMITTED porque SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui.
**Fonte:** liquidacao-pix/docs/adr/0002-idempotencia-e-travas.md (Decisão, itens 1-3); MEMORIA_TECNICA.md:78 — "SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui."
**Custo admitido:** não documentado como custo. A fonte registra a prova de mutação: sem ordenar as travas, o teste de concorrência acusa 189 deadlocks (MEMORIA_TECNICA.md, histórico de 2026-10-21; commit ff07977).

**P:** Por que livro-razão de partidas dobradas com centavos em `bigint`?
**R:** Para a conservação do dinheiro ser verificável, sem erro de arredondamento. Os lançamentos são imutáveis por gatilho e o saldo é uma projeção mantida na mesma transação.
**Fonte:** liquidacao-pix/MEMORIA_TECNICA.md:77; README.md, seção "Como funciona" — "Conservação do dinheiro verificável; sem erro de arredondamento"
**Custo admitido:** não documentado.

**P:** Por que a auditoria é uma cadeia de HMAC por conta e não uma cadeia global?
**R:** Uma cadeia única exige que cada entrada conheça o MAC da anterior, e isso serializa todas as liquidações numa trava. Por isso gravo uma entrada na cadeia do pagador e outra na do recebedor, na mesma transação da liquidação. Descartei cadeia global, hash SHA-256 sem chave e assinatura Ed25519.
**Fonte:** liquidacao-pix/docs/adr/0006-auditoria-em-cadeia-e-cpf-cifrado.md:36-38 (Decisão 2); alternativas em :200-206 — "uma cadeia única exige que cada entrada conheça o MAC da anterior, e isso serializa todas as liquidações numa trava."
**Custo admitido:** "não há ordem total entre contas distintas" (ADR 0006:44). A aceitação é provisória: a medição de carga com a cadeia mostrou cauda pior (API p99 8,1 → 27,4 ms) e "não foi possível atribuí-la à cadeia" com uma rodada por versão (ADR 0006, Consequências; commit a8c31ea).

**P:** Por que a chave do HMAC fica fora do banco?
**R:** Para que quem edita o banco não refaça a cadeia, e para poder rotacionar a chave sem quebrar o passado. A chave vem da variável `AUDITORIA_CHAVES` e cada entrada grava o id da chave usada.
**Fonte:** liquidacao-pix/MEMORIA_TECNICA.md:89; docs/adr/0006 (Decisão 4) — "Quem edita o banco não refaz a cadeia; rotação sem quebrar o passado"
**Custo admitido:** "quem puder alterar banco **e** arquivo pode esconder a poda" (ADR 0006, Decisão 5). Apagar o rabo de uma cadeia só é detectado sem âncora em LIQUIDADA; para REJEITADA exige âncora externa.

**P:** Como você trata o CPF, do ponto de vista de privacidade?
**R:** Cifro o CPF com AES-256-GCM, com uma chave de dados por conta embrulhada por uma chave-mestra do ambiente. Apagar o dado é descartar a chave de dados, e a auditoria e os lançamentos só citam `conta_id`. Descartei o índice cego (HMAC do CPF) porque seria dado pessoal derivado que sobrevive à destruição da chave.
**Fonte:** liquidacao-pix/MEMORIA_TECNICA.md:93; docs/adr/0006 (Decisão 6; Decisão 6, :157-159) — "Apagar = `DELETE` em `chaves_cpf`; auditoria e lançamentos só citam `conta_id`"
**Custo admitido:** "O custo é aceito: a conta se acha pela chave PIX." Cópias da chave em backups e a chave-mestra no mesmo host não são cobertas pelo apagamento (seção "O que o crypto-shredding não resolve").

**P:** Por que não há autenticação?
**R:** Deixei autenticação e autorização fora do escopo de propósito, porque uma autenticação feita pela metade, como uma chave estática num cabeçalho, daria falsa sensação de segurança sem provar nada. Descartei também implementar mTLS e OAuth.
**Fonte:** liquidacao-pix/docs/adr/0005-autenticacao-fora-do-escopo.md (Decisão; Alternativas descartadas, linhas 48-51) — "uma autenticação feita pela metade (uma chave estática num cabeçalho, por exemplo) daria falsa sensação de segurança sem provar nada."
**Custo admitido:** "a lacuna mais séria hoje é que qualquer chamador pode debitar qualquer conta" (ADR 0005, O que um sistema real exigiria).

## Decisões sem motivo registrado — prepare sua resposta

- Parâmetros de produção (200 eventos por lote no relay, 10 ms de espera com outbox vazia, 30 s de idade para órfã, 5 republicações, 6 entregas máximas no worker, base de 5 s) — MEMORIA_TECNICA.md:116-124; nenhum tem justificativa própria.
- Postgres 17 e Redis 7 como versões fixas — MEMORIA_TECNICA.md:28.
- SQL escrito à mão com `pgx`, sem ORM — docs/especificacao.md:139.
- Imagem distroless com usuário não-root — MEMORIA_TECNICA.md:46.

## Perguntas difíceis prováveis

**Como você testou a concorrência?**
Documentado em parte: a prova de mutação mostra que, sem ordenar as travas, o teste de concorrência acusa 189 deadlocks (MEMORIA_TECNICA.md, 2026-10-21; commit ff07977). O resto da estratégia de testes: prepare sua resposta.

**Onde isso quebra em escala ou sob carga?**
Documentado: a medição de carga com a cadeia de auditoria mostrou cauda pior (API p99 8,1 → 27,4 ms) e não foi possível atribuí-la à cadeia com uma rodada por versão (ADR 0006, commit a8c31ea). Além disso, não há ordem total entre contas distintas na auditoria.

**O que você faria diferente ou ainda falta?**
Documentado: a lacuna mais séria é que qualquer chamador pode debitar qualquer conta, porque a autenticação ficou fora do escopo (ADR 0005). Outros itens: prepare sua resposta.

**O que foi seu e o que foi de ferramenta ou IA?**
Documentado em parte: docs/colaboracao-claude-codex.md descreve o plano em que um agente implementa e outro revisa, e escolhe o modelo (Sonnet, Sol, Opus) pelo risco da mudança. A sua parte (pedido, decisões, aprovação): prepare sua resposta.
