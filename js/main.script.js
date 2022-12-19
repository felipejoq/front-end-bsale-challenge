
// Globals
let currentPage = 0;
let sizeDefault = 9;
let routeDefault = "product";
let isFetching = true;
let currentCol = 1;
let isResults = true;
let idCategorySelected = 0;

const urlBase = "http://localhost:3000";
const gridColumnCount = 4;
const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loader");
const infoMessage = document.getElementById("mensaje-info");
const titleResult = document.getElementById("result-title");
const el = document.getElementById("term");

const fetching = async (url) => {

  loader.classList.add("show");
  const response = await fetch(
    url
  );

  const result = await response.json();

  return result["products"];
}

const getRoute = (route, page, size) => {

  route = route === routeDefault || route === null ? routeDefault : route;
  page = page === currentPage || page === null ? currentPage : page;
  size = size === sizeDefault || size === null ? sizeDefault : size;

  const url = route === routeDefault ? `${urlBase}/${route}?size=${size}&page=${page}` : `${urlBase}/${route}`;
  
  return url;
}

const fetchProducts = async (route, page, size) => {
  if(!isResults) return;
  
  let url = getRoute(route, page, size);

  isFetching = true;
  const result = await fetching(url);

  isResults = result.length > 0 || result["products"] === null;

  updateDom(result);
  currentPage++;
  isFetching = false;
  loader.classList.remove("show");
};

const updateDom = (products) => {

  products.forEach((product) => {

    const productContainer = document.createElement("div");
    productContainer.classList.add("image-wrapper");
    productContainer.classList.add("loading");

    const ulrImgProduct = product.url_image === "" || product.url_image === null ? "./img/no-image.jpg" : product.url_image;

    let priceProduct = currencyFormatter("CLP", product.price)

    productContainer.innerHTML = `
        <img 
            alt="a random image by picsum.photos" 
            src="${ulrImgProduct}"
            style="max-height:${genRandomInt(
              200,
              350
            )}px;height: 100%;display: block;"
            class="loading"
        />
        <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${priceProduct}</p>
        </div>`;

    if (currentCol === 5) {
      currentCol = 1;
    }

    cardContainer
      .querySelector(`.col:nth-child(${currentCol})`)
      .appendChild(productContainer);

    currentCol++;
    
    setTimeout(() => {
      productContainer.classList.remove('loading');
    }, 500);
  });
};

const genRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const currencyFormatter = (currency, value) => {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency
    }) 
    return formatter.format(value)
}

const loadCategories = async () => {

  const ul = document.getElementById("categories-list");

  const res = await fetch(
    `${urlBase}/category`
  );

  const response = await res.json();

  response.forEach(category => {
    const el = document.createElement("li");
    el.innerHTML = `<a onclick="callCategory(${category.id})"><span id="category-${ category.id }" class="li-category">${category.name}</span></a>`;
    ul.appendChild(el);
  })
}

const callCategory = async (categoryId) => {

  let unSelected = document.getElementById(`category-${idCategorySelected}`);
  if(unSelected != null){
    unSelected.classList.remove('selected');
  }

  let selectedNow = document.getElementById(`category-${categoryId}`);
  selectedNow.classList.add('selected');

  if(idCategorySelected === categoryId) return;

  idCategorySelected = categoryId;

  loader.classList.add("show");
  document.getElementById("menu-toggle").checked = false;
  currentPage = 0;
  let url = getRoute(`category/${categoryId}/products`, currentPage, sizeDefault);

  let result = await fetching(url);
  resetDom();
  el.focus();

  const element = document.querySelector('.info')

  if(!(element === null)) element.remove();

  titleResult.classList.remove("hidden");
  updateDom(result);
  isResults = false;
  loader.classList.remove("show");
}

const callSearch = async () => {
  loader.classList.add("show");
  document.getElementById("menu-toggle").checked = false;
  currentPage = 0;
  let url = getRoute(`product/search?term=${el.value}`, currentPage, sizeDefault);
  let result = await fetching(url);
  resetDom();
  el.focus();

  isResults = false;

  if(el.value.trim() === ""){
    putMessage(`<p>¡Está vacío! Ingrese algo al cuadro de búsqueda... 😅</p>`);
    
    return;
  }
  
  if(result.length <= 0){
    putMessage(`<p>No hay resultados para su búsqueda: "${el.value}" 😟</p> <p>😉👉 Intente con otro término...</p>`);
    return;
  }

  const element = document.querySelector('.info')
  if(!(element === null)) element.remove();
  titleResult.classList.remove("hidden");
  updateDom(result);
  loader.classList.remove("show");
}

const putMessage = (msg) => {
  const elemntInfo = document.createElement("div");
  elemntInfo.classList.add('info')
  const link = `<p class"link-to-home"><a href="/" alt="Volver al inicio">🏡 Volver</a></p>`
  titleResult.classList.add("hidden");
  let menssage = `${msg}<p>${link}</p>`;
  elemntInfo.innerHTML = menssage;
  infoMessage.innerHTML = ""
  infoMessage.appendChild(elemntInfo);
  loader.classList.remove("show");
  resetDom();
}

const resetDom = () => {
  currentCol = 1;
  currentPage = 0;
  cardContainer.innerHTML = ""
  for (let i = 0; i < 5; i++) {
    const col = document.createElement("div");
    col.classList.add("col");
    cardContainer.appendChild(col);
  }
}

el.addEventListener('keyup', (e) => {
  var code = e.key === "Enter" ? e.key : ""
  if(code == "Enter") { 
    callSearch();
  }
})  

window.addEventListener("DOMContentLoaded", async (event) => {
    await loadCategories();
    await fetchProducts(routeDefault, currentPage, sizeDefault);
});

window.addEventListener("scroll", async () => {
  // Do not run if currently fetching
  if (isFetching) return;

  // Scrolled to bottom

  if(isResults) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      await fetchProducts(routeDefault, currentPage, sizeDefault);
    }
  };
  
});

