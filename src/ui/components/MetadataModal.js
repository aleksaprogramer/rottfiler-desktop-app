class MetadataModal {

    constructor() {
        this.metadataModal = document.getElementById(`metadata-modal`);
        this.closeModalBtn = document.getElementById(`close-modal-btn`);
        this.metadataContainer = document.getElementById(`metadata-container`);
        this.overlay = document.getElementById(`overlay`);

        this.initElectronListener();
        this.init();
    }

    initElectronListener() {
        window.electronAPI.onMetadata((metadata) => {
            this.metadataModal.classList.add(`active`);
            this.overlay.classList.add(`active`);

            if (metadata.error) {
                this.metadataContainer.innerHTML = `<p>${metadata.error}</p>`;
                return;
            }
            
            this.metadataContainer.innerHTML = ``;

            let table = `<div class="metadata-table">`;

            for (const [key, value] of Object.entries(metadata)) {

                if (key === 'SourceFile' || key === 'ExifToolVersion' || key === 'Directory') {
                    continue;
                }

                const particularValue = typeof value === 'object' ? JSON.stringify(value) : value;

                table += `
                    <div class="metadata-row">
                        <span class="metadata-key">${key}:</span>
                        <span class="metadata-value">${value}</span>
                    </div>
                `;
            }

            table += `</div>`;

            this.metadataContainer.insertAdjacentHTML(`afterbegin`, table);
        })
    }

    init () {
        this.closeModalBtn.addEventListener(`click`, (e) => {
            this.metadataModal.classList.remove(`active`);
            this.overlay.classList.remove(`active`);
        });

        this.overlay.addEventListener(`click`, (e) => {
            this.metadataModal.classList.remove(`active`);
            this.overlay.classList.remove(`active`);
        });
    }
};

export default MetadataModal;