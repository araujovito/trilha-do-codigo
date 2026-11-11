# Roteiro de entrevista: atlas-cientifico

## Pitch de 30 segundos

O problema: comparar estudos científicos e conferir, para cada valor, a página e o trecho de origem, preservando valor e unidade originais (README.md:3, :13). Eu construí, com implementação feita pelo Codex e revisão do Claude (docs/revisao-cruzada.md:186; docs/handoff-codex.md) e parte das decisões delegada (decisoes.md:5, :47), uma API em Java/Spring com PostgreSQL, em que a fila é durável no próprio banco, o PDF é lido em processo isolado e as revisões de medidas são append-only. O que o projeto promete e o que não promete está escrito nas decisões, junto com cada limite.

## Decisões que um entrevistador pode perguntar

**P:** Por que fila no PostgreSQL e não Kafka?
**R:** Inserir comando e evento na mesma transação elimina a janela de gravação/publicação, e o UPDATE condicional da reserva, com token, permite consumidores concorrentes sem outro serviço. Kafka era o desenho-alvo inicial, mas a nota diz que não há necessidade demonstrada dele.
**Fonte:** atlas-cientifico/docs/decisoes.md:51; commit d562fde; docs/especificacao.md:77 — "Inserir comando e evento na mesma transação elimina a janela de gravação/publicação; o UPDATE condicional da reserva (com token) permite consumidores concorrentes sem outro serviço"
**Custo admitido:** "Não promete exatamente uma vez nem substitui medição de escala"

**P:** Por que o PDFBox roda numa JVM filha?
**R:** Porque o limite de páginas não controla PDF lento ou explosão de memória dentro da API. A JVM filha tem heap limitado, prazo de parede e o processo morre ao estourar.
**Fonte:** atlas-cientifico/docs/decisoes.md:53; commit 82fd90d — "O limite de páginas não controla PDF lento ou explosão de memória dentro da API"
**Custo admitido:** "Ainda lê o volume permitido e não é sandbox de SO; PDFs hostis exigem defesa adicional"

**P:** Por que uma chave compartilhada na API antes de existirem contas de usuário?
**R:** Porque a chave é o menor controle que impede uma instância exposta de ficar aberta. Contas e dono por documento ficaram adiados. A decisão foi tomada pelo revisor, por delegação do autor (docs/decisoes.md:5).
**Fonte:** atlas-cientifico/docs/decisoes.md:10 (e :24); commit 38731f2 — "a chave é o menor controle que impede uma instância exposta de ficar aberta"
**Custo admitido:** "Não é autenticação de usuários. Quem tem a chave vê tudo, e o upload duplicado ainda revela que o arquivo já existia."

**P:** Por que o catálogo não funde obras silenciosamente?
**R:** Porque DOI e OpenAlex ID podem discordar, e título de fonte não é identidade suficiente. O catálogo guarda snapshots de metadados.
**Fonte:** atlas-cientifico/docs/decisoes.md:54; commit f4d7a11 — "DOI e OpenAlex ID podem discordar; título de fonte não é identidade suficiente"
**Custo admitido:** "Segunda fonte foi simulada no teste, não integrada"

**P:** Por que revisões append-only com versão otimista?
**R:** Porque corrigir uma leitura não pode apagar a evidência anterior, e dois revisores não devem sobrescrever um ao outro.
**Fonte:** atlas-cientifico/docs/decisoes.md:56; commit 4a6b2e1 — "Corrigir uma leitura não pode apagar a evidência anterior; dois revisores não devem sobrescrever um ao outro"
**Custo admitido:** "Banco impede UPDATE/DELETE; autor é declarado. Não equivale a assinatura ou revisão científica independente"

**P:** Por que o registro de medida é idempotente e o estado entra na chave?
**R:** Para que um registro não sobrescreva a afirmação de outro. Antes, reenviar a mesma medida criava duas linhas. A decisão está na tabela "Tomadas em 2026-10-24 (revisor, por delegação do autor)" (decisoes.md:5, :11).
**Fonte:** atlas-cientifico/docs/decisoes.md:11; commit b11f1e8 — "O estado entra na chave para um registro não sobrescrever a afirmação de outro."
**Custo admitido:** "A listagem devolve uma linha por evidência."

**P:** Por que Argon2id e sessão opaca, e não JWT?
**R:** Porque JWT dispensa o banco, mas não pode ser revogado antes de expirar. Uso `spring-security-crypto`, sem o Spring Security completo.
**Fonte:** atlas-cientifico/docs/contas-e-hospedagem.md:15; commit 26cd28f — "JWT dispensa o banco mas não pode ser revogado antes de expirar"
**Custo admitido:** a sessão opaca "exige uma consulta por requisição" (:15); Argon2id com "Custo não calibrado sob carga" (:28).

**P:** Por que a interface é HTML/JS puro e não React?
**R:** Porque os fluxos solicitados foram demonstrados sem introduzir build/frontend novo. React/TS estava previsto na especificação para o grafo e a matriz navegáveis.
**Fonte:** atlas-cientifico/docs/decisoes.md:59 — "Os fluxos solicitados foram demonstrados sem introduzir build/frontend novo"
**Custo admitido:** "Não chamar o protótipo de frontend final; revisar a decisão se estado/complexidade exigir"

**P:** Por que não integrar o Sci-Hub?
**R:** Porque não há API documentada nem base de permissão que eu tenha verificado, e há decisões judiciais contra o serviço. Só reavalio se surgir base legal documentada.
**Fonte:** atlas-cientifico/docs/especificacao.md:44 — "Não há API documentada nem base de permissão que eu tenha verificado, e há decisões judiciais contra o serviço."
**Custo admitido:** não documentado. Condição de revisão: "Reavaliar apenas se surgir base legal documentada."

## Decisões sem motivo registrado — prepare sua resposta

- Java 21 e Spring Boot como stack — README.md:3.
- PostgreSQL 18 em Docker — README.md:44.
- Testcontainers para testes de integração — README.md:28.
- Playwright com Chromium para teste de interface — README.md:29.
- Migrações Flyway V1 a V20 — api/src/main/resources/db/migration/.
- Orçamento zero (sem AWS, serviços ou modelos pagos) — README.md:9; docs/decisoes.md:47.
- Sem Kubernetes — docs/especificacao.md:84.
- OpenTelemetry com Jaeger como opt-in local — docs/operacao.md:51 (desligada por padrão); o motivo está em docs/decisoes.md:60 ("Atender observabilidade sem enviar dados para fornecedor nem depender de orçamento"); a escolha da ferramenta não tem motivo escrito.

## Perguntas difíceis prováveis

**Onde isso quebra em escala?**
Documentado: a fila no Postgres "não promete exatamente uma vez nem substitui medição de escala" (decisoes.md:51), e o Argon2id tem "custo não calibrado sob carga" (contas-e-hospedagem.md:28).

**O que o sistema não garante?**
Documentado: a chave compartilhada não é autenticação de usuários; o PDFBox isolado não é sandbox de SO; as revisões não equivalem a revisão científica independente (decisoes.md:10, :53, :56).

**O que você faria diferente?**
Documentado em parte: revisar a interface se estado/complexidade exigir (decisoes.md:59) e reavaliar o Kafka só com necessidade demonstrada. O resto: prepare sua resposta.

**Como você testou?**
Os relatórios citam Testcontainers e Playwright (README.md:28-29), sem motivo escrito. Cobertura e resultados: prepare sua resposta.

**O que foi seu e o que foi de ferramenta ou IA?**
Documentado: o Codex implementou (ex.: "Cinco commits do Codex (V16, Argon2id e sessões, …)", revisao-cruzada.md:186). O Claude revisou e fez os pushs (handoff-codex.md:3; decisoes.md:63). Decisões em decisoes.md:5-18 foram do revisor, por delegação; as de :49-61 vieram depois de o autor autorizar "tomar decisões com boas práticas" (:47). A sua parte: prepare sua resposta.
