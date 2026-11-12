# Condicional: se isso, então aquilo
Pré-requisitos: 02-logica-basica/01-variavel

## Entender

Até aqui o código foi uma lista de passos, lidos de cima para baixo, todos executados. Condicional é a bifurcação: o programa olha uma pergunta de sim ou não e escolhe o caminho. É como a porta de um prédio: se o crachá for válido, a porta abre; se não for, continua fechada.

A pergunta fica entre parênteses e a resposta é verdadeiro ou falso, os valores que você já viu; um valor que não existe conta como falso. Como ler: `if (x)` é "se x for verdade". `else` é "senão", o caminho para quando a pergunta deu falso. `else if` é "senão, se", uma segunda pergunta que só é feita quando a primeira deu falso.

As perguntas mais comuns comparam dois valores. `===` é "é igual a" e `!==` é "é diferente de". `<` é "menor que", `>` é "maior que", `<=` é "menor ou igual" e `>=` é "maior ou igual". Cuidado: um `=` sozinho guarda um valor numa etiqueta; para comparar, são três.

Para juntar perguntas: `!` na frente é "não" e inverte a resposta. `&&` é "e": só dá verdadeiro se as duas forem verdadeiras. `||` é "ou": basta uma ser verdadeira.

Duas regras de leitura valem muito. Primeira: os `if` e `else if` são testados de cima para baixo, e o primeiro que der verdadeiro vence; os de baixo nem são olhados, então a ordem muda o resultado. Segunda: `return` dentro de um `if` é "pare aqui e devolva este valor". Quando ele roda, nada abaixo é lido. Isso é muito usado como porteiro, no começo do código.

## Exemplo mínimo

```js
const saldo = 40;
const preco = 55;
if (saldo >= preco) {
  console.log("compra feita");
} else {
  console.log("saldo insuficiente");
}
```

As linhas 1 e 2 guardam 40 em `saldo` e 55 em `preco`. A linha 3 pergunta: 40 é maior ou igual a 55? Não, então a resposta é falso. As chaves `{ }` delimitam o bloco de cada caminho. O bloco da linha 4 é pulado e roda o bloco depois do `else`, na linha 6. Na tela aparece `saldo insuficiente`.

## No meu projeto

Origem: thronfolge/src/simulacao.js:186-193

```js
function aceitaMudarApoio(estado, apoiadorId, pretendenteId) {
  if (estado.ultima_mudanca_apoio[apoiadorId] === estado.turno) return false;
  const pontuacaoNova = pontuacaoParaApoio(estado, apoiadorId, pretendenteId);
  const apoioAtual = estado.apoios[apoiadorId];
  if (!apoioAtual || apoioAtual === apoiadorId) return pontuacaoNova >= 70;
  if (apoioAtual === pretendenteId) return true;
  return pontuacaoNova >= pontuacaoParaApoio(estado, apoiadorId, apoioAtual) + 15;
}
```

Este trecho é de um jogo meu, em que grandes do reino apoiam um candidato a rei. A linha 1 diz que isto é uma função: um bloco de instruções com nome; a lição de função, a quarta deste tema, explica. Ela recebe três informações e responde `true` (sim, aceita trocar de apoio) ou `false` (não aceita).

A linha 2 é o porteiro. Cada turno do jogo é um mês. Ela vê se o turno da última troca deste apoiador é igual ao turno atual (os colchetes pegam o item guardado sob o nome do apoiador). Se for, devolve `false` na hora e as linhas de baixo nem são lidas: ninguém troca duas vezes no mesmo turno.

A linha 3 pega uma pontuação, que mede o quanto o novo candidato agrada a este apoiador; como a conta é feita pode ignorar por enquanto. A linha 4 guarda quem ele apoia hoje.

A linha 5 junta duas perguntas com `||`: `!apoioAtual` é "não tem apoio atual", e a segunda é "apoia a si mesmo". Se qualquer uma for verdade, ele aceita quando a pontuação nova for pelo menos 70. A linha 6 diz que, se já apoia o candidato proposto, devolve `true`. A linha 7 é o caso que sobra: ele apoia outra pessoa, e só troca se a pontuação nova superar a da pessoa atual em 15 pontos ou mais.

## Exercícios

### prever
Chefe: O grande A apoia o B hoje e recebe a proposta do C no turno 5. Ele troca?

Considere esta situação: o turno atual é 5; A fez sua última troca no turno 3; a pontuação do C para A é 80 e a do B para A é 70.

```js
function aceitaMudarApoio(estado, apoiadorId, pretendenteId) {
  if (estado.ultima_mudanca_apoio[apoiadorId] === estado.turno) return false;
  const pontuacaoNova = pontuacaoParaApoio(estado, apoiadorId, pretendenteId);
  const apoioAtual = estado.apoios[apoiadorId];
  if (!apoioAtual || apoioAtual === apoiadorId) return pontuacaoNova >= 70;
  if (apoioAtual === pretendenteId) return true;
  return pontuacaoNova >= pontuacaoParaApoio(estado, apoiadorId, apoioAtual) + 15;
}
```

- [x] Não troca: 80 não chega a 70 mais 15.
  - Porque: a linha 2 não barra (3 é diferente de 5), a 5 e a 6 não valem, e na linha 7 o teste é 80 >= 85, que é falso.
- [ ] Troca: 80 é maior que os 70 de B.
  - Atrai: comparar só os dois números parece suficiente.
  - Falta: a linha 7 soma 15 ao valor de quem já é apoiado antes de comparar.
- [ ] Não troca: A já mudou neste turno.
  - Atrai: a linha 2 tem cara de bloqueio, e ela existe mesmo.
  - Falta: ela só bloqueia se os dois números forem iguais, e aqui são 3 e 5.
Aula: Olhe a linha 7. Quem já apoia alguém só troca se o novo valer 15 pontos a mais, não apenas mais. A linha 2 só barra quando a última troca foi no turno atual, o que não é o caso.

### onde
Chefe: Onde está a regra do desconto para cliente VIP?

```js
function precoFinal(valor, cliente) {
  let preco = valor;
  if (cliente.vip) preco = valor * 0.9;
  if (valor > 500) preco = preco - 50;
  if (preco < 0) preco = 0;
  return preco;
}
```

- [x] `linha 3: if (cliente.vip)`
  - Porque: é o único `if` que olha o campo `vip`, e o corpo dele aplica 10% de desconto.
- [ ] `linha 4: if (valor > 500)`
  - Atrai: também tira dinheiro do preço, então parece desconto.
  - Falta: ela olha o valor da compra, não o cliente; vale para qualquer um.
- [ ] `linha 2: let preco = valor`
  - Atrai: é onde o preço nasce, e parece a regra inicial.
  - Falta: ela só guarda o valor cheio, sem nenhuma pergunta.
Aula: A regra de um grupo de clientes aparece como um `if` sobre o campo que identifica o grupo, aqui a linha 3. A linha 4 é outra regra, de compra grande. Para achar uma regra, procure o `if` cuja pergunta usa o nome do que o chefe citou.

### muda
Chefe: Se eu trocar `<` por `<=`, o que muda com estoque 20 e mínimo 20?

```js
const estoque = 20;
const minimo = 20;
if (estoque < minimo) {
  console.log("comprar");
} else {
  console.log("ok");
}
```

- [x] Passa a mostrar `comprar`, não `ok`.
  - Porque: com `<=` o teste 20 <= 20 é verdadeiro, então roda o primeiro bloco.
- [ ] Continua mostrando só `ok`, nada muda.
  - Atrai: com números iguais, parece que a diferença some.
  - Falta: `<=` inclui o caso de igualdade, e `<` o exclui.
- [ ] Mostra `comprar` e depois `ok`, os dois.
  - Atrai: o teste ficou verdadeiro e o `ok` ainda está no código.
  - Falta: o `else` só roda quando o `if` dá falso; nunca os dois.
Aula: Na linha 3, `<` deixa o igual de fora e `<=` o inclui. Isso decide o que acontece justo no limite, onde os erros de regra costumam aparecer. O `else` da linha 5 é o plano B, e nunca roda junto com o primeiro bloco.

### erro
Chefe: O comentário diz 30% a partir de 1000, mas com 1500 a tela mostra 10. Qual linha põe esse 10?

```js
// Dá 30% a partir de 1000, 10% a partir de 100.
const valor = 1500;
let desconto = 0;
if (valor >= 100) desconto = 10;
else if (valor >= 1000) desconto = 30;
console.log(desconto);
```

- [x] `linha 4: if (valor >= 100)`
  - Porque: 1500 passa em 100 primeiro, então o `else if` não é testado e o resultado é 10, não 30.
- [ ] `linha 5: else if (valor >= 1000)`
  - Atrai: é a linha que trata de 1000, então parece a culpada.
  - Falta: um `else if` só é lido quando o `if` de cima deu falso, e aqui não deu.
- [ ] `linha 3: let desconto = 0;`
  - Atrai: o 0 inicial parece segurar o desconto em zero.
  - Falta: a linha 4 troca esse 0 por 10 antes de a tela mostrar.
Aula: A ordem importa. Como 1500 também é maior que 100, a linha 4 vence e a 5 fica de fora. O certo é testar o maior limite primeiro, 1000, e o de 100 depois.

### prever
Chefe: A Ana é só leitora, mas é dona do documento. O que a função devolve?

A linha 6 usa a função: o primeiro par de chaves entra no lugar de `usuario` e o segundo no lugar de `doc`.

```js
function podeEditar(usuario, doc) {
  if (!usuario.ativo) return "bloqueado";
  if (usuario.perfil === "admin" || doc.dono === usuario.nome) return "edita";
  return "so le";
}
console.log(podeEditar({ nome: "Ana", perfil: "leitor", ativo: true }, { dono: "Ana" }));
```

- [x] Devolve `edita`, porque Ana é a dona.
  - Porque: na linha 2, `ativo` é `true`, então `!` dá falso e não bloqueia; na linha 3 o `||` basta uma ser verdade, e a segunda é.
- [ ] Devolve `so le`, porque é leitora.
  - Atrai: o perfil dela é "leitor", e parece decidir tudo.
  - Falta: com `||`, uma só condição verdadeira já basta para entrar no `if`.
- [ ] Devolve `bloqueado`, porque há um `!`.
  - Atrai: o `!` parece sinal de proibição.
  - Falta: `!` é "não"; "não ativo" só é verdade quando `ativo` é falso.
Aula: Leia a linha 2 como "se o usuário não está ativo, pare e devolva bloqueado". Como Ana está ativa, segue. Na linha 3, o `||` é "ou", e `doc.dono === usuario.nome` é verdadeiro, então o `return` roda e a linha 4 nunca é lida.

## Explique com suas palavras

Pergunta: Como o código do seu jogo decide se um grande aceita trocar de apoio?
Modelo: Primeiro o código confere se ele já trocou neste turno; se sim, para ali e responde que não. Depois olha a situação: sem apoio, aceita com pontuação 70 ou mais; se já apoia o candidato, aceita; se apoia outro, só troca quando a pontuação nova passa a atual em 15 pontos.
Pontos:
- a primeira conferência é o limite de uma troca por turno, e o `return` para tudo
- sem apoio atual, basta a pontuação nova chegar a 70
- quem apoia outro candidato só troca com 15 pontos de vantagem

## Entrevista

Projeto: thronfolge
Pergunta: Por que limitar a troca de apoio a uma por mês?
Resposta: Porque, na revisão das campanhas simuladas, um grande trocava de lado várias vezes no mesmo mês sem custo. Agora cada personagem muda de apoio no máximo uma vez por mês, e abandonar um apoio exige vantagem de 15 pontos sobre o pretendente atual.
Fonte: thronfolge commit 201ae5f — "Na revisão de 1452cf4, um grande trocava de lado várias vezes no mesmo mês sem custo [...] Agora cada personagem muda de apoio no máximo uma vez por mês, e abandonar um apoio exige vantagem de 15 pontos sobre o pretendente atual."
Seguimento: E o que essa escolha custa?
Resposta do seguimento: não documentado: prepare sua resposta

## Onde estudar

- free-programming-books/courses/free-courses-pt_BR.md L259
- developer-roadmap/roadmaps/javascript/content/conditional-statements@ttCsd2_H2SuRivCjGv1OX.md
