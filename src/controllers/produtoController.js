const produtoService = require('../services/produtoService');

// Responde com a lista de produtos da vitrine
function listarVitrine(req, res) {
  try {
    res.json(produtoService.listarVitrine());
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    res.status(500).json({ erro: 'Não foi possível carregar os produtos.' });
  }
}

module.exports = { listarVitrine };