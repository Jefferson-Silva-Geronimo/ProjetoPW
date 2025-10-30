// Caminhos das imagens padrão (caso o produto não tenha imagem definida)
const imagensPadrao = [
  "../../img-tenis/tipo-tenis-1.jpg",
  "../../img-tenis/tipo-tenis-2.jpg",
  "../../img-tenis/tipo-tenis-3.jpg"
];

// Seleciona o container de produtos
const gridProdutos = document.querySelector(".grid-produtos");

// Carrega produtos do localStorage ou cria array vazio
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Limpa o container antes de renderizar
gridProdutos.innerHTML = "";

// Renderiza cada produto dinamicamente
produtos.forEach((p, i) => {
  // Usa imagem do produto ou intercalada padrão
  const imagemSrc = p.imagem ? p.imagem : imagensPadrao[i % imagensPadrao.length];

  const card = document.createElement("a");
  card.href = "../paginaDetalheTenis/detalheTenis.html";
  card.className = "card";
  card.innerHTML = `
    <img src="${imagemSrc}" alt="${p.nome}">
    <h3>${p.nome}</h3>
    <p>R$ ${p.preco.toFixed(2)}</p>
    <span class="btn">Comprar</span>
  `;

  // Ao clicar no card, salva o produto selecionado no localStorage
  card.addEventListener("click", () => {
    localStorage.setItem("produtoSelecionado", JSON.stringify({
      ...p,
      imagem: imagemSrc
    }));
  });

  gridProdutos.appendChild(card);
});

// Menu hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
