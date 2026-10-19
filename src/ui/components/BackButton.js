class BackButton {

    constructor() {
        this.backBtnHolder = document.getElementById(`back-btn-holder`);
        this.importRawFilePage = document.getElementById(`import-raw-file-page`);
        this.reportPage = document.getElementById(`report-page`);
        this.recoveredFilesPage = document.getElementById(`recovered-files-page`);
        this.importRawFileListItem = document.getElementById(`import-raw-file-li`);
        this.openFolderListItem = document.getElementById(`open-folder-li`);
        this.reportAnalyticsListItem = document.getElementById(`report-analytics-li`);
        this.extractedFilesListItem = document.getElementById(`extracted-files-li`);
        this.importRawFileLink = document.getElementById(`import-raw-file-link`);
        this.openFolderLink = document.getElementById(`open-folder-link`);
        this.reportAnalyticsLink = document.getElementById(`report-analytics-link`);
        this.extractedFilesLink = document.getElementById(`extracted-files-link`);

        this.rawFileInput = document.getElementById(`dd-file`);
        this.folderInput = document.getElementById(`folder`);
        this.reportContainer = document.getElementById(`report-container`);
        this.recoveredFilesContainer = document.getElementById(`recovered-files-container`);

        this.initEvents();
    }

    initEvents() {

        if (this.backBtnHolder) {
            this.backBtnHolder.addEventListener(`click`, (e) => {
                this.importRawFilePage.classList.add(`render`);
                this.reportPage.classList.remove(`render`);
                this.recoveredFilesPage.classList.remove(`render`);

                this.importRawFileListItem.classList.remove(`non-active`);
                this.openFolderListItem.classList.remove(`non-active`);
                this.reportAnalyticsListItem.classList.add(`non-active`);
                this.extractedFilesListItem.classList.add(`non-active`);
                this.openFolderLink.classList.remove(`active`);
                this.importRawFileLink.classList.add(`active`);
                this.reportAnalyticsLink.classList.remove(`active`);
                this.extractedFilesLink.classList.remove(`active`);

                this.rawFileInput.value = ``;
                this.folderInput.value = ``;
                this.reportContainer.innerHTML = `
                    <div class="graphs">
                        <div class="percentages-graph-frame">
                            <h3>Percentages</h3>
                            <canvas id="percentages-graph"></canvas>
                        </div>
                        <div class="density-map-graph-frame">
                            <h3>Density Map</h3>
                            <canvas id="density-map-graph"></canvas>
                        </div>
                    </div>
                `;
                this.recoveredFilesContainer.innerHTML = ``;

                this.backBtnHolder.classList.add(`non-active`);
            })
        }
    }
};

export default BackButton;