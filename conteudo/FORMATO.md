# Formato de uma lição

Contrato entre quem escreve as lições e o gerador do jogo (`jogo/gerar-licoes.mjs`). Uma lição
é um arquivo `conteudo/temas/<NN-tema>/<NN-licao>.md`. A ordem dos arquivos é a ordem das
lições. O identificador da lição é `<NN-tema>/<NN-licao>` (sem `.md`).

O público é uma pessoa que nunca programou e quer **ler** código, não escrever. Toda pergunta
é feita na voz de quem cobra: chefe ou entrevistador.

## Regras de escrita do arquivo

- Seções com `## ` exatamente nos nomes abaixo e nesta ordem. Todas são obrigatórias.
- Texto comum vira parágrafo (linha em branco separa parágrafos). `crases` marcam código
  dentro do texto. Não usar negrito, itálico, tabelas, links nem HTML: o jogo mostra texto puro.
- Bloco de código: cerca de três crases com a linguagem (` ```js `). Dentro de um exercício há
  no máximo um bloco.
- Linhas `Rótulo: valor` usam exatamente os rótulos descritos aqui. O valor fica numa linha só.
- Nenhuma lição cita projeto de trabalho. O projeto de "No meu projeto" precisa estar em
  `jogo/projetos-publicos.json`.

## Seções

### `# <título>`

Primeira linha do arquivo. Em seguida, uma linha `Pré-requisitos:` com identificadores de
lições separados por vírgula, ou `nenhum`.

### `## Entender`

Parágrafos: o que é o conceito, uma analogia do dia a dia e **como ler** (o que cada símbolo
do conceito quer dizer em português). De 3 a 6 parágrafos curtos. Pode ter um bloco de código.

### `## Exemplo mínimo`

Um bloco de código curto (até 8 linhas), inventado, fora dos projetos, e parágrafos que leem o
bloco linha por linha.

### `## No meu projeto`

Uma linha `Origem: projeto/caminho/arquivo:linha-linha`, o bloco com o trecho real copiado sem
alteração, e parágrafos que leem o trecho em português. O que não foi ensinado ainda é
explicado em uma frase ou declarado como "pode ignorar por enquanto".

### `## Exercícios`

De 4 a 5 exercícios. Cada um começa com `### <tipo>`, onde o tipo é um destes:

| Tipo | O que pergunta |
|---|---|
| `prever` | o que o trecho devolve ou mostra com esta entrada |
| `onde` | qual linha responde à pergunta do chefe |
| `muda` | o que passa a acontecer se uma parte for trocada |
| `erro` | qual linha faz o trecho se comportar diferente do que o comentário promete |

Dentro do exercício, nesta ordem:

1. `Chefe: <pergunta na voz de quem cobra>`
2. Parágrafos de enunciado (opcional) e um bloco de código (obrigatório).
3. De 3 a 4 alternativas. A certa começa com `- [x] `, as erradas com `- [ ] `. Exatamente uma
   certa. Sob cada alternativa, linhas recuadas com dois espaços:
   - na certa: `  - Porque: <por que é esta>`
   - em cada errada: `  - Atrai: <por que essa opção parece certa>` e
     `  - Falta: <o que é preciso saber para descartá-la>`
4. `Aula: <mini-aula de 2 a 4 frases que aponta a linha e ensina o ponto>`

Regras dos exercícios:

- Os trechos são JavaScript curto (até 10 linhas), e cada exercício usa um trecho diferente.
  Pelo menos um exercício da lição usa o trecho de "No meu projeto" ou uma parte dele.
- A resposta precisa ser conferível rodando o trecho no Node. Nada de "depende".
- As alternativas têm tamanho parecido. A certa não pode ser a mais longa em mais de 1 dos
  exercícios da lição.
- Em `onde` e `erro`, as alternativas citam a linha copiando o começo dela entre crases
  (`linha 3: if (estado.encerrado)`).
- A ordem das alternativas no arquivo não importa: o jogo embaralha.

### `## Explique com suas palavras`

- `Pergunta: <pergunta aberta, na voz do chefe>`
- `Modelo: <resposta-modelo em 2 a 4 frases, sem jargão>`
- `Pontos:` seguido de exatamente 3 linhas `- <ponto que precisa aparecer na resposta>`

### `## Entrevista`

Pergunta de decisão de um projeto meu, ligada ao tema. Só entra o que tem fonte.

- `Projeto: <projeto>`
- `Pergunta: <pergunta do entrevistador>`
- `Resposta: <o motivo, como está documentado>`
- `Fonte: <arquivo:linha ou commit, com a citação entre aspas>`
- `Seguimento: <pergunta seguinte provável>`
- `Resposta do seguimento: <resposta documentada>` ou `não documentado: prepare sua resposta`

### `## Onde estudar`

De 1 a 3 linhas `- <referência>` (material em PT-BR primeiro).

## Exemplo completo (reduzido)

````
# Condicional: se isso, então aquilo
Pré-requisitos: 02-logica-basica/01-variavel

## Entender

Condicional é uma bifurcação: se a condição for verdadeira, o programa faz uma coisa.

Como ler: `if (x)` é "se x for verdade". `!` na frente é "não".

## Exemplo mínimo

```js
const idade = 16;
if (idade < 18) console.log("menor");
```

A linha 1 guarda 16 na etiqueta `idade`. A linha 2 pergunta se 16 é menor que 18; é, então mostra "menor".

## No meu projeto

Origem: thronfolge/src/simulacao.js:275-279

```js
export function validarAcao(estado, acao) {
  if (estado.encerrado) return { valida: false, motivo: "a escolha do rei já terminou" };
```

A função é um porteiro: se o jogo já acabou, ela recusa a ação e diz o motivo.

## Exercícios

### prever
Chefe: O cliente tem 70 anos. O que aparece na tela?

```js
const idade = 70;
if (idade >= 65) console.log("meia");
console.log("fim");
```

- [x] Aparece `meia` e depois `fim`.
  - Porque: 70 é maior ou igual a 65, então a linha 2 roda; a linha 3 roda sempre.
- [ ] Aparece só `meia`, sem o `fim`.
  - Atrai: parece que o `if` escolhe entre as duas linhas.
  - Falta: sem `else`, a linha de baixo não faz parte da escolha e roda sempre.
- [ ] Aparece só `fim`, sem o `meia`.
  - Atrai: dá para ler `>=` como "menor".
  - Falta: `>=` é "maior ou igual"; a boca aberta fica do lado do maior.
Aula: Olhe a linha 2. O `if` só controla o que vem logo depois dele, na mesma instrução. A linha 3 está fora do `if`, então roda em qualquer caso.

## Explique com suas palavras

Pergunta: O que o seu código faz quando o jogador age depois que o jogo acabou?
Modelo: A função que valida a ação confere primeiro se o jogo está encerrado. Se estiver, ela para ali e devolve que a ação não é válida, com o motivo escrito.
Pontos:
- a conferência acontece antes de qualquer mudança
- o `return` interrompe a função
- o motivo volta junto, para a tela poder mostrar

## Entrevista

Projeto: thronfolge
Pergunta: Por que no jogo a eleição pelos grandes é o que faz rei?
Resposta: Porque a eleição é o passo que faz rei, e a unção não era obrigatória.
Fonte: thronfolge/RECADOS.md:51-55 — "a eleição é o passo que faz rei; a unção não era obrigatória (Henrique I a recusou em 919)."
Seguimento: O que essa simplificação deixa de fora?
Resposta do seguimento: não documentado: prepare sua resposta

## Onde estudar

- free-programming-books/courses/free-courses-pt_BR.md L401
````
