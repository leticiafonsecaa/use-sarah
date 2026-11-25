// Cadastra produtos de EXEMPLO para testarmos o site.
// Rode com: npm run seed
const produtoService = require('../services/produtoService');
const produtoModel = require('../models/produtoModel');
const { ErroDeValidacao } = require('../utils/erros');

if (produtoModel.contar() > 0) {
  console.log('Já existem produtos no banco. Nada foi inserido.');
  process.exit(0);
}

const exemplos = [
  { nome: 'Colar Ponto de Luz', preco: 89.9, categoria: 'signature', descricao: 'Banho de ouro com zircônia.' },
  { nome: 'Brinco Argola Dourada', preco: 64.9, categoria: 'signature', descricao: 'Argola clássica em banho de ouro.' },
  { nome: 'Anel Coração', preco: 49.9, categoria: 'essence', descricao: 'Delicado, para o dia a dia.' },
  { nome: 'Pulseira Elos', preco: 79.9, categoria: 'signature', descricao: 'Elos em banho de ouro.' },
  { nome: 'Brinco Pérola', preco: 39.9, categoria: 'essence', descricao: 'Leve e elegante.' },
  { nome: 'Colar Choker', preco: 54.9, categoria: 'essence', descricao: 'Estilo moderno e marcante.' },
];

for (const produto of exemplos) {
  const id = produtoService.cadastrar(produto);
  console.log(`Produto cadastrado (id ${id}): ${produto.nome}`);
}

// Teste de uma regra de negócio: preço zero deve ser recusado
try {
  produtoService.cadastrar({ nome: 'Produto inválido', preco: 0, categoria: 'essence' });
} catch (erro) {
  if (erro instanceof ErroDeValidacao) {
    console.log('Regra funcionando! Mensagem:', erro.message);
  } else {
    throw erro;
  }
}