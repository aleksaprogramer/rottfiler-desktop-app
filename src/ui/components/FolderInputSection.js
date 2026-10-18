import { validateFolderInput } from "../utils/validator.js";

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
            const file = files[0];

            const { valid, message } = validateFolderInput(files, file);

            if (!valid) {
                this.errorMessageToast.classList.add(`display`);
                this.errorMessageToast.textContent = message;
                return;
            }

            this.loadingScreen.classList.remove(`non-active`);
            this.errorMessageToast.classList.remove(`display`);
            window.electronAPI.sendFileFromFolder(file);
        });
    }
};

export default FolderInputSection;