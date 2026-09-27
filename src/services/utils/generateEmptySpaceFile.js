const { execSync, spawnSync } = require(`child_process`);
const fs = require(`fs`);
const path = require(`path`);

// IMPORTANT VARIABLES
const TSK_BIN_FOLDER_PATH = String(path.join(process.cwd(), 'src', 'services', 'tsk', 'tsk', 'bin')); // bin folder
const MMLS_EXE_PATH = String(path.join(TSK_BIN_FOLDER_PATH, 'mmls.exe')); // mmls.exe
const BLKLS_EXE_PATH = String(path.join(TSK_BIN_FOLDER_PATH, 'blkls.exe')); // blkls.exe

const generateEmptySpaceFile = (filepath) => {
    let offset = 0;
    let filesystem = '';

    // MMLS EXECUTABLE
    try {

        const mmlsOutput = execSync(`"${MMLS_EXE_PATH}" "${filepath}"`, {
            stdio: 'pipe'
        }).toString();

        // const mmls = spawnSync(MMLS_EXE_PATH, [filepath], {
        //     cwd: TSK_BIN_FOLDER_PATH
        // });

        // if (mmls.status !== 0) {
        //     throw new Error(mmls.stderr.toString());
        // }
        
        // const mmlsOutput = mmls.stdout.toString();

        console.log(mmlsOutput);

        // DETERMINING OFFSET SECTOR
        if (mmlsOutput.includes("0000000063")) {
            offset = 63;

        } else if (mmlsOutput.includes("0000000128")) {
            offset = 128;

        } else if (mmlsOutput.includes("0000000032")) {
            offset = 32;

        } else if (mmlsOutput.includes("0000002048")) {
            offset = 2048;
        }

        // DETERMINING FILE SYSTEM
        if (mmlsOutput.includes("FAT32") || mmlsOutput.includes("Win95 FAT32")) {
            filesystem = 'fat';

        } else if (mmlsOutput.includes("NTFS")) {
            filesystem = 'ntfs';
        }

        console.log(`Successful MMLS detection:`);
        console.log(`Offset sector: ${offset}`);
        console.log(`System: ${filesystem}`);

    } catch (err) {
        console.log(`MMLS have not detected partition table. Offset is set to 0 (raw partition)...`);
        offset = 0;

        if (err.stderr) {
            console.log(err.stderr.toString());

        } else {
            console.log(err.message);
        }
    }

    // BLKLS EXECUTABLE
    const filename = path.basename(filepath);
    const date = new Date();
    const dateId = date.toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-');

    const storagePath = path.join(process.cwd(), 'data', `case_${dateId}-${filename}`);

    fs.mkdirSync(storagePath, { recursive: true });

    const outputFile = path.join(process.cwd(), 'data', `case_${dateId}-${filename}`, `empty_space_${filename}.raw`);

    try {

        execSync(`"${BLKLS_EXE_PATH}" -f ${filesystem} -o ${offset} "${filepath}" > "${outputFile}"`);

        console.log(`Generated file: ${outputFile}`);
        
    } catch (err) {
        console.log(`Error during the extraction of empty space from partition: ${err.message}`);

        if (err.stderr) {
            console.log(err.stderr.toString());

        } else {
            console.log(err.message);
        }
    }
};

module.exports = generateEmptySpaceFile;