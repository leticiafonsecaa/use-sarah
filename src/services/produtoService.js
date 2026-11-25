const produtoModel = require('../models/produtoModel');
const { ErroDeValidacao } = require('../utils/erros');

const CATEGORIAS = ['signature', 'essence'];
const LIMITE_VITRINE = 8;
const PRECO_MAXIMO = 100000; // em reais

// Aceita 89.9, "89.90" ou "89,90" e devolve 8990 (centavos)
function converterPrecoParaCentavos(valor) {
  const numero =
    typeof valor === 'string' ? Number(valor.trim().replace(',', '.')) : valor;

  if (!Number.isFinite(numero) || numero <= 0) {
    throw new ErroDeValidacao('O preço deve ser maior que zero.');
  }
  if (numero > PRECO_MAXIMO) {
    throw new ErroDeValidacao('O preço informado é alto demais. Confira o valor.');
  }
  return Math.round(numero * 100);
}

// Aplica as regras de negócio e cadastra o produto
function cadastrar(dados) {
  const nome = String(dados.nome ?? '').trim();
  if (nome.length < 2 || nome.length > 100) {
    throw new ErroDeValidacao('O nome deve ter entre 2 e 100 caracteres.');
  }

  const descricao = String(dados.descricao ?? '').trim();
  if (descricao.length > 500) {
    throw new ErroDeValidacao('A descrição pode ter no máximo 500 caracteres.');
  }

  if (!CATEGORIAS.includes(dados.categoria)) {
    throw new ErroDeValidacao('Escolha uma categoria válida: signature ou essence.');
  }

  const precoCentavos = converterPrecoParaCentavos(dados.preco);

  return produtoModel.criar({
    nome,
    descricao,
    precoCentavos,
    categoria: dados.categoria,
    imagem: dados.imagem ?? null,
    visivel: dados.visivel === false ? 0 : 1,
  });
}

// Produtos que aparecem na página inicial
function listarVitrine() {
  return produtoModel.listarVisiveis(LIMITE_VITRINE);
}

module.exports = { cadastrar, listarVitrine };