# Roteiro de entrevista: raio-x-patrimonial

## Pitch de 30 segundos

O problema: mostrar o patrimônio declarado e a trajetória eleitoral dos 513 deputados federais eleitos em 2022 e 2026, com dados públicos do TSE e da Câmara, e permitir conferir a base contra a fonte (README.md:12-16, :120-123). Eu construí um site em Next.js com dados em JSON estático, cruzamento por CPF e um script que confere a base contra a API pública do TSE.

## Decisões que um entrevistador pode perguntar

**P:** Por que JSON estático e não banco de dados?
**R:** Porque o volume (513 registros, somente leitura) não justifica um banco de dados.
**Fonte:** raio-x-patrimonial/README.md:57-58 — "o volume (513 registros, somente leitura) não justifica um banco de dados"
**Custo admitido:** não documentado. A premissa é o volume pequeno e somente leitura.

**P:** Por que cruzar por CPF e não por nome de urna?
**R:** Porque o CPF é mais confiável que o nome de urna, que falhava em ~110 dos 513 por apelidos e nomes de urna divergentes. Ligar por nome acharia só 227 dos 296.
**Fonte:** raio-x-patrimonial commit ba341b8; commit d3c726d — "mais confiavel que nome de urna, que falhava em ~110 dos 513 por apelidos e nomes de urna divergentes"
**Custo admitido:** não documentado. O commit registra o resultado: 470 de 513 casados.

**P:** Por que normalizar o CPF com zeros à esquerda?
**R:** Porque o cruzamento por igualdade de string falhava para todo candidato cujo CPF começa com zero, 118 mil registros só no arquivo de 2012.
**Fonte:** raio-x-patrimonial/README.md:77-81; commit 7e6c813 — "o cruzamento por igualdade de string falhava para todo candidato cujo CPF começa com zero — 118 mil registros só no arquivo de 2012."
**Custo admitido:** candidaturas presidenciais de 2014 têm CPF ocultado (-1) e não se ligam ao histórico; duas trajetórias ficam incompletas (README.md:275-278).

**P:** Por que mediana e não média na comparação 2022 x 2026?
**R:** Porque a variação máxima passa de 5.000% e distorceria qualquer média.
**Fonte:** raio-x-patrimonial commit d3c726d — "a variação máxima passa de 5.000% e distorceria qualquer média."
**Custo admitido:** o percentual não é calculado quando a declaração de 2022 foi zero (commit d3c726d). Os valores são nominais (README.md:266).

**P:** Por que não há link para a ficha do TSE dos eleitos de 2026?
**R:** Porque um código chutado geraria links quebrados, e o código de eleição não foi confirmado.
**Fonte:** raio-x-patrimonial commit a1d8de5; README.md:232-235 — "um código chutado geraria links quebrados."
**Custo admitido:** os eleitos de 2026 não têm verificação pela API nem link para a ficha (README.md:234-235).

**P:** Por que usar a composição atual da Câmara para 18 deputados do Maranhão?
**R:** Porque o resultado padrão do TSE estava sem o resultado proporcional do estado, e o rótulo de fonte existe para não esconder que a fonte da situação eleitoral, nesse caso específico, não é o próprio TSE.
**Fonte:** raio-x-patrimonial/README.md:147-152 — "para não esconder que a fonte da situação eleitoral, nesse caso específico, não é o próprio TSE."
**Custo admitido:** o resultado de 2022 desses 18 não vem do TSE (README.md:281-285). Depois que o TSE corrigiu o arquivo, a reconciliação passou a valer só enquanto o arquivo não trouxer eleitos do MA (README.md:166-168; commit a1d8de5).

**P:** Por que um script que confere a base contra a API do TSE?
**R:** Porque um projeto sobre transparência não pode pedir que o leitor confie na palavra do autor. O script cobre os 513 deputados.
**Fonte:** raio-x-patrimonial/README.md:120-123; commit 7e6c813 — "um projeto sobre transparência não pode pedir que o leitor confie na palavra do autor."
**Custo admitido:** a verificação cobre só os eleitos de 2022 (README.md:232-235).

**P:** Por que uma página por deputado, renderizada no servidor?
**R:** Porque é útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista, e o link ganha título e descrição próprios.
**Fonte:** raio-x-patrimonial/README.md:38-41; commit 952ec82 — "útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista."
**Custo admitido:** não documentado.

**P:** Por que os projetos de lei ficam em um arquivo por deputado?
**R:** Porque o conjunto completo passa de 20MB com as ementas, grande demais para embutir no carregamento da página. Mantenho só um resumo pequeno para a página /leis.
**Fonte:** raio-x-patrimonial commit ba341b8; commit 598379c — "o conjunto completo passa de 20MB com as ementas, grande demais para embutir no carregamento da pagina."
**Custo admitido:** não documentado.

## Decisões sem motivo registrado — prepare sua resposta

- Next.js (App Router) servido por vinext sobre Vite, React 19 e TypeScript — README.md:47-48.
- Gráfico de evolução patrimonial em SVG escrito à mão, sem biblioteca — README.md:51-53.
- Mapa do Brasil com @svg-maps/brazil — commit 8fad21f.
- Scripts de dados só com a biblioteca padrão do Python — README.md:55-56.
- Testes com o runner nativo `node:test` — README.md:61.
- CPF retirado do arquivo publicado — README.md:197-198.
- Valores nominais, sem correção pelo IPCA — README.md:266; docs/ROTEIRO.md:41.
- Fotos oficiais dos candidatos incluídas no site — commit 7e6c813.

## Perguntas difíceis prováveis

**Seus dados estão corretos? Como alguém confere?**
Documentado: há um script que confere a base contra a API pública do TSE (README.md:120-123), mas só para os eleitos de 2022 (README.md:232-235).

**Quais as limitações dos dados?**
Documentado: valores nominais (README.md:266); 18 deputados do MA com situação eleitoral de 2022 vinda da Câmara (README.md:147-152, :281-285); duas trajetórias incompletas por CPF ocultado em 2014 (README.md:275-278); eleitos de 2026 sem verificação nem link (README.md:234-235).

**Onde quebra em escala?**
Documentado só o caso dos projetos de lei (mais de 20MB, por isso carregados sob demanda por deputado). O resto: prepare sua resposta.

**Como você testou?**
Os relatórios citam o runner `node:test` (README.md:61) e o script de conferência com a API do TSE. Cobertura: prepare sua resposta.

**O que foi seu e o que foi de ferramenta ou IA?**
Registrado no histórico: 5 commits trazem `Co-Authored-By: Claude Sonnet 5` (8fad21f, 4540a33, ba341b8, f1a2a9c, 598379c). O README assina "Dados e desenvolvimento por Vitor Barbosa" (README.md:289). A divisão do trabalho: prepare sua resposta.
