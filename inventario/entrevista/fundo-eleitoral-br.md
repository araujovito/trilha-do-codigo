# Roteiro de entrevista: fundo-eleitoral-br

## Pitch de 30 segundos

O problema: como os partidos brasileiros alocam o FEFC e o Fundo Partidário, em 2018, 2022 e 2026, a partir dos dados abertos do TSE. A pergunta central é onde cada partido aplicou o dinheiro, não quanto gastou (README.md:3-9). Eu construí um pipeline que baixa e converte os dados do TSE para Parquet, publica o dataset no Hugging Face e analisa com DuckDB, medindo concentração com Gini, cobertura, HHI e top 10%.

## Decisões que um entrevistador pode perguntar

**P:** Por que separar a ingestão da análise?
**R:** Porque juntar as duas coisas significa baixar gigabytes de novo a cada restart de ambiente efêmero (o Codespaces hiberna e é descartado após 30 dias parado). A análise lê só Parquet.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:6 (ADR-001), "Por quê" na linha 16 — "Juntar as duas coisas significa re-baixar gigabytes a cada restart de ambiente efêmero (Codespaces hiberna e é descartado após 30 dias parado)."
**Custo admitido:** não documentado como custo; o ADR diz o que o invalidaria: "o TSE passar a oferecer uma API incremental".

**P:** Por que os dados não ficam no repositório?
**R:** Porque o Git versiona mal arquivo binário grande: cada nova publicação do TSE duplicaria o histórico permanentemente. Os dados vão para um dataset no Hugging Face.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:23 (ADR-002), "Por quê" na linha 30 — "Git versiona mal arquivo binário grande: cada nova publicação do TSE duplicaria o histórico permanentemente."
**Custo admitido:** não documentado.

**P:** Por que o Hugging Face é o host dos dados?
**R:** Porque o Hugging Face versiona dataset com git-lfs, que é a ferramenta certa para isso, e de quebra torna a análise reproduzível por terceiros sem precisar refazer a ingestão.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:31-33 (ADR-002) — "O Hugging Face versiona dataset com git-lfs, que é a ferramenta certa para isso, e de quebra torna a análise reproduzível por terceiros sem precisar refazer a ingestão."
**Custo admitido:** não documentado.

**P:** Por que DuckDB e não Postgres?
**R:** Porque um Postgres adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que o projeto não tem.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:35 (ADR-003), "Por quê" na linha 40 — "Um Postgres aqui adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que este projeto não tem."
**Custo admitido:** não documentado como custo; invalidaria: "precisar de escrita concorrente ou de servir as consultas para uma aplicação multiusuário".

**P:** Por que `curl_cffi` com `impersonate="chrome"` para baixar do TSE?
**R:** Porque `httpx` e `curl` recebem 403 em todo o domínio: a classificação é feita pela impressão digital do TLS, não pelo cabeçalho, então trocar o User-Agent não resolve. O ADR declara que não há contorno de autenticação ou paywall.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:58 (ADR-005), "Por quê" na linha 69 — "A classificação é feita pela impressão digital do TLS, não pelo cabeçalho — por isso trocar o User-Agent não resolve."
**Custo admitido:** não documentado.

**P:** Por que ler só os arquivos `_BRASIL` de cada tabela?
**R:** Porque concatenar os arquivos de UF descartaria 58% das linhas de receita, incluindo a disputa presidencial inteira. UFs mais `_BRASIL` duplicaria.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:82 (ADR-006), linha 102 — "Concatenar as UFs descartaria 58% das linhas de receita, incluindo a disputa presidencial inteira."
**Custo admitido:** não documentado.

**P:** Por que a publicação no Hugging Face é parte do pipeline?
**R:** Porque, se publicar for um passo manual e opcional, mais cedo ou mais tarde alguém — provavelmente eu mesmo — vai rodar a ingestão, fechar a aba e perder o resultado.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:120 (ADR-007), "Por quê" na linha 132 — "Se publicar for um passo manual e opcional, mais cedo ou mais tarde alguém — provavelmente eu mesmo — vai rodar a ingestão, fechar a aba e perder o resultado."
**Custo admitido:** não documentado.

**P:** Por que o repasse entre candidaturas fica fora da concentração?
**R:** Porque incluir o repasse sempre reduz o Gini, já que as transferências correm de quem recebeu muito para candidaturas menores. Há uma flag, `incluir_repasse_entre_candidatos=True`, para o comportamento antigo.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:162 (ADR-009), docs/decisoes.md:180-186 — "incluir o repasse sempre *reduz* o Gini, porque as transferências correm de quem recebeu muito para candidaturas menores."
**Custo admitido:** não documentado (a fonte deixa em aberto a observação sobre 2018, decisoes.md:191-193).

**P:** Por que medir a prioridade geográfica também por cadeira?
**R:** Porque atribuir isso a escolha partidária é confundir desenho institucional com decisão.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:297 (ADR-012); README.md, "Achado: a 'prioridade' dos estados pequenos" — "Atribuir isso a escolha partidária é confundir desenho institucional com decisão."
**Custo admitido:** "a redistribuição de cadeiras de 2023 alterou a bancada de vários estados"; por isso, em 2026, o índice usa cadeiras do ciclo anterior, com aviso no relatório (ADR-012).

**P:** O que acontece quando uma fonte falha no meio do lote?
**R:** Um item do lote pode falhar sem derrubar o lote; nenhuma falha pode sumir do código de saída; e um artefato só conta como pronto se estiver íntegro.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:386 (ADR-014) — "Um item do lote pode falhar sem derrubar o lote; nenhuma falha pode sumir do código de saída; e um artefato só conta como pronto se estiver íntegro."
**Custo admitido:** não documentado; o ADR diz o que o invalidaria: tabela intermitente legítima do TSE.

**P:** Por que a exportação do painel é determinística?
**R:** Para que duas execuções seguidas produzam conteúdo idêntico. A ordenação anterior por (partido, UF, cargo) deixava o empate ao acaso do DuckDB. A exportação é etapa do pipeline, depois da publicação.
**Fonte:** fundo-eleitoral-br/docs/decisoes.md:550 (ADR-018) — "Duas execuções seguidas produzem conteúdo idêntico."
**Custo admitido:** não documentado. Para o risco de fotografia velha, a fonte descreve a guarda `tests/test_painel_atualizado.py`.

**P:** Por que o Gini nunca é lido sozinho?
**R:** Porque nenhuma métrica deve ser lida isoladamente: a cobertura separa exclusão de concentração entre recebedores, o Gini resume a desigualdade, HHI e número efetivo dão mais peso aos maiores repasses, e o top 10% é a medida mais fácil de comunicar.
**Fonte:** fundo-eleitoral-br/docs/concentracao.md:37-40 — "Nenhuma métrica deve ser lida isoladamente."
**Custo admitido:** não documentado.

## Decisões sem motivo registrado — prepare sua resposta

- Dashboard em pnpm com TypeScript (pasta `dashboard/`) — README.md, seção "Rodando / Dashboard".

## Perguntas difíceis prováveis

**O que você ainda não consegue explicar nos resultados?**
Documentado: o comportamento de 2018 na concentração — "Vale investigar se reflete mudança de regra entre ciclos ou apenas o FEFC menor daquele ano — não está respondido." (ADR-009).

**Quando essas escolhas deixariam de servir?**
Documentado: DuckDB, se precisar de escrita concorrente ou multiusuário (ADR-003); ingestão separada, se o TSE oferecer API incremental (ADR-001); lote tolerante a falha, se houver tabela intermitente legítima (ADR-014).

**Como você garante que o resultado é reproduzível?**
Documentado: exportação determinística (ADR-018) e guarda `tests/test_painel_atualizado.py` contra fotografia velha. Outros testes: prepare sua resposta.

**Seus resultados provam que o partido decidiu isso?**
Documentado: não, a prioridade geográfica é medida também por cadeira para não confundir desenho institucional com decisão partidária (ADR-012).

**O que foi seu e o que foi de ferramenta ou IA?**
Não documentado nos relatórios — prepare sua resposta.
