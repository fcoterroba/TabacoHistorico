let currentPage = 1;
const resultsPerPage = 6;
let totalPages = 1;
let allResults = [];

async function loadResults() {
  const response = await fetch('../data/data.json');
  const data = await response.json();
  
  allResults = data.productos;

  filterResults();

  totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);
  
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; 

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

  updatePaginationControls();
}

let filteredResults = []; 

function filterResults() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  filteredResults = allResults.filter(producto => 
    producto.nombre.toLowerCase().includes(searchInput)
  );
  loadResults();
}

function updatePaginationControls() {
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const pageNumber = document.getElementById('pageNumber');

  pageNumber.textContent = `Página ${currentPage}`;
  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  
  prevBtn.classList.toggle('opacity-50', currentPage === 1);
  nextBtn.classList.toggle('opacity-50', currentPage === totalPages);
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    loadResults();
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    loadResults();
  }
}

window.onload = loadResults;

document.getElementById('prevPageBtn').addEventListener('click', goToPreviousPage);
document.getElementById('nextPageBtn').addEventListener('click', goToNextPage);