// Menu hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Produtos por coleção
const colecoes = {
  streetwear: [
    {
      nome: "Nike Dunk Low",
      preco: 899.9,
      imagem: "../../img-tenis/tipo-tenis-1.jpg",
      descricao: "Estilo urbano, conforto e autenticidade."
    },
    {
      nome: "Air Jordan 1",
      preco: 1299.9,
      imagem: "../../img-tenis/tipo-tenis-2.jpg",
      descricao: "Estilo urbano, conforto e autenticidade."
    }
  ],
  performance: [
    {
      nome: "Nike Air Force",
      preco: 799.9,
      imagem: "../../img-tenis/tipo-tenis-1.jpg",
      descricao: "Máximo desempenho para esportes."
    },
    {
      nome: "Puma RS-X",
      preco: 699.9,
      imagem: "../../img-tenis/tipo-tenis-3.jpg",
      descricao: "Máximo desempenho para esportes."
    }
  ],
  premium: [
    {
      nome: "Air Jordan 1 Premium",
      preco: 1499.9,
      imagem: "../../img-tenis/tipo-tenis-2.jpg",
      descricao: "Design exclusivo e materiais nobres."
    },
    {
      nome: "Nike Dunk Low Premium",
      preco: 999.9,
      imagem: "../../img-tenis/tipo-tenis-3.jpg",
      descricao: "Design exclusivo e materiais nobres."
    }
  ]
};

// Pega produtos existentes no localStorage sem sobrescrever
let produtosExistentes;
try {
  produtosExistentes = JSON.parse(localStorage.getItem("produtos")) || [];
} catch {
  produtosExistentes = [];
}

// Função para renderizar produtos de uma coleção
function renderColecao(id) {
  const container = document.querySelector(`#${id} .grid-produtos`);
  container.innerHTML = ""; // Limpa o container
  const chave = id.replace("colecao-", ""); // streetwear, performance, premium
  colecoes[chave].forEach((produto) => {
    const card = document.createElement("a");
    card.href = "../paginaDetalheTenis/detalheTenis.html";
    card.className = "card";
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <span class="btn">Comprar</span>
    `;
    container.appendChild(card);

    // Clique no botão Comprar
    card.querySelector(".btn").addEventListener("click", (e) => {
      e.preventDefault();
      // Salva produto selecionado
      localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
      // Adiciona ao array de produtos existentes se ainda não estiver
      if (!produtosExistentes.some((p) => p.nome === produto.nome)) {
        produtosExistentes.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtosExistentes));
      }
      // Redireciona para detalheTenis
      window.location.href = "../paginaDetalheTenis/detalheTenis.html";
    });
  });
}

// Inicializa todas as coleções
Object.keys(colecoes).forEach((chave) => {
  renderColecao(`colecao-${chave}`);
});

// Funções de navegação (abrir/voltar) já existiam no HTML
function abrirColecao(id) {
  document.querySelector('.colecoes-lista').style.display = "none";
  document.querySelectorAll('.colecao-detalhe').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function voltar() {
  document.querySelector('.colecoes-lista').style.display = "block";
  document.querySelectorAll('.colecao-detalhe').forEach(sec => sec.classList.remove('active'));
}
