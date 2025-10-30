const carrinhoItems = document.querySelector('.carrinho-items');
const subtotalSpan = document.querySelector('.subtotal');
const freteSpan = document.querySelector('.frete');
const resultado = document.querySelector('.resultado');
const FRETE = 29.90;

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Formata número para R$
function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Atualiza subtotal, frete e total
function atualizarResumo(carrinho) {
  let subtotal = 0;
  carrinho.forEach(item => subtotal += Number(item.preco) * item.quantidade);

  subtotalSpan.textContent = formatarPreco(subtotal);
  freteSpan.textContent = formatarPreco(carrinho.length > 0 ? FRETE : 0);
  resultado.textContent = formatarPreco(subtotal + (carrinho.length > 0 ? FRETE : 0));
}

// Renderiza o carrinho dinamicamente
function renderCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  console.log("Carrinho carregado:", carrinho); // ✅ DEBUG
  carrinhoItems.innerHTML = '';

  if (carrinho.length === 0) {
    carrinhoItems.innerHTML = `<p style="text-align:center; font-size:1.2rem; color:#555;">Seu carrinho está vazio.</p>`;
    atualizarResumo(carrinho);
    return;
  }

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.dataset.index = index;
    div.innerHTML = `
      <img src="../../${item.imagem}" alt="${item.nome}">
      <div class="detalhes">
        <h3>${item.nome}</h3>
        <p>Tamanho: ${item.tamanho}</p>
        <p class="preco">R$ ${Number(item.preco).toFixed(2)}</p>
      </div>
      <input type="number" value="${item.quantidade}" min="1" class="quantidade">
      <button class="remover">✕</button>
    `;
    carrinhoItems.appendChild(div);

    // Remove item
    div.querySelector('.remover').addEventListener('click', () => {
      carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      renderCarrinho(); // Re-renderiza para atualizar índices
    });

    // Atualiza quantidade
    div.querySelector('.quantidade').addEventListener('change', (e) => {
      let qtd = parseInt(e.target.value);
      if (qtd < 1) qtd = 1;
      item.quantidade = qtd;
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarResumo(carrinho);
    });
  });

  atualizarResumo(carrinho);
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderCarrinho();
});