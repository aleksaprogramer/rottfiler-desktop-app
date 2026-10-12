class Sidebar {

    constructor() {

        // LIST ITEMS
        this.importRawFileListItem = document.getElementById(`import-raw-file-li`);
        this.openFolderListItem = document.getElementById(`open-folder-li`);
        this.reportAnalyticsListItem = document.getElementById(`report-analytics-li`);
        this.extractedFilesListItem = document.getElementById(`extracted-files-li`);

        // ANCHOR LINKS
        this.importRawFileLink = document.getElementById(`import-raw-file-link`);
        this.openFolderLink = document.getElementById(`open-folder-link`);
        this.reportAnalyticsLink = document.getElementById(`report-analytics-link`);
        this.extractedFilesLink = document.getElementById(`extracted-files-link`);

        // PAGES
        this.importRawFilePage = document.getElementById(`import-raw-file-page`);
        this.openFolderPage = document.getElementById(`open-folder-page`);
        this.reportPage = document.getElementById(`report-page`);
        this.recoveredFilesPage = document.getElementById(`recovered-files-page`);

        this.initEvents();
    }

    initEvents() {
        this.openFolderLink.addEventListener(`click`, (e) => {
            this.importRawFileLink.classList.remove(`active`);
            this.openFolderLink.classList.add(`active`);
            this.importRawFilePage.classList.remove(`render`);
            this.openFolderPage.classList.add(`render`);
        });

        this.importRawFileLink.addEventListener(`click`, (e) => {
            this.openFolderLink.classList.remove(`active`);
            this.importRawFileLink.classList.add(`active`);
            this.openFolderPage.classList.remove(`render`);
            this.importRawFilePage.classList.add(`render`);
        });

        this.extractedFilesLink.addEventListener(`click`, (e) => {
            this.reportAnalyticsLink.classList.remove(`active`);
            this.extractedFilesLink.classList.add(`active`);
            this.reportPage.classList.remove(`render`);
            this.recoveredFilesPage.classList.add(`render`);
        });

        this.reportAnalyticsLink.addEventListener(`click`, (e) => {
            this.extractedFilesLink.classList.remove(`active`);
            this.reportAnalyticsLink.classList.add(`active`);
            this.recoveredFilesPage.classList.remove(`render`);
            this.reportPage.classList.add(`render`);
        });
    }
};

export default Sidebar;