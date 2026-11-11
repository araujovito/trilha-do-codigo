# raio-x-patrimonial

Repositório: https://github.com/araujovito/raio-x-patrimonial

## O que é
Site que mostra a trajetória eleitoral e os bens declarados ao TSE pelos 513 deputados federais eleitos em 2022 e 2026, com busca, filtros, comparação entre as duas eleições e recorte de gênero e raça. Os dados são gerados offline por scripts Python e servidos como JSON estático.

## Do que é feito
- TypeScript/TSX (cerca de 60%) — as páginas e as funções de dados (app/).
- Next.js 16 e vinext — o framework do site e o servidor de desenvolvimento (package.json).
- Tailwind 4 e ESLint — estilo e lint (package.json).
- Python (cerca de 10%, só biblioteca padrão: csv, json, re, urllib, zipfile) — coleta e limpeza dos dados (scripts/prepare_data.py:9-17).
- JSON — os dados prontos e as leis-resumo em app/data/ e public/leis/.
- Cloudflare Workers e Wrangler — publicação do site (worker/index.ts; README).
- Drizzle ORM — declarado em package.json, sem tabelas em uso (db/schema.ts:1-4).
- node:test — testes sobre os JSON e o HTML renderizado.
- Fotos — 989 dos 1049 arquivos versionados estão em public/: 513 fotos .jpeg (public/deputados/), 470 JSON (public/leis/) e 6 imagens de apoio (png/svg).

## Como as peças se encaixam
1. Scripts Python em scripts/ coletam dados do TSE e da Câmara, limpam e categorizam os bens (prepare_data.py:173-190).
2. O resultado vira JSON em app/data/.
3. A Home, um componente de servidor, repassa os dados ao Dashboard (app/page.tsx:9-15).
4. O Dashboard, componente de cliente, filtra, ordena e busca (app/Dashboard.tsx:1; app/lib/deputados.ts:213, :231).
5. A comparação entre eleições junta os reeleitos (app/lib/comparacao.ts:26-46).
6. O handler do Worker serve as imagens e delega o resto (worker/index.ts:28-44).

## Conceitos que aparecem aqui
- Função pura de cálculo — app/lib/deputados.ts:68-71 — variação nominal com guarda contra base nula.
- Mediana com cópia antes de ordenar — app/lib/deputados.ts:81-89 — `[...values].sort` não altera o array original.
- Normalização para busca — app/lib/deputados.ts:94-100 — NFD e remoção de diacríticos, para buscar sem acento.
- Filtro e ordenação — app/lib/deputados.ts:213 e :231 — `filterDeputies` e `sortDeputies`.
- Busca por evento — app/lib/comparacao.ts:19-23 — filtra o histórico por ano e cargo, ordena por patrimônio.
- Junção entre eleições — app/lib/comparacao.ts:26-46 — reeleitos com checagem de nulos antes de calcular.
- Tabela de constantes — scripts/prepare_data.py:32-37 — cadeiras por UF usadas como conferência.
- Regras por radical e ordem — scripts/prepare_data.py:173-190 — categorização de bens por regex; a ordem importa.
- Componente de servidor — app/page.tsx:9-15 — Home sem "use client", repassa dados ao Dashboard.
- Componente de cliente — app/Dashboard.tsx:1 — diretiva "use client".
- Handler de Worker — worker/index.ts:28-44 — despacha `/_vinext/image` e delega o resto.

## Dúvidas em aberto
- docs/ROTEIRO.md cita erros de tsc em db/index.ts e worker/index.ts e commits d3c726d e 4e872ba ainda não enviados (estado em 25/10/2026); não verifiquei se seguem assim.
- README diz "Cloudflare"; o schema Drizzle está vazio mas worker/index.ts declara um binding D1 (DB). Não confirmei se o D1 é usado.
- app/ProjetosDeLei.tsx:34 busca /leis/<id>.json; public/leis/ existe, mas não li o componente inteiro.
- build/sites-vite-plugin.ts e drizzle/ ignorados por instrução.
- Não li app/lib/hemiciclo.ts, leis.ts, legislaturas.ts nem o restante dos scripts.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
