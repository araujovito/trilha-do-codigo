# fundo-eleitoral-br

Repositório: https://github.com/araujovito/fundo-eleitoral-br

## O que é
Analisa como os partidos brasileiros distribuem o Fundo Eleitoral (FEFC) e o Fundo Partidário entre candidaturas, nos ciclos de 2018, 2022 e 2026, a partir de dados abertos do TSE. Produz recortes como cumprimento da cota de gênero, concentração, renovação e proporcionalidade racial, e um painel web.

## Do que é feito
- Python (cerca de 40%) — o pipeline: ingestão, consulta, análises e publicação (src/fundo_eleitoral/).
- DuckDB, Polars e PyArrow — leem e somam os arquivos Parquet (pyproject.toml:7-9).
- curl_cffi — imita o handshake TLS do Chrome para passar pelo CDN do TSE (src/fundo_eleitoral/ingestao.py:25-29).
- huggingface-hub — publica e lê o dataset público (pyproject.toml:11).
- TypeScript/TSX (cerca de 50%) — o painel web (dashboard/).
- Next/vinext, React e Recharts — o painel e os gráficos (dashboard/package.json).
- shadcn/ui — componentes de tela gerados (126 arquivos versionados incluem estes).
- oxlint e oxfmt — lint e formatação do painel (dashboard/package.json).
- pytest — 88 testes sem rede, mais um teste de rede marcado `rede`.
- Makefile — atalhos do ciclo: `ingerir`, `dimensoes`, `publicar`, `painel`, `teste`.

## Como as peças se encaixam
1. `make verificar` testa as URLs sem baixar (README.md:191-233).
2. `make ingerir ANO=...` baixa os dados do TSE; antes, `checar-token` testa o HF_TOKEN (Makefile:20-25).
3. As dimensões e análises são calculadas com DuckDB/Polars (src/fundo_eleitoral/analise.py).
4. `make publicar` envia o dataset ao Hugging Face; `REPO=usuario/nome make tudo` faz o ciclo inteiro.
5. O painel (`make painel`) lê dados exportados e filtra/agrupa no navegador (dashboard/lib/data.ts:12-17).

## Conceitos que aparecem aqui
- Dataclass imutável com propriedades — src/fundo_eleitoral/analise.py:32-52 — `LinhaPartido` calcula `piso`, `folga` e `cumpre` a partir dos campos.
- Regra de piso com máximo — src/fundo_eleitoral/analise.py:55-57 — `max(30, % candidaturas)`, o piso proporcional com teto mínimo de 30%.
- Filtro por constante em SQL — src/fundo_eleitoral/analise.py:27 — string montada com a origem de repasse para excluir FEFC de outras candidaturas.
- Constantes por ciclo — src/fundo_eleitoral/raca.py:45-50 — nomes de regra (`sem_regra`, `proporcao_por_genero`, `piso_fixo`) como strings fixas.
- Cabeçalho de documentação com regra por ano — src/fundo_eleitoral/raca.py:14-19 — o docstring descreve a norma que muda entre 2018, 2022 e 2026.
- Sessão HTTP como gerenciador de contexto — src/fundo_eleitoral/ingestao.py:40 — `with requests.Session(impersonate=...)` fecha a conexão ao sair.
- Requisição com Range e streaming — src/fundo_eleitoral/ingestao.py:52-53 — pede só 1 KB para checar a URL sem baixar o arquivo.
- Fonte imutável — src/fundo_eleitoral/fontes.py:23-37 — `@dataclass(frozen=True)` com método `arquivo_de`.
- Falha antes do download — Makefile:20-25 — target `checar-token` testa `HF_TOKEN` antes da ingestão.
- Painel com dados em TypeScript — dashboard/lib/data.ts:12-17 — `selectCells` filtra e `group` agrega células por partido, UF, gênero ou raça.

## Dúvidas em aberto
- Não li o conteúdo de docs/decisoes.md, só a referência dele no README (ADR-001, ADR-009).
- Não confirmei o conteúdo de dashboard/tests/data.test.ts nem o de dashboard/public/data.json (gerado).
- O README diz 88 testes; não contei em tests/.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
