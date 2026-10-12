class Frame {
    
    constructor() {
        this.minimizeBtn = document.getElementById(`minimize-btn`);
        this.closeBtn = document.getElementById(`close-btn`);

        this.initEvents();
    }

    initEvents() {

        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener(`click`, (e) => {
                window.electronAPI.minimizeWindow();
            })
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener(`click`, (e) => {
                window.electronAPI.closeWindow();
            })
        }
    }
};

export default Frame;