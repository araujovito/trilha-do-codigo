// Confere se dados.js saiu coerente. Rode com: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const carregar = (nome) => {
  const window = {};
  new Function('window', readFileSync(join(aqui, nome), 'utf8'))(window);
  return window.TRILHA;
};
// Na máquina do autor existe dados.local.js (tudo); num clone só existe dados.js (público).
const temLocal = existsSync(join(aqui, 'dados.local.js'));
const { paradas, apendice, entrevistas } = carregar(temLocal ? 'dados.local.js' : 'dados.js');

test('tem paradas (29 na versão completa)', () => {
  if (temLocal) assert.equal(paradas.length, 29);
  else assert.ok(paradas.length > 0);
});

test('dados.js só traz projetos públicos', () => {
  const publicos = JSON.parse(readFileSync(join(aqui, 'projetos-publicos.json'), 'utf8'));
  const d = carregar('dados.js');
  for (const p of [...d.paradas, ...d.apendice]) {
    assert.ok(publicos.includes(p.projeto), `parada ${p.numero}: trecho de ${p.projeto}`);
    assert.ok(!p.projetoPergunta || publicos.includes(p.projetoPergunta), `parada ${p.numero}: pergunta de ${p.projetoPergunta}`);
  }
  for (const e of d.entrevistas) assert.ok(publicos.includes(e.projeto), `entrevista de ${e.projeto}`);
});

test('cada parada tem código e exatamente 3 alternativas, 1 correta', () => {
  for (const p of [...paradas, ...apendice]) {
    assert.ok(p.codigo.trim().length > 0, `parada ${p.numero} sem código`);
    assert.equal(p.alternativas.length, 3, `parada ${p.numero}: alternativas`);
    assert.equal(p.alternativas.filter((a) => a.correta).length, 1, `parada ${p.numero}: corretas`);
    assert.ok(p.pergunta && p.explicacao && p.ondeEstudar && p.origem, `parada ${p.numero}: campo vazio`);
  }
});

test('pré-requisitos apontam para paradas menores que existem', () => {
  const numeros = new Set(paradas.map((p) => p.numero));
  for (const p of paradas) {
    for (const r of p.prereqs) {
      assert.ok(numeros.has(r) && r < p.numero, `parada ${p.numero}: pré-requisito ${r} inválido`);
    }
  }
});

test('toda parada tem fonte do motivo e seguimento', () => {
  for (const p of [...paradas, ...apendice]) {
    assert.ok(p.fonteMotivo && p.fonteMotivo.trim(), `parada ${p.numero}: sem fonteMotivo`);
    assert.ok(p.seguimento && p.seguimento.trim(), `parada ${p.numero}: sem seguimento`);
  }
});

test('entrevistas (19 na versão completa), cada uma com pitch e decisões completas', () => {
  if (temLocal) assert.equal(entrevistas.length, 19);
  else assert.ok(entrevistas.length > 0);
  for (const e of entrevistas) {
    assert.ok(e.pitch.trim(), `${e.projeto}: sem pitch`);
    assert.ok(e.decisoes.length >= 1, `${e.projeto}: sem decisões`);
    e.decisoes.forEach((d, i) => {
      assert.ok(d.pergunta && d.resposta && d.fonte, `${e.projeto} decisão ${i + 1}: campo vazio`);
    });
  }
});
