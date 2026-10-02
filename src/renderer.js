"use strict";

// VARIABLES
const rawFileInput = document.getElementById(`dd-file`);
const errorMessageToast = document.getElementById(`error-message-toast`);
const loadingScreen = document.getElementById(`loading-screen`);

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

  alert(JSON.stringify(data, null, 2));
})