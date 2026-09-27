const generateEmptySpaceFile = require(`./utils/generateEmptySpaceFile.js`);

const init = (filepath) => {
    generateEmptySpaceFile(filepath);
}

module.exports = init;