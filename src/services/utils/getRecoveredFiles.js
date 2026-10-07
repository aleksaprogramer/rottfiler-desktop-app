const path = require(`path`);
const fs = require(`fs`);

const getRecoveredFiles = (dateId, filename) => {
    const specifiedCaseFolder = path.join(process.cwd(), 'data', `case_${dateId}-${filename}`);
    const recoveredFilesFolder = path.join(specifiedCaseFolder, 'recovered-files');

    const formats = [
        { folder: 'JPG', type: 'JPG', extensions: ['.jpg', '.jpeg'] },
        { folder: 'PNG', type: 'PNG', extensions: ['.png'] },
        { folder: 'PDF', type: 'PDF', extensions: ['.pdf'] },
        { folder: 'ZIP_DOCX', type: 'ZIP', extensions: ['.zip'] },
        { folder: 'MP4', type: 'MP4', extensions: ['.mp4'] }
    ];

    let allRecoveredFiles = [];

    formats.forEach(format => {
        const folderPath = path.join(recoveredFilesFolder, format.folder);

        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);

            files.forEach(file => {

                if (format.extensions.includes(path.extname(file).toLowerCase())) {
                    allRecoveredFiles.push({
                        name: file,
                        type: format.type,
                        filepath: path.join(folderPath, file)
                    })
                }
            })
        }
    });

    return allRecoveredFiles;
};

module.exports = getRecoveredFiles;