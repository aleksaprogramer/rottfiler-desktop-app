import { generateBasicInfo } from '../utils/generateBasicInfo.js';
import { drawPercentagesGraph } from '../utils/drawPercentagesGraph.js';

class RecoveredFilesData {

    constructor() {
        this.loadMoreBtn = document.getElementById(`load-more-btn`);
        this.recoveredFilesContainer = document.getElementById(`recovered-files-container`);
        this.loadingScreen = document.getElementById(`loading-screen`);
        this.openFolderPage = document.getElementById(`open-folder-page`);
        this.reportPage = document.getElementById(`report-page`);;
        this.importRawFileListItem = document.getElementById(`import-raw-file-li`);
        this.openFolderListItem = document.getElementById(`open-folder-li`);
        this.reportAnalyticsListItem = document.getElementById(`report-analytics-li`);
        this.extractedFilesListItem = document.getElementById(`extracted-files-li`);
        this.reportAnalyticsLink = document.getElementById(`report-analytics-link`);
        this.loadingMessage = document.getElementById(`loading-message`);
        this.reportContainer = document.getElementById(`report-container`);
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
            const isImage = file.type === 'JPG' || file.type === 'PNG';
            const isVideo = file.type === 'MP4';

            filesHtml += `
            <div class="recovered-file">
                <p>Name: ${file.name}</p>
                <p>Type: ${file.type}</p>
                <p>File is available at: ${file.filepath}</p>

                ${isImage ? `<img src="${file.filepath}" alt="" class="recovered-image">` : ``}
                
                ${isVideo ? `
                    <video width="230" controls>
                        <source src="${file.filepath}" type="video/mp4" />
                        It is currently not possible to display this video.
                    </video>
                    ` : ``
                }
            </div>
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
        window.electronAPI.onFolderData((dataJson) => {
            this.loadingScreen.classList.add(`non-active`);
            this.openFolderPage.classList.remove(`render`);
            this.reportPage.classList.add(`render`);
            this.backBtnHolder.classList.remove(`non-active`);

            this.importRawFileListItem.classList.add(`non-active`);
            this.openFolderListItem.classList.add(`non-active`);
            this.reportAnalyticsListItem.classList.remove(`non-active`);
            this.extractedFilesListItem.classList.remove(`non-active`);
            this.reportAnalyticsLink.classList.add(`active`);

            this.loadingMessage.classList.add(`non-active`);

            const data = JSON.parse(dataJson);
            const { reportData, recoveredFiles } = data;

            const html = generateBasicInfo(reportData);

            this.reportContainer.insertAdjacentHTML("afterbegin", html);

            drawPercentagesGraph(reportData.percentages.zeros_percentage, reportData.percentages.data_percentage);

            this.receivedFiles.push(...recoveredFiles);

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

export default RecoveredFilesData;