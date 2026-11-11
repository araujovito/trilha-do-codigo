// Lê ../inventario/TRILHA.md e os roteiros de entrevista e escreve os dados do jogo.
// Uso: node gerar-dados.mjs
//
// Sai em dois arquivos:
//   dados.js        só projetos de projetos-publicos.json (vai para o repositório)
//   dados.local.js  tudo (fica só na máquina do autor; está no .gitignore)
// Num clone do repositório só existe TRILHA-publica.md; aí o script gera apenas dados.js.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const dirInv = join(aqui, '..', 'inventario');
// A trilha completa só existe na máquina do autor; o repositório traz a versão pública.
const completo = existsSync(join(dirInv, 'TRILHA.md'));
const texto = readFileSync(join(dirInv, completo ? 'TRILHA.md' : 'TRILHA-publica.md'), 'utf8');

// Tira o negrito (**x**) e mantém `código` entre crases; o jogo desenha as crases.
const limpar = (s) => s.replace(/\*\*(.+?)\*\*/g, '$1').trim();

// Pega o texto de um campo "**Nome:** ..." até o próximo campo ou o fim da seção.
function campo(secao, nome) {
  const re = new RegExp('\\*\\*' + nome + ':\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[^*\\n]+:\\*\\*|\\n---\\s*$|$)');
  const m = secao.match(re);
  return m ? m[1].trim() : '';
}

// "(projeto) "pergunta"" na primeira linha do campo; tolera ausência dos parênteses ou das aspas.
function lerPergunta(bloco) {
  const linha = campo(bloco, 'Pergunta de entrevista').split('\n')[0].trim();
  const m = linha.match(/^\(([^)]*)\)\s*(.*)$/);
  const q = (m ? m[2] : linha).trim().replace(/^["“](.*)["”]$/, '$1');
  return { projetoPergunta: m ? m[1].trim() : '', pergunta: limpar(q) };
}

function lerSecao(bloco, nome) {
  const prereqTxt = campo(bloco, 'Pré-requisitos');
  // "20, 28 e Depois 1": números antes de "Depois" são paradas; os depois dele são do apêndice
  const [parteParadas, parteDepois = ''] = prereqTxt.split(/Depois/);
  const nums = (s) => (s.match(/\d+/g) || []).map(Number);

  const origem = campo(bloco, 'No seu projeto').split('\n')[0].replace(/`/g, '').trim();
  const cod = bloco.match(/```(\w*)\n([\s\S]*?)\n```/);
  const alternativas = [...bloco.matchAll(/^- [a-z]\) (.*)$/gm)].map((m) => {
    const correta = m[1].includes('**(correta)**');
    return { texto: limpar(m[1].replace('**(correta)**', '')), correta };
  });

  return {
    nome: nome.trim(),
    prereqs: nums(parteParadas),
    prereqsDepois: nums(parteDepois),
    explicacao: limpar(campo(bloco, 'Explicação')),
    origem,
    projeto: origem.split('/')[0],
    linguagem: cod ? cod[1] : '',
    codigo: cod ? cod[2] : '',
    ...lerPergunta(bloco),
    alternativas,
    fonteMotivo: limpar(campo(bloco, 'Fonte do motivo')),
    seguimento: limpar(campo(bloco, 'Seguimento provável')).replace(/^["“](.*)["”]$/, '$1'),
    respostaSeguimento: limpar(campo(bloco, 'Como responder o seguimento')),
    ondeEstudar: limpar(campo(bloco, 'Onde estudar').replace(/\n---[\s\S]*$/, '')),
  };
}

// Separa o texto em blocos que começam com "## Parada N." ou "## Depois N."
const partes = texto.split(/^(?=## (?:Parada|Depois) \d+\. )/m);
const paradas = [];
const apendice = [];
const brutos = new Map(); // parada -> texto original, para montar a trilha pública
for (const parte of partes) {
  const cab = parte.match(/^## (Parada|Depois) (\d+)\. (.*)$/m);
  if (!cab) continue;
  const item = { numero: Number(cab[2]), ...lerSecao(parte, cab[3]) };
  (cab[1] === 'Parada' ? paradas : apendice).push(item);
  brutos.set(item, parte.replace(/\n# [^\n]*\n*$/, '\n'));
}

// ---------- roteiros de entrevista (../inventario/entrevista/*.md) ----------
const dirEnt = join(aqui, '..', 'inventario', 'entrevista');
const juntar = (ls) => limpar(ls.join(' ').replace(/\s+/g, ' '));
// Texto de um rótulo ("**R:**", "**Fonte:**"...) até o próximo rótulo, tolerando espaços e quebras.
function rotulo(bloco, nome) {
  const re = new RegExp('^\\*\\*' + nome + ':?\\*\\*:?\\s*([\\s\\S]*?)(?=^\\*\\*(?:P|R|Fonte|Custo admitido):?\\*\\*|$(?![\\s\\S]))', 'm');
  const m = bloco.match(re);
  return m ? juntar([m[1]]) : '';
}
function lerEntrevista(arq) {
  const t = readFileSync(join(dirEnt, arq), 'utf8');
  const secoes = t.split(/^(?=## )/m);
  const achar = (re) => secoes.find((s) => re.test(s.split('\n')[0])) || '';
  const corpo = (s) => s.split('\n').slice(1).join('\n').trim();
  const aviso = (t.match(/^\*\*Projeto de trabalho[^\n]*$/m) || [''])[0];
  const decisoes = corpo(achar(/Decisões que/)).split(/^(?=\*\*P:)/m).filter((b) => /^\*\*P:/.test(b))
    .map((b) => ({
      pergunta: rotulo(b, 'P'), resposta: rotulo(b, 'R'),
      fonte: rotulo(b, 'Fonte'), custo: rotulo(b, 'Custo admitido'),
    }));
  const semMotivo = corpo(achar(/Decisões sem motivo/)).split('\n')
    .filter((l) => /^\s*[-*] /.test(l)).map((l) => limpar(l.replace(/^\s*[-*] /, '')));
  // Difícil: linha "**pergunta**" seguida do texto da resposta.
  const dificeis = corpo(achar(/Perguntas difíceis/)).split(/^(?=\*\*)/m).filter((b) => b.trim().startsWith('**'))
    .map((b) => {
      const m = b.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
      return m ? { pergunta: limpar(m[1]), resposta: juntar([m[2]]) } : null;
    }).filter(Boolean);
  return {
    projeto: arq.replace(/\.md$/, ''),
    aviso: limpar(aviso.replace(/^\*\*|\*\*$/g, '')),
    pitch: juntar([corpo(achar(/Pitch/))]),
    decisoes, semMotivo, dificeis,
  };
}
const entrevistas = readdirSync(dirEnt).filter((f) => f.endsWith('.md') && f !== 'LEIA-ME.md').sort().map(lerEntrevista);

// ---------- separa o que é público ----------
const publicos = JSON.parse(readFileSync(join(aqui, 'projetos-publicos.json'), 'utf8'));
// Uma parada é pública se o trecho de código E a pergunta vêm de projetos públicos.
const ehPublica = (p) => publicos.includes(p.projeto) && (!p.projetoPergunta || publicos.includes(p.projetoPergunta));
function soPublico() {
  const ps = paradas.filter(ehPublica);
  const as = apendice.filter(ehPublica);
  const nums = new Set(ps.map((p) => p.numero));
  const numsA = new Set(as.map((p) => p.numero));
  // Pré-requisito que ficou de fora deixa de ser exigido.
  const ajustar = (p) => ({ ...p, prereqs: p.prereqs.filter((n) => nums.has(n)), prereqsDepois: p.prereqsDepois.filter((n) => numsA.has(n)) });
  return { paradas: ps.map(ajustar), apendice: as.map(ajustar), entrevistas: entrevistas.filter((e) => publicos.includes(e.projeto)) };
}
const resumo = (d) => `${d.paradas.length} paradas, ${d.apendice.length} itens no apêndice, ${d.entrevistas.length} entrevistas, ${d.entrevistas.reduce((a, e) => a + e.decisoes.length, 0)} decisões`;
const gravar = (nome, d) => {
  writeFileSync(join(aqui, nome), 'window.TRILHA = ' + JSON.stringify(d, null, 1) + ';\n');
  console.log(`${nome}: ${resumo(d)}`);
};

const publico = soPublico();
gravar('dados.js', publico);
if (completo) {
  gravar('dados.local.js', { paradas, apendice, entrevistas });
  // Trilha só com as paradas públicas, para o repositório conseguir regerar dados.js.
  const cab = '# Trilha de aprendizado (versão pública)\n\nGerado por `jogo/gerar-dados.mjs`. Traz só as paradas cujo trecho e cuja pergunta vêm de projetos públicos; a numeração original foi mantida, por isso há saltos.\n\n---\n\n';
  const blocos = [...paradas, ...apendice].filter(ehPublica).map((p) => brutos.get(p).trim());
  writeFileSync(join(dirInv, 'TRILHA-publica.md'), cab + blocos.join('\n\n') + '\n');
}
