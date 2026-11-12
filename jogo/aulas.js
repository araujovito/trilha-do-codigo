// Aulas: lições por tema, com 5 passos (Entender, Ver, Ler, Explicar, Entrevista) e revisão espaçada.
// Os dados vêm de licoes.js (window.LICOES) e as regras puras de regras-aulas.js.
// Usa as ajudas de jogo.js (el, comCodigo, botao, tela, estrelasTxt), que é carregado antes.
(function () {
  'use strict';

  const temas = (window.LICOES && window.LICOES.temas) || [];
  const todas = temas.flatMap((t) => t.licoes);
  const R = window.REGRAS_AULAS;
  const botaoAulas = document.getElementById('btn-aulas');
  if (!todas.length || !R) return; // sem lições: o jogo continua como era (botão "Aulas" fica escondido)
  botaoAulas.hidden = false;

  const CHAVE = 'trilha-do-codigo-aulas-v1';
  // estado = { concluidas: { idLicao: estrelas }, fila: [{ licao, etapa, vence }], textos: { idLicao: texto } }
  let estado = { concluidas: {}, fila: [], textos: {} };
  function carregarAulas() {
    try {
      const lido = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      if (lido && typeof lido === 'object') {
        estado = { concluidas: lido.concluidas || {}, fila: Array.isArray(lido.fila) ? lido.fila : [], textos: lido.textos || {} };
      }
    } catch (e) { /* segue com o estado vazio */ }
  }
  function salvarAulas() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* segue sem salvar */ }
  }
  // Chamada pelo botão "Recomeçar" de jogo.js.
  window.apagarAulas = function () {
    estado = { concluidas: {}, fila: [], textos: {} };
    try { localStorage.removeItem(CHAVE); } catch (e) { /* segue */ }
  };

  const porId = (id) => todas.find((l) => l.id === id);
  const concluida = (id) => estado.concluidas[id] > 0;
  const livre = (l) => l.prereqs.every(concluida);

  // ---------- ajudas de tela ----------
  // Como mostrar() de jogo.js, mas com o resumo próprio das aulas.
  function mostrarAula(fn) {
    tela.replaceChildren();
    fn();
    const feitas = todas.filter((l) => concluida(l.id)).length;
    const est = Object.values(estado.concluidas).reduce((a, b) => a + b, 0);
    document.getElementById('resumo').textContent = feitas + ' de ' + todas.length + ' lições concluídas · ' + est + ' estrelas';
    tela.focus();
  }
  // Código com as linhas numeradas: os exercícios falam em "linha 2".
  function desenharCodigo(codigo) {
    const pre = document.createElement('pre');
    pre.tabIndex = 0; // permite rolar o código pelo teclado
    pre.setAttribute('aria-label', 'Trecho de código, com linhas numeradas');
    const code = document.createElement('code');
    codigo.split('\n').forEach((linha, i) => {
      const l = el('span', undefined, 'linha');
      const n = el('span', String(i + 1), 'n');
      n.setAttribute('aria-hidden', 'true');
      l.appendChild(n);
      l.appendChild(document.createTextNode(linha === '' ? ' ' : linha));
      code.appendChild(l);
    });
    pre.appendChild(code);
    return pre;
  }
  function desenharBlocos(pai, blocos) {
    blocos.forEach((b) => pai.appendChild(b.t === 'code' ? desenharCodigo(b.codigo) : comCodigo(el('p'), b.texto)));
  }
  function balao(quem, texto) {
    const b = el('div', undefined, 'balao');
    b.appendChild(el('span', quem, 'quem'));
    b.appendChild(comCodigo(el('p'), texto));
    return b;
  }
  function secao(pai, titulo, texto) {
    pai.appendChild(el('h3', titulo));
    pai.appendChild(comCodigo(el('p'), texto));
  }
  const dataHoje = () => R.hoje();

  // ---------- tela: lista de aulas ----------
  function telaAulas() {
    mostrarAula(() => {
      tela.appendChild(el('h2', 'Aulas'));
      const devidos = R.vencidos(estado.fila, dataHoje());
      const painel = el('div', undefined, 'painel');
      painel.appendChild(el('strong', 'Revisão de hoje: ' + devidos.length));
      painel.appendChild(el('p', estado.fila.length
        ? estado.fila.length + ' lição(ões) na fila de revisão.'
        : 'Lições em que você erra ou pede explicação voltam aqui depois de 1, 3 e 7 dias.', 'etapa'));
      if (devidos.length) {
        const acoes = el('div', undefined, 'acoes');
        acoes.appendChild(botao('Revisar agora', () => telaRevisao(), 'primario'));
        painel.appendChild(acoes);
      }
      tela.appendChild(painel);

      temas.forEach((t) => {
        tela.appendChild(el('h3', t.nome));
        const ul = el('ul', undefined, 'lista');
        t.licoes.forEach((l, i) => {
          const feita = concluida(l.id);
          const aberta = livre(l);
          const b = el('button', undefined, 'parada' + (feita ? ' concluida' : aberta ? ' livre' : ''));
          b.type = 'button';
          b.disabled = !aberta && !feita;
          b.appendChild(el('span', feita ? '✓' : String(i + 1), 'num'));
          const info = el('span', undefined, 'info');
          info.appendChild(document.createTextNode(l.titulo));
          const faltam = l.prereqs.filter((p) => !concluida(p)).map((p) => (porId(p) || { titulo: p }).titulo);
          info.appendChild(el('span', feita ? 'Concluída' : aberta ? 'Livre' : 'Bloqueada: falta concluir ' + faltam.join(', '), 'sub'));
          b.appendChild(info);
          if (feita) {
            const s = el('span', estrelasTxt(estado.concluidas[l.id]), 'estrelas');
            s.setAttribute('aria-label', estado.concluidas[l.id] + ' de 3 estrelas');
            b.appendChild(s);
          }
          b.addEventListener('click', () => abrirLicao(l));
          const li = document.createElement('li');
          li.appendChild(b);
          ul.appendChild(li);
        });
        tela.appendChild(ul);
      });
    });
  }
  window.telaAulas = telaAulas;

  // ---------- um exercício (usado no passo 3 e na revisão) ----------
  // cb.aoResolver(resultado): resultado é 'certa', 'errada' ou 'pediu'.
  // cb.seguir(resultado) devolve { rotulo, fn } para o botão que vem depois da explicação.
  function desenharExercicio(caixa, ex, cb) {
    caixa.appendChild(balao('Chefe', ex.chefe));
    desenharBlocos(caixa, ex.blocos);

    const opcoes = el('div', undefined, 'opcoes');
    const retorno = el('div');
    retorno.setAttribute('aria-live', 'polite');
    let resolvido = false;
    const botoes = [];

    function resolver(resultado, alt, botaoEscolhido) {
      if (resolvido) return;
      resolvido = true;
      botoes.forEach((x) => { x.b.disabled = true; if (x.alt.correta) x.b.classList.add('certa'); });
      pedir.disabled = true;
      cb.aoResolver(resultado);
      const certa = ex.alternativas.find((a) => a.correta);
      retorno.replaceChildren();
      if (resultado === 'certa') {
        retorno.appendChild(el('p', 'Isso mesmo.', 'retorno ok'));
        secao(retorno, 'Por quê', certa.porque);
        secao(retorno, 'Aula', ex.aula);
      } else if (resultado === 'errada') {
        botaoEscolhido.classList.add('errada');
        retorno.appendChild(el('p', 'Essa não era a certa, e a confusão é comum. Veja o que está por trás dela.', 'retorno erro'));
        secao(retorno, 'Por que essa opção atrai', alt.atrai);
        secao(retorno, 'O que faltou saber', alt.falta);
        secao(retorno, 'Aula', ex.aula);
        secao(retorno, 'A certa era: ' + certa.texto, certa.porque);
      } else {
        retorno.appendChild(el('p', 'Tudo bem: esta é a aula deste trecho.', 'retorno info'));
        secao(retorno, 'Aula', ex.aula);
        secao(retorno, 'A certa é: ' + certa.texto, certa.porque);
      }
      const prox = cb.seguir(resultado);
      const acoes = el('div', undefined, 'acoes');
      acoes.appendChild(botao(prox.rotulo, prox.fn, 'primario'));
      retorno.appendChild(acoes);
    }

    R.embaralhar(ex.alternativas).forEach((alt, i) => {
      const b = el('button', undefined, 'opcao');
      b.type = 'button';
      b.appendChild(document.createTextNode('abcd'[i] + ') '));
      comCodigo(b, alt.texto);
      b.addEventListener('click', () => resolver(alt.correta ? 'certa' : 'errada', alt, b));
      botoes.push({ b, alt });
      opcoes.appendChild(b);
    });
    caixa.appendChild(opcoes);
    const pedir = botao('Não sei, me explica', () => resolver('pediu'));
    caixa.appendChild(pedir);
    caixa.appendChild(retorno);
  }

  // ---------- tela: uma lição ----------
  const NOMES_PASSOS = ['Entender', 'Ver', 'Ler', 'Explicar', 'Entrevista'];

  function abrirLicao(l) {
    let passo = 1;
    let indice = 0;          // exercício atual do passo 3
    let vistos = 1;          // exercícios vistos até o primeiro acerto
    let recomecou = false;   // true quando as variantes acabaram e voltamos ao primeiro
    let estrelasGanhas = 0;  // definido no primeiro acerto do passo 3
    let comparado = false;   // passo 4: já comparou com o modelo
    let revelada = false;    // passo 5: já revelou a resposta

    function desenhar() {
      mostrarAula(() => {
        tela.appendChild(botao('← Voltar à lista de aulas', telaAulas));
        tela.appendChild(el('h2', l.titulo));
        tela.appendChild(el('p', 'Passo ' + passo + ' de 5: ' + NOMES_PASSOS[passo - 1], 'etapa'));
        const caixa = el('div', undefined, 'painel');
        tela.appendChild(caixa);
        [passoEntender, passoVer, passoLer, passoExplicar, passoEntrevista][passo - 1](caixa);
      });
    }
    function avancar(caixa, rotulo) {
      const acoes = el('div', undefined, 'acoes');
      acoes.appendChild(botao(rotulo, () => { passo++; desenhar(); }, 'primario'));
      caixa.appendChild(acoes);
    }

    function passoEntender(caixa) {
      desenharBlocos(caixa, l.entender);
      avancar(caixa, 'Ver o exemplo');
    }
    function passoVer(caixa) {
      caixa.appendChild(el('h3', 'Exemplo mínimo'));
      desenharBlocos(caixa, l.exemplo);
      caixa.appendChild(el('h3', 'No meu projeto'));
      caixa.appendChild(el('p', l.projeto.origem, 'origem'));
      desenharBlocos(caixa, l.projeto.blocos);
      avancar(caixa, 'Ir para as perguntas do chefe');
    }
    function passoLer(caixa) {
      const ex = l.exercicios[indice];
      caixa.appendChild(el('p', 'Exercício ' + (indice + 1) + ' de ' + l.exercicios.length + ' (' + ex.tipo + ')', 'etapa'));
      if (recomecou) caixa.appendChild(el('p', 'Você já viu este trecho; agora tente de novo com a explicação em mente.', 'retorno info'));
      desenharExercicio(caixa, ex, {
        aoResolver(resultado) {
          if (resultado === 'certa') {
            if (!estrelasGanhas) estrelasGanhas = R.estrelas(vistos);
          } else {
            estado.fila = R.entrarNaFila(estado.fila, l.id, dataHoje());
            salvarAulas();
          }
        },
        seguir(resultado) {
          if (resultado === 'certa') return { rotulo: 'Ir para o passo 4: Explicar', fn: () => { passo = 4; desenhar(); } };
          return {
            rotulo: 'Tentar com outro trecho',
            fn: () => {
              const prox = R.proximaVariante(indice, l.exercicios.length);
              indice = prox.indice;
              recomecou = prox.recomecou;
              vistos++;
              desenhar();
            },
          };
        },
      });
    }
    function passoExplicar(caixa) {
      caixa.appendChild(balao('Chefe', l.explique.pergunta));
      const rotulo = el('label', 'Sua resposta, com as suas palavras');
      rotulo.htmlFor = 'resposta-licao';
      rotulo.className = 'rotulo';
      const campo = document.createElement('textarea');
      campo.id = 'resposta-licao';
      campo.rows = 6;
      campo.value = estado.textos[l.id] || '';
      campo.addEventListener('input', () => { estado.textos[l.id] = campo.value; salvarAulas(); });
      caixa.appendChild(rotulo);
      caixa.appendChild(campo);
      const modelo = el('div');
      modelo.setAttribute('aria-live', 'polite');
      function mostrarModelo() {
        modelo.appendChild(el('h3', 'Resposta-modelo'));
        modelo.appendChild(comCodigo(el('p'), l.explique.modelo));
        modelo.appendChild(el('h3', 'Confira na sua resposta'));
        l.explique.pontos.forEach((p, i) => {
          const linha = el('label', undefined, 'ponto');
          const cx = document.createElement('input');
          cx.type = 'checkbox';
          cx.id = 'ponto-' + i;
          linha.appendChild(cx);
          linha.appendChild(document.createTextNode(' '));
          comCodigo(linha.appendChild(el('span')), p);
          linha.appendChild(el('span', ' (apareceu na minha resposta)', 'etapa'));
          modelo.appendChild(linha);
        });
        const acoes = el('div', undefined, 'acoes');
        acoes.appendChild(botao('Ir para a entrevista', () => { passo = 5; desenhar(); }, 'primario'));
        modelo.appendChild(acoes);
      }
      const comp = botao('Comparar com o modelo', () => { comp.remove(); mostrarModelo(); }, 'primario');
      const acoesComp = el('div', undefined, 'acoes');
      acoesComp.appendChild(comp);
      caixa.appendChild(acoesComp);
      caixa.appendChild(modelo);
    }
    function passoEntrevista(caixa) {
      const e = l.entrevista;
      caixa.appendChild(el('p', 'Projeto: ' + e.projeto, 'etapa'));
      caixa.appendChild(balao('Entrevistador · ' + e.projeto, e.pergunta));
      const resp = el('div');
      resp.setAttribute('aria-live', 'polite');
      const ver = botao('Revelar resposta', () => {
        ver.remove();
        secao(resp, 'Resposta', e.resposta);
        secao(resp, 'Fonte', e.fonte);
        resp.appendChild(el('h3', 'Seguimento provável'));
        resp.appendChild(balao('Entrevistador', e.seguimento));
        secao(resp, 'Como responder ao seguimento', e.respostaSeguimento);
        resp.appendChild(el('h3', 'Onde estudar'));
        const ul = document.createElement('ul');
        l.ondeEstudar.forEach((o) => ul.appendChild(comCodigo(el('li'), o)));
        resp.appendChild(ul);
        const acoes = el('div', undefined, 'acoes');
        acoes.appendChild(botao('Concluir lição', concluir, 'primario'));
        resp.appendChild(acoes);
      }, 'primario');
      caixa.appendChild(el('p', 'Responda em voz alta antes de revelar.', 'etapa'));
      caixa.appendChild(ver);
      caixa.appendChild(resp);
    }
    function concluir() {
      // Guarda a melhor nota; se o jogador pulou o passo 3 de alguma forma, vale 1 estrela.
      estado.concluidas[l.id] = Math.max(estado.concluidas[l.id] || 0, estrelasGanhas || 1);
      salvarAulas();
      telaAulas();
    }
    desenhar();
  }

  // ---------- tela: revisão de hoje ----------
  function telaRevisao() {
    const devidos = R.vencidos(estado.fila, dataHoje());
    if (!devidos.length) { telaAulas(); return; }
    const item = devidos[0];
    const l = porId(item.licao);
    if (!l) { // lição que deixou de existir: tira da fila
      estado.fila = estado.fila.filter((i) => i !== item);
      salvarAulas();
      telaRevisao();
      return;
    }
    const ex = l.exercicios[Math.floor(Math.random() * l.exercicios.length)];
    mostrarAula(() => {
      tela.appendChild(botao('← Voltar à lista de aulas', telaAulas));
      tela.appendChild(el('h2', 'Revisão: ' + l.titulo));
      tela.appendChild(el('p', 'Faltam ' + devidos.length + ' revisão(ões) hoje. Etapa ' + (item.etapa + 1) + ' de ' + R.INTERVALOS.length + '.', 'etapa'));
      const caixa = el('div', undefined, 'painel');
      tela.appendChild(caixa);
      desenharExercicio(caixa, ex, {
        aoResolver(resultado) {
          estado.fila = R.resolverRevisao(estado.fila, l.id, resultado === 'certa', dataHoje());
          salvarAulas();
        },
        seguir() {
          const resta = R.vencidos(estado.fila, dataHoje()).length > 0;
          return resta ? { rotulo: 'Próxima revisão', fn: telaRevisao } : { rotulo: 'Voltar à lista de aulas', fn: telaAulas };
        },
      });
    });
  }

  // ---------- início ----------
  botaoAulas.addEventListener('click', telaAulas);
  carregarAulas();
  telaAulas();
})();
