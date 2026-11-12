// Lê as lições em ../conteudo/temas/<NN-tema>/<NN-licao>.md, confere o formato descrito em
// ../conteudo/FORMATO.md e escreve licoes.js (window.LICOES).
// Uso: node gerar-licoes.mjs [pasta-de-temas] [arquivo-de-saida]
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));

// Nomes bonitos dos temas. Pasta que não estiver aqui usa o nome da pasta como fallback.
const NOMES_TEMAS = {
  '01-terminal-e-ambiente': 'Terminal e ambiente',
  '02-logica-basica': 'Lógica básica',
  '03-estruturas-de-dados': 'Estruturas de dados',
  '04-git-e-github': 'Git e GitHub',
  '05-web': 'Web',
  '06-banco-de-dados-e-sql': 'Banco de dados e SQL',
  '07-testes': 'Testes',
  '08-dados': 'Dados',
  '09-concorrencia-e-filas': 'Concorrência e filas',
  '10-seguranca-e-privacidade': 'Segurança e privacidade',
  '11-arquitetura-e-trade-offs': 'Arquitetura e trade-offs',
  '12-trabalhar-com-ia': 'Trabalhar com IA',
};
export function nomeDoTema(pasta) {
  if (NOMES_TEMAS[pasta]) return NOMES_TEMAS[pasta];
  const semNumero = pasta.replace(/^\d+-/, '').replace(/-/g, ' ');
  return semNumero.charAt(0).toUpperCase() + semNumero.slice(1);
}

const SECOES = ['Entender', 'Exemplo mínimo', 'No meu projeto', 'Exercícios',
  'Explique com suas palavras', 'Entrevista', 'Onde estudar'];
const TIPOS = ['prever', 'onde', 'muda', 'erro'];

// ---------- peças pequenas do analisador ----------
// Cada função de conferência lança um erro dizendo arquivo, seção e o que faltou.
function falha(id, secao, msg) {
  throw new Error(`${id}: seção "${secao}": ${msg}`);
}

// Divide linhas em blocos: parágrafos (linhas coladas viram um parágrafo) e código (cerca de 3 crases).
function lerBlocos(linhas, id, secao) {
  const blocos = [];
  let par = [];
  let cerca = null; // { lang, linhas } enquanto estamos dentro de um bloco de código
  const fechaPar = () => {
    if (par.length) blocos.push({ t: 'p', texto: par.join(' ') });
    par = [];
  };
  for (const linha of linhas) {
    if (cerca) {
      if (linha.trim() === '```') { blocos.push({ t: 'code', lang: cerca.lang, codigo: cerca.linhas.join('\n') }); cerca = null; }
      else cerca.linhas.push(linha);
    } else if (linha.startsWith('```')) {
      fechaPar();
      cerca = { lang: linha.slice(3).trim(), linhas: [] };
    } else if (linha.trim() === '') fechaPar();
    else par.push(linha.trim());
  }
  if (cerca) falha(id, secao, 'bloco de código sem a cerca de fechamento (```)');
  fechaPar();
  return blocos;
}

// Procura "Rótulo: valor" numa lista de linhas e devolve o valor (ou null).
function campo(linhas, rotulo) {
  const i = linhas.findIndex((l) => l.startsWith(rotulo + ':'));
  return i < 0 ? null : linhas[i].slice(rotulo.length + 1).trim();
}
function campoObrigatorio(linhas, rotulo, id, secao) {
  const v = campo(linhas, rotulo);
  if (!v) falha(id, secao, `falta a linha "${rotulo}: ..." (ou ela está vazia)`);
  return v;
}

// Quebra o arquivo em { titulo, cabecalho, secoes: { nome: linhas } } sem entrar nas cercas de código.
function dividir(texto, id) {
  const linhas = texto.replace(/\r\n/g, '\n').split('\n');
  let titulo = null;
  const cabecalho = [];
  const secoes = {};
  const ordem = [];
  let atual = null;
  let dentro = false;
  for (const linha of linhas) {
    if (linha.startsWith('```')) dentro = !dentro;
    if (!dentro && linha.startsWith('## ')) {
      atual = linha.slice(3).trim();
      if (secoes[atual]) falha(id, atual, 'seção repetida');
      secoes[atual] = [];
      ordem.push(atual);
    } else if (!dentro && titulo === null && linha.startsWith('# ')) titulo = linha.slice(2).trim();
    else if (atual === null) cabecalho.push(linha);
    else secoes[atual].push(linha);
  }
  if (!titulo) falha(id, 'título', 'a primeira linha precisa ser "# <título>"');
  for (const nome of SECOES) if (!secoes[nome]) falha(id, nome, 'seção faltando');
  const esperada = SECOES.join(' > ');
  const achada = ordem.filter((n) => SECOES.includes(n)).join(' > ');
  if (achada !== esperada) falha(id, 'ordem', `as seções devem vir nesta ordem: ${esperada}`);
  return { titulo, cabecalho, secoes };
}

// ---------- exercícios ----------
function lerExercicio(tipo, linhas, id, n) {
  const sec = `Exercícios (exercício ${n}, ${tipo})`;
  const iChefe = linhas.findIndex((l) => l.startsWith('Chefe:'));
  if (iChefe < 0) falha(id, sec, 'falta a linha "Chefe: ..."');
  const chefe = linhas[iChefe].slice(6).trim();
  if (!chefe) falha(id, sec, 'a linha "Chefe:" está vazia');
  const iAula = linhas.findIndex((l) => l.startsWith('Aula:'));
  if (iAula < 0) falha(id, sec, 'falta a linha "Aula: ..."');
  const aula = linhas[iAula].slice(5).trim();
  if (!aula) falha(id, sec, 'a linha "Aula:" está vazia');
  const iAlt = linhas.findIndex((l) => /^- \[[x ]\] /.test(l));
  if (iAlt < 0) falha(id, sec, 'faltam as alternativas ("- [x] ..." e "- [ ] ...")');
  if (iAlt < iChefe || iAula < iAlt) falha(id, sec, 'a ordem deve ser Chefe, enunciado e código, alternativas, Aula');

  const blocos = lerBlocos(linhas.slice(iChefe + 1, iAlt), id, sec);
  const codigos = blocos.filter((b) => b.t === 'code').length;
  if (codigos === 0) falha(id, sec, 'falta o bloco de código');
  if (codigos > 1) falha(id, sec, 'só pode haver um bloco de código por exercício');

  const alternativas = [];
  for (const linha of linhas.slice(iAlt, iAula)) {
    const m = linha.match(/^- \[([x ])\] (.*)$/);
    const recuada = linha.match(/^ {2}- ([^:]+): (.*)$/);
    if (m) alternativas.push({ texto: m[2].trim(), correta: m[1] === 'x', porque: '', atrai: '', falta: '' });
    else if (recuada && alternativas.length) {
      const alvo = alternativas[alternativas.length - 1];
      const rotulo = { 'Porque': 'porque', 'Atrai': 'atrai', 'Falta': 'falta' }[recuada[1]];
      if (!rotulo) falha(id, sec, `rótulo desconhecido "${recuada[1]}:" (use Porque, Atrai ou Falta)`);
      alvo[rotulo] = recuada[2].trim();
    } else if (linha.trim() !== '') falha(id, sec, `linha inesperada entre as alternativas: "${linha.trim()}"`);
  }
  if (alternativas.length < 3 || alternativas.length > 4) falha(id, sec, `precisa de 3 a 4 alternativas (tem ${alternativas.length})`);
  const certas = alternativas.filter((a) => a.correta).length;
  if (certas !== 1) falha(id, sec, `precisa de exatamente 1 alternativa certa (tem ${certas})`);
  for (const a of alternativas) {
    const nome = `"${a.texto.slice(0, 40)}"`;
    if (a.correta && !a.porque) falha(id, sec, `a alternativa certa ${nome} não tem "Porque:"`);
    if (!a.correta && !a.atrai) falha(id, sec, `a alternativa errada ${nome} não tem "Atrai:"`);
    if (!a.correta && !a.falta) falha(id, sec, `a alternativa errada ${nome} não tem "Falta:"`);
  }
  return { tipo, chefe, blocos, alternativas, aula };
}

function lerExercicios(linhas, id) {
  const grupos = [];
  let atual = null;
  let dentro = false;
  for (const linha of linhas) {
    if (linha.startsWith('```')) dentro = !dentro;
    if (!dentro && linha.startsWith('### ')) {
      atual = { tipo: linha.slice(4).trim(), linhas: [] };
      grupos.push(atual);
    } else if (atual) atual.linhas.push(linha);
    else if (linha.trim() !== '') falha(id, 'Exercícios', 'texto antes do primeiro "### <tipo>"');
  }
  if (!grupos.length) falha(id, 'Exercícios', 'nenhum exercício ("### prever", "### onde", ...)');
  return grupos.map((g, i) => {
    if (!TIPOS.includes(g.tipo)) falha(id, 'Exercícios', `exercício ${i + 1}: tipo desconhecido "${g.tipo}" (use ${TIPOS.join(', ')})`);
    return lerExercicio(g.tipo, g.linhas, id, i + 1);
  });
}

function lerLista(linhas, id, secao, min, max) {
  const itens = linhas.filter((l) => l.startsWith('- ')).map((l) => l.slice(2).trim()).filter(Boolean);
  if (itens.length < min || itens.length > max) falha(id, secao, `precisa de ${min === max ? min : min + ' a ' + max} linhas "- ..." (tem ${itens.length})`);
  return itens;
}

// ---------- a lição inteira ----------
// Recebe o texto do arquivo e o identificador "<NN-tema>/<NN-licao>". Não lê disco.
export function analisarLicao(texto, id) {
  const { titulo, cabecalho, secoes } = dividir(texto, id);
  const linhaPre = cabecalho.find((l) => l.trim() !== '');
  if (!linhaPre || !linhaPre.startsWith('Pré-requisitos:')) falha(id, 'título', 'falta a linha "Pré-requisitos: ..." logo depois do título');
  const valorPre = linhaPre.slice('Pré-requisitos:'.length).trim();
  if (!valorPre) falha(id, 'título', '"Pré-requisitos:" vazio (escreva "nenhum" se não há)');
  const prereqs = valorPre.toLowerCase() === 'nenhum' ? [] : valorPre.split(',').map((s) => s.trim()).filter(Boolean);

  const entender = lerBlocos(secoes['Entender'], id, 'Entender');
  if (!entender.some((b) => b.t === 'p')) falha(id, 'Entender', 'faltam os parágrafos de explicação');

  const exemplo = lerBlocos(secoes['Exemplo mínimo'], id, 'Exemplo mínimo');
  if (!exemplo.some((b) => b.t === 'code')) falha(id, 'Exemplo mínimo', 'falta o bloco de código');

  const linhasProj = secoes['No meu projeto'];
  const origem = campoObrigatorio(linhasProj, 'Origem', id, 'No meu projeto');
  const blocosProj = lerBlocos(linhasProj.filter((l) => !l.startsWith('Origem:')), id, 'No meu projeto');
  if (!blocosProj.some((b) => b.t === 'code')) falha(id, 'No meu projeto', 'falta o bloco de código com o trecho real');
  const projeto = origem.split('/')[0];

  const exercicios = lerExercicios(secoes['Exercícios'], id);

  const lin = secoes['Explique com suas palavras'];
  const iPontos = lin.findIndex((l) => l.trim() === 'Pontos:');
  if (iPontos < 0) falha(id, 'Explique com suas palavras', 'falta a linha "Pontos:" seguida de 3 linhas "- ..."');
  const explique = {
    pergunta: campoObrigatorio(lin, 'Pergunta', id, 'Explique com suas palavras'),
    modelo: campoObrigatorio(lin, 'Modelo', id, 'Explique com suas palavras'),
    pontos: lerLista(lin.slice(iPontos + 1), id, 'Explique com suas palavras', 3, 3),
  };

  const le = secoes['Entrevista'];
  const entrevista = {
    projeto: campoObrigatorio(le, 'Projeto', id, 'Entrevista'),
    pergunta: campoObrigatorio(le, 'Pergunta', id, 'Entrevista'),
    resposta: campoObrigatorio(le, 'Resposta', id, 'Entrevista'),
    fonte: campoObrigatorio(le, 'Fonte', id, 'Entrevista'),
    seguimento: campoObrigatorio(le, 'Seguimento', id, 'Entrevista'),
    respostaSeguimento: campoObrigatorio(le, 'Resposta do seguimento', id, 'Entrevista'),
  };

  const ondeEstudar = lerLista(secoes['Onde estudar'], id, 'Onde estudar', 1, 3);

  return {
    id, titulo, prereqs, entender, exemplo,
    projeto: { origem, projeto, blocos: blocosProj },
    exercicios, explique, entrevista, ondeEstudar,
  };
}

// ---------- varredura da pasta ----------
const listar = (dir) => readdirSync(dir).sort();

export function gerarLicoes(pastaTemas) {
  const temas = [];
  if (existsSync(pastaTemas)) {
    for (const pasta of listar(pastaTemas)) {
      const dirTema = join(pastaTemas, pasta);
      if (!statSync(dirTema).isDirectory()) continue;
      const arquivos = listar(dirTema).filter((a) => a.endsWith('.md'));
      if (!arquivos.length) continue;
      const licoes = arquivos.map((arq) => {
        const id = `${pasta}/${arq.replace(/\.md$/, '')}`;
        return analisarLicao(readFileSync(join(dirTema, arq), 'utf8'), id);
      });
      temas.push({ id: pasta, nome: nomeDoTema(pasta), licoes });
    }
  }
  // Pré-requisito precisa existir e vir antes da lição que o cita.
  const posicao = new Map();
  temas.forEach((t) => t.licoes.forEach((l) => posicao.set(l.id, posicao.size)));
  for (const t of temas) {
    for (const l of t.licoes) {
      for (const p of l.prereqs) {
        if (!posicao.has(p)) throw new Error(`${l.id}: seção "título": pré-requisito "${p}" não existe`);
        if (posicao.get(p) >= posicao.get(l.id)) throw new Error(`${l.id}: seção "título": pré-requisito "${p}" não vem antes desta lição`);
      }
    }
  }
  return { temas };
}

export function escreverJs(dados) {
  return '// Gerado por gerar-licoes.mjs a partir de ../conteudo/temas. Não edite à mão.\n'
    + 'window.LICOES = ' + JSON.stringify(dados, null, 1) + ';\n';
}

// Só grava arquivo quando executado direto (node gerar-licoes.mjs).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const pasta = resolve(process.argv[2] || join(aqui, '..', 'conteudo', 'temas'));
  const saida = resolve(process.argv[3] || join(aqui, 'licoes.js'));
  try {
    const dados = gerarLicoes(pasta);
    writeFileSync(saida, escreverJs(dados));
    const n = dados.temas.reduce((a, t) => a + t.licoes.length, 0);
    console.log(`licoes.js: ${n} lições em ${dados.temas.length} temas`);
  } catch (e) {
    console.error('Erro de formato: ' + e.message);
    process.exit(1);
  }
}
