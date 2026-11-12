// Confere o gerador de lições, as lições reais (se houver) e as regras das aulas. Rode com: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { analisarLicao } from './gerar-licoes.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));

// Carrega um arquivo que define window.X, como teste-dados.mjs faz com dados.js.
function carregarJanela(nome) {
  const window = {};
  new Function('window', readFileSync(join(aqui, nome), 'utf8'))(window);
  return window;
}

// O exemplo completo vive dentro de FORMATO.md, entre cercas de quatro crases.
const formato = readFileSync(join(aqui, '..', 'conteudo', 'FORMATO.md'), 'utf8');
const EXEMPLO = formato.split('````')[1].replace(/^\n/, '');
const ID = '02-logica-basica/02-condicional';

// Troca um trecho do exemplo e confere que o analisador recusa (e que a mensagem cita o que faltou).
function recusa(nome, troca, padrao) {
  test('analisador recusa: ' + nome, () => {
    const texto = troca(EXEMPLO);
    assert.notEqual(texto, EXEMPLO, 'a troca não alterou o exemplo');
    assert.throws(() => analisarLicao(texto, ID), (e) => e.message.includes(ID) && padrao.test(e.message));
  });
}

// ---------- analisador ----------
test('analisador lê o exemplo completo de FORMATO.md', () => {
  const l = analisarLicao(EXEMPLO, ID);
  assert.equal(l.id, ID);
  assert.equal(l.titulo, 'Condicional: se isso, então aquilo');
  assert.deepEqual(l.prereqs, ['02-logica-basica/01-variavel']);
  assert.equal(l.entender.length, 2);
  assert.equal(l.exemplo[0].t, 'code');
  assert.equal(l.exemplo[0].lang, 'js');
  assert.equal(l.projeto.origem, 'thronfolge/src/simulacao.js:275-279');
  assert.equal(l.projeto.projeto, 'thronfolge');
  assert.ok(l.projeto.blocos.some((b) => b.t === 'code' && b.codigo.startsWith('export function validarAcao')));
  assert.equal(l.exercicios.length, 1);
  const ex = l.exercicios[0];
  assert.equal(ex.tipo, 'prever');
  assert.ok(ex.chefe.startsWith('O cliente tem 70 anos'));
  assert.equal(ex.blocos.filter((b) => b.t === 'code').length, 1);
  assert.equal(ex.alternativas.length, 3);
  assert.equal(ex.alternativas.filter((a) => a.correta).length, 1);
  assert.ok(ex.alternativas.find((a) => a.correta).porque.startsWith('70 é maior'));
  assert.ok(ex.alternativas.filter((a) => !a.correta).every((a) => a.atrai && a.falta));
  assert.ok(ex.aula.startsWith('Olhe a linha 2'));
  assert.equal(l.explique.pontos.length, 3);
  assert.equal(l.entrevista.projeto, 'thronfolge');
  assert.ok(l.entrevista.fonte.includes('RECADOS.md:51-55'));
  assert.equal(l.entrevista.respostaSeguimento, 'não documentado: prepare sua resposta');
  assert.equal(l.ondeEstudar.length, 1);
});

recusa('exercício sem alternativa certa', (t) => t.replace('- [x] ', '- [ ] '), /exatamente 1 alternativa certa \(tem 0\)/);
recusa('exercício com duas certas', (t) => t.replace('- [ ] Aparece só `meia`', '- [x] Aparece só `meia`'), /exatamente 1 alternativa certa \(tem 2\)/);
recusa('alternativa errada sem Atrai', (t) => t.replace('  - Atrai: parece que o `if` escolhe entre as duas linhas.\n', ''), /não tem "Atrai:"/);
recusa('alternativa errada sem Falta', (t) => t.replace(/  - Falta: sem `else`.*\n/, ''), /não tem "Falta:"/);
recusa('exercício sem Aula', (t) => t.replace(/Aula: Olhe a linha 2.*\n/, ''), /falta a linha "Aula/);
recusa('exercício sem Chefe', (t) => t.replace('Chefe: O cliente tem 70 anos. O que aparece na tela?\n', ''), /falta a linha "Chefe/);
recusa('seção faltando', (t) => t.replace('## Onde estudar', '## Outra coisa'), /Onde estudar.*seção faltando/);
recusa('tipo de exercício desconhecido', (t) => t.replace('### prever', '### adivinhar'), /tipo desconhecido "adivinhar"/);
recusa('exercício sem bloco de código', (t) => t.replace(/```js\nconst idade = 70;[\s\S]*?```\n/, ''), /falta o bloco de código/);
recusa('só duas alternativas', (t) => t.replace(/- \[ \] Aparece só `fim`[\s\S]*?\n(?=Aula:)/, ''), /3 a 4 alternativas/);
recusa('seções fora de ordem', (t) => t.replace('## Entender', '## Onde estudar\n\n- x\n\n## Entender'), /repetida|ordem/);
recusa('só dois pontos em "Explique"', (t) => t.replace('- o motivo volta junto, para a tela poder mostrar\n', ''), /3 linhas/);

// ---------- lições reais (se houver) ----------
const { LICOES } = existsSync(join(aqui, 'licoes.js')) ? carregarJanela('licoes.js') : {};
const reais = ((LICOES && LICOES.temas) || []).flatMap((t) => t.licoes);
const publicos = JSON.parse(readFileSync(join(aqui, 'projetos-publicos.json'), 'utf8'));

test('licoes.js tem o formato esperado', () => {
  assert.ok(LICOES && Array.isArray(LICOES.temas));
});

for (const l of reais) {
  test(`lição real ${l.id}: exercícios, alternativas e projetos`, () => {
    assert.ok(l.exercicios.length >= 4 && l.exercicios.length <= 5, `exercícios: ${l.exercicios.length} (deveria ser 4 a 5)`);
    for (const [i, ex] of l.exercicios.entries()) {
      const n = ex.alternativas.length;
      assert.ok(n >= 3 && n <= 4, `exercício ${i + 1}: ${n} alternativas`);
    }
    assert.ok(publicos.includes(l.projeto.projeto), `"No meu projeto" cita ${l.projeto.projeto}, que não está em projetos-publicos.json`);
    assert.ok(publicos.includes(l.entrevista.projeto), `"Entrevista" cita ${l.entrevista.projeto}, que não está em projetos-publicos.json`);
  });
  test(`lição real ${l.id}: a certa é a mais longa em no máximo 1 exercício`, () => {
    const maisLonga = l.exercicios.filter((ex) => {
      const maior = Math.max(...ex.alternativas.map((a) => a.texto.length));
      return ex.alternativas.find((a) => a.correta).texto.length === maior;
    }).length;
    assert.ok(maisLonga <= 1, `a certa é a mais longa em ${maisLonga} exercícios`);
  });
}
test('pré-requisitos das lições reais existem e vêm antes', () => {
  const pos = new Map(reais.map((l, i) => [l.id, i]));
  for (const l of reais) {
    for (const p of l.prereqs) {
      assert.ok(pos.has(p), `${l.id}: pré-requisito ${p} não existe`);
      assert.ok(pos.get(p) < pos.get(l.id), `${l.id}: pré-requisito ${p} não vem antes`);
    }
  }
});

// ---------- regras puras ----------
const R = carregarJanela('regras-aulas.js').REGRAS_AULAS;

test('embaralhar mantém os mesmos itens, não altera a lista original e aceita gerador fixo', () => {
  const lista = ['a', 'b', 'c', 'd', 'e'];
  const fixo = () => 0; // sempre sorteia a posição 0: resultado previsível
  const novo = R.embaralhar(lista, fixo);
  assert.deepEqual([...novo].sort(), [...lista].sort());
  assert.deepEqual(lista, ['a', 'b', 'c', 'd', 'e']);
  assert.deepEqual(R.embaralhar(lista, fixo), novo);
  assert.deepEqual([...R.embaralhar(lista)].sort(), [...lista].sort());
});

test('próxima variante avança e recomeça da primeira quando acabam', () => {
  assert.deepEqual(R.proximaVariante(0, 4), { indice: 1, recomecou: false });
  assert.deepEqual(R.proximaVariante(3, 4), { indice: 0, recomecou: true });
  assert.deepEqual(R.proximaVariante(0, 1), { indice: 0, recomecou: true });
});

test('estrelas: 3 no primeiro, 2 no segundo, 1 depois', () => {
  assert.equal(R.estrelas(1), 3);
  assert.equal(R.estrelas(2), 2);
  assert.equal(R.estrelas(3), 1);
  assert.equal(R.estrelas(9), 1);
});

test('datas: somar dias passa de mês e de ano; hoje usa o calendário local', () => {
  assert.equal(R.somarDias('2026-11-11', 1), '2026-11-12');
  assert.equal(R.somarDias('2026-11-30', 3), '2026-12-03');
  assert.equal(R.somarDias('2026-12-28', 7), '2027-01-04');
  assert.equal(R.hoje(new Date(2026, 10, 5)), '2026-11-05');
});

test('revisão: erro entra na etapa 0 e vence amanhã; acertos agendam 3 e 7 dias; depois sai', () => {
  let fila = R.entrarNaFila([], 'x/01', '2026-11-11');
  assert.deepEqual(fila, [{ licao: 'x/01', etapa: 0, vence: '2026-11-12' }]);
  assert.equal(R.vencidos(fila, '2026-11-11').length, 0);
  assert.equal(R.vencidos(fila, '2026-11-12').length, 1);
  fila = R.resolverRevisao(fila, 'x/01', true, '2026-11-12');
  assert.deepEqual(fila, [{ licao: 'x/01', etapa: 1, vence: '2026-11-15' }]);
  fila = R.resolverRevisao(fila, 'x/01', true, '2026-11-15');
  assert.deepEqual(fila, [{ licao: 'x/01', etapa: 2, vence: '2026-11-22' }]);
  fila = R.resolverRevisao(fila, 'x/01', true, '2026-11-22');
  assert.deepEqual(fila, []);
});

test('revisão: errar ou pedir explicação volta para a etapa 0 e vence amanhã; não altera outros itens', () => {
  const fila = [
    { licao: 'x/01', etapa: 2, vence: '2026-11-20' },
    { licao: 'x/02', etapa: 1, vence: '2026-11-30' },
  ];
  const nova = R.resolverRevisao(fila, 'x/01', false, '2026-11-20');
  assert.deepEqual(nova.find((i) => i.licao === 'x/01'), { licao: 'x/01', etapa: 0, vence: '2026-11-21' });
  assert.deepEqual(nova.find((i) => i.licao === 'x/02'), fila[1]);
  assert.equal(nova.length, 2);
  assert.equal(fila[0].etapa, 2, 'a fila original não muda');
  // Errar de novo uma lição que já estava na fila não duplica o item.
  assert.equal(R.entrarNaFila(nova, 'x/01', '2026-11-21').filter((i) => i.licao === 'x/01').length, 1);
});
