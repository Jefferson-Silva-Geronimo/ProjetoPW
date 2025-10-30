// Menu hamburger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Container de destaques
const gridDestaques = document.querySelector(".grid-destaques");

// Array de lançamentos
const produtosLancamento = [
  {
    nome: "Nike Dunk Galaxy",
    preco: 1099.9,
    imagem: "../../img-tenis/NikeDunkGalaxy.png",
    descricao: "O Nike Dunk Galaxy traz um design futurista com detalhes cósmicos. Ideal para quem busca estilo e exclusividade."
  },
  {
    nome: "Air Jordan Eclipse",
    preco: 1499.9,
    imagem: "../../img-tenis/AirJordanEclipse.png",
    descricao: "O Air Jordan Eclipse combina performance e visual arrojado. Perfeito para quem vive o streetwear com atitude."
  },
  {
    nome: "Adidas Future X",
    preco: 999.9,
    imagem: "../../img-tenis/adidasX.png",
    descricao: "O Adidas Future X é a fusão entre inovação e conforto. Um modelo que representa o futuro do sneaker culture."
  }
];

// Pega produtos existentes no localStorage sem sobrescrever
let produtosExistentes;
try {
  produtosExistentes = JSON.parse(localStorage.getItem("produtos")) || [];
} catch {
  produtosExistentes = [];
}

// Renderiza os cards dinamicamente
produtosLancamento.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card destaque";
  card.innerHTML = `
    <img src="${p.imagem}" alt="${p.nome}">
    <h3>${p.nome}</h3>
    <p>R$ ${p.preco.toFixed(2)}</p>
    <span class="btn">Comprar</span>
  `;
  gridDestaques.appendChild(card);
});

// Adiciona clique em cada card
const cards = document.querySelectorAll(".card.destaque");
cards.forEach((card, index) => {
  const btn = card.querySelector(".btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const produto = produtosLancamento[index];

    // Salva apenas o produto selecionado
    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));

    // Adiciona ao array de produtos existentes se ainda não estiver
    if (!produtosExistentes.some(prod => prod.nome === produto.nome)) {
      produtosExistentes.push(produto);
      localStorage.setItem("produtos", JSON.stringify(produtosExistentes));
    }

    // Redireciona para detalhe
    window.location.href = "../paginaDetalheTenis/detalheTenis.html";
  });
});
