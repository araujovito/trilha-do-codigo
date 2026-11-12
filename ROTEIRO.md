# Roteiro v2: de quiz para jogo de aprender

Escrito em 10/11/2026 e ajustado em 11/11/2026 (seção "Ajuste de 11/11"). Substitui o roteiro
v1 (fases 1 a 5, concluídas).

## Onde o projeto está

O que existe hoje funciona, mas é um **quiz**:

- Uma trilha de paradas. Cada parada mostra uma explicação, um trecho de código de um projeto
  meu e uma pergunta de múltipla escolha.
- Um "Modo entrevista" por projeto: pitch, decisões em pergunta e resposta, autoavaliação.
- Todo o conteúdo veio de um inventário dos meus projetos, conferido contra o código e a
  documentação (ver `README.md`, seção "Como o conteúdo foi produzido").

Três limites, que são o motivo deste roteiro:

1. **Errar não ensina.** O jogo diz "tente de novo" e a mesma pergunta volta. Dá para acertar
   por eliminação sem entender.
2. **O conteúdo está preso aos projetos.** Só existe parada para conceito que apareceu num
   trecho meu. Git, Docker, TypeScript, pipeline de dados e outros ficaram de fora, e não há
   como estudar "SQL" ou "HTTP" como assunto.
3. **Reconhecer não é saber.** Escolher a alternativa certa é mais fácil que explicar em voz
   alta, que é o que a entrevista pede.

Uma medição feita em 11/11 sobre as 38 perguntas do quiz acrescentou dois:

4. **A alternativa certa é a mais longa em 35 das 38.** Dá para acertar pelo tamanho do texto.
5. **A pergunta quase nunca testa o conceito da parada.** A parada "Laços" pergunta por que a
   análise termina em 2023. Concluir a trilha não prova que eu sei ler um laço.

## Objetivo da v2

Aprender programação **por temas**, usando os projetos como exemplo e não como limite, num
ciclo em que **o erro vira aula** e a pergunta seguinte é **outra**, não a mesma.

## Ajuste de 11/11

Depois de uma primeira aula feita em conversa, três coisas mudaram:

- **Ler, não escrever.** Hoje quem escreve o código é a LLM. O que eu preciso é ler o que ela
  escreveu e entender o bastante para decidir. Os exercícios passam a ser todos de leitura;
  completar lacuna e ordenar linhas saem do plano.
- **A pergunta vem de quem cobra.** Cada exercício é feito na voz de um chefe ou de um
  entrevistador, com as perguntas que eles de fato fazem sobre código:
  - "O que isso faz?"
  - "E se o usuário fizer algo errado?"
  - "Isso pode quebrar ou apagar alguma coisa?"
  - "O que muda se eu trocar isto?"
  - "Onde está essa regra no código?"
  - "Como você sabe que funciona?"
- **Começo do zero.** Eu respondi "não sei, me explica" na primeira pergunta. A aula vem antes
  da pergunta, e todo exercício tem o botão **"Não sei, me explica"**, que abre a aula daquele
  exercício sem tratar como erro de atenção.
- **Só projetos pessoais.** Nenhum projeto da empresa serve de material, nem na versão local.

## O ciclo de uma lição

```
1. Entender   explicação curta + analogia + como ler (o que cada símbolo quer dizer)
2. Ver        exemplo mínimo (de fora dos projetos) e depois o mesmo conceito num trecho meu
3. Ler        exercício de leitura na voz do chefe: prever, onde, muda, erro
4. Explicar   resposta escrita com as minhas palavras; comparo com uma resposta-modelo
5. Entrevista a pergunta de decisão ligada ao tema, com fonte e seguimento
```

Tipos de exercício do passo 3, todos com alternativas:

| Tipo | Pergunta |
|---|---|
| `prever` | o que este trecho devolve ou mostra com esta entrada |
| `onde` | qual linha responde à pergunta do chefe |
| `muda` | o que passa a acontecer se uma parte for trocada |
| `erro` | qual linha faz o trecho se comportar diferente do que o comentário promete |

Errar em 3, ou apertar "Não sei, me explica", abre o **ciclo do erro**:

```
erro → "por que essa opção atrai" (o equívoco por trás dela)
     → mini-aula do ponto que faltou (2 a 4 frases, apontando a linha)
     → NOVA pergunta do mesmo conceito, com outro trecho e outras opções
     → o conceito entra na fila de revisão (1 dia, 3 dias, 7 dias)
```

## Como "ensinar no erro e criar novas opções" pode funcionar

O jogo é uma página estática: sozinho, ele não gera texto novo. Há três jeitos de entregar o
que eu pedi, com custos diferentes.

| | A. Banco de variantes | B. Tutor no Claude Code | C. IA dentro do jogo |
|---|---|---|---|
| Como funciona | Cada conceito tem de 3 a 5 perguntas prontas e, para cada alternativa errada, a explicação do equívoco. O jogo sorteia outra variante a cada erro. | O jogo exporta os meus erros num arquivo. Numa sessão do Claude Code, um comando lê o arquivo, me ensina conversando e grava perguntas novas no banco. | O jogo chama um modelo a cada erro. |
| Funciona offline | sim | o jogo sim; a aula não | não |
| Custo | tokens uma vez, para gerar e conferir | usa a assinatura, sem custo por chamada | cobra por chamada de API |
| Limite | as variantes acabam | depende de abrir uma sessão | precisa de chave de API no navegador e de crédito |
| Risco | variante com erro vira erro decorado: precisa de verificador | pergunta nova entra sem conferência se eu não pedir | chave exposta numa página estática |

**Plano:** A e B juntos. A dá o retorno imediato dentro do jogo; B faz o banco crescer onde eu
de fato erro. C fica fora: hoje não há crédito de API, e uma chave numa página estática fica
visível para quem abrir o código.

## Temas

Cada tema tem lições de **base** (valem para qualquer projeto) e lições **nos meus projetos**.
A ordem segue os pré-requisitos.

| # | Tema | Exemplos de lição | De onde vêm os exemplos meus |
|---|---|---|---|
| 1 | Terminal e ambiente | comandos, variáveis de ambiente, instalar dependências | fundo-eleitoral-br, hub-integracoes |
| 2 | Lógica básica | variável, tipo, condicional, laço, função | thronfolge, contratinho |
| 3 | Estruturas de dados | lista, dicionário, JSON, texto | thronfolge, raio-x-patrimonial |
| 4 | Git e GitHub | commit, branch, conflito, histórico como documentação | todos (hoje sem parada) |
| 5 | Web | HTML, CSS, HTTP, API, CORS | diario-glicemia, hub-integracoes |
| 6 | Banco de dados e SQL | tabela, chave, consulta, índice, transação | liquidacao-pix, atlas-cientifico |
| 7 | Testes | teste unitário, de integração, o que um teste prova | thronfolge, hub-integracoes |
| 8 | Dados | pipeline, camadas, qualidade, DuckDB | fundo-eleitoral-br, atribuicao-canais |
| 9 | Concorrência e filas | fila, idempotência, repetição segura | atlas-cientifico, liquidacao-pix |
| 10 | Segurança e privacidade | segredo, assinatura, replay, LGPD | hub-integracoes, atribuicao-canais |
| 11 | Arquitetura e trade-offs | separar núcleo de interface, custo admitido | mesa-de-credito, thronfolge |
| 12 | Trabalhar com IA | o que foi meu e o que foi da ferramenta, revisão cruzada | atlas-cientifico, liquidacao-pix |

A base de cada tema sai dos repositórios de estudo já clonados (free-programming-books em
PT-BR, developer-roadmap, freeCodeCamp), citados como referência, sem copiar o texto deles.

## Formato do conteúdo

Um arquivo por lição, em `conteudo/temas/<tema>/<licao>.md`. O contrato completo, com um
exemplo inteiro, está em `conteudo/FORMATO.md`; o gerador do jogo lê exatamente aquilo.

```
# <conceito>
Pré-requisitos: <lições>
## Entender                  (explicação, analogia e "como ler")
## Exemplo mínimo            (código curto, de fora dos projetos)
## No meu projeto            (trecho real, com projeto/arquivo:linhas)
## Exercícios                (4 a 5 variantes; tipo: prever | onde | muda | erro)
   cada uma na voz do chefe, com uma mini-aula e, em cada alternativa errada,
   "por que atrai" e "o que falta saber"
## Explique com suas palavras (pergunta aberta + resposta-modelo + 3 pontos que precisam aparecer)
## Entrevista                (pergunta de decisão, fonte do motivo, seguimento)
## Onde estudar
```

Regras do conteúdo:

- Motivo de decisão só entra com fonte (documentação ou commit). Sem fonte, a lição diz
  "não documentado: prepare sua resposta".
- As alternativas de um exercício têm tamanho parecido; um teste barra o banco em que a certa
  é a mais longa na maioria.
- Todo trecho de exercício tem resposta conferível rodando o código.

## Fases

| Fase | Entrega | Quem faz | Como sei que terminou |
|---|---|---|---|
| 6. Piloto | formato fechado em `conteudo/FORMATO.md`; tema 2 (Lógica básica) com 4 lições: variável, condicional, laço, função | batedor (Haiku) levanta trechos; um escrivão (Sonnet) por lição; verificador (Opus) confere tudo | eu termino o piloto no navegador e anoto onde travei |
| 7. Motor | tela "Aulas" no jogo: lê as lições, ciclo de 5 passos, ciclo do erro com variantes, botão "Não sei, me explica", fila de revisão | construtor (Sonnet) | testes do gerador + as 4 lições do piloto jogáveis do início ao fim |
| 8. Conteúdo | temas 1 e 3 a 12, em lotes de 3 temas | batedores levantam exemplos; escrivães escrevem; verificador confere cada exercício e cada fonte | nenhuma variante com resposta errada; relatório de verificação por lote |
| 9. Tutor | botão "Exportar meus erros"; comando `/estudar` no Claude Code que ensina e grava variantes novas | construtor + eu | uma sessão real: erro no jogo → aula → variante nova aparece no jogo |
| 10. Entrevista falada | modo em que eu respondo sem alternativas, cronometrado, e me comparo com a resposta documentada | construtor | treino de um projeto inteiro sem múltipla escolha |

As fases 6 e 7 correm juntas: o construtor trabalha a partir do `FORMATO.md` enquanto o
conteúdo é escrito.

**Estado em 11/11/2026.** Fases 6 e 7 entregues, falta a minha parte (jogar o piloto e anotar
onde travei):

- 4 lições em `conteudo/temas/02-logica-basica/` (variável, condicional, laço, função), 5
  exercícios cada.
- Tela "Aulas" no jogo, com os 5 passos, o ciclo do erro, "Não sei, me explica" e a fila de
  revisão. `node --test` em `jogo/`: 35 testes passam.
- Verificação completa em `_brutos/verificacao-tema02.md`: 180 itens, 1 achado grave (motivo
  de entrevista que a fonte não sustentava, na lição de função), 14 médios e 12 leves. Todos
  corrigidos nas lições. As 20 respostas marcadas conferiram no Node.
- As quatro lições foram jogadas do início ao fim num navegador sem tela, sem erro.

A fase 8 é a mais cara. Estimativa pelo que as fases 1 a 5 gastaram: de 1,5 a 2,5 milhões de
tokens para os 12 temas com verificação completa; cerca de um terço disso com verificação por
amostra. A fase 6 existe para errar barato: o formato é testado em 4 lições antes de escrever 60.

## Organização dos agentes (igual à v1, com um ajuste)

```
Orquestrador (Opus): distribui, não lê código
├── Batedores (Haiku): leem projetos e material de estudo, escrevem só em _brutos/
├── Escrivães (Sonnet): um por arquivo; nunca dois no mesmo arquivo
├── Verificador (Opus): confere fonte, resposta certa e explicação de cada erro
└── Construtor (Sonnet): código do jogo
```

Ajuste: na v1 a regra era "um único escrivão". Com as correções em paralelo ela virou
"um escritor por arquivo", que manteve a segurança e cortou o tempo.

## Decisões

Fechadas em 11/11:

- **O que entra:** só projetos pessoais. Projetos de trabalho ficam fora de vez, inclusive da
  versão local. No repositório público entra só o que vem de projeto já publicado
  (`jogo/projetos-publicos.json`).
- **Mecânica:** leitura. Nada de exercício de escrever código.

Adotadas no piloto, e revistas quando eu terminar de jogá-lo:

- **Linguagem dos exemplos de base: JavaScript.** O Thronfolge, de onde vêm os trechos do
  tema 2, é JavaScript, e o navegador roda o exemplo. Python aparece em mais projetos meus de
  dados e pode entrar nos temas 8 em diante.
- **Ordem: tema 2 primeiro.** Começo do zero; o tema 12 depende de saber ler o resto.
- **Verificação do piloto: completa.** São 4 lições.

Ainda abertas:

1. **Verificação da fase 8:** completa ou por amostra. Completa custa cerca de 3 vezes mais; na
   v1 ela achou erro em 16% dos itens, inclusive respostas de autoria erradas.
2. **O que fazer com o material de projetos de trabalho que já existe na versão local** do
   quiz (`dados.local.js` e parte do inventário): apagar ou só deixar de usar.

## Histórico (v1, concluída em 10/11/2026)

| Fase | Resultado |
|---|---|
| 1. Inventário | 19 fichas de projeto, glossário, mapa de conceitos; 152 afirmações conferidas no código |
| 2. Trilha | 29 paradas e 9 itens de apêndice, cada um com trecho real |
| 3 e 4. Jogo | protótipo em HTML, CSS e JavaScript puros |
| 5. Entrevista | 183 decisões documentadas em pergunta e resposta; verificação completa de 362 itens, 64 correções |
