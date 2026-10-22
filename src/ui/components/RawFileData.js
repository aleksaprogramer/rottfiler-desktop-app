import { generateBasicInfo } from '../utils/generateBasicInfo.js';
import { drawPercentagesGraph } from '../utils/drawPercentagesGraph.js';
import { drawDensityMapGraph } from '../utils/drawDensityMapGraph.js';

class RawFileData {

    constructor() {
        this.loadingScreen = document.getElementById(`loading-screen`);
        this.importRawFilePage = document.getElementById(`import-raw-file-page`);
        this.reportPage = document.getElementById(`report-page`);
        this.importRawFileListItem = document.getElementById(`import-raw-file-li`);
        this.openFolderListItem = document.getElementById(`open-folder-li`);
        this.reportAnalyticsListItem = document.getElementById(`report-analytics-li`);
        this.extractedFilesListItem = document.getElementById(`extracted-files-li`);
        this.reportAnalyticsLink = document.getElementById(`report-analytics-link`);
        this.reportContainer = document.getElementById(`report-container`);
        this.loadingMessage = document.getElementById(`loading-message`);
        this.recoveredFilesContainer = document.getElementById(`recovered-files-container`);
        this.loadMoreBtn = document.getElementById(`load-more-btn`);
        this.backBtnHolder = document.getElementById(`back-btn-holder`);

        this.receivedFiles = [];
        this.currentlyDisplayed = 0;
        this.perPage = 10;

        this.initElectronListener();
    }

    loadMoreFiles() {

        if (this.currentlyDisplayed >= this.receivedFiles.length) {

            if (this.loadMoreBtn) this.loadMoreBtn.style.display = `none`;
            return;
        }

        const files = this.receivedFiles.slice(this.currentlyDisplayed, this.currentlyDisplayed + this.perPage);

        let filesHtml = ``;

        files.forEach((file) => {
            filesHtml += `
            <p>Name: ${file.name}</p>
            <p>Type: ${file.type}</p>
            `;
        });

        this.recoveredFilesContainer.insertAdjacentHTML(`beforeend`, filesHtml);

        this.currentlyDisplayed += this.perPage;

        if (this.loadMoreBtn) {
            const remaining = this.receivedFiles.length - this.currentlyDisplayed;

            if (remaining > 0) {
                this.loadMoreBtn.style.display = `block`;
                this.loadMoreBtn.innerText = `Load more`;

            } else {
                this.loadMoreBtn.style.display = `none`;
            }
        }
    };

    initElectronListener() {
        window.electronAPI.onReportData((data) => {
            this.loadingScreen.classList.add(`non-active`);
            this.importRawFilePage.classList.remove(`render`);
            this.reportPage.classList.add(`render`);
            this.backBtnHolder.classList.remove(`non-active`);

            this.importRawFileListItem.classList.add(`non-active`);
            this.openFolderListItem.classList.add(`non-active`);
            this.reportAnalyticsListItem.classList.remove(`non-active`);
            this.extractedFilesListItem.classList.remove(`non-active`);
            this.reportAnalyticsLink.classList.add(`active`);

            const html = generateBasicInfo(data);

            this.reportContainer.insertAdjacentHTML("afterbegin", html);

            drawPercentagesGraph(data.percentages.zeros_percentage, data.percentages.data_percentage);
            drawDensityMapGraph(data.density_map);

            window.electronAPI.recoverFiles(data.processed_file, data.date_id, data.filename);
        });

        window.electronAPI.onRecoveredFiles((dataJson) => {
            this.loadingMessage.classList.add(`non-active`);

            const data = JSON.parse(dataJson);

            this.receivedFiles.push(...data);
            this.recoveredFilesContainer.innerHTML = ``;

            this.loadMoreFiles();
        });

        this.loadMoreBtn.addEventListener(`click`, () => this.loadMoreFiles());

        this.backBtnHolder.addEventListener(`click`, (e) => {
            this.receivedFiles = [];
            this.currentlyDisplayed = 0;
        });
    };
};

export default RawFileData;