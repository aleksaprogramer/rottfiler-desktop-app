export const drawPercentagesGraph = (zeroPercentage, dataPercentage) => {
  const canvas = document.getElementById(`percentages-graph`);

  if (!canvas) return;

  const graphInstance = new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Clean Space (Zeros)', 'Deleted Data'],
      datasets: [{
        data: [zeroPercentage, dataPercentage],
        backgroundColor: [
          '#989898',
          '#0073d7'
        ],
        borderColor: '#242424',
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#f9f9f9',
            font: {
              size: 14,
              weight: '600',
              family: 'Arial'
            },
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: '#0059a7',
          titleColor: '#f9f9f9',
          bodyColor: '#f9f9f9',
          borderColor: '#0059a7',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              return ` ${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}