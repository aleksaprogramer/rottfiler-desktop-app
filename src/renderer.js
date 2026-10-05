"use strict";

// VARIABLES
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

// EVENTS
rawFileInput.addEventListener(`change`, sendInputedFile);

window.electronAPI.onReportData((data) => {
  console.log(`Report data has arrived on frontend`);

  loadingScreen.classList.add(`non-active`);
  importRawFilePage.classList.remove(`render`);
  reportPage.classList.add(`render`);

  const html = `<p>Zeros Percentage: ${data.percentages.zeros_percentage}</p>
  <p>Data Percentage: ${data.percentages.data_percentage}</p>`;

  reportContainer.insertAdjacentHTML("afterbegin", html);
})