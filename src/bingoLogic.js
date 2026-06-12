const db = require("./db");

function processarNumero(numero) {
  if (!Number.isInteger(numero)) {
    return { erro: "O valor não é um número inteiro válido " };
  }

  if (numero < 1 || numero > 75) {
    return { erro: `O número deve estar entre 1 e 75.` };
  }

  if (db.numerosSorteados.includes(numero)) {
    return { erro: `O número ${numero} já foi sorteado.` };
  }

  db.numerosSorteados.push(numero);
  return { sucesso: true, numero: numero };
}

function reinicarJogo() {
  db.numerosSorteados = [];
}

function obterEstadoAtual() {
  return db.numerosSorteados;
}

module.exports = {
  processarNumero,
  reinicarJogo,
  obterEstadoAtual,
};
