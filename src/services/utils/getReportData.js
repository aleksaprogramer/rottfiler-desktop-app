const fs = require(`fs`);

const getReportData = (reportFile, dateId, filename) => {
    const jsonData = fs.readFileSync(`../../../data/case_${dateId}-${filename}/report_${filename}.json`);
    const data = JSON.parse(jsonData);
    return data;
};

module.exports = getReportData;