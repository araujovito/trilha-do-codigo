# Função: uma receita com nome
Pré-requisitos: 02-logica-basica/03-laco

## Entender

Função é uma receita com nome. Escrever a receita no caderno não faz o bolo: só guarda os passos. O bolo sai quando alguém diz "faça o bolo de cenoura". No código é igual: definir a função só guarda a receita, e chamar a função, pelo nome, executa.

Como ler a definição: `function frete(peso, zona) { ... }` quer dizer "existe uma receita chamada `frete`, que usa dois ingredientes, `peso` e `zona`". Os ingredientes se chamam parâmetros. Nada dentro das chaves roda nesse momento.

Como ler a chamada: `frete(2, "norte")` quer dizer "faça a receita `frete` com 2 no lugar de `peso` e "norte" no lugar de `zona`". A ordem importa: o primeiro valor vai para o primeiro parâmetro, o segundo para o segundo.

`return` é o prato pronto que a função entrega a quem chamou. Também é onde ela para: o que vier depois do `return` não roda. Função sem `return` não entrega nada; quem chamou recebe `undefined`, que quer dizer "nada".

Existe uma forma curta, chamada de seta: `(x) => x * 2` quer dizer "receba x e entregue x vezes 2". Quando a seta não tem chaves, o resultado já é entregue, sem escrever `return`.

Para seguir uma chamada, faça três passos: ache a definição, troque cada parâmetro pelo valor da chamada e leia de cima para baixo até o `return`.

## Exemplo mínimo

```js
function saudacao(nome) {
  return "Olá, " + nome;
}
const texto = saudacao("Ana");
console.log(texto);
```

As linhas 1 a 3 só guardam a receita `saudacao`; nada é executado ainda. A linha 4 chama a função com "Ana": o parâmetro `nome` passa a valer "Ana". Dentro da função, a linha 2 monta o texto "Olá, Ana" e o `return` entrega esse texto. A etiqueta `texto` guarda o que foi entregue, e a linha 5 mostra "Olá, Ana".

## No meu projeto

Origem: thronfolge/src/simulacao.js:151-155

```js
export function pontuacaoParaApoio(estado, apoiadorId, pretendenteId) {
  const relacao = relacaoCom(estado, apoiadorId, pretendenteId);
  const percepcao = percepcaoDe(estado, apoiadorId, pretendenteId);
  return percepcao.legitimidade + relacao.confianca - relacao.rancor;
}
```

Esta é a receita que calcula quantos pontos um nobre dá de apoio a um pretendente ao trono. Ela usa três ingredientes: `estado` (o jogo inteiro naquele momento), `apoiadorId` (quem apoia) e `pretendenteId` (quem pode ser apoiado).

A linha 1 define a função. `export` quer dizer só que outros arquivos podem usar essa função. As linhas 2 e 3 chamam duas outras funções, `relacaoCom` e `percepcaoDe`, e guardam o que elas entregam em `relacao` e `percepcao`. Como funcionam por dentro, pode ignorar por enquanto.

A linha 4 é o `return`: entrega a legitimidade percebida, mais a confiança, menos o rancor. A função só calcula e entrega um número; não muda o `estado`.

## Exercícios

### prever
Chefe: Neste caso o nobre tem legitimidade percebida 3, confiança 5 e rancor 2. Quanto a função entrega?

```js
function pontuacaoParaApoio(estado, apoiadorId, pretendenteId) {
  const relacao = relacaoCom(estado, apoiadorId, pretendenteId);
  const percepcao = percepcaoDe(estado, apoiadorId, pretendenteId);
  return percepcao.legitimidade + relacao.confianca - relacao.rancor;
}
```

- [x] Entrega 6, e o rancor é subtraído.
  - Porque: 3 + 5 - 2 dá 6; o sinal de menos na frente de `relacao.rancor` tira o rancor.
- [ ] Entrega 10, somando os três números.
  - Atrai: parece que uma pontuação junta tudo que aparece nela.
  - Falta: ler o sinal antes de cada nome; o último é `-`, e não `+`.
- [ ] Entrega 8, ignorando o rancor.
  - Atrai: parece que só entram os dois números bons.
  - Falta: o rancor aparece no `return`, com sinal de menos, e por isso entra na conta.
Aula: Olhe a linha 4, o `return`. A função troca cada nome pelo número dado e faz a conta: 3 + 5 é 8, e 8 - 2 é 6. Nada fica de fora do que está no `return`.

### prever
Chefe: Quando eu rodo este arquivo, o que aparece na tela, e em que ordem?

```js
function avisar(nome) {
  console.log("Olá, " + nome);
}
console.log("começo");
avisar("Ana");
```

- [x] Aparece `começo` e depois `Olá, Ana`.
  - Porque: as linhas 1 a 3 só guardam a receita; a linha 4 roda primeiro e a linha 5 chama a função.
- [ ] Aparece `Olá, Ana` e depois `começo`.
  - Atrai: a função está escrita primeiro, e parece que roda primeiro.
  - Falta: definir só guarda a receita; quem executa é a chamada na linha 5.
- [ ] Aparece `Olá, undefined` e depois `começo`.
  - Atrai: o nome não parece ter sido dado quando a função é escrita.
  - Falta: o valor entra no parâmetro na hora da chamada, e a chamada passa "Ana".
Aula: Olhe as linhas 1 a 3: são a definição, e nenhuma delas roda sozinha. A linha 4 mostra `começo`. Só a linha 5 chama `avisar`, e então `nome` vira "Ana" e a linha 2 mostra `Olá, Ana`.

### erro
Chefe: O comentário diz que o sócio paga 90. Qual linha faz o resultado ser outro?

```js
// Devolve o preço com 10% de desconto se for sócio.
function precoFinal(preco, socio) {
  return preco;
  if (socio) return preco * 0.9;
}
console.log(precoFinal(100, true));
```

- [x] linha 3: `return preco;`, que entrega 100 e para.
  - Porque: o `return` entrega o preço cheio e a função termina; a linha 4 nunca roda.
- [ ] linha 4: `if (socio) return`, que testa errado.
  - Atrai: o desconto está nessa linha, e parece que o erro mora nela.
  - Falta: a linha 4 está certa, mas está depois de um `return`, e por isso nunca é lida.
- [ ] linha 6: `console.log(precoFinal(`, que passa o valor.
  - Atrai: parece que a chamada com 100 e true foi mal escrita.
  - Falta: a chamada está certa; o resultado já está decidido dentro da função.
Aula: Olhe a linha 3. Ao chegar num `return`, a função entrega o valor e para ali mesmo. Tudo que vem depois, como a linha 4, é código que nunca roda. Para o desconto valer, o `return preco;` teria de vir depois do `if`.

### muda
Chefe: Se eu chamar com os valores trocados, desconto(10, 200), o que volta?

Lembrete de conta: como na escola, `*` (vezes) e `/` (dividido) são feitos antes de `+` e `-`.

```js
function desconto(preco, percentual) {
  return preco - preco * percentual / 100;
}
console.log(desconto(200, 10));
```

- [x] Volta -10, pois 10 vira o preço.
  - Porque: o primeiro valor vai para `preco` e o segundo para `percentual`: 10 - 10 * 200 / 100 dá -10.
- [ ] Volta 180, o mesmo valor de antes.
  - Atrai: parece que a função adivinha qual número é o preço.
  - Falta: a função não adivinha nada; o valor entra no parâmetro pela posição.
- [ ] Dá erro e o programa para de rodar.
  - Atrai: parece que valores fora de ordem deveriam ser recusados.
  - Falta: a função aceita quaisquer números, na ordem em que vierem, sem reclamar.
Aula: Olhe a chamada na linha 4. Os valores entram nos parâmetros pela posição: o primeiro em `preco`, o segundo em `percentual`. Trocando a ordem, a conta roda normalmente e entrega um resultado errado, sem aviso.

### onde
Chefe: Onde a função entrega o valor do frete para quem a chamou?

Na linha 3, `? 15 : 5` é um "se" curto: se a zona for "norte", a taxa é 15; senão, é 5.

```js
function frete(peso, zona) {
  const base = peso * 4;
  const taxa = zona === "norte" ? 15 : 5;
  return base + taxa;
}
console.log(frete(2, "norte"));
```

- [x] linha 4: `return base + taxa;`
  - Porque: o `return` é a linha que entrega o resultado, e aqui ele soma a base à taxa.
- [ ] linha 2: `const base = peso * 4;`
  - Atrai: tem a conta do peso, e parece ser a conta do frete.
  - Falta: guardar um valor numa etiqueta não o entrega; só o `return` entrega.
- [ ] linha 3: `const taxa = zona === "norte"`
  - Atrai: tem o número 15, que parece o valor final.
  - Falta: a taxa é só um ingrediente; quem chamou recebe o que está no `return`.
Aula: Olhe a linha 4. Para saber o que a função entrega, procure o `return`. As linhas 2 e 3 preparam números, e a linha 4 os junta e entrega: 2 * 4 dá 8, a taxa do norte é 15, e o frete é 23.

## Explique com suas palavras

Pergunta: Quando você lê uma função, como descobre o que ela entrega para quem a chamou?
Modelo: Uma função é uma receita: definir só guarda os passos e chamar é que executa, com os valores passados no lugar dos parâmetros. O `return` entrega o resultado e encerra a função; sem ele, quem chamou recebe `undefined`, que quer dizer nada. Por isso, para saber o que ela faz, leio a definição e procuro o `return`.
Pontos:
- definir guarda a receita e chamar executa
- o valor da chamada entra no lugar do parâmetro
- o `return` entrega o resultado e para a função

## Entrevista

Projeto: thronfolge
Pergunta: Por que o protótipo é feito em JavaScript puro, sem um motor de jogo como o Godot?
Resposta: Porque o ambiente já tinha Node e não tinha Godot, e um mapa político que quase não se mexe não justifica instalar um motor de jogo antes de validar o núcleo da simulação.
Fonte: thronfolge/contexto.md:101-102 — "o ambiente atual já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo."
Seguimento: E se o jogo crescer?
Resposta do seguimento: "A escolha vale para o protótipo, não impede empacotamento ou migração futura" (contexto.md:103).

## Onde estudar

- free-programming-books/courses/free-courses-pt_BR.md L259 (Curso em Vídeo, JavaScript para iniciantes)
- developer-roadmap/roadmaps/javascript/content/functions@k8bJH9qydZm8I9rhH7rXw.md
