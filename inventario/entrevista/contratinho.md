# Roteiro de entrevista: contratinho

## Pitch de 30 segundos

O problema: quem vende para o governo precisa abrir o portal do PNCP todo dia, e quem esquece de olhar perde o prazo (README.md:6-8). O Contratinho faz a varredura, filtra pelo perfil e avisa só o que é novo. Eu construí uma CLI e uma versão web em Django (monólito modular com HTML no servidor) e guardo em SQLite o que já foi avisado.

## Decisões que um entrevistador pode perguntar

**P:** Por que um monólito Django e não microserviços?
**R:** Porque o Django oferece autenticação, sessões, CSRF, ORM e migrações integrados, e não há evidência para microserviços agora. O status do ADR 001 é "aceito para o MVP".
**Fonte:** contratinho/docs/ARQUITETURA.md:5-7 e :17 — "Django oferece autenticação, sessões, CSRF, ORM e migrações integrados."
**Custo admitido:** não documentado. A fonte afirma só que PostgreSQL é o banco de produção previsto (ARQUITETURA.md:8).

**P:** Por que duas fontes do PNCP, uma na CLI e outra na web?
**R:** Porque a rota documentada não sustentou o produto sozinha. A CLI usa a API de consulta versionada (via `pypncp`) e a web usa a busca do próprio portal; a API não respondeu durante a validação de 22/09/2026.
**Fonte:** contratinho/README.md:104-110; docs/ARQUITETURA.md:23-26 — "a rota documentada não sustentou o produto sozinha"
**Custo admitido:** "A rota de busca não possui contrato público versionado, portanto deve ser monitorada." (ARQUITETURA.md:25-26). O README chama a duplicação de "consciente".

**P:** Por que SQLite para o estado da CLI?
**R:** Porque JSON reescrito inteiro corrompe em interrupção, e o SQLite dá índice e transação sem dependência nova.
**Fonte:** contratinho/README.md:112-114; commit 6a1bcf8 — "JSON reescrito inteiro corrompe em interrupção; SQLite dá índice e transação sem dependência nova."
**Custo admitido:** não documentado.

**P:** Por que a marcação de "já avisado" é gravada depois de imprimir?
**R:** Porque repetir incomoda, mas perder o prazo custa dinheiro.
**Fonte:** contratinho/README.md:126-128; commit 6a1bcf8 — "Repetir incomoda; perder o prazo custa dinheiro."
**Custo admitido:** "Se o processo morrer entre imprimir e gravar, o aviso se repete na próxima rodada." (README.md:127)

**P:** Por que os perfis têm lista de exclusão?
**R:** Porque, sem exclusão, a ferramenta devolve ruído, o usuário para de ler os avisos e ela vira enfeite.
**Fonte:** contratinho/README.md:116-120 — "Sem exclusão a ferramenta devolve ruído, o usuário para de ler os avisos, e vira enfeite."
**Custo admitido:** não documentado.

**P:** Por que o escopo inicial é só RJ e até R$ 250 mil?
**R:** Porque começar largo é receber cem avisos no primeiro dia e parar de ler todos eles. A ampliação está anotada no ROADMAP.
**Fonte:** contratinho commit 1c84483 — "Começar largo é receber cem avisos no primeiro dia e parar de ler todos eles"
**Custo admitido:** não documentado; a ampliação "está anotado no ROADMAP para ser cobrado quando a hora de ampliar chegar".

**P:** Por que consultar os anexos e datas do edital só no primeiro clique do detalhe?
**R:** Porque o primeiro clique é o momento em que o usuário decide e a consulta se paga. A consulta tem uma tentativa e sem retentativa, e é gravada mesmo no fracasso, para que um PNCP instável não vire uma consulta por clique.
**Fonte:** contratinho/docs/WEB.md:79-80 e :83-88 — "o momento em que o usuário decide e a consulta se paga"
**Custo admitido:** "Não verificado contra a API real." (WEB.md:91-92). A chamada ocorre dentro da requisição web, com timeout de oito segundos.

**P:** Por que aviso por e-mail e não só o site?
**R:** Porque um site que exige lembrar de entrar não resolve o problema que abriu o projeto. WhatsApp fica fora até haver usuário validado.
**Fonte:** contratinho/docs/PRODUTO.md:38-41; README.md:8 — "um site que exige lembrar de entrar não resolve o problema que abriu o projeto"
**Custo admitido:** WhatsApp "com custo e burocracia de API que só se pagam depois" (PRODUTO.md:40-41). O envio existe: `send_alerts` (contratinho/web/management/commands/send_alerts.py), commit 7fdd33d, docs/WEB.md:99-123, PRODUTO.md:38-39. A frase de docs/WEB.md:176 ("Alertas por e-mail ainda não são enviados") ficou desatualizada: veio do commit 7494fbd (22/09/2026 22:18), anterior ao 7fdd33d (23/09/2026 00:37). Sem `CONTRATINHO_SMTP_HOST`, a mensagem sai no terminal.

## Decisões sem motivo registrado — prepare sua resposta

- Painel administrativo próprio no lugar do admin padrão do Django — commit a66a7d5.
- Ruff e pytest no CI — .github/workflows/ci.yml.

## Perguntas difíceis prováveis

**O que está sem verificar?**
Documentado: a consulta de detalhe "não verificada contra a API real" (WEB.md:91-92) e a rota de busca da web, sem contrato público versionado, que deve ser monitorada (ARQUITETURA.md:25-26).

**O que acontece se o processo cair no meio de uma rodada?**
Documentado: o aviso se repete na próxima rodada (README.md:127), escolha feita porque perder o prazo custa mais do que repetir.

**Como você testou?**
Os relatórios citam Ruff e pytest no CI, sem texto explicativo. Cobertura e resultados: prepare sua resposta.

**O que você faria diferente?**
Documentado em parte: ampliar o escopo do RJ/R$ 250 mil (ROADMAP) e alinhar a documentação sobre o envio de e-mail. O resto: prepare sua resposta.

**O que foi seu e o que foi de ferramenta ou IA?**
Não documentado nos relatórios — prepare sua resposta.
