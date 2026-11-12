# Variável e constante
Pré-requisitos: nenhum

## Entender

Variável é uma etiqueta colada numa caixa. Na caixa fica um valor: um preço, um nome, um sim ou não. Quando o código usa a etiqueta, o computador abre a caixa e pega o valor.

Há três tipos de valor simples. Texto fica entre aspas: `"Marta"`. Número fica sem aspas: `18`. Verdadeiro ou falso são as palavras `true` e `false`, sem aspas. Atenção: `"18"` com aspas é texto, não número. O computador trata os dois de jeitos diferentes.

Dois jeitos de criar a etiqueta. `const` cola uma etiqueta que não pode ser colada em outra caixa depois. `let` cola uma etiqueta que pode ser trocada de caixa. Quando você lê `const`, entende "este nome não vai mudar". Quando lê `let`, entende "este valor vai mudar mais adiante".

Como ler: `const preco = 18;` é "guarde 18 na etiqueta preco". O `=` aqui não pergunta se são iguais. Ele manda guardar, da direita para a esquerda. Para perguntar se são iguais, o código usa `===`, que você vai ver nas próximas lições.

Um objeto é uma caixa com várias gavetas, cada gaveta com um nome. `produto.preco` lê-se "dentro de produto, o campo preco". O ponto quer dizer "dentro de".

Para ver o resultado, os exemplos usam `console.log(...)`, que mostra na tela o que está entre os parênteses.

## Exemplo mínimo

```js
const loja = "Papelaria Lima";
const aberta = true;
let estoque = 12;
estoque = 9;
const produto = { nome: "caderno", preco: 18 };
console.log(loja + ": " + produto.nome + " custa " + produto.preco);
console.log(estoque);
```

A linha 1 guarda o texto "Papelaria Lima" na etiqueta `loja`. A linha 2 guarda `true` (verdadeiro) em `aberta`; nada neste trecho usa essa etiqueta. A linha 3 guarda o número 12 em `estoque`, com `let`, porque ele vai mudar.

A linha 4 não compara nada: ela joga o 9 no lugar do 12. O 12 se perde. A linha 5 cria um objeto com dois campos, `nome` e `preco`.

A linha 6 mostra na tela `Papelaria Lima: caderno custa 18`. O `+` entre textos cola um no outro. A linha 7 mostra `9`.

## No meu projeto

Origem: thronfolge/src/cenario_936.js:3-9

```js
const GOVERNANTES_JOGAVEIS = {
  saxonia: "otto",
  francia: "eberhardo",
  baviera: "arnulfo",
  suabia: "hermano_suabia",
  lotaringia: "giselberto",
};
```

Este trecho é do meu jogo sobre a eleição do rei em 936. Ele cria a etiqueta `GOVERNANTES_JOGAVEIS` com `const` e guarda nela um objeto com cinco campos. Cada campo tem um nome (`saxonia`, `francia`...) e um valor em texto (`"otto"`, `"eberhardo"`...).

Em português: "dentro de GOVERNANTES_JOGAVEIS, o campo francia vale eberhardo". Os nomes em letras maiúsculas são só um costume para dizer "valor fixo do cenário". O `const` impede trocar o objeto inteiro por outro, mas não impede mudar um campo de dentro dele.

## Exercícios

### prever
Chefe: Qual governante o jogo usa para a Francia?

Este é o trecho do meu projeto, com uma linha a mais no fim.

```js
const GOVERNANTES_JOGAVEIS = {
  saxonia: "otto",
  francia: "eberhardo",
  baviera: "arnulfo",
  suabia: "hermano_suabia",
  lotaringia: "giselberto",
};
console.log(GOVERNANTES_JOGAVEIS.francia);
```

- [x] Aparece `eberhardo`, o valor desse campo.
  - Porque: `GOVERNANTES_JOGAVEIS.francia` lê "dentro de GOVERNANTES_JOGAVEIS, o campo francia", e o valor desse campo é `"eberhardo"`.
- [ ] Aparece `francia`, o nome do campo.
  - Atrai: o nome `francia` está escrito na linha 8, bem à vista.
  - Falta: o que vem depois do ponto é o nome da gaveta; o `console.log` mostra o que está dentro dela.
- [ ] Aparece `otto`, o primeiro valor.
  - Atrai: parece que pedir o objeto devolve o primeiro item da lista.
  - Falta: o ponto escolhe o campo pelo nome escrito depois dele, e não pela posição em que o campo aparece.
Aula: Olhe a linha 8. O ponto manda abrir o objeto e pegar o campo `francia`. Na linha 3, `francia: "eberhardo"` diz que esse campo guarda o texto `"eberhardo"`, e é esse texto que vai para a tela.

### prever
Chefe: Quantas unidades sobram no estoque no fim?

```js
let estoque = 10;
estoque = estoque - 3;
estoque = estoque - 2;
console.log(estoque);
```

- [x] Aparece `5`, com as duas baixas.
  - Porque: a linha 2 deixa 7 (10 menos 3) e a linha 3 parte desse 7 e deixa 5.
- [ ] Aparece `7`, só com a primeira baixa.
  - Atrai: parece que a segunda linha refaz a conta e cancela a anterior.
  - Falta: na linha 3, o `estoque` à direita do `=` já vale 7, o resultado da linha 2.
- [ ] Aparece `8`, só com a segunda baixa.
  - Atrai: parece que a segunda baixa parte do 10 original.
  - Falta: depois da linha 2, o 10 não existe mais; o `let` guardou outro valor no lugar.
Aula: Olhe as linhas 2 e 3. O `=` primeiro calcula o lado direito e depois guarda o resultado na etiqueta da esquerda. Por isso `estoque = estoque - 3` lê-se "pegue o estoque, tire 3 e guarde de volta no estoque".

### muda
Chefe: Se eu trocar o preço de 40 para "40" entre aspas, o que muda na tela?

O trecho original tinha `const preco = 40;` na linha 1 e mostrava `50`. O bloco abaixo já está com a troca feita.

```js
const preco = "40";
const frete = 10;
const total = preco + frete;
console.log(total);
```

- [x] Aparece `4010`, os dois juntos.
  - Porque: com aspas, `"40"` é texto; o `+` entre texto e número cola os dois em vez de somar.
- [ ] Aparece `50`, igual ao original.
  - Atrai: as aspas parecem só enfeite, e 40 continua parecendo 40.
  - Falta: aspas viram o valor em texto, e o `+` com texto cola em vez de somar.
- [ ] Aparece erro e nada vai à tela.
  - Atrai: parece que o computador não deixa misturar texto com número.
  - Falta: o JavaScript aceita a mistura sem reclamar e só muda o resultado.
Aula: Olhe a linha 1. As aspas mudam o tipo do valor de número para texto. Na linha 3, o `+` soma números, mas cola textos. Quando um dos lados é texto, ele cola, e `"40"` mais `10` vira `4010`.

### erro
Chefe: O comentário diz que o total mostra 180. Qual linha faz diferente?

```js
const preco = 200;
const desconto = 20;
// o total deve mostrar 180
let total = preco;
total = desconto;
console.log(total);
```

- [x] linha 5: `total = desconto;`
  - Porque: o `=` joga o 20 no lugar do 200, em vez de tirar 20 de 200; o trecho mostra `20`, não `180`.
- [ ] linha 4: `let total = preco;`
  - Atrai: é a linha que cria o total, então parece a dona do erro.
  - Falta: ela guarda 200, valor certo de partida; o erro vem depois, quando outra linha troca o 200.
- [ ] linha 2: `const desconto = 20;`
  - Atrai: o desconto aparece na conta, e 20 parece pouco.
  - Falta: o 20 está certo, pois 200 menos 20 dá 180; o problema é como a linha 5 o usa.
Aula: Olhe a linha 5. `total = desconto` não faz conta nenhuma: apenas guarda o valor de `desconto` na etiqueta `total`, apagando o 200. Para dar 180, a linha precisaria ser `total = preco - desconto`.

### onde
Chefe: Onde está guardado o valor do frete?

Na linha 3, `*` é o sinal de vezes.

```js
const cliente = "Marta";
const pedido = { item: "caneta", qtd: 4, frete: 12 };
const total = pedido.qtd * 3 + pedido.frete;
console.log(cliente + " paga " + total);
```

- [x] linha 2: `const pedido = { item`
  - Porque: o campo `frete: 12` está dentro do objeto criado na linha 2; é ali que o valor mora.
- [ ] linha 3: `const total = pedido.qtd * 3`
  - Atrai: a palavra `frete` aparece na linha 3, no fim da conta.
  - Falta: a linha 3 só lê o campo `pedido.frete` para a soma; ela não guarda o valor 12.
- [ ] linha 4: `console.log(cliente + " paga "`
  - Atrai: é a linha que mostra o total final, e o frete entra nele.
  - Falta: o `console.log` só mostra o `total`; ele não guarda nem define o frete.
Aula: Olhe a linha 2. O valor 12 está escrito uma única vez, no campo `frete` do objeto `pedido`. A linha 3 lê `pedido.frete`, "dentro de pedido, o campo frete". Trocar o 12 na linha 2 muda o total mostrado na linha 4.

## Explique com suas palavras

Pergunta: Quando você lê `const` ou `let` num código, o que isso te diz sobre aquele valor?
Modelo: `const` guarda um valor que o código não vai trocar, como o preço de tabela ou o nome do cliente. `let` guarda um valor que pode ser trocado depois, como o estoque que vai caindo. Nos dois, o `=` não compara: ele guarda o valor da direita na etiqueta da esquerda. Quando eu vejo `let`, sei que preciso procurar adiante a linha que muda aquele valor.
Pontos:
- `const` é um valor que não será trocado por outro
- `let` é um valor que pode ser trocado mais adiante
- o `=` guarda o valor da direita na etiqueta da esquerda, não compara

## Entrevista

Projeto: thronfolge
Pergunta: Como você decidiu a grafia dos nomes?
Resposta: Uso provisório: forma portuguesa quando há tradição em português e forma original quando não há. A convenção final é decisão minha e está em aberto.
Fonte: thronfolge/contexto.md:172, :183-190; commit 928f7f8; RECADOS.md:167-169 — "forma portuguesa quando há tradição em português" (uso provisório nos dados, listado em "Decisões em aberto"; a convenção é decisão do Vitor ainda não tomada)
Seguimento: E o que essa escolha custa?
Resposta do seguimento: Custa pouco: "Qualquer escolha só muda o campo `nome`; `nome_historico` fica igual" (contexto.md:190). Até a decisão, "nada muda" (RECADOS.md:169).

## Onde estudar

- free-programming-books/courses/free-courses-pt_BR.md L259
- developer-roadmap/roadmaps/javascript/content/all-about-variables@kvActjpU4FUJdrmuFoFEe.md
