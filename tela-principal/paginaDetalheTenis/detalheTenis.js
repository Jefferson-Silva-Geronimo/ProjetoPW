// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));

// Carrega o produto selecionado da página inicial
const produtoSelecionado = JSON.parse(localStorage.getItem("produtoSelecionado"));

if (produtoSelecionado) {
  // Atualiza a imagem
  const imgProduto = document.querySelector(".imagem-produto img");
  imgProduto.src = produtoSelecionado.imagem;
  imgProduto.alt = produtoSelecionado.nome;

  console.log("Produto selecionado:", produtoSelecionado.imagem);

  // Atualiza o nome
  const nomeProduto = document.querySelector(".info-produto h2");
  nomeProduto.textContent = produtoSelecionado.nome;

  // Atualiza o preço
  const precoProduto = document.querySelector(".info-produto .preco");
  precoProduto.textContent = `R$ ${produtoSelecionado.preco.toFixed(2)}`;

  // Atualiza descrição
  const descricao = document.querySelector(".info-produto .descricao");
  descricao.textContent = produtoSelecionado.descricao || "Inspirado na cultura streetwear, este tênis combina conforto e estilo. Ideal para o dia a dia ou ocasiões especiais.";
}

// Botão "Adicionar ao Carrinho"
const btnAdicionar = document.getElementById("btnAdicionarCarrinho");
btnAdicionar.addEventListener("click", () => {
  const tamanho = document.getElementById("tamanho").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (!produtoSelecionado) {
    alert("Nenhum produto selecionado.");
    return;
  }

  // Recupera o carrinho ou cria vazio
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Verifica se produto + tamanho já existe
  const existente = carrinho.find(item => item.nome === produtoSelecionado.nome && item.tamanho === tamanho);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({
      nome: produtoSelecionado.nome,
      preco: produtoSelecionado.preco,
      imagem: produtoSelecionado.imagem,
      tamanho,
      quantidade
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log("Carrinho atual:", carrinho); // ✅ DEBUG
  alert(`${produtoSelecionado.nome} (${quantidade}x) adicionado ao carrinho!`);
});