const generateEmptySpaceFile = require(`./utils/generateEmptySpaceFile.js`);
const generateReport = require(`./utils/generateReport.js`);
const getReportData = require(`./utils/getReportData.js`);
const hashFile = require(`./utils/hashFile.js`);

const init = async (filepath) => {
    const hashes = await hashFile(filepath);
    
    const { outputFile, dateId, filename } = generateEmptySpaceFile(filepath);

    await generateReport(outputFile, dateId, filename, hashes);

    const data = getReportData(dateId, filename);

    console.log(`=== DATA ===`);
    console.log(data);
    return data;
}

module.exports = init;