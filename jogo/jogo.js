// Trilha do Código: lógica do jogo. Os dados vêm de dados.js (window.TRILHA).
'use strict';

const CHAVE = 'trilha-do-codigo-v1';   // nome da gaveta no localStorage
const paradas = window.TRILHA.paradas;
const apendice = window.TRILHA.apendice;

// progresso = { "1": 3, "2": 2, "D1": 1 }: id da parada -> estrelas ganhas
let progresso = {};
// Quando o storage falha, guardamos só na memória (some ao fechar a página).

function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    const lido = bruto ? JSON.parse(bruto) : {};
    if (lido && typeof lido === 'object') progresso = lido;
  } catch (e) { progresso = {}; }
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(progresso)); } catch (e) { /* segue sem salvar */ }
}

// Autoavaliação do modo entrevista: { "projeto|indice": "sei" | "meio" | "nao" }.
const CHAVE_AUTO = 'trilha-do-codigo-auto-v1';
const entrevistas = window.TRILHA.entrevistas || [];
let auto = {};
function carregarAuto() {
  try {
    const lido = JSON.parse(localStorage.getItem(CHAVE_AUTO) || '{}');
    if (lido && typeof lido === 'object') auto = lido;
  } catch (e) { auto = {}; }
}
function salvarAuto() {
  try { localStorage.setItem(CHAVE_AUTO, JSON.stringify(auto)); } catch (e) { /* segue sem salvar */ }
}
const contaAuto = (proj, valor) => Object.keys(auto).filter((k) => k.startsWith(proj + '|') && auto[k] === valor).length;

// ---------- regras ----------
const idDe = (p, ehApendice) => (ehApendice ? 'D' + p.numero : String(p.numero));
const concluida = (id) => progresso[id] > 0;
const todasConcluidas = () => paradas.every((p) => concluida(String(p.numero)));

// Uma parada está livre quando todos os pré-requisitos estão concluídos.
function liberada(p, ehApendice) {
  if (ehApendice && !todasConcluidas()) return false;
  const ok = p.prereqs.every((n) => concluida(String(n)));
  const okDepois = (p.prereqsDepois || []).every((n) => concluida('D' + n));
  return ok && okDepois;
}

// ---------- ajudas para montar a tela ----------
// Cria um elemento com texto seguro (textContent, nunca innerHTML).
function el(tag, texto, classe) {
  const e = document.createElement(tag);
  if (texto !== undefined) e.textContent = texto;
  if (classe) e.className = classe;
  return e;
}
// Escreve um texto e desenha o que está entre `crases` como <code>.
function comCodigo(pai, texto) {
  texto.split('`').forEach((pedaco, i) => {
    if (i % 2 === 1) pai.appendChild(el('code', pedaco));
    else pai.appendChild(document.createTextNode(pedaco));
  });
  return pai;
}
const estrelasTxt = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
const tela = document.getElementById('tela');
function mostrar(fn) {
  tela.replaceChildren();
  fn();
  atualizarResumo();
  tela.focus();
}
function atualizarResumo() {
  const feitas = paradas.filter((p) => concluida(String(p.numero))).length;
  const estrelas = Object.values(progresso).reduce((a, b) => a + b, 0);
  document.getElementById('resumo').textContent =
    feitas + ' de ' + paradas.length + ' paradas concluídas · ' + estrelas + ' estrelas';
}

// ---------- tela: mapa ----------
function desenharLista(lista, ehApendice) {
  const ul = el('ul', undefined, 'lista');
  lista.forEach((p) => {
    const id = idDe(p, ehApendice);
    const li = document.createElement('li');
    const livre = liberada(p, ehApendice);
    const feita = concluida(id);
    const b = el('button', undefined, 'parada' + (feita ? ' concluida' : livre ? ' livre' : ''));
    b.type = 'button';
    b.disabled = !livre && !feita;
    b.appendChild(el('span', feita ? '✓' : String(p.numero), 'num'));
    const info = el('span', undefined, 'info');
    info.appendChild(document.createTextNode(p.nome));
    let sub = p.projeto;
    if (!livre && !feita) sub = ehApendice && !todasConcluidas() ? 'Bloqueada: conclua as ' + paradas.length + ' paradas' : 'Bloqueada: falta concluir ' + faltam(p).join(', ');
    info.appendChild(el('span', sub, 'sub'));
    b.appendChild(info);
    if (feita) {
      const s = el('span', estrelasTxt(progresso[id]), 'estrelas');
      s.setAttribute('aria-label', progresso[id] + ' de 3 estrelas');
      b.appendChild(s);
    }
    b.addEventListener('click', () => abrirParada(p, ehApendice));
    li.appendChild(b);
    ul.appendChild(li);
  });
  return ul;
}
function faltam(p) {
  const f = p.prereqs.filter((n) => !concluida(String(n))).map((n) => 'parada ' + n);
  (p.prereqsDepois || []).filter((n) => !concluida('D' + n)).forEach((n) => f.push('Depois ' + n));
  return f;
}
function telaMapa() {
  mostrar(() => {
    tela.appendChild(el('h2', 'Mapa de paradas'));
    tela.appendChild(desenharLista(paradas, false));
    tela.appendChild(el('h2', 'Depois'));
    tela.appendChild(el('p', 'Conceitos avançados. Liberam quando as ' + paradas.length + ' paradas estiverem concluídas.', 'etapa'));
    tela.appendChild(desenharLista(apendice, true));
  });
}

// ---------- tela: seus projetos ----------
function telaProjetos() {
  mostrar(() => {
    tela.appendChild(el('h2', 'Seus projetos'));
    // Conta, por projeto, as paradas que usam trecho dele (só as 29 principais).
    const contas = {};
    paradas.forEach((p) => {
      const c = contas[p.projeto] || (contas[p.projeto] = { total: 0, feitas: 0 });
      c.total++;
      if (concluida(String(p.numero))) c.feitas++;
    });
    // Projetos só com roteiro de entrevista (sem parada) também aparecem.
    entrevistas.forEach((e) => { if (!contas[e.projeto]) contas[e.projeto] = { total: 0, feitas: 0 }; });
    Object.keys(contas).sort().forEach((nome) => {
      const c = contas[nome];
      const caixa = el('div', undefined, 'painel');
      caixa.appendChild(el('strong', nome));
      caixa.appendChild(el('p', c.feitas + ' de ' + c.total + ' paradas concluídas', 'etapa'));
      const e = entrevistas.find((x) => x.projeto === nome);
      if (e) caixa.appendChild(el('p', contaAuto(nome, 'sei') + ' de ' + e.decisoes.length + ' decisões marcadas "Sei explicar"', 'etapa'));
      const barra = el('div', undefined, 'barra');
      const dentro = document.createElement('span');
      dentro.style.width = (c.total ? 100 * c.feitas / c.total : 0) + '%';
      barra.appendChild(dentro);
      caixa.appendChild(barra);
      tela.appendChild(caixa);
    });
  });
}

// ---------- tela: modo entrevista ----------
function botao(rotulo, fn, classe) {
  const b = el('button', rotulo, classe);
  b.type = 'button';
  b.addEventListener('click', fn);
  return b;
}
function telaEntrevista() {
  mostrar(() => {
    tela.appendChild(el('h2', 'Modo entrevista'));
    tela.appendChild(el('p', 'Escolha um projeto e treine explicar cada decisão em voz alta.', 'etapa'));
    const ul = el('ul', undefined, 'lista');
    entrevistas.forEach((e) => {
      const li = document.createElement('li');
      const b = el('button', undefined, 'parada livre');
      b.type = 'button';
      const info = el('span', undefined, 'info');
      info.appendChild(document.createTextNode(e.projeto));
      info.appendChild(el('span', contaAuto(e.projeto, 'sei') + ' de ' + e.decisoes.length + ' decisões "Sei explicar"', 'sub'));
      b.appendChild(info);
      b.addEventListener('click', () => abrirEntrevista(e));
      li.appendChild(b);
      ul.appendChild(li);
    });
    tela.appendChild(ul);
  });
}
function abrirEntrevista(e) {
  function cabecalho(titulo) {
    tela.appendChild(botao('← Escolher outro projeto', telaEntrevista));
    tela.appendChild(el('h2', e.projeto));
    if (e.aviso) tela.appendChild(el('p', e.aviso, 'aviso'));
    if (titulo) tela.appendChild(el('p', titulo, 'etapa'));
  }
  function inicio() {
    mostrar(() => {
      cabecalho('Pitch de 30 segundos');
      const c = el('div', undefined, 'painel');
      comCodigo(c.appendChild(el('p')), e.pitch);
      c.appendChild(el('p', e.decisoes.length + ' decisões para treinar.', 'etapa'));
      const acoes = el('div', undefined, 'acoes');
      if (e.decisoes.length) acoes.appendChild(botao('Começar as decisões', () => decisao(0), 'primario'));
      else acoes.appendChild(botao('Ver o fim do roteiro', fim, 'primario'));
      c.appendChild(acoes);
      tela.appendChild(c);
    });
  }
  function decisao(i, revelada) {
    mostrar(() => {
      const d = e.decisoes[i];
      cabecalho('Decisão ' + (i + 1) + ' de ' + e.decisoes.length);
      const c = el('div', undefined, 'painel');
      const balao = el('div', undefined, 'balao');
      balao.appendChild(el('span', 'Entrevistador', 'quem'));
      comCodigo(balao.appendChild(el('p')), d.pergunta);
      c.appendChild(balao);
      if (!revelada) {
        c.appendChild(el('p', 'Responda em voz alta antes de revelar.', 'etapa'));
        c.appendChild(botao('Revelar resposta', () => decisao(i, true), 'primario'));
      } else {
        c.appendChild(el('h3', 'Resposta'));
        comCodigo(c.appendChild(el('p')), d.resposta);
        c.appendChild(el('h3', 'Fonte'));
        comCodigo(c.appendChild(el('p')), d.fonte);
        c.appendChild(el('h3', 'Custo admitido'));
        comCodigo(c.appendChild(el('p')), d.custo || 'não documentado');
        c.appendChild(el('h3', 'Como você se saiu?'));
        const acoes = el('div', undefined, 'acoes');
        [['sei', 'Sei explicar'], ['meio', 'Mais ou menos'], ['nao', 'Não sei']].forEach(([valor, rot]) => {
          const b = botao(rot, () => {
            auto[e.projeto + '|' + i] = valor;
            salvarAuto();
            if (i + 1 < e.decisoes.length) decisao(i + 1); else fim();
          }, auto[e.projeto + '|' + i] === valor ? 'primario' : '');
          acoes.appendChild(b);
        });
        c.appendChild(acoes);
      }
      tela.appendChild(c);
    });
  }
  function fim() {
    mostrar(() => {
      cabecalho('Resultado');
      const c = el('div', undefined, 'painel');
      const n = (v) => contaAuto(e.projeto, v);
      c.appendChild(el('p', 'Sei explicar: ' + n('sei') + ' · Mais ou menos: ' + n('meio') + ' · Não sei: ' + n('nao') + ' · de ' + e.decisoes.length + ' decisões.'));
      const rev = e.decisoes.filter((d, i) => auto[e.projeto + '|' + i] === 'nao');
      if (rev.length) {
        c.appendChild(el('h3', 'Para revisar (Não sei)'));
        const ul2 = document.createElement('ul');
        rev.forEach((d) => ul2.appendChild(comCodigo(el('li'), d.pergunta)));
        c.appendChild(ul2);
      }
      if (e.semMotivo.length) {
        c.appendChild(el('h3', 'Sem motivo registrado — prepare sua resposta'));
        const ul3 = document.createElement('ul');
        e.semMotivo.forEach((t) => ul3.appendChild(comCodigo(el('li'), t)));
        c.appendChild(ul3);
      }
      if (e.dificeis.length) {
        c.appendChild(el('h3', 'Perguntas difíceis'));
        e.dificeis.forEach((q) => {
          const det = document.createElement('details');
          det.appendChild(el('summary', q.pergunta));
          comCodigo(det.appendChild(el('p')), q.resposta);
          c.appendChild(det);
        });
      }
      const acoes = el('div', undefined, 'acoes');
      acoes.appendChild(botao('Treinar de novo', () => decisao(0), 'primario'));
      acoes.appendChild(botao('Outro projeto', telaEntrevista));
      c.appendChild(acoes);
      tela.appendChild(c);
    });
  }
  inicio();
}

// ---------- tela: uma parada ----------
function abrirParada(p, ehApendice) {
  const id = idDe(p, ehApendice);
  let etapa = 1;          // 1 Entender, 2 Olhar, 3 Responder
  let tentativas = 0;     // erros nesta rodada
  let acertou = false;

  function desenhar() {
    mostrar(() => {
      const voltar = el('button', '← Voltar ao mapa');
      voltar.type = 'button';
      voltar.addEventListener('click', telaMapa);
      tela.appendChild(voltar);
      tela.appendChild(el('h2', (ehApendice ? 'Depois ' : 'Parada ') + p.numero + '. ' + p.nome));
      tela.appendChild(el('p', 'Etapa ' + etapa + ' de 3: ' + ['Entender', 'Olhar', 'Entrevistador pergunta'][etapa - 1], 'etapa'));

      const caixa = el('div', undefined, 'painel');
      tela.appendChild(caixa);
      if (etapa === 1) etapaEntender(caixa);
      else if (etapa === 2) etapaOlhar(caixa);
      else etapaResponder(caixa);
    });
  }
  function botaoAvancar(caixa, rotulo) {
    const b = el('button', rotulo, 'primario');
    b.type = 'button';
    b.addEventListener('click', () => { etapa++; desenhar(); });
    const acoes = el('div', undefined, 'acoes');
    acoes.appendChild(b);
    caixa.appendChild(acoes);
  }
  function etapaEntender(caixa) {
    caixa.appendChild(comCodigo(el('p'), p.explicacao));
    botaoAvancar(caixa, 'Ver o trecho do meu projeto');
  }
  function etapaOlhar(caixa) {
    caixa.appendChild(el('p', 'Projeto: ' + p.projeto));
    caixa.appendChild(el('p', p.origem, 'origem'));
    const pre = document.createElement('pre');
    pre.tabIndex = 0;                       // permite rolar o código pelo teclado
    pre.setAttribute('aria-label', 'Trecho de código');
    pre.appendChild(el('code', p.codigo));
    caixa.appendChild(pre);
    botaoAvancar(caixa, 'Responder a pergunta');
  }
  function etapaResponder(caixa) {
    const balao = el('div', undefined, 'balao');
    balao.appendChild(el('span', 'Entrevistador · ' + (p.projetoPergunta || p.projeto), 'quem'));
    balao.appendChild(comCodigo(el('p'), p.pergunta));
    caixa.appendChild(balao);
    const opcoes = el('div', undefined, 'opcoes');
    const retorno = el('div');
    retorno.setAttribute('aria-live', 'polite');
    p.alternativas.forEach((alt, i) => {
      const b = el('button', 'abc'[i] + ') ' + alt.texto, 'opcao');
      b.type = 'button';
      b.addEventListener('click', () => {
        if (acertou) return;
        if (alt.correta) {
          acertou = true;
          const estrelas = Math.max(1, 3 - tentativas);
          // Guarda a melhor nota, mesmo se o jogador repetir a parada depois.
          progresso[id] = Math.max(progresso[id] || 0, estrelas);
          salvar();
          b.classList.add('certa');
          mostrarAcerto(caixa, retorno, estrelas);
        } else {
          tentativas++;
          b.classList.add('errada');
          b.disabled = true;
          retorno.replaceChildren(el('p', 'Ainda não. Releia o trecho e tente outra alternativa.', 'retorno erro'));
        }
      });
      opcoes.appendChild(b);
    });
    caixa.appendChild(opcoes);
    caixa.appendChild(retorno);
  }
  function mostrarAcerto(caixa, retorno, estrelas) {
    retorno.replaceChildren(el('p', 'Correto! ' + estrelasTxt(estrelas), 'retorno ok'));
    caixa.appendChild(el('h3', 'Fonte do motivo'));
    caixa.appendChild(comCodigo(el('p'), p.fonteMotivo));
    caixa.appendChild(el('h3', 'Seguimento provável'));
    const seg = el('div', undefined, 'balao');
    seg.appendChild(el('span', 'Entrevistador', 'quem'));
    seg.appendChild(el('p', p.seguimento));
    caixa.appendChild(seg);
    const resp = el('div');
    resp.setAttribute('aria-live', 'polite');
    const ver = el('button', 'Ver como responder');
    ver.type = 'button';
    ver.addEventListener('click', () => {
      resp.replaceChildren(el('h3', 'Como responder'), comCodigo(el('p'), p.respostaSeguimento));
      ver.remove();
    });
    caixa.appendChild(ver);
    caixa.appendChild(resp);
    caixa.appendChild(el('h3', 'Onde estudar'));
    caixa.appendChild(el('p', p.ondeEstudar));
    const acoes = el('div', undefined, 'acoes');
    const b = el('button', 'Voltar ao mapa', 'primario');
    b.type = 'button';
    b.addEventListener('click', telaMapa);
    acoes.appendChild(b);
    caixa.appendChild(acoes);
    atualizarResumo();
  }
  desenhar();
}

// ---------- início ----------
document.getElementById('btn-mapa').addEventListener('click', telaMapa);
document.getElementById('btn-entrevista').addEventListener('click', telaEntrevista);
document.getElementById('btn-projetos').addEventListener('click', telaProjetos);
document.getElementById('btn-recomecar').addEventListener('click', () => {
  if (window.confirm('Apagar todo o progresso e recomeçar?')) {
    progresso = {};
    auto = {};
    salvar();
    salvarAuto();
    if (window.apagarAulas) window.apagarAulas(); // aulas.js, se existir
    if (window.telaAulas) window.telaAulas(); else telaMapa();
  }
});
carregar();
carregarAuto();
// Com lições, aulas.js abre a tela "Aulas"; sem lições, a tela inicial continua sendo o mapa.
if (!window.LICOES || !(window.LICOES.temas || []).length) telaMapa();
