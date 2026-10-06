"use strict";

// VARIABLES
// Frame
const minimizeBtn = document.getElementById(`minimize-btn`);
const closeBtn = document.getElementById(`close-btn`);

// Pages
const importRawFilePage = document.getElementById(`import-raw-file-page`);
const reportPage = document.getElementById(`report-page`);

// Links
const importRawFileListItem = document.getElementById(`import-raw-file-li`);
const reportAnalyticsListItem = document.getElementById(`report-analytics-li`);
const extractedFilesListItem = document.getElementById(`extracted-files-li`);
const importRawFileLink = document.getElementById(`import-raw-file-link`);
const reportAnalyticsLink = document.getElementById(`report-analytics-link`);
const extractedFilesLink = document.getElementById(`extracted-files-link`);

const rawFileInput = document.getElementById(`dd-file`);
const errorMessageToast = document.getElementById(`error-message-toast`);
const loadingScreen = document.getElementById(`loading-screen`);
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

  importRawFileListItem.classList.add(`non-active`);
  reportAnalyticsListItem.classList.remove(`non-active`);
  extractedFilesListItem.classList.remove(`non-active`);
  reportAnalyticsLink.classList.add(`active`);

  const totalSizeOfEmptySpaceConvertedToGB = (data.total_size_of_empty_space_in_MB / 1024).toFixed(2);

  const html = `<div class="empty-file-info">
            <div class="heading-holder">
              <h3>Basic Info</h3>
              <img src="./src/assets/info-circle.png" alt="Info">
            </div>
            <div class="text">
              <p><span>Processed file:</span> ${data.processed_file}
              </p>
              <p><span>Size of an empty space:</span> ${data.total_size_of_empty_space_in_MB} MB (${totalSizeOfEmptySpaceConvertedToGB})</p>
              <p><span>Total number of bytes:</span> ${data.bytes_statistic.total_bytes}</p>
              <p><span>Total number of bytes that are zeros:</span> ${data.bytes_statistic.zeros_of_bytes}</p>
              <p><span>Total number of bytes that are deleted data:</span> ${data.bytes_statistic.deleted_data_bytes}</p>
              <p><span>Percentage of zeros:</span> ${data.percentages.zeros_percentage} %</p>
              <p><span>Percentage of deleted data:</span> ${data.percentages.data_percentage} %</p>
            </div>
          </div>`;

  reportContainer.insertAdjacentHTML("afterbegin", html);
  drawPercentagesGraph(data.percentages.zeros_percentage, data.percentages.data_percentage);
})