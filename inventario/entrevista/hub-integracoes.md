# Roteiro de entrevista: hub-integracoes

## Pitch de 30 segundos

O problema: receber pedidos de várias lojas por webhook assinado, validar, persistir com idempotência e entregar de forma assíncrona e confiável a um ERP, sem perder pedido nem gerar entrega duplicada no ERP (README.md:3; docs/decisoes.md, ADR-001). Eu construí uma API em Node/TypeScript que grava o pedido e a outbox na mesma transação SQL; um relay independente publica no Redis Streams e workers em consumer group fazem a entrega. O ERP é simulado, para desenvolver e demonstrar sem contas, credenciais ou custos de terceiros.

## Decisões que um entrevistador pode perguntar

(Os números de ADR são os do arquivo `docs/decisoes.md`, que não está em ordem numérica.)

**P:** Por que pedido e outbox na mesma transação, com relay separado e Redis Streams?
**R:** Para manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers.
**Fonte:** hub-integracoes/docs/decisoes.md:3-8 (ADR-001, Motivo na linha 7) — "manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers."
**Custo admitido:** "PostgreSQL e Redis não têm commit atômico conjunto; o relay pode republicar após falha entre `XADD` e atualização SQL." A entrega é at-least-once.

**P:** Por que o ERP é simulado?
**R:** Para desenvolver e demonstrar sem contas, credenciais, dados reais ou custos de terceiros. Uso uma tabela local com unique key, antes de qualquer integração externa.
**Fonte:** hub-integracoes/docs/decisoes.md:27-33 (ADR-002, Motivo na linha 31) — "desenvolver e demonstrar sem contas, credenciais, dados reais ou custos de terceiros."
**Custo admitido:** "os resultados mostram o pipeline e não certificam compatibilidade com ERP real."

**P:** Por que o redrive também passa pela outbox?
**R:** Para evitar a janela em que o Redis publicou e o SQL deu rollback, o que deixaria o worker processar uma ação não confirmada no banco. O redrive entra na outbox na mesma transação do dead letter.
**Fonte:** hub-integracoes/docs/decisoes.md:11-17 (ADR-004, Motivo na linha 15) — "evitar a janela Redis-publicou/SQL-rollback que deixaria o worker processar uma ação não confirmada no banco."
**Custo admitido:** "o redrive é assíncrono e responde `202` após a transação local."

**P:** Por que `/health` separado de `/ready`?
**R:** Para não reiniciar um processo saudável só porque uma dependência transitória está indisponível. O `/ready` testa PostgreSQL e Redis; o `/health` é liveness.
**Fonte:** hub-integracoes/docs/decisoes.md:19-25 (ADR-005, Motivo na linha 23) — "não reiniciar um processo saudável só porque uma dependência transitória está indisponível"
**Custo admitido:** não documentado como limitação; a consequência registrada é que "monitoramento e orquestração devem usar `/ready` para tráfego e `/health` para liveness".

**P:** Como você guarda as chaves das lojas?
**R:** As chaves HMAC das lojas ficam cifradas com AES-256-GCM sob `TENANT_SECRETS_KEY`, porque o HMAC exige o segredo em claro na verificação e, portanto, ele não pode ser hash. Os tokens administrativos ficam guardados como SHA-256.
**Fonte:** hub-integracoes/docs/decisoes.md:43-49 (ADR-006, Motivo na linha 47) — "o HMAC exige o segredo em claro na verificação, então ele não pode ser hash."
**Custo admitido:** "`TENANT_SECRETS_KEY` vira o segredo mais crítico do sistema." Fica fora do banco e do backup, com cópia própria.

**P:** Como você protege contra replay do webhook?
**R:** Assino `<timestamp>.<corpo>` e aceito uma janela de 300 s; dentro dela, deduplico por `eventId`. É o mesmo padrão de Stripe e Slack, conhecido por quem integra. Não guardo nonce por requisição porque isso exigiria mais estado por pedido, e o `eventId` já cumpre esse papel.
**Fonte:** hub-integracoes/docs/decisoes.md:51-57 (ADR-007, Motivo na linha 55) — "é o mesmo padrão de Stripe e Slack, conhecido por quem integra"; "Um nonce guardado por requisição exigiria mais estado por pedido, e o `eventId` já cumpre esse papel."
**Custo admitido:** "o remetente precisa de relógio sincronizado." A mudança quebrou a compatibilidade do protocolo, "aceitável porque ainda não havia remetente real."

**P:** Por que `XTRIM MINID` e não `MAXLEN` no stream?
**R:** Porque `MAXLEN` apaga por contagem, inclusive mensagens pendentes ou ainda não lidas, e um worker parado perderia pedidos. Uso `XTRIM MINID` com piso seguro.
**Fonte:** hub-integracoes/docs/decisoes.md:59-65 (ADR-008, Motivo na linha 63) — "`MAXLEN` apaga por contagem, inclusive mensagens pendentes ou ainda não lidas. Um worker parado perderia pedidos."
**Custo admitido:** "com o worker parado, o stream cresce até ele voltar ... exige monitorar a memória do Redis."

**P:** Por que falha de dependência vira 503 e nunca derruba o processo?
**R:** Porque o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava, por um evento `error` não tratado. Hoje há listener de `error` em todo pool `pg`, espera na partida e handler global.
**Fonte:** hub-integracoes/docs/decisoes.md:83-89 (ADR-011, Motivo na linha 87) — "o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava (evento `error` não tratado)."
**Custo admitido:** não documentado como limitação; a condição do teste é que ele "falha se api ou relay reiniciarem, ou se algum pedido ficar sem resposta HTTP."

**P:** Como você troca a chave mestra sem parar o serviço?
**R:** Mantenho `TENANT_SECRETS_KEY` (atual) e `TENANT_SECRETS_KEY_PREVIOUS`, e a decifragem tenta em ordem. No AES-GCM a chave errada falha na autenticação, então tentar em ordem é seguro e dispensa gravar um identificador de chave no formato.
**Fonte:** hub-integracoes/docs/decisoes.md:91-97 (ADR-012, Motivo na linha 95) — "no AES-GCM, a chave errada falha na autenticação, então tentar em ordem é seguro e dispensa gravar um identificador de chave no formato."
**Custo admitido:** "durante a troca, a leitura de uma linha antiga custa uma decifragem a mais." Linha que nenhuma chave abre é ignorada com aviso.

**P:** Por que o ledger de tokens não guarda conteúdo?
**R:** Para medir consumo de tokens mantendo minimização de dados.
**Fonte:** hub-integracoes/docs/decisoes.md:35-41 (ADR-003) — "medir consumo de tokens mantendo minimização de dados."
**Custo admitido:** não documentado.

**P:** Por que a retenção limpa o payload mas mantém a identidade do evento?
**R:** Porque apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega.
**Fonte:** hub-integracoes/docs/decisoes.md:67-73 (ADR-009) — "apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega."
**Custo admitido:** não documentado.

**P:** Por que produção num único host com Caddy e Docker secrets?
**R:** Porque a configuração não depende de provedor, e a convenção `*_FILE` funciona igual com Docker secrets, Kubernetes ou agentes de gerenciadores de segredos.
**Fonte:** hub-integracoes/docs/decisoes.md:75-81 (ADR-010) — "a configuração não depende de provedor, e a convenção `*_FILE` funciona igual com Docker secrets, Kubernetes ou agentes de gerenciadores de segredos."
**Custo admitido:** sem alta disponibilidade.

**P:** Por que Node 24 LTS e não Node 22?
**R:** Node 20 chegou ao fim de vida em 30/04/2026; o Node 22 sai de suporte em abril de 2027, e o 24 roda o mesmo código sem nenhuma mudança.
**Fonte:** hub-integracoes commit e7ea8ea — "sai de suporte em abril de 2027, e o 24 roda o mesmo código sem nenhuma mudança."
**Custo admitido:** não documentado.

**P:** Por que você não aplicou a atualização do Redis 8 sugerida pelo Dependabot?
**R:** Porque o Redis 8 muda de licença.
**Fonte:** hub-integracoes/roteiro.md:44 — "o Redis 8 muda de licença."
**Custo admitido:** não documentado.

## Decisões sem motivo registrado — prepare sua resposta

- TypeScript, Fastify e Zod como base da API — context.md:11.
- Yarn como gerenciador de pacotes — README.md:11.
- Dashboard em página única, sem CDN e com CSP por nonce — README.md:162; docs/modelo-de-ameacas.md.
- `XAUTOCLAIM` para recuperar mensagens pendentes do worker — README.md:71. Atenção: o `liquidacao-pix` rejeita `XAUTOCLAIM` (docs/adr/0003, :38-39); o entrevistador pode cruzar os dois projetos.
- Redis 7.4 e Postgres 17 como versões fixas — context.md:11. (Imagens fixadas por digest têm motivo no commit 0421cd7.)
- Não fazer deploy num servidor real — roteiro.md:31: só "por decisão" e "os itens que dependem de infraestrutura paga ou de operação contínua ficam fora do escopo".

## Perguntas difíceis prováveis

**O que isso garante e o que não garante?**
Documentado: a entrega é at-least-once, porque PostgreSQL e Redis não têm commit atômico conjunto (ADR-001), e os resultados "não certificam compatibilidade com ERP real" (ADR-002).

**Como você testou resiliência?**
Documentado em parte: houve um teste de resiliência que reiniciava o PostgreSQL e mostrou os processos morrendo (ADR-011); ele falha se api ou relay reiniciarem ou se algum pedido ficar sem resposta HTTP. O resto: prepare sua resposta.

**Onde quebra em escala?**
Documentado: sem alta disponibilidade (ADR-010) e, com o worker parado, o stream cresce até ele voltar (ADR-008). Medição de carga: prepare sua resposta.

**Por que você rejeita `XAUTOCLAIM` num projeto e usa no outro?**
Não documentado para o hub — prepare sua resposta (o motivo do `liquidacao-pix` está no ADR 0003).

**O que foi seu e o que foi de ferramenta ou IA?**
Não documentado nos relatórios — prepare sua resposta.
