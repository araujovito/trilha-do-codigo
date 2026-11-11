# Roteiro de entrevista: mesa-de-credito

## Pitch de 30 segundos

O problema: ensinar, com um jogo multiplayer, as consequências das decisões de crédito de uma financeira (concessão, provisão, atraso, venda de carteira). "Perder sem entender por quê não ensina nada." (README.md:3; commit 2f1061d). Eu construí o jogo com um motor de regras único e puro, usado pela API, pelo banco e pelo simulador, com o estado da partida em JSONB alterado só pelo motor sob bloqueio de linha. As regras foram calibradas por simulação com robôs, e parte dos parâmetros vem de normas do Banco Central (capital mínimo de 17%, provisão por estágios: docs/FUNDAMENTOS.md, commit 662bce4) e de 3 séries do SGS; os demais são hipóteses, e o documento separa um do outro (FUNDAMENTOS.md:3).

## Decisões que um entrevistador pode perguntar

**P:** Por que um único motor de regras?
**R:** Porque em produção só o caminho PostgreSQL rodava, e as regras e os testes do motor em memória não protegiam a partida real. Removi os dois caminhos anteriores (`game` e `finance.Portfolio`). O motor é puro, sem HTTP, banco ou relógio.
**Fonte:** mesa-de-credito/docs/AUDITORIA_FASE_1A.md:20, :51-52; commit cbeffd3 — "Em produção só o caminho PostgreSQL rodava. As regras e os testes do motor em memória não protegiam a partida real."
**Custo admitido:** não documentado para o motor único; a decisão do estado em JSONB sob bloqueio admite: "A custo de serializar comandos por partida, o que é irrelevante para 2 a 4 jogadores." (AUDITORIA_FASE_1A.md:52).

**P:** Por que READ COMMITTED com bloqueio da linha do participante?
**R:** Porque um teste real de concorrência levou a essa escolha.
**Fonte:** mesa-de-credito/docs/ROTEIRO_V1.md:160 — "um teste real de concorrência levou à escolha de `READ COMMITTED` com bloqueio da linha do participante."
**Custo admitido:** não documentado. A auditoria registra que não houve teste matando o processo ou o banco (AUDITORIA_FASE_1A.md:59).

**P:** Por que a semente é gerada no servidor e o empate é sorteado pela semente?
**R:** Porque, com o desempate pelo menor id, o empate ia sempre para o menor id, em 30 de 30 salas. A semente escolhida por quem criava a sala também foi descartada.
**Fonte:** mesa-de-credito/docs/AUDITORIA_FASE_1A.md:30-31; commit cbeffd3 — "Empate sempre para o menor id: 30 de 30 salas"
**Custo admitido:** não documentado.

**P:** Por que o principal do contrato é o valor que o cliente aceitou e não o menor total oferecido?
**R:** Porque uma oferta de R$ 0,01 ganhava o cliente, já que vence o menor total. Foi um defeito de severidade A na auditoria.
**Fonte:** mesa-de-credito/docs/AUDITORIA_FASE_1A.md:28 (defeito 1) — "Oferta de R$ 0,01 ganhava o cliente, porque vence o menor total"
**Custo admitido:** não documentado.

**P:** Por que os robôs só compram contratos de pessoas?
**R:** Porque, com robôs comprando uns dos outros, houve cerca de 26 vendas por partida.
**Fonte:** mesa-de-credito/docs/RELATORIO_EQUILIBRIO.md:67; commit 589feeb — "Com robôs comprando uns dos outros, houve cerca de 26 vendas por partida; por isso eles compram só de pessoas."
**Custo admitido:** "Os parâmetros de `Market` em `sim/bots.go` são hipóteses. Nenhuma pessoa jogou contra eles." (RELATORIO_EQUILIBRIO.md:66)

**P:** Por que o limite de empréstimo é 30% do capital regulatório por cliente?
**R:** O limite por cliente entrou como 30% do patrimônio porque um único contrato podia quase igualar o capital; 25% foi descartado porque ficar parado passava a vencer 24% das mesas (commit b1ab499). Na v4 a base passou a ser o capital regulatório (REGRAS_V4.md:14), sem motivo próprio escrito.
**Fonte:** mesa-de-credito commit b1ab499; docs/REGRAS_V4.md (tabela, linha "Limite por cliente") — "Um único contrato podia quase igualar o capital."
**Custo admitido:** "o de `menor-taxa` segue perto de -80%: esses prejuízos vêm de acumular contratos ruins, não de um contrato só." (commit b1ab499)

**P:** Como funciona o piso de preço na venda de contratos entre jogadores?
**R:** O piso do anúncio é o preço que o fundo paga (80% do saldo em dia, 45% em atraso), conferido de novo a cada mês. Antes o piso era 40% do saldo, e anunciar abaixo disso só servia para passar valor a quem compra.
**Fonte:** mesa-de-credito commit 12925fc — "anunciar abaixo disso só servia para passar valor a quem compra"
**Custo admitido:** "A transferência diminui, mas não acaba: dentro da faixa, um preço ainda pode favorecer um amigo, nos dois sentidos." (commit 12925fc)

**P:** Por que as regras v4 com capital regulatório e provisão por estágios?
**R:** Porque, na v3, ficar parado competia com emprestar, já que faltava o que torna o crédito rentável na prática: alavancagem com limite de capital. A v4 usa capital mínimo de 17% dos ativos ponderados pelo risco e provisão por estágios, seguindo normas do Banco Central simplificadas.
**Fonte:** mesa-de-credito commit 662bce4; docs/REGRAS_V4.md; docs/FUNDAMENTOS.md — "ficar parado competia com emprestar, porque faltava o que torna o crédito rentável na prática: alavancagem com limite de capital."
**Custo admitido:** "A provisão não muda o patrimônio final, porque todo contrato termina liquidado." (REGRAS_V4.md). Vários parâmetros são hipóteses (commit 662bce4).

**P:** Por que não modelar tributos?
**R:** Porque as fontes consultadas divergem sobre a CSLL de financeiras em 2026 e sobre a vigência da norma.
**Fonte:** mesa-de-credito/docs/FUNDAMENTOS.md:60 — "porque as fontes consultadas divergem sobre a CSLL de financeiras em 2026 e sobre a vigência da norma."
**Custo admitido:** "Com tributos, as margens cairiam." (FUNDAMENTOS.md:60)

**P:** Por que só três séries do Banco Central como dado externo?
**R:** Para a pesquisa de fontes não ter duração aberta. O restante é marcado como sintético.
**Fonte:** mesa-de-credito/docs/ROTEIRO.md:316; docs/FONTES_E_PARAMETROS.md:3 — "para a pesquisa de fontes não ter duração aberta"
**Custo admitido:** "todos os parâmetros, exceto a taxa básica, são sintéticos" (docs/SESSOES.md, sessão de 03/11/2026).

## Decisões sem motivo registrado — prepare sua resposta

- Classificação final pelo patrimônio final — docs/REGRAS_V4.md.
- Robôs veem apenas o que o anúncio mostra — commit 589feeb.
- Tokens guardados só como hash e comandos idempotentes por `command_id` — README.md:80.
- Trabalhador de `cmd/api` que fecha rodadas vencidas a cada segundo — docs/SESSOES.md:124 (o intervalo de 1 s não tem motivo).
- Go, PostgreSQL, React e Vite como stack — README.md:9.

## Perguntas difíceis prováveis

**Alguém jogou? O jogo está equilibrado de verdade?**
Documentado: nenhuma pessoa jogou contra os robôs (RELATORIO_EQUILIBRIO.md:66); em 03/11/2026, antes das regras v4, todos os parâmetros exceto a taxa básica eram sintéticos (SESSOES.md:146); a v4 trouxe capital e provisão de normas do BCB/CMN (FUNDAMENTOS.md).

**Como você testou concorrência e falhas?**
Documentado: um teste real de concorrência levou ao READ COMMITTED com bloqueio de linha (ROTEIRO_V1.md:160); não houve teste matando o processo ou o banco (AUDITORIA_FASE_1A.md:59).

**O que a auditoria encontrou?**
Documentado: defeitos como a oferta de R$ 0,01 que ganhava o cliente e o empate sempre para o menor id, em 30 de 30 salas (AUDITORIA_FASE_1A.md:28-31).

**O que ainda tem brecha?**
Documentado: dentro da faixa de preço, um preço ainda pode favorecer um amigo, nos dois sentidos (commit 12925fc); o `menor-taxa` segue perto de -80% (commit b1ab499).

**O que foi seu e o que foi de ferramenta ou IA?**
Não documentado nos relatórios — prepare sua resposta.
