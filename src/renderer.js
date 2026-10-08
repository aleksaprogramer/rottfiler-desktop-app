"use strict";
import { sendInputtedFile } from "./ui/utils/sendInputtedFile.js";
import { drawPercentagesGraph } from "./ui/utils/drawPercentagesGraph.js";
import { generateBasicInfo } from "./ui/utils/generateBasicInfo.js";

// VARIABLES

// FRAME
const minimizeBtn = document.getElementById(`minimize-btn`);
const closeBtn = document.getElementById(`close-btn`);

// PAGES
const importRawFilePage = document.getElementById(`import-raw-file-page`);
const reportPage = document.getElementById(`report-page`);
const recoveredFilesPage = document.getElementById(`recovered-files-page`);

// LINKS
// List items
const importRawFileListItem = document.getElementById(`import-raw-file-li`);
const reportAnalyticsListItem = document.getElementById(`report-analytics-li`);
const extractedFilesListItem = document.getElementById(`extracted-files-li`);
// Anchor tag links
const importRawFileLink = document.getElementById(`import-raw-file-link`);
const reportAnalyticsLink = document.getElementById(`report-analytics-link`);
const extractedFilesLink = document.getElementById(`extracted-files-link`);

// INPUTS
const rawFileInput = document.getElementById(`dd-file`);

// ERROR MESSAGES
const errorMessageToast = document.getElementById(`error-message-toast`);

// LOADING SCREENS
const loadingScreen = document.getElementById(`loading-screen`);
const loadingMessage = document.getElementById(`loading-message`);

// CONTAINERS
const reportContainer = document.getElementById(`report-container`);
const recoveredFilesContainer = document.getElementById(`recovered-files-container`);



// EVENTS

// MINIMIZING APP WINDOW
minimizeBtn.addEventListener(`click`, () => {
  window.electronAPI.minimizeWindow();
})

// CLOSING APP WINDOW
closeBtn.addEventListener(`click`, () => {
  window.electronAPI.closeWindow();
})

// SENDING INPUTTED RAW FILE TO preload.js
rawFileInput.addEventListener(`change`, (e) => {
  sendInputtedFile(e, errorMessageToast, loadingScreen);
});

// DISPLAYING REPORT ON electronAPI RESPONSE
window.electronAPI.onReportData((data) => {
  loadingScreen.classList.add(`non-active`);
  importRawFilePage.classList.remove(`render`);
  reportPage.classList.add(`render`);

  importRawFileListItem.classList.add(`non-active`);
  reportAnalyticsListItem.classList.remove(`non-active`);
  extractedFilesListItem.classList.remove(`non-active`);
  reportAnalyticsLink.classList.add(`active`);

  const html = generateBasicInfo(data);

  reportContainer.insertAdjacentHTML("afterbegin", html);
  drawPercentagesGraph(data.percentages.zeros_percentage, data.percentages.data_percentage);

  // STARTING FILE RECOVERING
  window.electronAPI.recoverFiles(data.processed_file, data.date_id, data.filename);
})

// RECEIVING RECOVERED FILES DATA
window.electronAPI.onRecoveredFiles((data) => {
  loadingMessage.classList.add(`non-active`);
  
  data.forEach((file) => {
    const html = html`
    <p>Name: ${file.name}</p>
    <p>Type: ${file.type}</p>
    <p>Filepath: ${file.path}</p>
    `

    recoveredFilesContainer.insertAdjacentHTML("beforeend", html);
  })
})

// CHANGING PAGES ON CLICK (Report Analytics > Recovered Files)
extractedFilesLink.addEventListener(`click`, (e) => {
  reportAnalyticsLink.classList.remove(`active`);
  extractedFilesLink.classList.add(`active`);
  reportPage.classList.remove(`render`);
  recoveredFilesPage.classList.add(`render`);
});

// CHANGING PAGES ON CLICK (Recovered Files > Report Analytics)
reportAnalyticsLink.addEventListener(`click`, (e) => {
  extractedFilesLink.classList.remove(`active`);
  reportAnalyticsLink.classList.add(`active`);
  recoveredFilesPage.classList.remove(`render`);
  reportPage.classList.add(`render`);
})