const fs = require(`fs`);
const path = require(`path`);

const CHUNK_SIZE = 1024 * 1024;

const genereateReport = (outputFile, dateId, filename) => {

    if (!fs.existsSync(outputFile)) {
        console.log(`Error: program cannot find file ${outputFile}`);
        return;
    }

    const stat = fs.statSync(outputFile);
    const totalBytes = stat.size;
    const totalBytesInMB = (stat.size / (1024 * 1024)).toFixed(2);

    if (totalBytes === 0) {
        console.log(`Empty space has 0 bytes. There is nothing to analyze`);
        return;
    }

    const stream = fs.createReadStream(outputFile, { highWaterMark: CHUNK_SIZE });

    let zerosCounter = 0;
    let bytesProcessed = 0;

    let densityMap = [];
    let currentZerosInBlock = 0;
    let bytesInBlock = 0;

    const partSize = Math.ceil(totalBytes / 10);

    stream.on('data', (chunk) => {

        for (let i = 0; i < chunk.length; i++) {
            bytesProcessed++;
            bytesInBlock++;

            if (chunk[i] === 0x00) {
                zerosCounter++;
                currentZerosInBlock++;
            }

            if (bytesProcessed % partSize === 0 || bytesProcessed === totalBytes) {
                let zerosInBlockPercentage = ((currentZerosInBlock / bytesInBlock) * 100).toFixed(1);
                let dataInBlockPercentage = (100 - zerosInBlockPercentage).toFixed(1);

                densityMap.push({
                    part: densityMap.length + 1,
                    zerosPercentage: parseFloat(zerosInBlockPercentage),
                    dataPercentage: parseFloat(dataInBlockPercentage)
                });

                currentZerosInBlock = 0;
                bytesInBlock = 0;
            }
        }

        let progress = ((bytesProcessed / totalBytes) * 100).toFixed(0);
        console.log(`Processed: ${progress}`);
    });

    stream.on('end', () => {
        const remainingDataCounter = totalBytes - zerosCounter;

        const zerosPercentage = ((zerosCounter / totalBytes) * 100).toFixed(2);
        const remainingDataPercentage = ((remainingDataCounter / totalBytes) * 100).toFixed(2);

        const forensicsReport = {
            processed_file: outputFile,
            total_size_of_empty_space_in_MB: parseFloat(totalBytesInMB),
            bytes_statistic: {
                total_bytes: totalBytes,
                zeros_of_bytes: zerosCounter,
                deleted_data_bytes: remainingDataCounter
            },
            percentages: {
                zeros_percentage: parseFloat(zerosPercentage),
                data_percentage: parseFloat(remainingDataPercentage)
            },
            density_map: densityMap
        };

        const reportFile = path.join(process.cwd(), 'data', 'case', `case_${dateId}-${filename}`, `report_${filename}.json`);

        fs.writeFileSync(reportFile, JSON.stringify(forensicsReport, null, 2));

        console.log(`${outputFile} file successfully processed and analyzed.`);
    });
};

module.exports = genereateReport;