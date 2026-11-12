// Gerado por gerar-licoes.mjs a partir de ../conteudo/temas. Não edite à mão.
window.LICOES = {
 "temas": [
  {
   "id": "02-logica-basica",
   "nome": "Lógica básica",
   "licoes": [
    {
     "id": "02-logica-basica/01-variavel",
     "titulo": "Variável e constante",
     "prereqs": [],
     "entender": [
      {
       "t": "p",
       "texto": "Variável é uma etiqueta colada numa caixa. Na caixa fica um valor: um preço, um nome, um sim ou não. Quando o código usa a etiqueta, o computador abre a caixa e pega o valor."
      },
      {
       "t": "p",
       "texto": "Há três tipos de valor simples. Texto fica entre aspas: `\"Marta\"`. Número fica sem aspas: `18`. Verdadeiro ou falso são as palavras `true` e `false`, sem aspas. Atenção: `\"18\"` com aspas é texto, não número. O computador trata os dois de jeitos diferentes."
      },
      {
       "t": "p",
       "texto": "Dois jeitos de criar a etiqueta. `const` cola uma etiqueta que não pode ser colada em outra caixa depois. `let` cola uma etiqueta que pode ser trocada de caixa. Quando você lê `const`, entende \"este nome não vai mudar\". Quando lê `let`, entende \"este valor vai mudar mais adiante\"."
      },
      {
       "t": "p",
       "texto": "Como ler: `const preco = 18;` é \"guarde 18 na etiqueta preco\". O `=` aqui não pergunta se são iguais. Ele manda guardar, da direita para a esquerda. Para perguntar se são iguais, o código usa `===`, que você vai ver nas próximas lições."
      },
      {
       "t": "p",
       "texto": "Um objeto é uma caixa com várias gavetas, cada gaveta com um nome. `produto.preco` lê-se \"dentro de produto, o campo preco\". O ponto quer dizer \"dentro de\"."
      },
      {
       "t": "p",
       "texto": "Para ver o resultado, os exemplos usam `console.log(...)`, que mostra na tela o que está entre os parênteses."
      }
     ],
     "exemplo": [
      {
       "t": "code",
       "lang": "js",
       "codigo": "const loja = \"Papelaria Lima\";\nconst aberta = true;\nlet estoque = 12;\nestoque = 9;\nconst produto = { nome: \"caderno\", preco: 18 };\nconsole.log(loja + \": \" + produto.nome + \" custa \" + produto.preco);\nconsole.log(estoque);"
      },
      {
       "t": "p",
       "texto": "A linha 1 guarda o texto \"Papelaria Lima\" na etiqueta `loja`. A linha 2 guarda `true` (verdadeiro) em `aberta`; nada neste trecho usa essa etiqueta. A linha 3 guarda o número 12 em `estoque`, com `let`, porque ele vai mudar."
      },
      {
       "t": "p",
       "texto": "A linha 4 não compara nada: ela joga o 9 no lugar do 12. O 12 se perde. A linha 5 cria um objeto com dois campos, `nome` e `preco`."
      },
      {
       "t": "p",
       "texto": "A linha 6 mostra na tela `Papelaria Lima: caderno custa 18`. O `+` entre textos cola um no outro. A linha 7 mostra `9`."
      }
     ],
     "projeto": {
      "origem": "thronfolge/src/cenario_936.js:3-9",
      "projeto": "thronfolge",
      "blocos": [
       {
        "t": "code",
        "lang": "js",
        "codigo": "const GOVERNANTES_JOGAVEIS = {\n  saxonia: \"otto\",\n  francia: \"eberhardo\",\n  baviera: \"arnulfo\",\n  suabia: \"hermano_suabia\",\n  lotaringia: \"giselberto\",\n};"
       },
       {
        "t": "p",
        "texto": "Este trecho é do meu jogo sobre a eleição do rei em 936. Ele cria a etiqueta `GOVERNANTES_JOGAVEIS` com `const` e guarda nela um objeto com cinco campos. Cada campo tem um nome (`saxonia`, `francia`...) e um valor em texto (`\"otto\"`, `\"eberhardo\"`...)."
       },
       {
        "t": "p",
        "texto": "Em português: \"dentro de GOVERNANTES_JOGAVEIS, o campo francia vale eberhardo\". Os nomes em letras maiúsculas são só um costume para dizer \"valor fixo do cenário\". O `const` impede trocar o objeto inteiro por outro, mas não impede mudar um campo de dentro dele."
       }
      ]
     },
     "exercicios": [
      {
       "tipo": "prever",
       "chefe": "Qual governante o jogo usa para a Francia?",
       "blocos": [
        {
         "t": "p",
         "texto": "Este é o trecho do meu projeto, com uma linha a mais no fim."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "const GOVERNANTES_JOGAVEIS = {\n  saxonia: \"otto\",\n  francia: \"eberhardo\",\n  baviera: \"arnulfo\",\n  suabia: \"hermano_suabia\",\n  lotaringia: \"giselberto\",\n};\nconsole.log(GOVERNANTES_JOGAVEIS.francia);"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `eberhardo`, o valor desse campo.",
         "correta": true,
         "porque": "`GOVERNANTES_JOGAVEIS.francia` lê \"dentro de GOVERNANTES_JOGAVEIS, o campo francia\", e o valor desse campo é `\"eberhardo\"`.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `francia`, o nome do campo.",
         "correta": false,
         "porque": "",
         "atrai": "o nome `francia` está escrito na linha 8, bem à vista.",
         "falta": "o que vem depois do ponto é o nome da gaveta; o `console.log` mostra o que está dentro dela."
        },
        {
         "texto": "Aparece `otto`, o primeiro valor.",
         "correta": false,
         "porque": "",
         "atrai": "parece que pedir o objeto devolve o primeiro item da lista.",
         "falta": "o ponto escolhe o campo pelo nome escrito depois dele, e não pela posição em que o campo aparece."
        }
       ],
       "aula": "Olhe a linha 8. O ponto manda abrir o objeto e pegar o campo `francia`. Na linha 3, `francia: \"eberhardo\"` diz que esse campo guarda o texto `\"eberhardo\"`, e é esse texto que vai para a tela."
      },
      {
       "tipo": "prever",
       "chefe": "Quantas unidades sobram no estoque no fim?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "let estoque = 10;\nestoque = estoque - 3;\nestoque = estoque - 2;\nconsole.log(estoque);"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `5`, com as duas baixas.",
         "correta": true,
         "porque": "a linha 2 deixa 7 (10 menos 3) e a linha 3 parte desse 7 e deixa 5.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `7`, só com a primeira baixa.",
         "correta": false,
         "porque": "",
         "atrai": "parece que a segunda linha refaz a conta e cancela a anterior.",
         "falta": "na linha 3, o `estoque` à direita do `=` já vale 7, o resultado da linha 2."
        },
        {
         "texto": "Aparece `8`, só com a segunda baixa.",
         "correta": false,
         "porque": "",
         "atrai": "parece que a segunda baixa parte do 10 original.",
         "falta": "depois da linha 2, o 10 não existe mais; o `let` guardou outro valor no lugar."
        }
       ],
       "aula": "Olhe as linhas 2 e 3. O `=` primeiro calcula o lado direito e depois guarda o resultado na etiqueta da esquerda. Por isso `estoque = estoque - 3` lê-se \"pegue o estoque, tire 3 e guarde de volta no estoque\"."
      },
      {
       "tipo": "muda",
       "chefe": "Se eu trocar o preço de 40 para \"40\" entre aspas, o que muda na tela?",
       "blocos": [
        {
         "t": "p",
         "texto": "O trecho original tinha `const preco = 40;` na linha 1 e mostrava `50`. O bloco abaixo já está com a troca feita."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "const preco = \"40\";\nconst frete = 10;\nconst total = preco + frete;\nconsole.log(total);"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `4010`, os dois juntos.",
         "correta": true,
         "porque": "com aspas, `\"40\"` é texto; o `+` entre texto e número cola os dois em vez de somar.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `50`, igual ao original.",
         "correta": false,
         "porque": "",
         "atrai": "as aspas parecem só enfeite, e 40 continua parecendo 40.",
         "falta": "aspas viram o valor em texto, e o `+` com texto cola em vez de somar."
        },
        {
         "texto": "Aparece erro e nada vai à tela.",
         "correta": false,
         "porque": "",
         "atrai": "parece que o computador não deixa misturar texto com número.",
         "falta": "o JavaScript aceita a mistura sem reclamar e só muda o resultado."
        }
       ],
       "aula": "Olhe a linha 1. As aspas mudam o tipo do valor de número para texto. Na linha 3, o `+` soma números, mas cola textos. Quando um dos lados é texto, ele cola, e `\"40\"` mais `10` vira `4010`."
      },
      {
       "tipo": "erro",
       "chefe": "O comentário diz que o total mostra 180. Qual linha faz diferente?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "const preco = 200;\nconst desconto = 20;\n// o total deve mostrar 180\nlet total = preco;\ntotal = desconto;\nconsole.log(total);"
        }
       ],
       "alternativas": [
        {
         "texto": "linha 5: `total = desconto;`",
         "correta": true,
         "porque": "o `=` joga o 20 no lugar do 200, em vez de tirar 20 de 200; o trecho mostra `20`, não `180`.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "linha 4: `let total = preco;`",
         "correta": false,
         "porque": "",
         "atrai": "é a linha que cria o total, então parece a dona do erro.",
         "falta": "ela guarda 200, valor certo de partida; o erro vem depois, quando outra linha troca o 200."
        },
        {
         "texto": "linha 2: `const desconto = 20;`",
         "correta": false,
         "porque": "",
         "atrai": "o desconto aparece na conta, e 20 parece pouco.",
         "falta": "o 20 está certo, pois 200 menos 20 dá 180; o problema é como a linha 5 o usa."
        }
       ],
       "aula": "Olhe a linha 5. `total = desconto` não faz conta nenhuma: apenas guarda o valor de `desconto` na etiqueta `total`, apagando o 200. Para dar 180, a linha precisaria ser `total = preco - desconto`."
      },
      {
       "tipo": "onde",
       "chefe": "Onde está guardado o valor do frete?",
       "blocos": [
        {
         "t": "p",
         "texto": "Na linha 3, `*` é o sinal de vezes."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "const cliente = \"Marta\";\nconst pedido = { item: \"caneta\", qtd: 4, frete: 12 };\nconst total = pedido.qtd * 3 + pedido.frete;\nconsole.log(cliente + \" paga \" + total);"
        }
       ],
       "alternativas": [
        {
         "texto": "linha 2: `const pedido = { item`",
         "correta": true,
         "porque": "o campo `frete: 12` está dentro do objeto criado na linha 2; é ali que o valor mora.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "linha 3: `const total = pedido.qtd * 3`",
         "correta": false,
         "porque": "",
         "atrai": "a palavra `frete` aparece na linha 3, no fim da conta.",
         "falta": "a linha 3 só lê o campo `pedido.frete` para a soma; ela não guarda o valor 12."
        },
        {
         "texto": "linha 4: `console.log(cliente + \" paga \"`",
         "correta": false,
         "porque": "",
         "atrai": "é a linha que mostra o total final, e o frete entra nele.",
         "falta": "o `console.log` só mostra o `total`; ele não guarda nem define o frete."
        }
       ],
       "aula": "Olhe a linha 2. O valor 12 está escrito uma única vez, no campo `frete` do objeto `pedido`. A linha 3 lê `pedido.frete`, \"dentro de pedido, o campo frete\". Trocar o 12 na linha 2 muda o total mostrado na linha 4."
      }
     ],
     "explique": {
      "pergunta": "Quando você lê `const` ou `let` num código, o que isso te diz sobre aquele valor?",
      "modelo": "`const` guarda um valor que o código não vai trocar, como o preço de tabela ou o nome do cliente. `let` guarda um valor que pode ser trocado depois, como o estoque que vai caindo. Nos dois, o `=` não compara: ele guarda o valor da direita na etiqueta da esquerda. Quando eu vejo `let`, sei que preciso procurar adiante a linha que muda aquele valor.",
      "pontos": [
       "`const` é um valor que não será trocado por outro",
       "`let` é um valor que pode ser trocado mais adiante",
       "o `=` guarda o valor da direita na etiqueta da esquerda, não compara"
      ]
     },
     "entrevista": {
      "projeto": "thronfolge",
      "pergunta": "Como você decidiu a grafia dos nomes?",
      "resposta": "Uso provisório: forma portuguesa quando há tradição em português e forma original quando não há. A convenção final é decisão minha e está em aberto.",
      "fonte": "thronfolge/contexto.md:172, :183-190; commit 928f7f8; RECADOS.md:167-169 — \"forma portuguesa quando há tradição em português\" (uso provisório nos dados, listado em \"Decisões em aberto\"; a convenção é decisão do Vitor ainda não tomada)",
      "seguimento": "E o que essa escolha custa?",
      "respostaSeguimento": "Custa pouco: \"Qualquer escolha só muda o campo `nome`; `nome_historico` fica igual\" (contexto.md:190). Até a decisão, \"nada muda\" (RECADOS.md:169)."
     },
     "ondeEstudar": [
      "free-programming-books/courses/free-courses-pt_BR.md L259",
      "developer-roadmap/roadmaps/javascript/content/all-about-variables@kvActjpU4FUJdrmuFoFEe.md"
     ]
    },
    {
     "id": "02-logica-basica/02-condicional",
     "titulo": "Condicional: se isso, então aquilo",
     "prereqs": [
      "02-logica-basica/01-variavel"
     ],
     "entender": [
      {
       "t": "p",
       "texto": "Até aqui o código foi uma lista de passos, lidos de cima para baixo, todos executados. Condicional é a bifurcação: o programa olha uma pergunta de sim ou não e escolhe o caminho. É como a porta de um prédio: se o crachá for válido, a porta abre; se não for, continua fechada."
      },
      {
       "t": "p",
       "texto": "A pergunta fica entre parênteses e a resposta é verdadeiro ou falso, os valores que você já viu; um valor que não existe conta como falso. Como ler: `if (x)` é \"se x for verdade\". `else` é \"senão\", o caminho para quando a pergunta deu falso. `else if` é \"senão, se\", uma segunda pergunta que só é feita quando a primeira deu falso."
      },
      {
       "t": "p",
       "texto": "As perguntas mais comuns comparam dois valores. `===` é \"é igual a\" e `!==` é \"é diferente de\". `<` é \"menor que\", `>` é \"maior que\", `<=` é \"menor ou igual\" e `>=` é \"maior ou igual\". Cuidado: um `=` sozinho guarda um valor numa etiqueta; para comparar, são três."
      },
      {
       "t": "p",
       "texto": "Para juntar perguntas: `!` na frente é \"não\" e inverte a resposta. `&&` é \"e\": só dá verdadeiro se as duas forem verdadeiras. `||` é \"ou\": basta uma ser verdadeira."
      },
      {
       "t": "p",
       "texto": "Duas regras de leitura valem muito. Primeira: os `if` e `else if` são testados de cima para baixo, e o primeiro que der verdadeiro vence; os de baixo nem são olhados, então a ordem muda o resultado. Segunda: `return` dentro de um `if` é \"pare aqui e devolva este valor\". Quando ele roda, nada abaixo é lido. Isso é muito usado como porteiro, no começo do código."
      }
     ],
     "exemplo": [
      {
       "t": "code",
       "lang": "js",
       "codigo": "const saldo = 40;\nconst preco = 55;\nif (saldo >= preco) {\n  console.log(\"compra feita\");\n} else {\n  console.log(\"saldo insuficiente\");\n}"
      },
      {
       "t": "p",
       "texto": "As linhas 1 e 2 guardam 40 em `saldo` e 55 em `preco`. A linha 3 pergunta: 40 é maior ou igual a 55? Não, então a resposta é falso. As chaves `{ }` delimitam o bloco de cada caminho. O bloco da linha 4 é pulado e roda o bloco depois do `else`, na linha 6. Na tela aparece `saldo insuficiente`."
      }
     ],
     "projeto": {
      "origem": "thronfolge/src/simulacao.js:186-193",
      "projeto": "thronfolge",
      "blocos": [
       {
        "t": "code",
        "lang": "js",
        "codigo": "function aceitaMudarApoio(estado, apoiadorId, pretendenteId) {\n  if (estado.ultima_mudanca_apoio[apoiadorId] === estado.turno) return false;\n  const pontuacaoNova = pontuacaoParaApoio(estado, apoiadorId, pretendenteId);\n  const apoioAtual = estado.apoios[apoiadorId];\n  if (!apoioAtual || apoioAtual === apoiadorId) return pontuacaoNova >= 70;\n  if (apoioAtual === pretendenteId) return true;\n  return pontuacaoNova >= pontuacaoParaApoio(estado, apoiadorId, apoioAtual) + 15;\n}"
       },
       {
        "t": "p",
        "texto": "Este trecho é de um jogo meu, em que grandes do reino apoiam um candidato a rei. A linha 1 diz que isto é uma função: um bloco de instruções com nome; a lição de função, a quarta deste tema, explica. Ela recebe três informações e responde `true` (sim, aceita trocar de apoio) ou `false` (não aceita)."
       },
       {
        "t": "p",
        "texto": "A linha 2 é o porteiro. Cada turno do jogo é um mês. Ela vê se o turno da última troca deste apoiador é igual ao turno atual (os colchetes pegam o item guardado sob o nome do apoiador). Se for, devolve `false` na hora e as linhas de baixo nem são lidas: ninguém troca duas vezes no mesmo turno."
       },
       {
        "t": "p",
        "texto": "A linha 3 pega uma pontuação, que mede o quanto o novo candidato agrada a este apoiador; como a conta é feita pode ignorar por enquanto. A linha 4 guarda quem ele apoia hoje."
       },
       {
        "t": "p",
        "texto": "A linha 5 junta duas perguntas com `||`: `!apoioAtual` é \"não tem apoio atual\", e a segunda é \"apoia a si mesmo\". Se qualquer uma for verdade, ele aceita quando a pontuação nova for pelo menos 70. A linha 6 diz que, se já apoia o candidato proposto, devolve `true`. A linha 7 é o caso que sobra: ele apoia outra pessoa, e só troca se a pontuação nova superar a da pessoa atual em 15 pontos ou mais."
       }
      ]
     },
     "exercicios": [
      {
       "tipo": "prever",
       "chefe": "O grande A apoia o B hoje e recebe a proposta do C no turno 5. Ele troca?",
       "blocos": [
        {
         "t": "p",
         "texto": "Considere esta situação: o turno atual é 5; A fez sua última troca no turno 3; a pontuação do C para A é 80 e a do B para A é 70."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "function aceitaMudarApoio(estado, apoiadorId, pretendenteId) {\n  if (estado.ultima_mudanca_apoio[apoiadorId] === estado.turno) return false;\n  const pontuacaoNova = pontuacaoParaApoio(estado, apoiadorId, pretendenteId);\n  const apoioAtual = estado.apoios[apoiadorId];\n  if (!apoioAtual || apoioAtual === apoiadorId) return pontuacaoNova >= 70;\n  if (apoioAtual === pretendenteId) return true;\n  return pontuacaoNova >= pontuacaoParaApoio(estado, apoiadorId, apoioAtual) + 15;\n}"
        }
       ],
       "alternativas": [
        {
         "texto": "Não troca: 80 não chega a 70 mais 15.",
         "correta": true,
         "porque": "a linha 2 não barra (3 é diferente de 5), a 5 e a 6 não valem, e na linha 7 o teste é 80 >= 85, que é falso.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Troca: 80 é maior que os 70 de B.",
         "correta": false,
         "porque": "",
         "atrai": "comparar só os dois números parece suficiente.",
         "falta": "a linha 7 soma 15 ao valor de quem já é apoiado antes de comparar."
        },
        {
         "texto": "Não troca: A já mudou neste turno.",
         "correta": false,
         "porque": "",
         "atrai": "a linha 2 tem cara de bloqueio, e ela existe mesmo.",
         "falta": "ela só bloqueia se os dois números forem iguais, e aqui são 3 e 5."
        }
       ],
       "aula": "Olhe a linha 7. Quem já apoia alguém só troca se o novo valer 15 pontos a mais, não apenas mais. A linha 2 só barra quando a última troca foi no turno atual, o que não é o caso."
      },
      {
       "tipo": "onde",
       "chefe": "Onde está a regra do desconto para cliente VIP?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "function precoFinal(valor, cliente) {\n  let preco = valor;\n  if (cliente.vip) preco = valor * 0.9;\n  if (valor > 500) preco = preco - 50;\n  if (preco < 0) preco = 0;\n  return preco;\n}"
        }
       ],
       "alternativas": [
        {
         "texto": "`linha 3: if (cliente.vip)`",
         "correta": true,
         "porque": "é o único `if` que olha o campo `vip`, e o corpo dele aplica 10% de desconto.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "`linha 4: if (valor > 500)`",
         "correta": false,
         "porque": "",
         "atrai": "também tira dinheiro do preço, então parece desconto.",
         "falta": "ela olha o valor da compra, não o cliente; vale para qualquer um."
        },
        {
         "texto": "`linha 2: let preco = valor`",
         "correta": false,
         "porque": "",
         "atrai": "é onde o preço nasce, e parece a regra inicial.",
         "falta": "ela só guarda o valor cheio, sem nenhuma pergunta."
        }
       ],
       "aula": "A regra de um grupo de clientes aparece como um `if` sobre o campo que identifica o grupo, aqui a linha 3. A linha 4 é outra regra, de compra grande. Para achar uma regra, procure o `if` cuja pergunta usa o nome do que o chefe citou."
      },
      {
       "tipo": "muda",
       "chefe": "Se eu trocar `<` por `<=`, o que muda com estoque 20 e mínimo 20?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "const estoque = 20;\nconst minimo = 20;\nif (estoque < minimo) {\n  console.log(\"comprar\");\n} else {\n  console.log(\"ok\");\n}"
        }
       ],
       "alternativas": [
        {
         "texto": "Passa a mostrar `comprar`, não `ok`.",
         "correta": true,
         "porque": "com `<=` o teste 20 <= 20 é verdadeiro, então roda o primeiro bloco.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Continua mostrando só `ok`, nada muda.",
         "correta": false,
         "porque": "",
         "atrai": "com números iguais, parece que a diferença some.",
         "falta": "`<=` inclui o caso de igualdade, e `<` o exclui."
        },
        {
         "texto": "Mostra `comprar` e depois `ok`, os dois.",
         "correta": false,
         "porque": "",
         "atrai": "o teste ficou verdadeiro e o `ok` ainda está no código.",
         "falta": "o `else` só roda quando o `if` dá falso; nunca os dois."
        }
       ],
       "aula": "Na linha 3, `<` deixa o igual de fora e `<=` o inclui. Isso decide o que acontece justo no limite, onde os erros de regra costumam aparecer. O `else` da linha 5 é o plano B, e nunca roda junto com o primeiro bloco."
      },
      {
       "tipo": "erro",
       "chefe": "O comentário diz 30% a partir de 1000, mas com 1500 a tela mostra 10. Qual linha põe esse 10?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "// Dá 30% a partir de 1000, 10% a partir de 100.\nconst valor = 1500;\nlet desconto = 0;\nif (valor >= 100) desconto = 10;\nelse if (valor >= 1000) desconto = 30;\nconsole.log(desconto);"
        }
       ],
       "alternativas": [
        {
         "texto": "`linha 4: if (valor >= 100)`",
         "correta": true,
         "porque": "1500 passa em 100 primeiro, então o `else if` não é testado e o resultado é 10, não 30.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "`linha 5: else if (valor >= 1000)`",
         "correta": false,
         "porque": "",
         "atrai": "é a linha que trata de 1000, então parece a culpada.",
         "falta": "um `else if` só é lido quando o `if` de cima deu falso, e aqui não deu."
        },
        {
         "texto": "`linha 3: let desconto = 0;`",
         "correta": false,
         "porque": "",
         "atrai": "o 0 inicial parece segurar o desconto em zero.",
         "falta": "a linha 4 troca esse 0 por 10 antes de a tela mostrar."
        }
       ],
       "aula": "A ordem importa. Como 1500 também é maior que 100, a linha 4 vence e a 5 fica de fora. O certo é testar o maior limite primeiro, 1000, e o de 100 depois."
      },
      {
       "tipo": "prever",
       "chefe": "A Ana é só leitora, mas é dona do documento. O que a função devolve?",
       "blocos": [
        {
         "t": "p",
         "texto": "A linha 6 usa a função: o primeiro par de chaves entra no lugar de `usuario` e o segundo no lugar de `doc`."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "function podeEditar(usuario, doc) {\n  if (!usuario.ativo) return \"bloqueado\";\n  if (usuario.perfil === \"admin\" || doc.dono === usuario.nome) return \"edita\";\n  return \"so le\";\n}\nconsole.log(podeEditar({ nome: \"Ana\", perfil: \"leitor\", ativo: true }, { dono: \"Ana\" }));"
        }
       ],
       "alternativas": [
        {
         "texto": "Devolve `edita`, porque Ana é a dona.",
         "correta": true,
         "porque": "na linha 2, `ativo` é `true`, então `!` dá falso e não bloqueia; na linha 3 o `||` basta uma ser verdade, e a segunda é.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Devolve `so le`, porque é leitora.",
         "correta": false,
         "porque": "",
         "atrai": "o perfil dela é \"leitor\", e parece decidir tudo.",
         "falta": "com `||`, uma só condição verdadeira já basta para entrar no `if`."
        },
        {
         "texto": "Devolve `bloqueado`, porque há um `!`.",
         "correta": false,
         "porque": "",
         "atrai": "o `!` parece sinal de proibição.",
         "falta": "`!` é \"não\"; \"não ativo\" só é verdade quando `ativo` é falso."
        }
       ],
       "aula": "Leia a linha 2 como \"se o usuário não está ativo, pare e devolva bloqueado\". Como Ana está ativa, segue. Na linha 3, o `||` é \"ou\", e `doc.dono === usuario.nome` é verdadeiro, então o `return` roda e a linha 4 nunca é lida."
      }
     ],
     "explique": {
      "pergunta": "Como o código do seu jogo decide se um grande aceita trocar de apoio?",
      "modelo": "Primeiro o código confere se ele já trocou neste turno; se sim, para ali e responde que não. Depois olha a situação: sem apoio, aceita com pontuação 70 ou mais; se já apoia o candidato, aceita; se apoia outro, só troca quando a pontuação nova passa a atual em 15 pontos.",
      "pontos": [
       "a primeira conferência é o limite de uma troca por turno, e o `return` para tudo",
       "sem apoio atual, basta a pontuação nova chegar a 70",
       "quem apoia outro candidato só troca com 15 pontos de vantagem"
      ]
     },
     "entrevista": {
      "projeto": "thronfolge",
      "pergunta": "Por que limitar a troca de apoio a uma por mês?",
      "resposta": "Porque, na revisão das campanhas simuladas, um grande trocava de lado várias vezes no mesmo mês sem custo. Agora cada personagem muda de apoio no máximo uma vez por mês, e abandonar um apoio exige vantagem de 15 pontos sobre o pretendente atual.",
      "fonte": "thronfolge commit 201ae5f — \"Na revisão de 1452cf4, um grande trocava de lado várias vezes no mesmo mês sem custo [...] Agora cada personagem muda de apoio no máximo uma vez por mês, e abandonar um apoio exige vantagem de 15 pontos sobre o pretendente atual.\"",
      "seguimento": "E o que essa escolha custa?",
      "respostaSeguimento": "não documentado: prepare sua resposta"
     },
     "ondeEstudar": [
      "free-programming-books/courses/free-courses-pt_BR.md L259",
      "developer-roadmap/roadmaps/javascript/content/conditional-statements@ttCsd2_H2SuRivCjGv1OX.md"
     ]
    },
    {
     "id": "02-logica-basica/03-laco",
     "titulo": "Laço: repetir para cada item",
     "prereqs": [
      "02-logica-basica/02-condicional"
     ],
     "entender": [
      {
       "t": "p",
       "texto": "Laço é uma instrução que repete um pedaço do código, uma vez para cada item de uma lista. É a pilha de pedidos na mesa: você pega um, faz a mesma conta, põe de lado e pega o próximo, até a pilha acabar."
      },
      {
       "t": "p",
       "texto": "Uma lista, em JavaScript, são valores separados por vírgula entre colchetes: `[30, 50, 20]` é uma lista com três números. Cada valor é um item. Para pegar um item pela posição, escreve-se `lista[0]`, e a contagem começa em zero: `lista[0]` é o primeiro, `lista[1]` é o segundo. `lista.length` é quantos itens a lista tem."
      },
      {
       "t": "p",
       "texto": "Como ler: `for (const item of lista) { ... }` é \"para cada item da lista, faça o que está entre as chaves\". Em cada volta, `item` vale um valor diferente da lista, do primeiro ao último. O que está entre as chaves roda uma vez por volta."
      },
      {
       "t": "p",
       "texto": "O laço quase sempre vem com um acumulador: uma variável criada com `let` antes do laço, que vai mudando a cada volta. `let total = 0;` é \"começo a conta em zero\"; `total += valor;` é \"some o valor ao total\". Se o acumulador não começar no número certo, todo o resultado sai errado."
      },
      {
       "t": "p",
       "texto": "Existe outra forma, mais antiga: `for (let i = 0; i < n; i++)`. Lê-se: \"comece com `i` em 0; enquanto `i` for menor que `n`, repita; ao fim de cada volta, some 1 em `i`\". O `i++` quer dizer \"some 1\". Quem usa essa forma pega os itens por posição, com `lista[i]`."
      },
      {
       "t": "p",
       "texto": "Duas dicas de leitura. `.filter(...)` e `.map(...)` também são laços disfarçados: `.filter` \"passa por todos e fica só com os que passam no teste\", e `.map` \"passa por todos e transforma cada um em outra coisa\". E `break` dentro de um laço quer dizer \"pare de repetir agora\"."
      }
     ],
     "exemplo": [
      {
       "t": "code",
       "lang": "js",
       "codigo": "const lista = [\"a\", \"b\", \"c\"];\nlet n = 0;\nfor (const item of lista) {\n  n = n + 1;\n}\nconsole.log(n);"
      },
      {
       "t": "p",
       "texto": "A linha 1 cria uma lista com três itens. A linha 2 cria o acumulador `n`, que começa em 0. A linha 3 diz \"para cada item da lista\"; a linha 4 roda três vezes, e em cada volta soma 1 em `n`: 0 vira 1, depois 2, depois 3. A linha 6 mostra o valor final, `3`, depois que o laço terminou. Aqui o laço só conta quantos itens a lista tem."
      }
     ],
     "projeto": {
      "origem": "thronfolge/src/simulacao.js:455-460",
      "projeto": "thronfolge",
      "blocos": [
       {
        "t": "code",
        "lang": "js",
        "codigo": "  if (!estado.eleito && estado.apoios) {\n    const vencedor = estado.personagens\n      .map((pessoa) => ({ pessoa, total: apoiosDe(estado, pessoa.id).length }))\n      .filter((item) => item.total >= 3)\n      .sort((a, b) => b.total - a.total || a.pessoa.id.localeCompare(b.pessoa.id))[0];\n    if (vencedor) {"
       },
       {
        "t": "p",
        "texto": "Este trecho é do jogo Thronfolge, que simula a escolha do rei em 936. Não tem `for`, mas faz o mesmo trabalho com laços disfarçados. A linha 1 diz: se ainda não há rei eleito e existe o registro de quem apoia quem, siga em frente."
       },
       {
        "t": "p",
        "texto": "A linha 2 cria `vencedor`, e a conta começa em `estado.personagens`, a lista de todas as pessoas do jogo. A linha 3, o `.map`, passa por todas as pessoas e transforma cada uma num pacote com duas coisas: a pessoa e o total de apoios que ela recebeu. O `(pessoa) => ...` significa \"para cada pessoa, faça isto\"; função por enquanto é só isso. A linha 4, o `.filter`, passa por todos os pacotes e fica só com os que têm `total` de 3 ou mais."
       },
       {
        "t": "p",
        "texto": "A linha 5, o `.sort`, ordena os que sobraram do maior total para o menor, e o `[0]` pega o primeiro da fila. Pode ignorar por enquanto como o desempate por `id` funciona. Se ninguém chegou a 3 apoios, `vencedor` fica vazio, e a linha 6 pergunta se há vencedor."
       }
      ]
     },
     "exercicios": [
      {
       "tipo": "prever",
       "chefe": "Os pedidos do dia foram 30, 50 e 20. Qual total aparece no relatório?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "const pedidos = [30, 50, 20];\nlet total = 0;\nfor (const valor of pedidos) {\n  total += valor;\n}\nconsole.log(total);"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `100`, a soma dos três pedidos do dia.",
         "correta": true,
         "porque": "`total` começa em 0 e, volta por volta, vira 30, depois 80, depois 100.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `20`, só o último pedido.",
         "correta": false,
         "porque": "",
         "atrai": "o `valor` da última volta é 20, e é o que sobra na mão.",
         "falta": "`+=` soma ao que já havia em `total`; não troca o valor antigo pelo novo."
        },
        {
         "texto": "Aparece `130`, com o 30 contado 2 vezes.",
         "correta": false,
         "porque": "",
         "atrai": "dá a impressão de que o primeiro item entra já no `let`.",
         "falta": "o `let total = 0` começa em zero; cada item entra só na sua volta."
        }
       ],
       "aula": "Olhe a linha 4, `total += valor;`, que roda uma vez por item. Volta 1: 0 + 30 = 30. Volta 2: 30 + 50 = 80. Volta 3: 80 + 20 = 100. Só depois do laço a linha 6 mostra o resultado."
      },
      {
       "tipo": "prever",
       "chefe": "Quantos pedidos atrasados o painel mostra? Os dias de atraso foram 0, 5, 2 e 9.",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "const dias = [0, 5, 2, 9];\nlet atrasados = 0;\nfor (const d of dias) {\n  if (d > 3) atrasados++;\n}\nconsole.log(atrasados);"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `2`, os com mais de 3 dias.",
         "correta": true,
         "porque": "só o 5 e o 9 passam em `d > 3`; o 0 e o 2 não somam nada.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `4`, todos os pedidos da lista.",
         "correta": false,
         "porque": "",
         "atrai": "o laço passa por todos os itens, então parece contar todos.",
         "falta": "o `if` dentro do laço decide, a cada volta, se `atrasados++` roda ou não."
        },
        {
         "texto": "Aparece `16`, a soma de todos os dias.",
         "correta": false,
         "porque": "",
         "atrai": "o laço de soma do exemplo anterior deixa o hábito de somar o valor.",
         "falta": "`atrasados++` soma 1, não o valor de `d`; ele conta pedidos, não dias."
        }
       ],
       "aula": "Na linha 4, o `if` só deixa `atrasados++` rodar quando `d` é maior que 3. Volta por volta: d=0 não conta (0), d=5 conta (1), d=2 não conta (1), d=9 conta (2). O laço visita os 4 itens, mas o contador só sobe em 2."
      },
      {
       "tipo": "erro",
       "chefe": "O comentário diz que o código acha a maior venda, mas o painel mostra 20. Qual linha faz diferente do que o comentário promete?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "// Acha o maior valor entre as vendas.\nconst vendas = [40, 90, 70, 20];\nlet maior = 0;\nfor (const v of vendas) {\n  maior = v;\n}\nconsole.log(maior);"
        }
       ],
       "alternativas": [
        {
         "texto": "`linha 5: maior = v;` troca o maior por todo valor que vem",
         "correta": true,
         "porque": "sem um `if`, a linha 5 troca `maior` em toda volta, e sobra o último valor.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "`linha 3: let maior = 0;` começa a conta no zero errado",
         "correta": false,
         "porque": "",
         "atrai": "o zero parece ser o motivo de o resultado não ser o maior.",
         "falta": "com vendas positivas, começar em 0 serve; o problema é a troca sem teste."
        },
        {
         "texto": "`linha 4: for (const v of vendas) {` passa por poucos itens",
         "correta": false,
         "porque": "",
         "atrai": "o resultado 20 faz pensar que o laço parou antes do fim.",
         "falta": "o laço passa pelos 4 itens; ele só sobrescreve `maior` 4 vezes."
        }
       ],
       "aula": "A linha 5 é a culpada. Volta por volta, `maior` vira 40, depois 90, depois 70, depois 20, e o último valor fica. Para achar o maior, a troca só deveria acontecer quando `v` for maior que `maior`, algo como `if (v > maior) maior = v;`, e com isso o resultado seria 90."
      },
      {
       "tipo": "muda",
       "chefe": "Se eu trocar `<` por `<=` na linha 3, o que muda no resultado?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "const votos = [4, 7, 3];\nlet soma = 0;\nfor (let i = 0; i < votos.length; i++) {\n  soma += votos[i];\n}\nconsole.log(soma);"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `NaN`, ou seja, não é número.",
         "correta": true,
         "porque": "com `<=`, há uma volta a mais, com `votos[3]`, que não existe e dá \"indefinido\".",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `14`, igual ao de antes da troca.",
         "correta": false,
         "porque": "",
         "atrai": "uma volta a mais parece somar só um item vazio.",
         "falta": "somar um item que não existe estraga a conta, e o resultado não é número."
        },
        {
         "texto": "O programa para com erro na última volta.",
         "correta": false,
         "porque": "",
         "atrai": "ler uma posição que não existe soa como coisa proibida.",
         "falta": "JavaScript não trava ao ler posição vazia; devolve `undefined` e segue."
        }
       ],
       "aula": "A lista tem 3 itens, nas posições 0, 1 e 2, e `votos.length` vale 3. Com `<`, `i` vai de 0 a 2 e soma 4 + 7 + 3 = 14. Com `<=`, `i` chega a 3, e `votos[3]` é `undefined`; 14 + `undefined` dá `NaN`."
      },
      {
       "tipo": "onde",
       "chefe": "Onde o código decide quais pessoas ficam na disputa? Entram três pessoas, com 1, 3 e 2 apoios.",
       "blocos": [
        {
         "t": "p",
         "texto": "O trecho foi cortado no meio: as chaves abertas nas linhas 1 e 6 fecham mais adiante no arquivo."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "if (!estado.eleito && estado.apoios) {\n  const vencedor = estado.personagens\n    .map((pessoa) => ({ pessoa, total: apoiosDe(estado, pessoa.id).length }))\n    .filter((item) => item.total >= 3)\n    .sort((a, b) => b.total - a.total || a.pessoa.id.localeCompare(b.pessoa.id))[0];\n  if (vencedor) {"
        }
       ],
       "alternativas": [
        {
         "texto": "`linha 4: .filter((item) => item.total >= 3)` deixa quem tem 3 ou mais",
         "correta": true,
         "porque": "o `.filter` descarta quem não passa no teste; sobra só a pessoa com 3 apoios.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "`linha 3: .map((pessoa) => ({ pessoa, total:` fica só com quem tem apoio",
         "correta": false,
         "porque": "",
         "atrai": "ela é a linha que fala de `total`, o número de apoios.",
         "falta": "o `.map` só transforma; continua tendo uma saída para cada entrada, 3 e 3."
        },
        {
         "texto": "`linha 5: .sort((a, b) => b.total - a.total` tira quem tem menos apoios",
         "correta": false,
         "porque": "",
         "atrai": "ordenar do maior para o menor parece cortar quem fica no fim.",
         "falta": "o `.sort` só muda a ordem; ninguém sai da lista por causa dele."
        }
       ],
       "aula": "A linha 3 conta os apoios de cada pessoa e gera 3 pacotes, com totais 1, 3 e 2. A linha 4 é a regra: o `.filter` passa por todos e só deixa o de total 3, e os outros dois caem fora ali. A linha 5 ordena o que sobrou, e o `[0]` pega o primeiro."
      }
     ],
     "explique": {
      "pergunta": "O código passa por uma lista de pedidos e mostra um total no fim. Como você explica para mim o que acontece a cada volta?",
      "modelo": "O código cria uma variável que começa em zero e vai guardando a conta. Ele passa por cada pedido da lista, um de cada vez, e em cada volta faz a mesma coisa: soma o valor do pedido ao que já estava guardado. Quando a lista acaba, o laço termina e o total final aparece.",
      "pontos": [
       "a variável da conta começa em um valor inicial, como zero",
       "o mesmo passo se repete uma vez para cada item da lista",
       "o resultado só vale depois que o laço termina"
      ]
     },
     "entrevista": {
      "projeto": "thronfolge",
      "pergunta": "Por que \"três de cinco\" grandes para eleger o rei, sem falar em voto?",
      "resposta": "Porque as fontes de 936 buscam consenso e não contam votos; o precedente mais próximo é 919. A interface não fala em voto nem em maioria.",
      "fonte": "thronfolge/RECADOS.md:56-57 — \"as fontes buscam consenso e não contam votos. O precedente mais próximo é 919\"; commit 0bf8ba5 — \"as fontes de 936 buscam consenso e não contam votos, e por isso a interface não fala em voto nem em maioria.\"",
      "seguimento": "E o que essa escolha custa?",
      "respostaSeguimento": "É uma \"simplificação declarada\" (contexto.md:64-65); quem não aderiu \"permanece como pendência de reconhecimento para sistemas futuros\" (contexto.md:65-66)."
     },
     "ondeEstudar": [
      "free-programming-books/courses/free-courses-pt_BR.md L259",
      "developer-roadmap/roadmaps/javascript/content/forof-loop@FBz6h_AmTJBXoBN-a38a5.md"
     ]
    },
    {
     "id": "02-logica-basica/04-funcao",
     "titulo": "Função: uma receita com nome",
     "prereqs": [
      "02-logica-basica/03-laco"
     ],
     "entender": [
      {
       "t": "p",
       "texto": "Função é uma receita com nome. Escrever a receita no caderno não faz o bolo: só guarda os passos. O bolo sai quando alguém diz \"faça o bolo de cenoura\". No código é igual: definir a função só guarda a receita, e chamar a função, pelo nome, executa."
      },
      {
       "t": "p",
       "texto": "Como ler a definição: `function frete(peso, zona) { ... }` quer dizer \"existe uma receita chamada `frete`, que usa dois ingredientes, `peso` e `zona`\". Os ingredientes se chamam parâmetros. Nada dentro das chaves roda nesse momento."
      },
      {
       "t": "p",
       "texto": "Como ler a chamada: `frete(2, \"norte\")` quer dizer \"faça a receita `frete` com 2 no lugar de `peso` e \"norte\" no lugar de `zona`\". A ordem importa: o primeiro valor vai para o primeiro parâmetro, o segundo para o segundo."
      },
      {
       "t": "p",
       "texto": "`return` é o prato pronto que a função entrega a quem chamou. Também é onde ela para: o que vier depois do `return` não roda. Função sem `return` não entrega nada; quem chamou recebe `undefined`, que quer dizer \"nada\"."
      },
      {
       "t": "p",
       "texto": "Existe uma forma curta, chamada de seta: `(x) => x * 2` quer dizer \"receba x e entregue x vezes 2\". Quando a seta não tem chaves, o resultado já é entregue, sem escrever `return`."
      },
      {
       "t": "p",
       "texto": "Para seguir uma chamada, faça três passos: ache a definição, troque cada parâmetro pelo valor da chamada e leia de cima para baixo até o `return`."
      }
     ],
     "exemplo": [
      {
       "t": "code",
       "lang": "js",
       "codigo": "function saudacao(nome) {\n  return \"Olá, \" + nome;\n}\nconst texto = saudacao(\"Ana\");\nconsole.log(texto);"
      },
      {
       "t": "p",
       "texto": "As linhas 1 a 3 só guardam a receita `saudacao`; nada é executado ainda. A linha 4 chama a função com \"Ana\": o parâmetro `nome` passa a valer \"Ana\". Dentro da função, a linha 2 monta o texto \"Olá, Ana\" e o `return` entrega esse texto. A etiqueta `texto` guarda o que foi entregue, e a linha 5 mostra \"Olá, Ana\"."
      }
     ],
     "projeto": {
      "origem": "thronfolge/src/simulacao.js:151-155",
      "projeto": "thronfolge",
      "blocos": [
       {
        "t": "code",
        "lang": "js",
        "codigo": "export function pontuacaoParaApoio(estado, apoiadorId, pretendenteId) {\n  const relacao = relacaoCom(estado, apoiadorId, pretendenteId);\n  const percepcao = percepcaoDe(estado, apoiadorId, pretendenteId);\n  return percepcao.legitimidade + relacao.confianca - relacao.rancor;\n}"
       },
       {
        "t": "p",
        "texto": "Esta é a receita que calcula quantos pontos um nobre dá de apoio a um pretendente ao trono. Ela usa três ingredientes: `estado` (o jogo inteiro naquele momento), `apoiadorId` (quem apoia) e `pretendenteId` (quem pode ser apoiado)."
       },
       {
        "t": "p",
        "texto": "A linha 1 define a função. `export` quer dizer só que outros arquivos podem usar essa função. As linhas 2 e 3 chamam duas outras funções, `relacaoCom` e `percepcaoDe`, e guardam o que elas entregam em `relacao` e `percepcao`. Como funcionam por dentro, pode ignorar por enquanto."
       },
       {
        "t": "p",
        "texto": "A linha 4 é o `return`: entrega a legitimidade percebida, mais a confiança, menos o rancor. A função só calcula e entrega um número; não muda o `estado`."
       }
      ]
     },
     "exercicios": [
      {
       "tipo": "prever",
       "chefe": "Neste caso o nobre tem legitimidade percebida 3, confiança 5 e rancor 2. Quanto a função entrega?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "function pontuacaoParaApoio(estado, apoiadorId, pretendenteId) {\n  const relacao = relacaoCom(estado, apoiadorId, pretendenteId);\n  const percepcao = percepcaoDe(estado, apoiadorId, pretendenteId);\n  return percepcao.legitimidade + relacao.confianca - relacao.rancor;\n}"
        }
       ],
       "alternativas": [
        {
         "texto": "Entrega 6, e o rancor é subtraído.",
         "correta": true,
         "porque": "3 + 5 - 2 dá 6; o sinal de menos na frente de `relacao.rancor` tira o rancor.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Entrega 10, somando os três números.",
         "correta": false,
         "porque": "",
         "atrai": "parece que uma pontuação junta tudo que aparece nela.",
         "falta": "ler o sinal antes de cada nome; o último é `-`, e não `+`."
        },
        {
         "texto": "Entrega 8, ignorando o rancor.",
         "correta": false,
         "porque": "",
         "atrai": "parece que só entram os dois números bons.",
         "falta": "o rancor aparece no `return`, com sinal de menos, e por isso entra na conta."
        }
       ],
       "aula": "Olhe a linha 4, o `return`. A função troca cada nome pelo número dado e faz a conta: 3 + 5 é 8, e 8 - 2 é 6. Nada fica de fora do que está no `return`."
      },
      {
       "tipo": "prever",
       "chefe": "Quando eu rodo este arquivo, o que aparece na tela, e em que ordem?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "function avisar(nome) {\n  console.log(\"Olá, \" + nome);\n}\nconsole.log(\"começo\");\navisar(\"Ana\");"
        }
       ],
       "alternativas": [
        {
         "texto": "Aparece `começo` e depois `Olá, Ana`.",
         "correta": true,
         "porque": "as linhas 1 a 3 só guardam a receita; a linha 4 roda primeiro e a linha 5 chama a função.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Aparece `Olá, Ana` e depois `começo`.",
         "correta": false,
         "porque": "",
         "atrai": "a função está escrita primeiro, e parece que roda primeiro.",
         "falta": "definir só guarda a receita; quem executa é a chamada na linha 5."
        },
        {
         "texto": "Aparece `Olá, undefined` e depois `começo`.",
         "correta": false,
         "porque": "",
         "atrai": "o nome não parece ter sido dado quando a função é escrita.",
         "falta": "o valor entra no parâmetro na hora da chamada, e a chamada passa \"Ana\"."
        }
       ],
       "aula": "Olhe as linhas 1 a 3: são a definição, e nenhuma delas roda sozinha. A linha 4 mostra `começo`. Só a linha 5 chama `avisar`, e então `nome` vira \"Ana\" e a linha 2 mostra `Olá, Ana`."
      },
      {
       "tipo": "erro",
       "chefe": "O comentário diz que o sócio paga 90. Qual linha faz o resultado ser outro?",
       "blocos": [
        {
         "t": "code",
         "lang": "js",
         "codigo": "// Devolve o preço com 10% de desconto se for sócio.\nfunction precoFinal(preco, socio) {\n  return preco;\n  if (socio) return preco * 0.9;\n}\nconsole.log(precoFinal(100, true));"
        }
       ],
       "alternativas": [
        {
         "texto": "linha 3: `return preco;`, que entrega 100 e para.",
         "correta": true,
         "porque": "o `return` entrega o preço cheio e a função termina; a linha 4 nunca roda.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "linha 4: `if (socio) return`, que testa errado.",
         "correta": false,
         "porque": "",
         "atrai": "o desconto está nessa linha, e parece que o erro mora nela.",
         "falta": "a linha 4 está certa, mas está depois de um `return`, e por isso nunca é lida."
        },
        {
         "texto": "linha 6: `console.log(precoFinal(`, que passa o valor.",
         "correta": false,
         "porque": "",
         "atrai": "parece que a chamada com 100 e true foi mal escrita.",
         "falta": "a chamada está certa; o resultado já está decidido dentro da função."
        }
       ],
       "aula": "Olhe a linha 3. Ao chegar num `return`, a função entrega o valor e para ali mesmo. Tudo que vem depois, como a linha 4, é código que nunca roda. Para o desconto valer, o `return preco;` teria de vir depois do `if`."
      },
      {
       "tipo": "muda",
       "chefe": "Se eu chamar com os valores trocados, desconto(10, 200), o que volta?",
       "blocos": [
        {
         "t": "p",
         "texto": "Lembrete de conta: como na escola, `*` (vezes) e `/` (dividido) são feitos antes de `+` e `-`."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "function desconto(preco, percentual) {\n  return preco - preco * percentual / 100;\n}\nconsole.log(desconto(200, 10));"
        }
       ],
       "alternativas": [
        {
         "texto": "Volta -10, pois 10 vira o preço.",
         "correta": true,
         "porque": "o primeiro valor vai para `preco` e o segundo para `percentual`: 10 - 10 * 200 / 100 dá -10.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "Volta 180, o mesmo valor de antes.",
         "correta": false,
         "porque": "",
         "atrai": "parece que a função adivinha qual número é o preço.",
         "falta": "a função não adivinha nada; o valor entra no parâmetro pela posição."
        },
        {
         "texto": "Dá erro e o programa para de rodar.",
         "correta": false,
         "porque": "",
         "atrai": "parece que valores fora de ordem deveriam ser recusados.",
         "falta": "a função aceita quaisquer números, na ordem em que vierem, sem reclamar."
        }
       ],
       "aula": "Olhe a chamada na linha 4. Os valores entram nos parâmetros pela posição: o primeiro em `preco`, o segundo em `percentual`. Trocando a ordem, a conta roda normalmente e entrega um resultado errado, sem aviso."
      },
      {
       "tipo": "onde",
       "chefe": "Onde a função entrega o valor do frete para quem a chamou?",
       "blocos": [
        {
         "t": "p",
         "texto": "Na linha 3, `? 15 : 5` é um \"se\" curto: se a zona for \"norte\", a taxa é 15; senão, é 5."
        },
        {
         "t": "code",
         "lang": "js",
         "codigo": "function frete(peso, zona) {\n  const base = peso * 4;\n  const taxa = zona === \"norte\" ? 15 : 5;\n  return base + taxa;\n}\nconsole.log(frete(2, \"norte\"));"
        }
       ],
       "alternativas": [
        {
         "texto": "linha 4: `return base + taxa;`",
         "correta": true,
         "porque": "o `return` é a linha que entrega o resultado, e aqui ele soma a base à taxa.",
         "atrai": "",
         "falta": ""
        },
        {
         "texto": "linha 2: `const base = peso * 4;`",
         "correta": false,
         "porque": "",
         "atrai": "tem a conta do peso, e parece ser a conta do frete.",
         "falta": "guardar um valor numa etiqueta não o entrega; só o `return` entrega."
        },
        {
         "texto": "linha 3: `const taxa = zona === \"norte\"`",
         "correta": false,
         "porque": "",
         "atrai": "tem o número 15, que parece o valor final.",
         "falta": "a taxa é só um ingrediente; quem chamou recebe o que está no `return`."
        }
       ],
       "aula": "Olhe a linha 4. Para saber o que a função entrega, procure o `return`. As linhas 2 e 3 preparam números, e a linha 4 os junta e entrega: 2 * 4 dá 8, a taxa do norte é 15, e o frete é 23."
      }
     ],
     "explique": {
      "pergunta": "Quando você lê uma função, como descobre o que ela entrega para quem a chamou?",
      "modelo": "Uma função é uma receita: definir só guarda os passos e chamar é que executa, com os valores passados no lugar dos parâmetros. O `return` entrega o resultado e encerra a função; sem ele, quem chamou recebe `undefined`, que quer dizer nada. Por isso, para saber o que ela faz, leio a definição e procuro o `return`.",
      "pontos": [
       "definir guarda a receita e chamar executa",
       "o valor da chamada entra no lugar do parâmetro",
       "o `return` entrega o resultado e para a função"
      ]
     },
     "entrevista": {
      "projeto": "thronfolge",
      "pergunta": "Por que o protótipo é feito em JavaScript puro, sem um motor de jogo como o Godot?",
      "resposta": "Porque o ambiente já tinha Node e não tinha Godot, e um mapa político que quase não se mexe não justifica instalar um motor de jogo antes de validar o núcleo da simulação.",
      "fonte": "thronfolge/contexto.md:101-102 — \"o ambiente atual já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo.\"",
      "seguimento": "E se o jogo crescer?",
      "respostaSeguimento": "\"A escolha vale para o protótipo, não impede empacotamento ou migração futura\" (contexto.md:103)."
     },
     "ondeEstudar": [
      "free-programming-books/courses/free-courses-pt_BR.md L259 (Curso em Vídeo, JavaScript para iniciantes)",
      "developer-roadmap/roadmaps/javascript/content/functions@k8bJH9qydZm8I9rhH7rXw.md"
     ]
    }
   ]
  }
 ]
};
