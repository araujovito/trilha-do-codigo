# mesa-de-credito

Repositório: https://github.com/araujovito/mesa-de-credito

## O que é
Jogo multiplayer de navegador em que jogadores administram financeiras fictícias, disputam clientes e veem as consequências das decisões de crédito. A regra econômica fica num pacote Go puro; o estado da partida é persistido em PostgreSQL.

## Do que é feito
- Go 1.27 (cerca de 75%) — todo o backend: regras, finanças, API e simulador.
- database/sql com pgx — fala com o PostgreSQL (go.mod).
- PostgreSQL via Docker Compose — guarda o estado da partida (compose.yaml).
- net/http (biblioteca padrão do Go) — as rotas da API (backend/internal/api/server.go:46-65).
- TypeScript/TSX (cerca de 15%) — a interface (frontend/src/).
- React 19 e Vite 7 — componentes de tela e servidor de desenvolvimento (frontend/package.json).
- Vitest e go test — testes do frontend e do backend.
- Yarn 1.22 e Makefile — instalam o frontend e atalham os comandos.

## Como as peças se encaixam
1. O navegador (React, localhost:5173) chama a API Go (localhost:8080) por rotas como `POST /api/rooms/{code}/players` (server.go:46-65).
2. A API passa os pedidos ao `engine`, que aplica as regras sem HTTP nem banco; o tempo entra como parâmetro.
3. O `finance` calcula parcelas (PMT) e o diário contábil (schedule.go:164-177).
4. O `store` grava em PostgreSQL, em transação, travando a linha antes de alterar (postgres.go:222-230).
5. Uma goroutine com ticker fecha em segundo plano as rodadas vencidas (função com ticker em backend/cmd/api/main.go:42-52; a goroutine é lançada em main.go:27, `go closeExpiredRounds(...)`).
6. O cliente lê a sessão do localStorage (getItem, frontend/src/main.tsx:13) e a grava com setItem (main.tsx:53, :68).

## Conceitos que aparecem aqui
- Tipo de domínio em centavos — backend/internal/finance/schedule.go:27 — `type Money int64`, sem ponto flutuante.
- Fórmula de parcela fixa — backend/internal/finance/schedule.go:164-177 — PMT com big.Rat e arredondamento.
- Transação com trava de linha — backend/internal/store/postgres.go:222-230 — `SELECT ... FOR UPDATE` antes de mutar.
- Hash de token — backend/internal/store/postgres.go:201 — o token é guardado como SHA-256.
- Trava de migração — backend/internal/store/postgres.go:127 — pg_advisory_xact_lock.
- Goroutine com ticker — backend/cmd/api/main.go:27, :42-52 — a goroutine é lançada em :27; a função com ticker, em :42-52, fecha rodadas vencidas em background.
- Rotas com método e padrão — backend/internal/api/server.go:46-65 — `"POST /api/rooms/{code}/players"`.
- Pontuação ponderada — backend/internal/engine/engine.go:651-661 — taxa, pressão de pagamento e falta de valor.
- Estado no cliente — frontend/src/main.tsx:13, :53, :68 — sessão lida (getItem, :13) e gravada (setItem, :53 e :68) no localStorage.
- Limite de seleção — frontend/src/main.tsx:33 — no máximo 3 financeiras automáticas.

## Dúvidas em aberto
- README afirma que engine não depende de HTTP, banco ou relógio. Verifiquei por grep: engine.go e view.go importam "time" e não há time.Now fora dos testes; não li o arquivo inteiro.
- .env.example não foi aberto (regra de .env).
- docs/ROTEIRO.md diz que a próxima etapa é observar partidas com pessoas; não li o conteúdo de SESSOES.md nem dos REGRAS_V*.md.
- Não li frontend/src/Desk.tsx além das primeiras linhas.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
