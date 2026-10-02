const fs = require(`fs`);
const path = require(`path`);

const getReportData = (dateId, filename) => {
    const reportFile = path.join(process.cwd(), 'data', `case_${dateId}-${filename}`, `report_${filename}.json`);
    const jsonData = fs.readFileSync(reportFile);
    const data = JSON.parse(jsonData);
    return data;
};

module.exports = getReportData;