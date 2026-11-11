# Trilha do Código

Um jogo para eu aprender programação usando os meus próprios projetos como material, com foco
em **explicar as decisões deles numa entrevista de emprego**.

Comecei com conhecimento de programação quase zero e um portfólio construído com ajuda de
ferramentas de IA. O problema que este projeto ataca: saber dizer **por que** cada coisa foi
feita do jeito que foi, com base no que está escrito na documentação e nos commits, e saber
dizer **o que foi meu e o que foi da ferramenta**.

## Estado atual

Protótipo jogável. Hoje ele é um quiz; o plano para virar um jogo de aprender por temas, em
que o erro vira aula, está em [`ROTEIRO.md`](ROTEIRO.md).

- **Trilha:** cada parada tem uma explicação para iniciante, um trecho real de um projeto e
  uma pergunta feita como um entrevistador faria. Ao acertar, aparecem a fonte do motivo e a
  pergunta de seguimento provável.
- **Modo entrevista:** por projeto. Pitch de 30 segundos, depois as decisões uma a uma: leio
  a pergunta, respondo em voz alta, revelo a resposta documentada (com fonte e custo
  admitido) e me avalio.

Esta versão pública traz 20 paradas, 9 itens de apêndice e 104 decisões de 10 projetos.

## Como jogar

Abra `jogo/index.html` no navegador. Não tem instalação, servidor nem dependência.

```
cd jogo
node gerar-dados.mjs    # regenera dados.js a partir do inventário
node --test             # confere os dados (Node 22+)
```

## Decisões do projeto

**A resposta certa é sempre o motivo documentado.** Cada resposta de decisão cita
`arquivo:linha` ou um commit do projeto de origem. Quando o motivo não está escrito em lugar
nenhum, o jogo mostra "não documentado: prepare sua resposta" em vez de inventar uma
justificativa. Custo: muitas decisões ficam sem resposta pronta. Em entrevista, uma
justificativa bonita que não foi a real é pior que admitir que a decisão não foi registrada.

**HTML, CSS e JavaScript puros, sem biblioteca e sem build.** O código do jogo também é
material de estudo, então precisa ser legível por quem está começando, e o jogo precisa abrir
com dois cliques. Custo: sem componentes prontos, a interface é simples.

**O conteúdo fica em Markdown e o jogo lê um arquivo gerado.** `jogo/gerar-dados.mjs`
transforma o inventário em `jogo/dados.js`. O texto pode ser corrigido sem tocar no código do
jogo. Custo: o formato do Markdown vira um contrato, e os testes existem para vigiá-lo.

**Dados carregados por `<script>`, não por `fetch`.** Um arquivo aberto direto do disco
(`file://`) não consegue fazer `fetch` de outro arquivo; uma tag de script consegue.

**Texto sempre por `textContent`.** O conteúdo vem de arquivos gerados por modelos de
linguagem; nada dele é inserido como HTML.

**Só entra no repositório o que vem de projeto público.** O inventário completo cobre 19
projetos, incluindo projetos de trabalho e projetos pessoais ainda não publicados. A lista do
que pode sair está em `jogo/projetos-publicos.json`; o gerador produz `dados.js` (público) e
`dados.local.js` (completo, fora do Git), e um teste falha se algo de fora da lista aparecer
no arquivo público.

## Como o conteúdo foi produzido

Por uma pequena arquitetura de agentes, desenhada para gastar pouco com leitura e concentrar
o modelo mais caro na conferência:

```
Orquestrador: distribui o trabalho, não lê código
├── Batedores (modelo pequeno): leem os projetos e escrevem relatórios brutos, com arquivo:linha
├── Escrivão (modelo médio): único que escreve a documentação final
└── Verificador (modelo maior): confere cada afirmação contra o código e a documentação
```

Os números da verificação, porque são eles que dizem quanto confiar no conteúdo:

| Rodada | Itens conferidos | Confirmados | Com divergência | Errados |
|---|---|---|---|---|
| Fichas dos projetos (amostra de até 8 por projeto) | 152 | 94% | 7 | 2 |
| Material de entrevista (todos os itens) | 362 | 84% | 46 | 11 |

Todas as correções apontadas foram aplicadas. O tipo de erro mais relevante: respostas em
primeira pessoa ("eu construí", "escolhi Go") em pontos onde a documentação do projeto
registra que uma ferramenta implementou, outra revisou, ou que a escolha foi um requisito de
origem. Essas respostas foram reescritas para dizer o que a fonte diz.

O que **não** foi conferido: se as explicações para iniciante são boas para aprender. Isso só
aparece jogando, e é o ponto de partida do roteiro v2.

## O que há no repositório

```
ROTEIRO.md                plano da v2 (temas, ciclo do erro, fases)
DESIGN_JOGO.md            como o jogo atual funciona
jogo/                     o jogo, o gerador de dados e os testes
inventario/
  GLOSSARIO.md            167 termos explicados para iniciante
  TRILHA-publica.md       as paradas públicas (fonte de jogo/dados.js)
  projetos/               ficha de cada projeto: o que é, do que é feito, conceitos com arquivo:linha
  entrevista/             roteiro de entrevista de cada projeto
```

Projetos cobertos: atlas-cientifico, atribuicao-canais, contratinho, diario-glicemia,
fundo-eleitoral-br, hub-integracoes, liquidacao-pix, mesa-de-credito, raio-x-patrimonial e
thronfolge, todos em [github.com/araujovito](https://github.com/araujovito).

## Limites conhecidos

- É um quiz: errar devolve a mesma pergunta, sem ensinar. Ver `ROTEIRO.md`.
- Só há parada para conceito que apareceu num trecho de projeto. Git, Docker e TypeScript,
  por exemplo, ainda não têm.
- As citações `arquivo:linha` valem para o estado dos projetos em 10/11/2026 e envelhecem
  quando os projetos mudam.
- O material de estudo indicado em "Onde estudar" aponta para repositórios de terceiros
  (free-programming-books, developer-roadmap, freeCodeCamp), que não fazem parte deste.
