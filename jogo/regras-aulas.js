// Regras puras das aulas: não mexem na tela nem no localStorage, por isso dá para testar no Node.
// No navegador ficam em window.REGRAS_AULAS.
(function (window) {
  'use strict';

  // Dias até a próxima revisão, por etapa: 0 -> 1 dia, 1 -> 3 dias, 2 -> 7 dias.
  const INTERVALOS = [1, 3, 7];

  // Embaralha uma cópia da lista (Fisher-Yates). `aleatorio` devolve um número de 0 a 1;
  // no teste ele é trocado por um gerador fixo.
  function embaralhar(lista, aleatorio) {
    const sorteio = aleatorio || Math.random;
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(sorteio() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  // Próximo exercício da lição. Quando as variantes acabam, volta ao primeiro e avisa.
  function proximaVariante(indice, total) {
    if (indice + 1 < total) return { indice: indice + 1, recomecou: false };
    return { indice: 0, recomecou: true };
  }

  // Estrelas pela quantidade de exercícios vistos até o primeiro acerto
  // (pedir explicação conta como exercício visto): 1 -> 3, 2 -> 2, 3 ou mais -> 1.
  function estrelas(vistosAteAcertar) {
    return Math.max(1, Math.min(3, 4 - vistosAteAcertar));
  }

  // Datas como texto 'AAAA-MM-DD', sempre pelo calendário local (sem horário).
  function hoje(agora) {
    const d = agora || new Date();
    const dois = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + dois(d.getMonth() + 1) + '-' + dois(d.getDate());
  }
  function somarDias(data, dias) {
    const [a, m, d] = data.split('-').map(Number);
    return new Date(Date.UTC(a, m - 1, d + dias)).toISOString().slice(0, 10);
  }

  // A fila é uma lista de { licao, etapa, vence }. As funções abaixo devolvem uma fila nova.
  const semLicao = (fila, licao) => fila.filter((i) => i.licao !== licao);

  // Entrou por erro (ou por "Não sei"): volta para a etapa 0 e vence amanhã.
  function entrarNaFila(fila, licao, dataHoje) {
    return semLicao(fila, licao).concat([{ licao, etapa: 0, vence: somarDias(dataHoje, INTERVALOS[0]) }]);
  }

  // Resultado de uma revisão. Acertou: sobe a etapa e reagenda; depois da etapa de 7 dias, sai.
  // Errou ou pediu explicação: volta para a etapa 0 e vence amanhã.
  function resolverRevisao(fila, licao, acertou, dataHoje) {
    const item = fila.find((i) => i.licao === licao);
    if (!item || !acertou) return entrarNaFila(fila, licao, dataHoje);
    const etapa = item.etapa + 1;
    if (etapa >= INTERVALOS.length) return semLicao(fila, licao);
    return semLicao(fila, licao).concat([{ licao, etapa, vence: somarDias(dataHoje, INTERVALOS[etapa]) }]);
  }

  // Itens que vencem hoje ou antes (datas no formato AAAA-MM-DD comparam como texto).
  function vencidos(fila, dataHoje) {
    return fila.filter((i) => i.vence <= dataHoje);
  }

  window.REGRAS_AULAS = { INTERVALOS, embaralhar, proximaVariante, estrelas, hoje, somarDias, entrarNaFila, resolverRevisao, vencidos };
})(window);
