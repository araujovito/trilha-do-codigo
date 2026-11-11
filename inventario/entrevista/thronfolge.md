# Roteiro de entrevista: thronfolge

## Pitch de 30 segundos

O problema: um jogo de estratégia política em mapa, a partir da morte de Henrique I em 936, em que a sucessão vira uma simulação em que personagens têm conhecimento parcial e memórias, e a história real só inicializa a partida (README.md:3-7; contexto.md:8-11). O protótipo é HTML, CSS e JavaScript sem bibliotecas externas nem motor de jogo, com a simulação separada da interface e testada com `node --test`. As decisões dos agentes são determinísticas, sem IA generativa na primeira versão.

## Decisões que um entrevistador pode perguntar

**P:** Por que HTML e JavaScript puros e não um motor de jogo como o Godot?
**R:** Porque o ambiente já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo.
**Fonte:** thronfolge/contexto.md:98-102 — "o ambiente atual já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo."
**Custo admitido:** não documentado como custo; contexto.md:103 limita a escolha ao protótipo ("não impede empacotamento ou migração futura").

**P:** Por que a simulação é separada da interface?
**R:** A simulação não depende da interface e é testada pelo executor nativo do Node.js; o ambiente já tem Node, não tem Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo.
**Fonte:** thronfolge/contexto.md:99-102 — "o ambiente atual já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo."
**Custo admitido:** não documentado.

**P:** Por que sem IA generativa?
**R:** Porque o projeto prioriza baixo custo de desenvolvimento e de execução. As decisões dos agentes são determinísticas (utilidade e regras). Só avaliaria um modelo local depois de um protótipo jogável.
**Fonte:** thronfolge/README.md:9-11; contexto.md:63, :91 — "O projeto prioriza baixo custo de desenvolvimento e de execução."
**Custo admitido:** não documentado. Condição de revisão: avaliar modelo local "apenas se ele melhorar decisões ou diálogos de maneira mensurável" (contexto.md:92-94).

**P:** Por que "três de cinco" grandes para eleger o rei, sem falar em voto?
**R:** Porque as fontes de 936 buscam consenso e não contam votos; o precedente mais próximo é 919. A interface não fala em voto nem em maioria.
**Fonte:** thronfolge/RECADOS.md:56-58; commit 0bf8ba5 — "as fontes buscam consenso e não contam votos. O precedente mais próximo é 919"
**Custo admitido:** "simplificação declarada" (contexto.md:64-65); quem não aderiu "permanece como pendência de reconhecimento para sistemas futuros" (contexto.md:65-66).

**P:** Por que a eleição é o que faz rei, e a unção não é condição?
**R:** Porque a eleição é o passo que faz rei, e a unção não era obrigatória (Henrique I a recusou em 919).
**Fonte:** thronfolge/RECADOS.md:51-55 — "a eleição é o passo que faz rei; a unção não era obrigatória (Henrique I a recusou em 919)."
**Custo admitido:** não documentado.

**P:** Por que Siegfried não é um sexto apoio?
**R:** Porque incluir Siegfried agora quebraria o recorte testado de cinco poderes. A Saxônia é representada por Otto.
**Fonte:** thronfolge/contexto.md:72-74 — "incluir Siegfried agora quebraria o recorte testado de cinco poderes."
**Custo admitido:** "Otto representar o poder saxão é uma simplificação declarada" (contexto.md:73).

**P:** Por que a campanha começa em 2 de julho de 936 e a história só inicializa o jogo?
**R:** Porque a história serve somente para inicializar a campanha; depois do início a cronologia histórica deixa de ser obrigatória.
**Fonte:** thronfolge/contexto.md:21-22; RECADOS.md:308-309 — "A história serve somente para inicializar a campanha."
**Custo admitido:** "a simulação pode divergir completamente da cronologia real" (contexto.md:22).

**P:** Como você decidiu a grafia dos nomes?
**R:** Uso provisório: forma portuguesa quando há tradição em português e forma original quando não há. A convenção final é decisão minha e está em aberto.
**Fonte:** thronfolge/contexto.md:172, :183-190; commit 928f7f8; RECADOS.md:167-169 — "forma portuguesa quando há tradição em português" (uso provisório nos dados, listado em "Decisões em aberto"; a convenção é decisão do Vitor ainda não tomada)
**Custo admitido:** Otto ou Otão e Eberhardo ou Eberardo ficam em aberto; "até lá nada muda" (RECADOS.md:167-169).

**P:** Por que os recursos de 936 estão em faixas?
**R:** Proposta do Claude, ainda em aberto (não é decisão confirmada): faixas, porque as fontes de 955 e 981 só dão escala.
**Fonte:** thronfolge/contexto.md:172, :177-181; RECADOS.md:183-184 — registrada em "Decisões em aberto" como "Proposta do Claude": "porque as fontes de 955 e 981 só dão escala"
**Custo admitido:** "As duas fontes são posteriores a 936: dão escala, não valores." (RECADOS.md:184)

**P:** Por que limitar a troca de apoio a uma por mês?
**R:** Porque um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador. Agora abandonar um apoio exige vantagem de 15 pontos e pedidos ao jogador ficam pendentes até aceite ou recusa.
**Fonte:** thronfolge commit 201ae5f; commit 1452cf4 — "um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador."
**Custo admitido:** não documentado.

**P:** Por que o relatório final só conta acontecimentos registrados?
**R:** Para que nada seja inventado para fechar a história; a causa vem das memórias de quem decidiu.
**Fonte:** thronfolge commit 43468e4 — "para que nada seja inventado para fechar a história"
**Custo admitido:** "Campanhas sem acontecimentos suficientes recebem relatório curto, sem fatos inventados" (RECADOS.md, resolução de 2026-10-04, linhas 199-205).

**P:** Por que os textos ficam num JSON separado?
**R:** Para o Codex integrar sem que os textos e o código mudem no mesmo commit.
**Fonte:** thronfolge commit ce5e7b2 — "Fica num JSON para o Codex integrar sem que os textos e o código mudem no mesmo commit."
**Custo admitido:** não documentado.

## Decisões sem motivo registrado — prepare sua resposta

- Poder e legitimidade separados; poder calculado de territórios, ouro e soldados — contexto.md:75-83; plano_de_acao.md:26.
- O motor valida toda ação e o LLM nunca altera o estado — contexto.md:61-62.
- Mapa 2D, estratégico e relativamente estático; tempo discreto — contexto.md:55-56.
- Campanha de até 24 meses e três apoios para terminar — contexto.md:70-71; plano_de_acao.md:12-13.
- Claude não altera código executável; Codex implementa — CLAUDE.md:19; contexto.md:89-125.

## Perguntas difíceis prováveis

**Quanto do jogo é história e quanto é invenção?**
Documentado: a história só inicializa a campanha e a simulação pode divergir completamente da cronologia real (contexto.md:21-22). Simplificações declaradas: "três de cinco", Otto representando a Saxônia, recursos em faixas.

**Por que não usar IA nos agentes?**
Documentado: baixo custo de desenvolvimento e de execução, e avaliação de modelo local só se melhorar decisões ou diálogos de maneira mensurável (contexto.md:92-94).

**O que foi seu e o que foi de ferramenta ou IA?**
Documentado como divisão de papéis: Claude não altera código executável, e o Codex implementa (CLAUDE.md:19; contexto.md:89-125), sem motivo escrito. O papel documentado do Vitor: visão, prioridades, escopo, aprovação de premissa e tecnologia, e a palavra final entre fidelidade histórica e jogabilidade (contexto.md:107-114). A grafia dos nomes ainda é decisão em aberto (contexto.md:172, :183-190). O restante: prepare sua resposta.

**Como você testou?**
Documentado: a simulação é validada com `node --test` (README.md:25-26). Cobertura e resultados: prepare sua resposta.

**O que você faria diferente?**
Documentado em parte: Otto/Otão e Eberhardo/Eberardo em aberto (RECADOS.md:167-169) e o reconhecimento de quem não aderiu, pendente para sistemas futuros (contexto.md:65-66). O resto: prepare sua resposta.
