# Roteiro de entrevista: diario-glicemia

Observação: é um diário de saúde de uma criança, mantido pela família. Fale da técnica e das decisões, sem expor dados de saúde.

## Pitch de 30 segundos

O problema: registrar glicemia, refeições, insulina e hipoglicemias pelo celular, com vários cuidadores no mesmo diário, e levar histórico organizado às consultas médicas, sem sugerir tratamento (README.md:5, :12). Eu construí um site estático que fala direto com um Postgres (Supabase) da própria família, com a segurança nas regras de Row Level Security, funcionamento como PWA e importação do sensor por CSV.

## Decisões que um entrevistador pode perguntar

**P:** Por que o site não sugere metas nem doses?
**R:** Porque metas de glicemia, doses e decisões de tratamento seguem sempre as orientações da equipe médica responsável. O site registra e resume.
**Fonte:** diario-glicemia/README.md:12, :190 — "Metas de glicemia, doses e decisões de tratamento seguem sempre as orientações da equipe médica responsável."
**Custo admitido:** "Os dois primeiros dependem de metas que só a equipe médica define." Por isso não há faixa-alvo nem TIR (README.md:198).

**P:** Por que falar direto com o Supabase, sem servidor próprio?
**R:** Porque um servidor próprio seria mais uma coisa para manter e atualizar. MongoDB e SQLite foram descartados porque nenhum dos dois oferece acesso seguro direto do navegador sem uma API no meio. A segurança fica nas regras de Row Level Security.
**Fonte:** diario-glicemia/README.md:191 — "Um servidor próprio seria mais uma coisa para manter e atualizar."
**Custo admitido:** não documentado.

**P:** Por que sair do Artifact do Claude e usar um Supabase da família?
**R:** Para que os dados de saúde da criança fiquem num projeto da própria família, com login e regras de acesso próprias, sem depender de uma conta de terceiros.
**Fonte:** diario-glicemia/README.md:86; commit 81da7ed — "para que os dados de saúde da criança fiquem num projeto da própria família, com login e regras de acesso próprias, sem depender de uma conta de terceiros."
**Custo admitido:** não documentado. O README descreve a cópia de segurança como forma de trazer o histórico antigo (README.md:113).

**P:** Por que tabelas separadas, mas o site ainda vê "um dia" como um objeto?
**R:** Porque, com o formato do dia preservado, a troca de banco mexeu só em `site/supabase.js` e no início do `index.html`. Gravar e ler passa pelas funções `gravar_dia` e `ler_dias`.
**Fonte:** diario-glicemia/README.md:192; commit 5726312 — "com ele, a troca de banco mexeu só em `site/supabase.js` e no início do `index.html`."
**Custo admitido:** não documentado.

**P:** Por que não há fotos dos pratos?
**R:** Porque exigiam compressão, envio, limpeza das imagens órfãs e cópia em base64, e seriam a parte mais trabalhosa de levar o diário para outro banco. O texto de "O que comeu" e as etiquetas já cumprem o papel.
**Fonte:** diario-glicemia/README.md:193; commits fbf1920 e c382015 — "exigia compressão, envio, limpeza das imagens órfãs e cópia em base64, e seria a parte mais trabalhosa de levar o diário para outro banco"
**Custo admitido:** não documentado.

**P:** Por que o sensor é guardado como três listas paralelas?
**R:** Porque o banco não guarda listas dentro de listas. São listas de minuto, valor e tipo, por dia.
**Fonte:** diario-glicemia/README.md:147 — "porque o banco não guarda listas dentro de listas."
**Custo admitido:** não documentado.

**P:** Por que cada gravação envia só a linha alterada?
**R:** Para que duas pessoas registrando refeições diferentes no mesmo dia não apaguem o registro uma da outra.
**Fonte:** diario-glicemia/README.md:196 — "Assim, duas pessoas registrando refeições diferentes no mesmo dia não apagam o registro uma da outra."
**Custo admitido:** "Se duas pessoas editam *a mesma* refeição ao mesmo tempo, o site avisa do conflito; quem salvar por último, depois do aviso, vence." (README.md:196)

**P:** Por que importar o sensor por CSV e não por integração?
**R:** Porque o LibreView não tem uma API aberta para famílias, e o CSV é a exportação oficial. O leitor localiza as colunas pela posição, não pelo nome, para não depender da tradução.
**Fonte:** diario-glicemia/README.md:200 — "O LibreView não tem uma API aberta para famílias, e o CSV é a exportação oficial."
**Custo admitido:** não documentado.

**P:** Por que só o dono pode apagar todos os dados?
**R:** Porque um toque errado de um cuidador eventual não pode ter esse alcance. Cuidadores com edição veem a opção bloqueada.
**Fonte:** diario-glicemia commit 6249510 — "Um toque errado de um cuidador eventual não pode ter esse alcance."
**Custo admitido:** não documentado. (O commit 6249510 foi feito no modo compartilhado do Claude, com `user.isOwner()`; no Supabase o papel de dono está em README.md:100.)

**P:** O que o cache offline guarda?
**R:** Só a estrutura pública do site, e não as respostas de arquivos (as fotos dos pratos, `/_blob/...`), porque um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a "apagar os dados do diário".
**Fonte:** diario-glicemia commit 898c1be — "Um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a 'apagar os dados do diário'."
**Custo admitido:** não documentado para o modo Supabase; o commit 898c1be diz: "A navegação tenta a rede primeiro e só usa o cache sem internet."

## Decisões sem motivo registrado — prepare sua resposta

- Hospedagem no Cloudflare Workers, com deploy a cada push na main — commits 61ca929 e 455245b (o README cita Pages e Netlify como alternativas, README.md:112).
- Biblioteca jsPDF para gerar o PDF — README.md:67.
- Playwright para os testes de navegador — commit 7ffd6ac (o motivo de ter testes de navegador está escrito; a ferramenta, não).
- Planilha gerada com openpyxl em Python — README.md:167.
- Repositório que passou de privado para público — commit 707fe42.

## Perguntas difíceis prováveis

**Como você protege dados de saúde de uma criança?**
Documentado: projeto Supabase da própria família, com login e regras de acesso próprias (README.md:86), segurança por Row Level Security (README.md:191), só o dono apaga tudo (commit 6249510) e cache offline sem as respostas de arquivos do diário (commit 898c1be). Em `site/config.js` vão só a URL e a chave pública; "**Nunca** use a chave `service_role` ou `secret`" (README.md:111).

**O que acontece com edição simultânea?**
Documentado: o site avisa do conflito e quem salvar por último, depois do aviso, vence (README.md:196).

**O que o app não faz?**
Documentado: não sugere metas, doses nem tratamento (README.md:12), e não calcula faixa-alvo nem TIR (README.md:198).

**Como você testou?**
Documentado: 39 testes pgTAP das regras de acesso em `supabase/tests/acesso.test.sql` (commits 5726312 e 707fe42; README.md:191); testes de logic.js e do modo compartilhado com banco simulado, cobrindo conflito entre aparelhos, restauração e "apagar tudo" (commit 81da7ed); testes de navegador com Playwright (commit 7ffd6ac); plano de validação em VALIDACAO.md (README.md:3). Cobertura: prepare sua resposta.

**O que foi seu e o que foi de ferramenta ou IA?**
Documentado só que a primeira versão ficou num Artifact do Claude (README.md:86). A divisão do trabalho: prepare sua resposta.
