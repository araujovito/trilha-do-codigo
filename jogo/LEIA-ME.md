# Trilha do Código (protótipo)

Jogo para treinar entrevistas de emprego: explica, com trechos reais dos seus projetos, as decisões que um entrevistador pode perguntar. Sem instalação, sem internet.

## Como abrir

Dê dois cliques em `index.html` (ou arraste para o navegador). Funciona direto do disco (`file://`).

## Como regenerar os dados

As paradas vêm de `../inventario/TRILHA.md` e os roteiros de `../inventario/entrevista/*.md`. Depois de mudar esse arquivo, rode dentro desta pasta:

```
node gerar-dados.mjs
```

Isso reescreve `dados.js`. Precisa de Node 22; não instala nada.

## Como regenerar as lições

As lições são arquivos em `../conteudo/temas/<NN-tema>/<NN-licao>.md`, no formato descrito em `../conteudo/FORMATO.md`. Depois de mudar um deles, rode dentro desta pasta:

```
node gerar-licoes.mjs
```

Isso reescreve `licoes.js`. Se o formato estiver errado, o gerador para e diz o arquivo, a seção e o que faltou. Sem nenhuma lição, `licoes.js` fica como `window.LICOES = { temas: [] };` e o jogo abre no Mapa, como antes. Dá para apontar outra pasta: `node gerar-licoes.mjs <pasta-de-temas> <arquivo-de-saida>`.

## Como rodar o teste

```
node --test
```

(`test.mjs` apenas importa `teste-dados.mjs` e `teste-licoes.mjs`, para o `node --test` achá-los sozinho.) O teste confere 29 paradas (3 alternativas, 1 correta, código, fonte do motivo, seguimento, pré-requisitos) e 19 entrevistas (pitch, decisões com pergunta, resposta e fonte). `teste-licoes.mjs` confere o analisador de lições (lê o exemplo de `FORMATO.md` e recusa os erros de formato), as lições reais de `licoes.js` (quantidade de exercícios e alternativas, pré-requisitos, projetos públicos, certa mais longa em no máximo 1 exercício) e as regras puras das aulas (embaralhar, estrelas, revisão em 1, 3 e 7 dias).

## Mapa do código

| Arquivo | O que faz |
|---|---|
| `index.html` | Esqueleto da página: título, botões e a área onde o jogo desenha. Carrega os outros arquivos. |
| `estilo.css` | Aparência. As cores ficam no topo, em variáveis; o tema escuro troca só esses valores. |
| `dados.js` | As paradas em formato de dados. É gerado, não edite à mão. |
| `jogo.js` | A lógica: regras de liberação, telas (mapa, parada, seus projetos), estrelas e salvamento. Leia de cima para baixo: dados, regras, ajudas, telas, início. |
| `licoes.js` | As lições em formato de dados (`window.LICOES`). É gerado, não edite à mão. |
| `regras-aulas.js` | Regras puras das aulas (embaralhar, próxima variante, estrelas, fila de revisão). Sem tela e sem `localStorage`; o teste importa este arquivo. |
| `aulas.js` | A tela "Aulas": lista, os 5 passos de uma lição, revisão de hoje e salvamento. Usa as ajudas de `jogo.js`. |
| `gerar-licoes.mjs` | Lê `conteudo/temas`, confere o formato e escreve `licoes.js`. Exporta `analisarLicao(texto, id)`. |
| `teste-licoes.mjs` | Testes do analisador, das lições e das regras das aulas. |
| `gerar-dados.mjs` | Lê `TRILHA.md` e escreve `dados.js`. |
| `teste-dados.mjs` | Confere se `dados.js` está coerente. |
| `test.mjs` | Atalho de uma linha que faz `node --test` encontrar o teste. |

## Telas

- Aulas (primeiro botão; é a tela inicial quando existe lição): lista de temas e lições, cada uma bloqueada (falta pré-requisito), livre ou concluída com estrelas, e o painel "Revisão de hoje: N". Uma lição tem 5 passos: Entender, Ver (exemplo mínimo e "No meu projeto"), Ler (um exercício por vez, na voz do chefe, código com linhas numeradas, alternativas embaralhadas e o botão "Não sei, me explica"), Explicar (texto livre salvo no navegador, comparado com um modelo e 3 pontos) e Entrevista. Errar ou pedir explicação mostra por que a opção atrai, o que faltou saber e a aula, e abre outro exercício da lição; a lição entra na fila de revisão (1, 3 e 7 dias). Estrelas: 3 se acertou o primeiro exercício visto, 2 o segundo, 1 depois. Sem `licoes.js` ou com `temas` vazio, o botão fica escondido e o jogo abre no Mapa.
- Mapa: cada parada tem 3 etapas; a última é o "Entrevistador pergunta" (pergunta, fonte do motivo e seguimento provável).
- Modo entrevista: escolha um projeto, leia o pitch, revele a resposta de cada decisão e se avalie (Sei explicar / Mais ou menos / Não sei). No fim: contagem, lista dos "Não sei", decisões sem motivo registrado e perguntas difíceis. Projetos de trabalho mostram o aviso de sigilo.
- Seus projetos: paradas concluídas e decisões "Sei explicar" por projeto.

Progresso: salvo no `localStorage` do navegador. "Recomeçar" apaga.

A autoavaliação fica em outra chave do mesmo `localStorage`, e o progresso das aulas (concluídas, fila de revisão e textos do passo "Explicar") em uma terceira (`trilha-do-codigo-aulas-v1`); "Recomeçar" apaga as três.

## Dados públicos e dados completos

`gerar-dados.mjs` escreve `dados.js` só com os projetos listados em `projetos-publicos.json`. Na máquina do autor ele também escreve `dados.local.js`, com todos os projetos; esse arquivo está no `.gitignore`. O `index.html` carrega os dois: quando `dados.local.js` não existe, o navegador registra um aviso de arquivo não encontrado no console e o jogo segue com `dados.js`.
