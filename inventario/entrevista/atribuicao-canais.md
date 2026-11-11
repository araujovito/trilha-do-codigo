# Roteiro de entrevista: atribuicao-canais

## Pitch de 30 segundos

O problema: saber de onde vêm os clientes de um site e qual canal recebe o crédito por cada conversão, inclusive quando a pessoa começa no celular e compra no computador, respeitando a LGPD (CONTEXTO.md:9-11). O uso declarado é portfólio, sem dados reais de ninguém (CONTEXTO.md:13). Eu construí uma API em FastAPI que registra eventos, junta aparelhos só com identificação própria (login ou formulário), calcula modelos de atribuição (incluindo Markov de 1ª e 2ª ordem) e mede efeito causal com grupo de controle.

## Decisões que um entrevistador pode perguntar

**P:** Como você junta os aparelhos da mesma pessoa?
**R:** Só por identificação própria, login ou formulário. Sem isso não há junção confiável entre aparelhos, e o que promete isso usa dados de terceiros ou fingerprinting, que a LGPD e os navegadores combatem. Descartei o union-find ligando tudo que se toca.
**Fonte:** atribuicao-canais/CONTEXTO.md:99-101; commit f5a59b6 — "Sem login ou formulário, não há junção confiável entre aparelhos. O que promete isso usa dados de terceiros (Google/Meta) ou fingerprinting, que a LGPD e os navegadores combatem."
**Custo admitido:** "O custo desse erro é um toque perdido, em vez de duas jornadas corrompidas." (commit f5a59b6). No computador compartilhado, o union-find funde duas pessoas numa só.

**P:** Por que Markov de 1ª e 2ª ordem?
**R:** Porque a 1ª ordem não lembra o canal anterior, e a 2ª lembra, ao custo de estimar ~74 estados em vez de 9 com o mesmo volume de jornadas. Mostro as duas no painel.
**Fonte:** atribuicao-canais/CONTEXTO.md:102-104; commit ab9600c — "a 2ª lembra, ao custo de estimar ~74 estados em vez de 9 com o mesmo volume de jornadas."
**Custo admitido:** "com os dados fictícios são 74 estados em vez de 9, cada um estimado com menos jornadas." (commit ab9600c)

**P:** Por que não usar Shapley?
**R:** Porque, com a função de valor usual, ele se reduz a dividir cada conversão igualmente entre os canais distintos da jornada. Depois o Shapley voltou só como referência do gerador de dados.
**Fonte:** atribuicao-canais/CONTEXTO.md:105-107; commit ab9600c; commit 89352ed — "Shapley foi descartado: com a função de valor usual [...] ele se reduz a dividir cada conversão igualmente entre os canais distintos da jornada."
**Custo admitido:** não documentado.

**P:** Atribuição não é a mesma coisa que efeito causal?
**R:** Não: os modelos dividem as compras entre os canais do caminho, mas nenhum sabe o que teria acontecido sem o canal. Por isso separo o crédito por modelo do efeito causal e meço o efeito com grupo de controle (teste de incrementalidade, ghost ads).
**Fonte:** atribuicao-canais commit c81d0ff; CONTEXTO.md:108-113 — "Os modelos de atribuição dividem as compras entre os canais do caminho, mas nenhum sabe o que teria acontecido sem o canal."
**Custo admitido:** "Com as 2.000 pessoas padrão, nenhum dos dois testes distingue o efeito de zero" (commit c81d0ff). Com 20.000 pessoas, a medida de Social pago fica abaixo do real por diluição (CONTEXTO.md:114-118).

**P:** Como você trata o consentimento?
**R:** Separado por finalidade (medição e junção entre aparelhos), com caixas desmarcadas. A versão anterior tinha um "sim" único, e a LGPD considera nula a autorização genérica (art. 8º, §4º).
**Fonte:** atribuicao-canais commit c3e4898; README.md:160-161 — "A LGPD considera nula a autorização genérica (art. 8º, §4º); cada finalidade precisa de um sim próprio."
**Custo admitido:** não documentado.

**P:** Por que HMAC-SHA256 para pseudonimizar e-mail e não hash puro?
**R:** Porque e-mail tem pouca entropia.
**Fonte:** atribuicao-canais/README.md:166-167; CONTEXTO.md:291-292 — "HMAC-SHA256 com chave em vez de hash puro, porque e-mail tem pouca entropia."
**Custo admitido:** não documentado (a chave fica fora do repositório, sorteada pelo Render: commit 517aa9f).

**P:** Por que o CORS só aceita origens listadas?
**R:** Porque "*" é ignorado de propósito: qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição. O cabeçalho `Authorization` também não é liberado.
**Fonte:** atribuicao-canais commit 22632c6; CONTEXTO.md:223-226 — "\"*\" é ignorado de propósito, porque qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição."
**Custo admitido:** não documentado.

**P:** Por que limite de requisições por IP?
**R:** Porque, sem limite, qualquer um inventava `anon_ids` e enchia o banco de eventos falsos, distorcendo a atribuição, ou repetia pedidos de código de exclusão sem parar.
**Fonte:** atribuicao-canais commit 744cff0; CONTEXTO.md:234-237 — "Sem limite, qualquer um inventava anon_ids e enchia o banco de eventos falsos, distorcendo a atribuição"
**Custo admitido:** "Limite conhecido: o contador é por processo. Com várias instâncias, ele vai para o Redis ou para o proxy." (commit 744cff0)

**P:** Por que o bootstrap reamostra pessoas e não jornadas?
**R:** Porque as jornadas de uma mesma pessoa não são independentes. O intervalo de 95% do crédito sai desse bootstrap.
**Fonte:** atribuicao-canais commit 0b063b9; README.md:152-153 — "A reamostragem é por pessoa, não por jornada, porque as jornadas de uma mesma pessoa não são independentes."
**Custo admitido:** "Custo: ~3 s com 100 réplicas" (commit 0b063b9).

**P:** Como funciona o cache do painel?
**R:** A versão dos dados é mantida por triggers. Descartei a assinatura por contagem ou ids porque, sem AUTOINCREMENT, o SQLite reaproveita o id da última linha apagada.
**Fonte:** atribuicao-canais/CONTEXTO.md:228-232 (commit b85b615) — "Descartada a assinatura por contagem/ids: sem AUTOINCREMENT o SQLite reaproveita o id da última linha apagada."
**Custo admitido:** não documentado.

**P:** Por que retenção de 13 meses?
**R:** Porque 13 meses é referência da CNIL, e a LGPD não fixa prazo.
**Fonte:** atribuicao-canais/CONTEXTO.md:294 — "referência da CNIL; a LGPD não fixa prazo"
**Custo admitido:** não documentado.

## Decisões sem motivo registrado — prepare sua resposta

- Migração para PostgreSQL como banco principal — CONTEXTO.md:126; commit 3964f10 (corpo vazio).
- FastAPI como framework da API — CONTEXTO.md:284.
- Render como destino da publicação (Railway aparece como alternativa, sem motivo da escolha) — CONTEXTO.md:83; render.yaml.

## Perguntas difíceis prováveis

**Seus dados são reais? O resultado vale para um negócio?**
Documentado: o uso é de portfólio, com dados fictícios e sem dados reais de ninguém (CONTEXTO.md:13). Com as 2.000 pessoas padrão, nenhum dos dois testes de incrementalidade distingue o efeito de zero (commit c81d0ff).

**Onde isso quebra em escala?**
Documentado: o limite de requisições é por processo e, com várias instâncias, precisa ir para o Redis ou para o proxy (commit 744cff0). O bootstrap custa ~3 s com 100 réplicas (commit 0b063b9).

**O que você faria diferente?**
Documentado em parte: com 20.000 pessoas, a medida de Social pago fica abaixo do real por diluição (CONTEXTO.md:114-118). O resto: prepare sua resposta.

**Como você testou?**
Há menção a teste que registra a limitação da 1ª ordem (commit ab9600c). Estratégia completa: prepare sua resposta.

**O que foi seu e o que foi de ferramenta ou IA?**
Não documentado nos relatórios — prepare sua resposta.
