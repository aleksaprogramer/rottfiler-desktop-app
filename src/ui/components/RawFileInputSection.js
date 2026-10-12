import { sendInputtedFile } from "../utils/sendInputtedFile.js";

class RawFileInputSection {

    constructor() {
        this.rawFileInput = document.getElementById(`dd-file`);
        this.errorMessageToast = document.getElementById(`error-message-toast`);
        this.loadingScreen = document.getElementById(`loading-screen`);

        this.initEvents();
    }

    initEvents() {
        this.rawFileInput.addEventListener(`change`, (e) => {
            sendInputtedFile(e, this.errorMessageToast, this.loadingScreen);
        });
    }
};

export default RawFileInputSection;