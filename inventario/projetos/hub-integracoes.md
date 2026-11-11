# hub-integracoes

Repositório: https://github.com/araujovito/hub-integracoes

## O que é
Recebe pedidos de várias lojas por webhook assinado, valida cada um e grava com idempotência. Depois entrega esses pedidos de forma assíncrona a um ERP simulado, com retentativas e fila de falhas, e registra o consumo de tokens de IA sem guardar prompts nem respostas (README.md, primeiro parágrafo).

## Do que é feito
- TypeScript (cerca de 70%) — a linguagem do backend inteiro.
- Fastify 5 e @fastify/rate-limit — a API HTTP e o limite de pedidos por rota (backend/package.json, dependencies).
- PostgreSQL (pg) e SQL — banco de dados; 12 migrations de 001 a 012.
- ioredis (Redis Streams) — a fila de mensagens (backend/src/worker.ts:2).
- Zod 4 — confere se os dados recebidos têm o formato esperado.
- prom-client — métricas do sistema (backend/src/metrics.ts).
- openai 5.20.0 — chamada opcional ao provedor de IA (backend/src/openai-provider.ts).
- Vitest, Playwright e axe-core — testes e revisão do dashboard (backend/package.json, devDependencies).
- ESLint e TypeScript — lint e checagem de tipos (scripts lint e typecheck).
- Docker Compose e Caddy — ambiente local e HTTPS em produção (compose.yaml, deploy/Caddyfile).
- HTML (dashboard/index.html) — painel de operações.

## Como as peças se encaixam
1. Uma loja envia um webhook assinado para a API (backend/src/app.ts:351).
2. A API confere a assinatura (backend/src/security.ts:16) e o horário do pedido (backend/src/app.ts:375).
3. Grava o evento descartando repetidos (backend/src/app.ts:390).
4. O publicador da outbox lê as linhas pendentes e envia à fila (backend/src/outbox-publisher.ts:16).
5. O worker lê da fila (backend/src/worker.ts:28), entrega ao ERP simulado e confirma a mensagem só depois (backend/src/worker.ts:39).
6. Mensagens paradas de consumidores que caíram são reivindicadas por outro (backend/src/worker.ts:75).

## Conceitos que aparecem aqui
- Assinatura HMAC de webhook — backend/src/security.ts:16 — compara a assinatura com timingSafeEqual, em tempo constante.
- Proteção contra replay — backend/src/app.ts:375 — pedido com horário fora de WEBHOOK_TOLERANCE_SECONDS recebe 401.
- Idempotência por chave única — backend/src/app.ts:390 — ON CONFLICT DO NOTHING descarta eventos já recebidos.
- Outbox com lock de linha — backend/src/outbox-publisher.ts:16 — FOR UPDATE SKIP LOCKED para vários publicadores.
- Redis Streams com consumer group — backend/src/worker.ts:28 — XGROUP CREATE com MKSTREAM cria o grupo, se não existir.
- Confirmação de mensagem — backend/src/worker.ts:39 — XACK só depois de processar; senão a mensagem fica pendente.
- Reivindicação de mensagens paradas — backend/src/worker.ts:75 — XAUTOCLAIM recupera mensagens de consumidores que caíram.
- Trava de linha em entrega — backend/src/delivery.ts:15 — FOR UPDATE antes de mudar o estado da entrega.
- Criptografia autenticada — backend/src/tenant-crypto.ts:22 — AES-256-GCM para segredos de webhook.
- Limite de taxa por rota — backend/src/app.ts:54 — config.rateLimit por rota no Fastify.

## Dúvidas em aberto
- Não abri .env (proibido pela regra e pelo context.md). O arquivo existe no disco e não está rastreado pelo Git. O conteúdo não foi lido.
- Não confirmei o número exato de linha dos comandos yarn no README; a referência é a seção.
- Não li docs/modelo-de-ameacas.md nem docs/decisoes.md, que podem explicar algumas escolhas de segurança.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
