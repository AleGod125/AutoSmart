import { CallAllProductos, CallCategories } from '/data/Api.js';

const btnCategorias = document.getElementById('btnCategoria2');
const containerCat = document.getElementById('Categorias2');
const containerProductos = document.getElementById('productos');
const containerMarcas = document.getElementById('Marcas');

let allProducts = [];

document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const categories = await CallCategories();
    allProducts = await CallAllProductos();

    renderProductos(allProducts);
    renderMarcas(allProducts);
    renderCategories(categories);

  } catch (error) {
    console.error('Error inicializando:', error);
  }
}

function renderProductos(lista) {
  containerProductos.innerHTML = lista
    .map(prod => `
      <div class="cardproducto">
        <img class="img-producto" src="${prod.thumbnail}" alt="${prod.title}">
        <p class="prod-titulo">${prod.title}</p>
        <p class="prod-precio">$${prod.price}</p>
      </div>
    `)
    .join('');
}

function renderMarcas(productos) {
  containerMarcas.innerHTML = '';

  const marcas = ['Todos', ...new Set(productos.map(p => p.brand).filter(Boolean))];

  marcas.forEach(marca => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>
        <input type="radio" name="marca" value="${marca}" ${marca === 'Todos' ? 'checked' : ''}/>
        ${marca}
      </label>
    `;
    containerMarcas.appendChild(div);
  });

  containerMarcas.addEventListener('change', e => {
    const marca = e.target.value;
    const filtrados = marca === 'Todos'
      ? allProducts
      : allProducts.filter(p => p.brand === marca);

    renderProductos(filtrados);
  });
}

// ==================== RENDER CATEGORÍAS ====================
function renderCategories(categories) {
  containerCat.innerHTML = '';

  const lista = [
    { slug: 'Todos' },
    ...categories
  ];

  lista.forEach(cat => {
    const p = document.createElement('p');
    p.className = 'item';
    p.textContent = cat.slug;
    p.style.cursor = 'pointer';

    p.addEventListener('click', () => {
      const filtrados = cat.slug === 'Todos'
        ? allProducts
        : allProducts.filter(p => p.category === cat.slug);

      renderProductos(filtrados);
      marcarCategoriaSeleccionada(p);
    });

    containerCat.appendChild(p);
  });
}

function marcarCategoriaSeleccionada(selected) {
  containerCat.querySelectorAll('.item').forEach(el => {
    el.classList.remove('categoria-activa');
  });
  selected.classList.add('categoria-activa');
}

// ==================== TOGGLE CATEGORÍAS ====================
btnCategorias.addEventListener('click', () => {
  containerCat.classList.toggle('visible');
});
