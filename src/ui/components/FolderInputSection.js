class FolderInputSection {

    constructor() {
        this.folderInput = document.getElementById(`folder`);
        this.loadingScreen = document.getElementById(`loading-screen`);
        this.errorMessageToast = document.getElementById(`error-message-toast`);

        this.initEvents();
    }

    initEvents() {
        this.folderInput.addEventListener(`change`, (e) => {
            this.loadingScreen.classList.remove(`non-active`);
            const filesFromInput = e.target.files;

            if (filesFromInput.length <= 0) {
                this.errorMessageToast.classList.add(`display`);
                this.errorMessageToast.textContent = `Please input a file for investigation`;
                return;
            }

            const file = event.target.files[0];

            this.errorMessageToast.classList.remove(`display`);
            window.electronAPI.sendFileFromFolder(file);
        });
    }
};

export default FolderInputSection;