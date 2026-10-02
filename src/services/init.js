const generateEmptySpaceFile = require(`./utils/generateEmptySpaceFile.js`);
const generateReport = require(`./utils/generateReport.js`);
const getReportData = require(`./utils/getReportData.js`);

const init = async (filepath) => {
    const { outputFile, dateId, filename } = generateEmptySpaceFile(filepath);

    await generateReport(outputFile, dateId, filename);

    const data = getReportData(dateId, filename);

    console.log(`=== DATA ===`);
    console.log(data);
    return data;
}

module.exports = init;