const generateEmptySpaceFile = require(`./utils/generateEmptySpaceFile.js`);
const generateReport = require(`./utils/generateReport.js`);

const init = (filepath) => {
    const { outputFile, dateId, filename } = generateEmptySpaceFile(filepath);
    generateReport(outputFile);
}

module.exports = init;