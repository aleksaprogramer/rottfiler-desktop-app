import { sendInputtedFile } from "../utils/sendInputtedFile.js";

class RawFileInputSection {

    constructor() {
        this.rawFileInput = document.getElementById(`dd-file`);
        this.errorMessageToast = document.getElementById(`error-message-toast`);
        this.loadingScreen = document.getElementById(`loading-screen`);

        this.initEvents();
    }

    initEvents() {
        this.rawFileInput.addEventListener(`click`, (e) => {
            sendInputtedFile(e, errorMessageToast, loadingScreen);
        });
    }
};

export default RawFileInputSection;