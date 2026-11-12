# Laço: repetir para cada item
Pré-requisitos: 02-logica-basica/02-condicional

## Entender

Laço é uma instrução que repete um pedaço do código, uma vez para cada item de uma lista. É a pilha de pedidos na mesa: você pega um, faz a mesma conta, põe de lado e pega o próximo, até a pilha acabar.

Uma lista, em JavaScript, são valores separados por vírgula entre colchetes: `[30, 50, 20]` é uma lista com três números. Cada valor é um item. Para pegar um item pela posição, escreve-se `lista[0]`, e a contagem começa em zero: `lista[0]` é o primeiro, `lista[1]` é o segundo. `lista.length` é quantos itens a lista tem.

Como ler: `for (const item of lista) { ... }` é "para cada item da lista, faça o que está entre as chaves". Em cada volta, `item` vale um valor diferente da lista, do primeiro ao último. O que está entre as chaves roda uma vez por volta.

O laço quase sempre vem com um acumulador: uma variável criada com `let` antes do laço, que vai mudando a cada volta. `let total = 0;` é "começo a conta em zero"; `total += valor;` é "some o valor ao total". Se o acumulador não começar no número certo, todo o resultado sai errado.

Existe outra forma, mais antiga: `for (let i = 0; i < n; i++)`. Lê-se: "comece com `i` em 0; enquanto `i` for menor que `n`, repita; ao fim de cada volta, some 1 em `i`". O `i++` quer dizer "some 1". Quem usa essa forma pega os itens por posição, com `lista[i]`.

Duas dicas de leitura. `.filter(...)` e `.map(...)` também são laços disfarçados: `.filter` "passa por todos e fica só com os que passam no teste", e `.map` "passa por todos e transforma cada um em outra coisa". E `break` dentro de um laço quer dizer "pare de repetir agora".

## Exemplo mínimo

```js
const lista = ["a", "b", "c"];
let n = 0;
for (const item of lista) {
  n = n + 1;
}
console.log(n);
```

A linha 1 cria uma lista com três itens. A linha 2 cria o acumulador `n`, que começa em 0. A linha 3 diz "para cada item da lista"; a linha 4 roda três vezes, e em cada volta soma 1 em `n`: 0 vira 1, depois 2, depois 3. A linha 6 mostra o valor final, `3`, depois que o laço terminou. Aqui o laço só conta quantos itens a lista tem.

## No meu projeto

Origem: thronfolge/src/simulacao.js:455-460

```js
  if (!estado.eleito && estado.apoios) {
    const vencedor = estado.personagens
      .map((pessoa) => ({ pessoa, total: apoiosDe(estado, pessoa.id).length }))
      .filter((item) => item.total >= 3)
      .sort((a, b) => b.total - a.total || a.pessoa.id.localeCompare(b.pessoa.id))[0];
    if (vencedor) {
```

Este trecho é do jogo Thronfolge, que simula a escolha do rei em 936. Não tem `for`, mas faz o mesmo trabalho com laços disfarçados. A linha 1 diz: se ainda não há rei eleito e existe o registro de quem apoia quem, siga em frente.

A linha 2 cria `vencedor`, e a conta começa em `estado.personagens`, a lista de todas as pessoas do jogo. A linha 3, o `.map`, passa por todas as pessoas e transforma cada uma num pacote com duas coisas: a pessoa e o total de apoios que ela recebeu. O `(pessoa) => ...` significa "para cada pessoa, faça isto"; função por enquanto é só isso. A linha 4, o `.filter`, passa por todos os pacotes e fica só com os que têm `total` de 3 ou mais.

A linha 5, o `.sort`, ordena os que sobraram do maior total para o menor, e o `[0]` pega o primeiro da fila. Pode ignorar por enquanto como o desempate por `id` funciona. Se ninguém chegou a 3 apoios, `vencedor` fica vazio, e a linha 6 pergunta se há vencedor.

## Exercícios

### prever
Chefe: Os pedidos do dia foram 30, 50 e 20. Qual total aparece no relatório?

```js
const pedidos = [30, 50, 20];
let total = 0;
for (const valor of pedidos) {
  total += valor;
}
console.log(total);
```

- [x] Aparece `100`, a soma dos três pedidos do dia.
  - Porque: `total` começa em 0 e, volta por volta, vira 30, depois 80, depois 100.
- [ ] Aparece `20`, só o último pedido.
  - Atrai: o `valor` da última volta é 20, e é o que sobra na mão.
  - Falta: `+=` soma ao que já havia em `total`; não troca o valor antigo pelo novo.
- [ ] Aparece `130`, com o 30 contado 2 vezes.
  - Atrai: dá a impressão de que o primeiro item entra já no `let`.
  - Falta: o `let total = 0` começa em zero; cada item entra só na sua volta.
Aula: Olhe a linha 4, `total += valor;`, que roda uma vez por item. Volta 1: 0 + 30 = 30. Volta 2: 30 + 50 = 80. Volta 3: 80 + 20 = 100. Só depois do laço a linha 6 mostra o resultado.

### prever
Chefe: Quantos pedidos atrasados o painel mostra? Os dias de atraso foram 0, 5, 2 e 9.

```js
const dias = [0, 5, 2, 9];
let atrasados = 0;
for (const d of dias) {
  if (d > 3) atrasados++;
}
console.log(atrasados);
```

- [x] Aparece `2`, os com mais de 3 dias.
  - Porque: só o 5 e o 9 passam em `d > 3`; o 0 e o 2 não somam nada.
- [ ] Aparece `4`, todos os pedidos da lista.
  - Atrai: o laço passa por todos os itens, então parece contar todos.
  - Falta: o `if` dentro do laço decide, a cada volta, se `atrasados++` roda ou não.
- [ ] Aparece `16`, a soma de todos os dias.
  - Atrai: o laço de soma do exemplo anterior deixa o hábito de somar o valor.
  - Falta: `atrasados++` soma 1, não o valor de `d`; ele conta pedidos, não dias.
Aula: Na linha 4, o `if` só deixa `atrasados++` rodar quando `d` é maior que 3. Volta por volta: d=0 não conta (0), d=5 conta (1), d=2 não conta (1), d=9 conta (2). O laço visita os 4 itens, mas o contador só sobe em 2.

### erro
Chefe: O comentário diz que o código acha a maior venda, mas o painel mostra 20. Qual linha faz diferente do que o comentário promete?

```js
// Acha o maior valor entre as vendas.
const vendas = [40, 90, 70, 20];
let maior = 0;
for (const v of vendas) {
  maior = v;
}
console.log(maior);
```

- [x] `linha 5: maior = v;` troca o maior por todo valor que vem
  - Porque: sem um `if`, a linha 5 troca `maior` em toda volta, e sobra o último valor.
- [ ] `linha 3: let maior = 0;` começa a conta no zero errado
  - Atrai: o zero parece ser o motivo de o resultado não ser o maior.
  - Falta: com vendas positivas, começar em 0 serve; o problema é a troca sem teste.
- [ ] `linha 4: for (const v of vendas) {` passa por poucos itens
  - Atrai: o resultado 20 faz pensar que o laço parou antes do fim.
  - Falta: o laço passa pelos 4 itens; ele só sobrescreve `maior` 4 vezes.
Aula: A linha 5 é a culpada. Volta por volta, `maior` vira 40, depois 90, depois 70, depois 20, e o último valor fica. Para achar o maior, a troca só deveria acontecer quando `v` for maior que `maior`, algo como `if (v > maior) maior = v;`, e com isso o resultado seria 90.

### muda
Chefe: Se eu trocar `<` por `<=` na linha 3, o que muda no resultado?

```js
const votos = [4, 7, 3];
let soma = 0;
for (let i = 0; i < votos.length; i++) {
  soma += votos[i];
}
console.log(soma);
```

- [x] Aparece `NaN`, ou seja, não é número.
  - Porque: com `<=`, há uma volta a mais, com `votos[3]`, que não existe e dá "indefinido".
- [ ] Aparece `14`, igual ao de antes da troca.
  - Atrai: uma volta a mais parece somar só um item vazio.
  - Falta: somar um item que não existe estraga a conta, e o resultado não é número.
- [ ] O programa para com erro na última volta.
  - Atrai: ler uma posição que não existe soa como coisa proibida.
  - Falta: JavaScript não trava ao ler posição vazia; devolve `undefined` e segue.
Aula: A lista tem 3 itens, nas posições 0, 1 e 2, e `votos.length` vale 3. Com `<`, `i` vai de 0 a 2 e soma 4 + 7 + 3 = 14. Com `<=`, `i` chega a 3, e `votos[3]` é `undefined`; 14 + `undefined` dá `NaN`.

### onde
Chefe: Onde o código decide quais pessoas ficam na disputa? Entram três pessoas, com 1, 3 e 2 apoios.

O trecho foi cortado no meio: as chaves abertas nas linhas 1 e 6 fecham mais adiante no arquivo.

```js
if (!estado.eleito && estado.apoios) {
  const vencedor = estado.personagens
    .map((pessoa) => ({ pessoa, total: apoiosDe(estado, pessoa.id).length }))
    .filter((item) => item.total >= 3)
    .sort((a, b) => b.total - a.total || a.pessoa.id.localeCompare(b.pessoa.id))[0];
  if (vencedor) {
```

- [x] `linha 4: .filter((item) => item.total >= 3)` deixa quem tem 3 ou mais
  - Porque: o `.filter` descarta quem não passa no teste; sobra só a pessoa com 3 apoios.
- [ ] `linha 3: .map((pessoa) => ({ pessoa, total:` fica só com quem tem apoio
  - Atrai: ela é a linha que fala de `total`, o número de apoios.
  - Falta: o `.map` só transforma; continua tendo uma saída para cada entrada, 3 e 3.
- [ ] `linha 5: .sort((a, b) => b.total - a.total` tira quem tem menos apoios
  - Atrai: ordenar do maior para o menor parece cortar quem fica no fim.
  - Falta: o `.sort` só muda a ordem; ninguém sai da lista por causa dele.
Aula: A linha 3 conta os apoios de cada pessoa e gera 3 pacotes, com totais 1, 3 e 2. A linha 4 é a regra: o `.filter` passa por todos e só deixa o de total 3, e os outros dois caem fora ali. A linha 5 ordena o que sobrou, e o `[0]` pega o primeiro.

## Explique com suas palavras

Pergunta: O código passa por uma lista de pedidos e mostra um total no fim. Como você explica para mim o que acontece a cada volta?
Modelo: O código cria uma variável que começa em zero e vai guardando a conta. Ele passa por cada pedido da lista, um de cada vez, e em cada volta faz a mesma coisa: soma o valor do pedido ao que já estava guardado. Quando a lista acaba, o laço termina e o total final aparece.
Pontos:
- a variável da conta começa em um valor inicial, como zero
- o mesmo passo se repete uma vez para cada item da lista
- o resultado só vale depois que o laço termina

## Entrevista

Projeto: thronfolge
Pergunta: Por que "três de cinco" grandes para eleger o rei, sem falar em voto?
Resposta: Porque as fontes de 936 buscam consenso e não contam votos; o precedente mais próximo é 919. A interface não fala em voto nem em maioria.
Fonte: thronfolge/RECADOS.md:56-57 — "as fontes buscam consenso e não contam votos. O precedente mais próximo é 919"; commit 0bf8ba5 — "as fontes de 936 buscam consenso e não contam votos, e por isso a interface não fala em voto nem em maioria."
Seguimento: E o que essa escolha custa?
Resposta do seguimento: É uma "simplificação declarada" (contexto.md:64-65); quem não aderiu "permanece como pendência de reconhecimento para sistemas futuros" (contexto.md:65-66).

## Onde estudar

- free-programming-books/courses/free-courses-pt_BR.md L259
- developer-roadmap/roadmaps/javascript/content/forof-loop@FBz6h_AmTJBXoBN-a38a5.md
