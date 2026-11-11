# thronfolge

Repositório: https://github.com/araujovito/thronfolge

## O que é
Jogo de estratégia política num mapa do começo da formação do Sacro Império Romano-Germânico (README.md:1-7; o termo "Reino Franco Oriental" só aparece em contexto.md), começando em 936, depois da morte de Henrique I. O jogador escolhe um governante, toma uma ação política por mês e acompanha como os outros personagens reagem (README.md:1-11, 36-41).

## Do que é feito
- JavaScript (cerca de 85%) — a simulação, o cenário, a interface e o servidor.
- Node.js — roda o servidor (servidor.js) e os testes (`node --test`); sem dependências externas (package.json:5-8).
- node:test e node:assert — testes em testes/*.test.js (testes/simulacao.test.js:1-2).
- HTML e CSS (cerca de 15%) — página única do protótipo (index.html, styles.css).
- DOM puro, sem framework de front-end — a interface em src/interface.js:33-47.
- JSON (dados/) — personagens, recursos, escolha régia e textos, com fontes históricas.

## Como as peças se encaixam
1. `node servidor.js` sobe um servidor estático só para 127.0.0.1 (servidor.js:30).
2. O navegador abre http://127.0.0.1:8080 e carrega index.html (mapa, ações).
3. src/cenario_936.js carrega os JSON históricos (async) e monta o cenário inicial.
4. src/simulacao.js valida a ação, calcula poder e apoios e resolve o turno (simulacao.js:278-284, :132-148, :419-478).
5. src/interface.js desenha na tela e salva o estado no localStorage (interface.js:259).
6. Os testes em testes/ conferem simulação, cenário e apresentação.

## Conceitos que aparecem aqui
- Módulos ES — src/simulacao.js:1-9 (exports) e package.json:4 (`"type": "module"`) — funções exportadas e importadas entre arquivos.
- Validação com exceção — src/simulacao.js:5-7 (`exigir`) — lança erro se a condição falhar.
- Cópia profunda de estado — src/simulacao.js:2 (`structuredClone`) — evita mutar a configuração original.
- Valores padrão com `??=` — src/simulacao.js:11-16 — preenche campos ausentes do estado.
- Guard clause — src/simulacao.js:278-279 — retorna cedo com o motivo da recusa.
- try/catch — src/simulacao.js:280-284 — converte erro de personagem inexistente em resultado `valida: false`.
- Função pura de cálculo — src/simulacao.js:132-142 (`calcularPoder`) — conta territórios, soldados e ouro sem alterar o estado.
- Encadeamento funcional — src/simulacao.js:144-148 (`Object.entries`, `filter`, `map`) — lista apoiadores de um pretendente.
- Função assíncrona — src/cenario_936.js:59 (`carregarCenario936`, `async`) — carrega os JSON históricos.
- Persistência no navegador — src/interface.js:259 (`localStorage.setItem`) com chave em interface.js:15.

## Dúvidas em aberto
- src/relatorio.js e testes/relatorio.test.js existem no disco mas não estão versionados (`git ls-files --others`).
- contexto.md tem mais de 4 KB; li só o início (visão, premissa, regras de simulação). O restante não foi lido.
- index.html não foi lido até o fim; não confirmei como os módulos src/ são carregados pela página.
- O fluxo de `resolverTurno` (simulacao.js:419-478) e a lógica de apoio (simulacao.js:151-224) foram só localizados, não lidos em detalhe.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
