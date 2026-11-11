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

## Como rodar o teste

```
node --test
```

(`test.mjs` apenas chama `teste-dados.mjs`, para o `node --test` achar o teste sozinho.) O teste confere 29 paradas (3 alternativas, 1 correta, código, fonte do motivo, seguimento, pré-requisitos) e 19 entrevistas (pitch, decisões com pergunta, resposta e fonte).

## Mapa do código

| Arquivo | O que faz |
|---|---|
| `index.html` | Esqueleto da página: título, botões e a área onde o jogo desenha. Carrega os outros arquivos. |
| `estilo.css` | Aparência. As cores ficam no topo, em variáveis; o tema escuro troca só esses valores. |
| `dados.js` | As paradas em formato de dados. É gerado, não edite à mão. |
| `jogo.js` | A lógica: regras de liberação, telas (mapa, parada, seus projetos), estrelas e salvamento. Leia de cima para baixo: dados, regras, ajudas, telas, início. |
| `gerar-dados.mjs` | Lê `TRILHA.md` e escreve `dados.js`. |
| `teste-dados.mjs` | Confere se `dados.js` está coerente. |
| `test.mjs` | Atalho de uma linha que faz `node --test` encontrar o teste. |

## Telas

- Mapa: cada parada tem 3 etapas; a última é o "Entrevistador pergunta" (pergunta, fonte do motivo e seguimento provável).
- Modo entrevista: escolha um projeto, leia o pitch, revele a resposta de cada decisão e se avalie (Sei explicar / Mais ou menos / Não sei). No fim: contagem, lista dos "Não sei", decisões sem motivo registrado e perguntas difíceis. Projetos de trabalho mostram o aviso de sigilo.
- Seus projetos: paradas concluídas e decisões "Sei explicar" por projeto.

Progresso: salvo no `localStorage` do navegador. "Recomeçar" apaga.

A autoavaliação fica em outra chave do mesmo `localStorage`; "Recomeçar" apaga as duas.

## Dados públicos e dados completos

`gerar-dados.mjs` escreve `dados.js` só com os projetos listados em `projetos-publicos.json`. Na máquina do autor ele também escreve `dados.local.js`, com todos os projetos; esse arquivo está no `.gitignore`. O `index.html` carrega os dois: quando `dados.local.js` não existe, o navegador registra um aviso de arquivo não encontrado no console e o jogo segue com `dados.js`.
