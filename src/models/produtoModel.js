const db = require('../config/database');

// Salva um produto novo e devolve o id dele
function criar({ nome, descricao, precoCentavos, categoria, imagem, visivel }) {
  const resultado = db
    .prepare(
      `INSERT INTO produtos (nome, descricao, preco_centavos, categoria, imagem, visivel)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(nome, descricao, precoCentavos, categoria, imagem, visivel);

  return Number(resultado.lastInsertRowid);
}

// Lista os produtos visíveis, do mais novo para o mais antigo
function listarVisiveis(limite) {
  return db
    .prepare(
      `SELECT id, nome, descricao, preco_centavos AS precoCentavos, categoria, imagem
       FROM produtos
       WHERE visivel = 1
       ORDER BY id DESC
       LIMIT ?`
    )
    .all(limite);
}

// Conta quantos produtos existem
function contar() {
  return db.prepare('SELECT COUNT(*) AS total FROM produtos').get().total;
}

module.exports = { criar, listarVisiveis, contar };