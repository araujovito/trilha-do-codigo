# atribuicao-canais

Repositório: https://github.com/araujovito/atribuicao-canais

## O que é
Mostra de onde vêm os clientes de um site e quanto crédito cada canal recebe por uma venda, inclusive quando a pessoa começa no celular e compra no computador. Faz isso com coleta com consentimento, junção de identidade entre aparelhos e sete modelos de atribuição.

## Do que é feito
- Python (cerca de 75%) — a API e as regras de identidade, atribuição, privacidade e incrementalidade (app/).
- FastAPI, Starlette, Uvicorn — servem a API e o painel (pyproject.toml:8-11).
- psycopg e PostgreSQL — o banco de dados (pyproject.toml:9).
- JavaScript e HTML (web/) — o rastreador (rastreio.js), a loja de demonstração e o painel.
- SQL e YAML — tabelas e configuração.
- pytest, httpx2 e ruff — testes e lint (pyproject.toml:16-18); um teste do rastreador em Node (tests/test_rastreio.cjs).
- Docker Compose — sobe o Postgres local (compose.yaml).
- Render — hospedagem (render.yaml).
- GitHub Actions — CI que roda pytest e o teste em Node (.github/workflows/testes.yml).
- GA4 (BigQuery) — importação opcional de dados (scripts/).

## Como as peças se encaixam
1. O rastreador em JavaScript (web/rastreio.js) roda no navegador e envia eventos, com consentimento.
2. A API FastAPI (app/main.py) recebe, limitando o tamanho do corpo e as origens permitidas (:107, :116-120).
3. A regra de identidade liga eventos à pessoa só com vínculo único (app/identidade.py:38-48); e-mail vira HMAC (app/privacidade.py:50-51).
4. A atribuição divide o crédito de uma venda entre os toques da jornada (app/atribuicao.py:35-94).
5. A incrementalidade mede com intervalo de Wilson (app/incrementalidade.py:57-62); o painel mostra o resultado.
6. scripts/ gera dados fictícios para a demonstração.

## Conceitos que aparecem aqui
- Dataclass com propriedade — app/atribuicao.py:35-46 — `Jornada` guarda os toques de uma pessoa e expõe `canais` como propriedade.
- Função de regra como valor em dicionário — app/atribuicao.py:88-94 — `MODELOS_REGRA` mapeia o nome do modelo para a função de peso.
- Decaimento exponencial — app/atribuicao.py:71-75 — peso de cada toque cai pela metade a cada 7 dias antes da conversão.
- Resolução por regra explícita — app/identidade.py:38-48 — evento vai para `p:<pessoa>` só com um vínculo único; aparelho compartilhado fica anônimo.
- Intervalo de Wilson — app/incrementalidade.py:57-62 — intervalo de confiança para proporções, base do teste de incrementalidade.
- HMAC para pseudonimização — app/privacidade.py:50-51 — e-mail normalizado vira HMAC-SHA256 com chave secreta.
- Limite de corpo na API — app/main.py:107 — `RequestBodyLimitMiddleware` recusa payloads acima de 32 KB.
- Lista de origens CORS — app/main.py:116-120 — só origens listadas em variável de ambiente; `*` é descartado.
- Módulo com IIFE e modo estrito — web/rastreio.js:20-21 — encapsula o rastreador sem poluir o escopo global.
- Leitura tolerante a falha de armazenamento — web/rastreio.js:33-35 — try/catch em volta do localStorage (modo privado).

## Dúvidas em aberto
- O banco atribuicao.db na raiz e a pasta dados/ não foram abertos (dados locais, fora do escopo).
- Não li CONTEXTO.md além do início, nem as decisões de README.md:133 em diante.
- O código de app/main.py usa sqlite3 na tipagem, mas o padrão é PostgreSQL; a camada app/banco.py não foi lida.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
