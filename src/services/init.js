const generateEmptySpaceFile = require(`./utils/generateEmptySpaceFile.js`);
const generateReport = require(`./utils/generateReport.js`);
const getReportData = require(`./utils/getReportData.js`);

const init = (filepath) => {
    const { outputFile, dateId, filename } = generateEmptySpaceFile(filepath);

    // console.log(`=== outputFile ===`);
    console.log({
        outputFile: outputFile,
        dateId: dateId,
        filename: filename
    })

    generateReport(outputFile, dateId, filename);

    // const data = getReportData(reportFile);

    // console.log(`=== DATA ===`);
    // console.log(data);

    // return data;
}

module.exports = init;