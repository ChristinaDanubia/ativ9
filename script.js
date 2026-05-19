const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 15",
      preco: 5999,
      categoria: "Celulares",
      imagem: "https://picsum.photos/200?1",
      descricao: "Celular Apple",
      emEstoque: true
    },

    {
      id: 2,
      nome: "Notebook Dell",
      preco: 4500,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/200?2",
      descricao: "Notebook para estudos",
      emEstoque: true
    },

    {
      id: 3,
      nome: "Headset Gamer",
      preco: 300,
      categoria: "Games",
      imagem: "https://picsum.photos/200?3",
      descricao: "Headset RGB",
      emEstoque: false
    },

    {
      id: 4,
      nome: "Mouse Gamer",
      preco: 150,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/200?4",
      descricao: "Mouse com RGB",
      emEstoque: true
    },

    {
      id: 5,
      nome: "Playstation 5",
      preco: 4200,
      categoria: "Games",
      imagem: "https://picsum.photos/200?5",
      descricao: "Console Sony",
      emEstoque: true
    },

    {
      id: 6,
      nome: "Samsung Galaxy",
      preco: 3500,
      categoria: "Celulares",
      imagem: "https://picsum.photos/200?6",
      descricao: "Celular Samsung",
      emEstoque: false
    },

    {
      id: 7,
      nome: "Macbook",
      preco: 12000,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/200?7",
      descricao: "Notebook Apple",
      emEstoque: true
    },

    {
      id: 8,
      nome: "Teclado Mecânico",
      preco: 400,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/200?8",
      descricao: "Teclado RGB",
      emEstoque: true
    }
  ]
};

const productList = document.getElementById("product-list");

const productDetails = document.getElementById("product-details");

const search = document.querySelector("#search");

const category = document.querySelector("#category");

const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {

  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-id", produto.id);

  card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

  const img = document.createElement("img");
  img.src = produto.imagem;

  const title = document.createElement("h3");
  title.textContent = produto.nome;

  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);

  const categoryText = document.createElement("p");
  categoryText.textContent = produto.categoria;

  const detailsBtn = document.createElement("button");
  detailsBtn.textContent = "Ver detalhes";

  const highlightBtn = document.createElement("button");
  highlightBtn.textContent = "Destacar";

  // EVENTO DETALHES
  detailsBtn.addEventListener("click", () => {
    showProductDetails(produto);
  });

  // EVENTO DESTAQUE
  highlightBtn.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(categoryText);
  card.appendChild(detailsBtn);
  card.appendChild(highlightBtn);

  return card;
}

function renderProducts(produtos) {

  productList.innerHTML = "";

  produtos.forEach(produto => {

    const card = createProductCard(produto);

    productList.appendChild(card);

  });

  // querySelectorAll obrigatório
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    console.log("Card ID:", card.dataset.id);
  });

}

function renderCategories() {

  const categorias = [...new Set(data.produtos.map(p => p.categoria))];

  categorias.forEach(cat => {

    const option = document.createElement("option");

    option.value = cat;

    option.textContent = cat;

    category.appendChild(option);

  });

}

function showProductDetails(produto) {

  productDetails.innerHTML = `
  
    <h2>${produto.nome}</h2>

    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

    <p><strong>Categoria:</strong> ${produto.categoria}</p>

    <p><strong>Estoque:</strong> 
      ${produto.emEstoque ? "Disponível" : "Indisponível"}
    </p>

    <p>${produto.descricao}</p>

  `;
}

function filterProducts() {

  const text = search.value.toLowerCase();

  const selectedCategory = category.value;

  return data.produtos.filter(produto => {

    const matchesText =
      produto.nome.toLowerCase().includes(text);

    const matchesCategory =
      selectedCategory === "Todas" ||
      produto.categoria === selectedCategory;

    return matchesText && matchesCategory;

  });

}

search.addEventListener("input", () => {
  renderProducts(filterProducts());
});

category.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(data.produtos);
});

renderCategories();

renderProducts(data.produtos);
