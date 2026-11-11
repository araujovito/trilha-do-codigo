# liquidacao-pix

Repositório: https://github.com/araujovito/liquidacao-pix

## O que é
Recebe pedidos de transferência instantânea no formato PIX e só responde "recebido" (código 202) depois de gravar o pedido no banco de dados. Depois, um processo separado conclui cada transferência de uma vez só, anotando o dinheiro em dois lados (partida dobrada), e uma conferência final confere se as contas fecham.

## Do que é feito
- Go (cerca de 70%) — a linguagem em que tudo foi escrito: API, relay, worker, conciliador.
- SQL (migrations) — cria e altera as tabelas do banco (9 arquivos, 0001 a 0009).
- PostgreSQL 17 (pgx v5 / pgxpool) — o banco onde ficam transferências, contas e lançamentos (internal/processo/processo.go:14).
- Redis 7 (go-redis v9) — a fila de mensagens (Redis Streams) entre os processos (internal/queue/fila.go:16).
- Prometheus (prometheus/client_golang) — mede o sistema e publica números em /metrics (internal/processo/processo.go:15).
- OpenTelemetry (otelhttp) — rastreia o caminho de cada pedido HTTP (internal/web/web.go:41; go.mod:15-16).
- Grafana e Jaeger — telas para ver as métricas e os rastros.
- k6 (JavaScript) — teste de carga (docs/carga.md).
- testcontainers-go — sobe bancos descartáveis para os testes de integração (go.mod:12-14).
- Docker Compose e Makefile — sobem a infraestrutura e atalham os comandos (Makefile:16-19).

## Como as peças se encaixam
1. A API (cmd/api) recebe o pedido de transferência e grava o pedido e um registro de "outbox" na mesma transação (internal/repository/transferencias.go:94).
2. A API responde 202 só depois de gravar.
3. O relay lê a tabela outbox e publica a mensagem na fila Redis Streams.
4. O worker lê a mensagem da fila e liquida a transferência em uma única transação, com lançamentos de partida dobrada.
5. O conciliador confere se o dinheiro fecha; a auditoria usa cadeia de HMAC e CPF cifrado (internal/auditoria/entrada.go:65, internal/dadospessoais/cofre.go:80).

Pastas: cmd/ (um executável por papel), internal/domain/ (regras puras, sem banco nem HTTP), internal/repository/ (SQL), internal/queue/ (Redis), internal/usecase/ (liquidação, relay, worker, conciliador), db/migrations/, docs/ (ADRs, especificação, runbook, OpenAPI).

## Conceitos que aparecem aqui
- Outbox transacional — internal/repository/transferencias.go:94 — o INSERT na tabela outbox acontece na mesma transação do pedido, então ou os dois são gravados ou nenhum.
- Travas de linha pessimistas — internal/repository/transferencias.go:182 e :202 — SELECT ... FOR UPDATE trava a transferência e as contas antes de mexer no saldo.
- Isolamento READ COMMITTED com travas — internal/repository/transferencias.go:170-172 — o código explica por que SERIALIZABLE não foi usado.
- Consumo concorrente sem bloqueio — internal/repository/outbox.go:53 — FOR UPDATE SKIP LOCKED permite vários relays rodando juntos.
- Consumer group do Redis Streams — internal/queue/fila.go:136-138 — XREADGROUP lê só mensagens novas para o consumidor.
- Dinheiro em inteiro — internal/domain/transferencia.go:14 — Centavos é int64, sem ponto flutuante.
- Estado final — internal/domain/transferencia.go:37 — Final() impede nova liquidação de transferência já liquidada ou rejeitada.
- Idempotência na liquidação — internal/usecase/liquidar.go:48-49 — se o status já é final, a função devolve o resultado sem novos lançamentos.
- Encerramento com sinais — internal/processo/processo.go:34-35 — signal.NotifyContext cancela o contexto no SIGINT ou SIGTERM.
- Timeouts de HTTP — cmd/api/main.go:54-57 — ReadHeaderTimeout, ReadTimeout, WriteTimeout e IdleTimeout explícitos.

## Dúvidas em aberto
- Não confirmei se as pastas de testes de integração (internal/repository/*_test.go) rodam sem Docker.
- A doc marca a fase 7 (auditoria e CPF cifrado) como REVISAO_PENDENTE (MEMORIA_TECNICA.md, Estado atual). Não verifiquei se a revisão foi feita depois.
- Não li os arquivos CLAUDE.md e AGENTS.md; o projeto tem os dois.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
