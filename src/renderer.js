"use strict";

// VARIABLES
const minimizeBtn = document.getElementById(`minimize-btn`);
const closeBtn = document.getElementById(`close-btn`);
const rawFileInput = document.getElementById(`dd-file`);
const errorMessageToast = document.getElementById(`error-message-toast`);
const loadingScreen = document.getElementById(`loading-screen`);
const importRawFilePage = document.getElementById(`import-raw-file-page`);
const reportPage = document.getElementById(`report-page`);
const reportContainer = document.getElementById(`report-container`);

// FUNCTIONS
const sendInputedFile = (e) => {
  const filesFromInput = e.target.files;

  if (filesFromInput.length <= 0) {
    errorMessageToast.classList.add(`display`);
    errorMessageToast.textContent = `Please input a file for investigation`;
    return;
  }

  const file = e.target.files[0];
  const fileExtension = String(file.name.split(`.`).pop());

  const alllowedExtensions = ['raw', 'dd', '001'];

  if (!alllowedExtensions.includes(fileExtension)) {
    errorMessageToast.classList.add(`display`);
    errorMessageToast.textContent = `Please input a valid file for investigation`;
    return;
  }

  errorMessageToast.classList.remove(`display`);
  loadingScreen.classList.remove(`non-active`);
  window.electronAPI.sendFile(file);
}

const drawPercentagesGraph = (zeroPercentage, dataPercentage) => {
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
        borderColor: '#0059a7',
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

// EVENTS
minimizeBtn.addEventListener(`click`, () => {
  window.electronAPI.minimizeWindow();
})

closeBtn.addEventListener(`click`, () => {
  window.electronAPI.closeWindow();
})

rawFileInput.addEventListener(`change`, sendInputedFile);

window.electronAPI.onReportData((data) => {
  console.log(`Report data has arrived on frontend`);

  loadingScreen.classList.add(`non-active`);
  importRawFilePage.classList.remove(`render`);
  reportPage.classList.add(`render`);

  const html = `<p>Zeros Percentage: ${data.percentages.zeros_percentage}</p>
  <p>Data Percentage: ${data.percentages.data_percentage}</p>`;

  reportContainer.insertAdjacentHTML("afterbegin", html);
  drawPercentagesGraph(data.percentages.zeros_percentage, data.percentages.data_percentage);
})