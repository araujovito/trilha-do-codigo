# Roteiro v2: de quiz para jogo de aprender

Escrito em 10/11/2026. Substitui o roteiro v1 (fases 1 a 5, concluídas).

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

## Objetivo da v2

Aprender programação **por temas**, usando os projetos como exemplo e não como limite, num
ciclo em que **o erro vira aula** e a pergunta seguinte é **outra**, não a mesma.

## O ciclo de uma lição

```
1. Entender   explicação curta + analogia
2. Ver        exemplo mínimo (de fora dos projetos) e depois o mesmo conceito num trecho meu
3. Mexer      exercício ativo: prever a saída, completar a lacuna, ordenar linhas, achar o erro
4. Explicar   resposta escrita com as minhas palavras; comparo com uma resposta-modelo
5. Entrevista a pergunta de decisão ligada ao tema, com fonte e seguimento
```

Errar em 3 ou 5 abre o **ciclo do erro**:

```
erro → "por que essa opção atrai" (o equívoco por trás dela)
     → mini-aula do ponto que faltou (2 a 4 frases + exemplo)
     → NOVA pergunta do mesmo conceito, com outras opções
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

Um arquivo por lição, em `conteudo/temas/<tema>/<licao>.md`:

```
# <conceito>
Pré-requisitos: <lições>
## Entender
## Exemplo mínimo            (código curto, de fora dos projetos)
## No meu projeto            (trecho real, com projeto/arquivo:linha)
## Exercícios                (3 a 5 variantes; tipo: prever | lacuna | ordenar | erro | escolha)
   cada alternativa errada traz "Por que atrai" e "O que falta saber"
## Explique com suas palavras (pergunta aberta + resposta-modelo + 3 pontos que precisam aparecer)
## Entrevista                (pergunta de decisão, fonte do motivo, seguimento)
## Onde estudar
```

Regra que continua valendo: motivo de decisão só entra com fonte (documentação ou commit).
Sem fonte, a lição diz "não documentado: prepare sua resposta".

## Fases

| Fase | Entrega | Quem faz | Como sei que terminou |
|---|---|---|---|
| 6. Desenho | formato da lição fechado; tema 2 (Lógica básica) escrito à mão como piloto, com 4 lições | escrivão (Sonnet) + eu jogando | eu termino o piloto e anoto onde travei |
| 7. Motor | o jogo lê lições por tema; exercícios de prever, lacuna e ordenar; ciclo do erro com variantes; fila de revisão | construtor (Sonnet) | testes do gerador + as 4 lições do piloto jogáveis do início ao fim |
| 8. Conteúdo | temas 1 a 12, em lotes de 3 temas | batedores (Haiku) levantam exemplos; escrivão escreve; verificador (Opus) confere cada exercício e cada fonte | nenhuma variante com resposta errada; relatório de verificação por lote |
| 9. Tutor | botão "Exportar meus erros"; comando `/estudar` no Claude Code que ensina e grava variantes novas | construtor + eu | uma sessão real: erro no jogo → aula → variante nova aparece no jogo |
| 10. Entrevista falada | modo em que eu respondo sem alternativas, cronometrado, e me comparo com a resposta documentada | construtor | treino de um projeto inteiro sem múltipla escolha |

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

## Decisões que ainda são minhas

1. **Verificação da fase 8:** completa ou por amostra. Completa custa cerca de 3 vezes mais; na
   v1 ela achou erro em 16% dos itens, inclusive respostas de autoria erradas.
2. **O que entra no repositório público.** Hoje só entra conteúdo de projetos que já são
   públicos. Projetos de trabalho ficam fora de vez; os pessoais ainda não publicados entram
   quando forem publicados.
3. **Linguagem dos exemplos de base:** JavaScript (roda no navegador, o jogo pode executar o
   exercício) ou Python (aparece em mais projetos meus de dados).
4. **Ordem:** começar pelo tema 2 (base) ou pelo tema 12 (a pergunta de entrevista mais provável
   para o meu portfólio).

## Histórico (v1, concluída em 10/11/2026)

| Fase | Resultado |
|---|---|
| 1. Inventário | 19 fichas de projeto, glossário, mapa de conceitos; 152 afirmações conferidas no código |
| 2. Trilha | 29 paradas e 9 itens de apêndice, cada um com trecho real |
| 3 e 4. Jogo | protótipo em HTML, CSS e JavaScript puros |
| 5. Entrevista | 183 decisões documentadas em pergunta e resposta; verificação completa de 362 itens, 64 correções |
