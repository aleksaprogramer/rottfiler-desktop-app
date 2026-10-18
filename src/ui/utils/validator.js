export const validateFolderInput = (files, file) => {
    let foundValidReport = false;

    if (files.length <= 0) {
        return { valid: false, message: `Provided folder is empty.` };
    }

    const firstFileRelativePath = file.webkitRelativePath;
    const folder = firstFileRelativePath.split(`/`)[0];
    const folderNamingPattern = /case_([0-9\-_]+)-(.*)/;
    const match = folder.match(folderNamingPattern);

    if (!match) {
        return { valid: false, message: `Please provide a folder with valid name.` };
    }

    for (const foundFile of files) {
        const filename = foundFile.name.toLowerCase();

        if (filename.startsWith(`report_`) && filename.endsWith(`.json`)) {
            foundValidReport = true;
            break;
        }
    }

    if (!foundValidReport) {
        return { valid: false, message: `Please provide a folder with valid report file.` };
    }

    return { valid: true, message: `File is valid` };
};