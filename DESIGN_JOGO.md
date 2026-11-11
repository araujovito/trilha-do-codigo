# Trilha do Código: design do jogo

Jogo original para treinar o Vitor para entrevistas de emprego: o código real dos projetos dele serve de base para explicar as decisões. Material vem de `inventario/TRILHA.md` (29 paradas e um apêndice "Depois") e de `inventario/entrevista/*.md` (19 roteiros). Tudo passa por `jogo/gerar-dados.mjs`, então o texto pode mudar sem mexer no código do jogo.

## Ciclo principal

1. **Mapa de paradas.** Lista/trilha das 29 paradas, cada uma bloqueada, disponível ou concluída (com estrelas).
2. **Entrar numa parada** e passar por três etapas:
   - **Entender:** a explicação em linguagem simples.
   - **Olhar:** o trecho real, com o nome do projeto e o arquivo (`projeto/arquivo:linhas`).
   - **Entrevistador pergunta:** balão com o projeto e a pergunta de entrevista; múltipla escolha com retorno imediato. Pode tentar de novo. Estrelas: 3 se acertar de primeira, 2 na segunda, 1 depois disso.
3. **Recompensa:** ao acertar aparecem a "Fonte do motivo", o "Seguimento provável" (com botão "Ver como responder") e "Onde estudar".
4. **Próxima parada** é liberada.

## Regras

- Uma parada só libera quando todos os pré-requisitos estão concluídos. A parada 1 começa livre.
- O apêndice "Depois" aparece bloqueado até as 29 paradas estarem concluídas.
- O progresso fica no `localStorage` do navegador; se ele falhar, o jogo funciona, só não lembra. "Recomeçar" apaga tudo, com confirmação.

## Tela "Modo entrevista"

Botão no topo. O jogador escolhe um dos 19 projetos, lê o pitch de 30 segundos e percorre as decisões uma a uma: vê a pergunta, responde em voz alta, clica em "Revelar resposta" (resposta, fonte e custo admitido) e se avalia em "Sei explicar / Mais ou menos / Não sei". A autoavaliação fica no `localStorage` (chave própria, separada das estrelas). Ao final: contagem, lista dos "Não sei", "Sem motivo registrado — prepare sua resposta" e "Perguntas difíceis". Projetos de trabalho mostram, no topo, o aviso de não citar clientes, valores ou dados internos.

## Tela "Seus projetos"

Para cada projeto, mostra paradas concluídas e quantas decisões já foram marcadas "Sei explicar".

## Próximas mecânicas (não implementadas)

- **Prever a saída:** mostra o trecho e pede o que ele imprime ou devolve, usando o mesmo código da parada.
- **Completar a lacuna:** o mesmo trecho com uma palavra ou valor escondido; o jogador escolhe ou digita o que falta.
- **Achar o erro:** o trecho com uma alteração pequena (nome trocado, sinal invertido) e o jogador aponta a linha errada.
- **Revisão espaçada:** paradas concluídas voltam depois de dias com a pergunta original ou uma variação, e o intervalo cresce a cada acerto.

## Lacunas (conceitos sem parada)

Por falta de trecho conferido, a TRILHA.md não cobre: Pipeline de dados, TypeScript (tipos e interfaces), Docker e contêineres, Integração contínua, Modelagem em camadas com SQL (dbt), Observabilidade, Chamada a modelo de IA com saída estruturada, PWA e service worker, Git e versionamento, Subprocesso e automação de programas externos, Proteção de APIs (só o CORS aparece, na parada 26) e Cálculos de negócio.

## Versão pública e versão completa

`inventario/TRILHA.md` e parte das fichas citam projetos que não são públicos e ficam fora do Git. O gerador escreve dois arquivos: `jogo/dados.js`, só com os projetos de `jogo/projetos-publicos.json` (20 paradas, 10 roteiros), e `jogo/dados.local.js`, com tudo (29 paradas, 19 roteiros), que só existe na máquina do autor. A página carrega os dois; se o segundo não existir, vale o primeiro. Os números "29" e "19" deste documento são os da versão completa.

## Para onde o jogo vai

Este documento descreve o jogo como ele está: um quiz. O plano para trocar o "tente de novo" por um ciclo em que o erro vira aula, organizar o conteúdo por temas e acrescentar exercícios ativos está em `ROTEIRO.md`.
