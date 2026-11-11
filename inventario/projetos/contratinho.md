# contratinho

Repositório: https://github.com/araujovito/contratinho

## O que é
Vasculha as licitações abertas do governo federal (portal PNCP) e avisa quem vende para o governo sobre contratos pequenos do seu ramo, dentro do prazo de proposta. Só avisa o que é novo, para não repetir o mesmo edital.

## Do que é feito
- Python 3.12/3.13 (cerca de 75%) — a linguagem de tudo.
- Django 5.2 — o site, o banco (ORM), o e-mail e os comandos de gestão (pyproject.toml:35; web/models.py; web/alertas.py:15-21).
- pypncp — cliente da API do PNCP, usado pela linha de comando (fonte.py:12-13; pyproject.toml:27).
- curl-cffi — faz a coleta pelo portal (web/portal.py:9).
- SQLite (sqlite3 da biblioteca padrão) — memória da CLI sobre o que já foi avisado (estado.py:8, :30).
- dj-database-url e psycopg — escolhem SQLite ou PostgreSQL por variável de ambiente (web/settings.py:51-53; pyproject.toml:35).
- Typer e Rich — a linha de comando e a saída formatada (cli.py:17, :27).
- openai — resume editais com um modelo (web/ai.py:8, :42-46; padrão gpt-4o-mini em :44).
- Pydantic — valida o arquivo de configuração contratinho.toml (config.py:67 e :98).
- pytest — testes (152, segundo o README).
- hatchling — empacotamento (pyproject.toml:2-3).
- HTML/CSS — templates Django e estilo das telas.

## Como as peças se encaixam
1. O comando sync_pncp coleta as licitações abertas do PNCP (web/management/commands/).
2. O filtro compara texto das licitações com os termos de cada perfil, sem acento e por palavra inteira (filtro.py:57-58, :134).
3. Cada licitação gera no máximo um achado (filtro.py:179-186).
4. A memória marca o que já foi avisado, sem duplicar (estado.py:66).
5. O comando send_alerts manda e-mail só com o que é novo.
6. Opcionalmente, summarize_opportunities resume o edital com IA.

## Conceitos que aparecem aqui
- Dataclass imutável com slots — contratinho/filtro.py:18-19 — Licitacao e Achado não mudam depois de criados.
- Expressão regular com fronteira de palavra — filtro.py:134 — termo casa palavra inteira, com plural e espaços flexíveis.
- Normalização Unicode — filtro.py:57-58 — remove acento com NFKD antes de comparar.
- Memorização — filtro.py:120 — lru_cache guarda os padrões já compilados.
- Laço com interrupção — filtro.py:179-186 — uma licitação gera no máximo um achado (break no primeiro perfil que casa).
- Validação de configuração — config.py:67 e :98 — modelos Pydantic (BaseModel) validam o contratinho.toml.
- Gerenciador de contexto — contratinho/estado.py:26-40 — commit no fim, rollback em erro.
- Consulta parametrizada — estado.py:48 — valores vão como ? e não concatenados (só os marcadores são montados).
- Inserção idempotente — estado.py:66 — INSERT OR IGNORE evita duplicar um edital já marcado.
- Repetição com pausa crescente — contratinho/web/portal.py:57-77 — até 6 tentativas em erro 5xx, com pausa de 2 s vezes a tentativa (linha 76).

## Dúvidas em aberto
- Chamada à OpenAI (web/ai.py) está na dependência base do pyproject.toml; não confirmei se roda no fluxo de produção.
- web.sqlite3 na raiz (815 KB) existe mas não aparece em git ls-files; não foi aberto.
- Contagem de 152 testes não conferida; não rodei testes.
- Valor estimado e prazo dos editais: o README diz que o mapeamento ainda não foi confirmado; não verifiquei na fonte.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
