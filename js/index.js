// Gráfico de Precios del Tabaco (Evolución)
const ctxEvolution = document.getElementById('evolutionChart').getContext('2d');
const evolutionChart = new Chart(ctxEvolution, {
  type: 'bar',
  data: {
    labels: ['Marca 1', 'Marca 2', 'Marca 3', 'Marca 4', 'Marca 5', 'Marca 6', 'Marca 7', 'Marca 8', 'Marca 9', 'Marca 10'],
    datasets: [{
      label: 'Precio (€)',
      data: [5.00, 5.50, 6.20, 7.00, 5.90, 6.50, 4.80, 6.00, 5.60, 5.70],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.5
        }
      }
    }
  }
});

// Gráfico de Precios Actuales
const ctxCurrentPrice = document.getElementById('currentPriceChart').getContext('2d');
const currentPriceChart = new Chart(ctxCurrentPrice, {
  type: 'line',
  data: {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Precio (€) de Marca 1',
      data: [4.50, 4.80, 5.00, 5.20, 5.50, 5.90, 6.20, 6.50, 6.80, 7.00],
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      tension: 0.1,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Año'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Precio (€)'
        }
      }
    }
  }
});
