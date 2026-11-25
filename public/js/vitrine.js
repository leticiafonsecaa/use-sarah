// Busca os produtos na API e desenha os cards na página inicial
const container = document.getElementById('vitrine');
const formatadorReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function criarCard(produto) {
  const card = document.createElement('article');
  card.className = 'produto';

  const areaImagem = document.createElement('div');
  areaImagem.className = 'produto__imagem';
  if (produto.imagem) {
    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.nome;
    areaImagem.appendChild(img);
  } else {
    areaImagem.textContent = '✦';
  }

  const nome = document.createElement('h3');
  nome.className = 'produto__nome';
  nome.textContent = produto.nome;

  const preco = document.createElement('p');
  preco.className = 'produto__preco';
  preco.textContent = formatadorReal.format(produto.precoCentavos / 100);

  card.append(areaImagem, nome, preco);
  return card;
}

async function carregarVitrine() {
  try {
    const resposta = await fetch('/api/produtos');
    if (!resposta.ok) throw new Error('Falha na resposta');

    const produtos = await resposta.json();
    container.replaceChildren();

    if (produtos.length === 0) {
      container.textContent = 'Em breve, novas peças por aqui.';
      return;
    }
    produtos.forEach((produto) => container.appendChild(criarCard(produto)));
  } catch (erro) {
    container.textContent = 'Não foi possível carregar as peças agora.';
  }
}

carregarVitrine();