class FolderInputSection {

    constructor() {
        this.folderInput = document.getElementById(`folder`);
        this.loadingScreen = document.getElementById(`loading-screen`);
        this.errorMessageToast = document.getElementById(`error-message-toast`);

        this.initEvents();
    }

    initEvents() {
        this.folderInput.addEventListener(`change`, (e) => {
            const files = e.target.files;

            if (files.length <= 0) {
                this.errorMessageToast.classList.add(`display`);
                this.errorMessageToast.textContent = `Provided folder is empty.`;
                return;
            }

            const file = e.target.files[0];

            const firstFileRelativePath = file.webkitRelativePath;
            const folder = firstFileRelativePath.split(`/`)[0];
            const folderNamingPattern = /case_([0-9\-_]+)-(.*)/;
            const match = folder.match(folderNamingPattern);

            if (!match) {
                this.errorMessageToast.classList.add(`display`);
                this.errorMessageToast.textContent = `Please provide a folder with valid name.`;
                this.folderInput.value = ``;
                return;
            }

            let foundValidReport = false;

            for (const foundFile of files) {
                const filename = foundFile.name.toLowerCase();

                if (filename.startsWith(`report_`) && filename.endsWith(`.json`)) {
                    foundValidReport = true;
                    break;
                }
            }

            if (!foundValidReport) {
                this.errorMessageToast.classList.add(`display`);
                this.errorMessageToast.textContent = `Please provide a folder with valid report file.`;
                this.folderInput.value = ``;
                return;
            }

            this.loadingScreen.classList.remove(`non-active`);
            this.errorMessageToast.classList.remove(`display`);
            window.electronAPI.sendFileFromFolder(file);
        });
    }
};

export default FolderInputSection;