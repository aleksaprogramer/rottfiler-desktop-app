export const drawDensityMapGraph = (densityMap) => {
    const canvas = document.getElementById(`density-map-graph`);

    if (!canvas) return;

    const labels = densityMap.map((item) => `Part ${item.part}`);
    const zerosPercentageData = densityMap.map((item) => item.zerosPercentage);
    const dataPercentageData = densityMap.map((item) => item.dataPercentage);

    const graphInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Deleted Data Found',
                    data: dataPercentageData,
                    backgroundColor: '#0073d7',
                    stack: 'Stack 0'
                },
                {
                    label: "Clean Space (Zeros)",
                    data: zerosPercentageData,
                    backgroundColor: '#989898',
                    stack: 'Stack 0'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#f9f9f9' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        color: '#f9f9f9',
                        callback: function(value) { return value + '%' }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#f9f9f9', padding: 15 }
                },
                tooltip: {
                    backgroundColor: '#0059a7',
                    titleColor: '#f9f9f9',
                    bodyColor: '#f9f9f9',
                    borderColor: '#0059a7',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
};