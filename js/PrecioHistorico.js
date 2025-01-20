let currentPage = 1;  // Página inicial
const resultsPerPage = 6;  // Resultados por página
let totalPages = 1;  // Total de páginas (se actualizará al cargar los datos)

// Función para cargar los resultados desde el JSON
async function loadResults() {
  const response = await fetch('../data/data.json'); // Ruta al archivo data.json
  const data = await response.json();
  
  const resultsContainer = document.getElementById('results');
  const paginationControls = document.getElementById('paginationControls');
  
  // Limpiar los resultados previos y configurar paginación
  resultsContainer.innerHTML = '';
  totalPages = Math.ceil(data.productos.length / resultsPerPage);

  // Calcular los resultados a mostrar según la página actual
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = data.productos.slice(startIndex, endIndex);
  
  // Recorrer los productos y mostrarlos
  currentResults.forEach(producto => {
    const primerPrecio = producto.precios['2015'];
    const ultimoPrecio = producto.precios['2025'];
    const diferencia = (ultimoPrecio - primerPrecio).toFixed(2);

    const resultCard = `
      <div class="bg-white p-4 rounded-lg shadow-md">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-40 object-cover rounded-md mb-4">
        <h4 class="text-lg font-semibold text-gray-800">${producto.nombre}</h4>
        <p class="text-gray-600 text-sm mb-2">${producto.descripcion}</p>
        <div class="text-gray-800 text-sm">
          <strong>2015: </strong>€${primerPrecio} <br>
          <strong>2025: </strong>€${ultimoPrecio} <br>
          <span class="text-green-500 font-bold">Subida: €${diferencia}</span>
        </div>
      </div>
    `;
    resultsContainer.innerHTML += resultCard;
  });
  
  // Actualizar los controles de paginación
  updatePaginationControls();
}

// Función para actualizar los controles de paginación
function updatePaginationControls() {
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const pageNumber = document.getElementById('pageNumber');
  
  pageNumber.textContent = `Página ${currentPage}`;
  
  // Deshabilitar los botones según la página actual
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Función para navegar a la página anterior
function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    loadResults();
  }
}

// Función para navegar a la siguiente página
function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    loadResults();
  }
}

// Función para filtrar los resultados según el input
function filterResults() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const cards = document.querySelectorAll('#results > div');

  cards.forEach(card => {
    const title = card.querySelector('h4').textContent.toLowerCase();
    card.style.display = title.includes(searchInput) ? '' : 'none';
  });
}

// Cargar los datos al cargar la página
window.onload = loadResults;

// Asignar eventos a los botones de paginación
document.getElementById('prevPageBtn').addEventListener('click', goToPreviousPage);
document.getElementById('nextPageBtn').addEventListener('click', goToNextPage);