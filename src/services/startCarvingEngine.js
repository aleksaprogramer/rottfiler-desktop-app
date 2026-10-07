const { spawnSync } = require(`child_process`);
const { spawn } = require(`child_process`);
const path = require(`path`);

// const startCarvingEngine = (filepath, dateId, filename) => {
//     const CARVER_EXE_PATH = path.join(process.cwd(), 'src', 'services', 'Carver.exe');
//     const specifiedCaseFolder = path.join(process.cwd(), 'data', `case_${dateId}-${filename}`);

//     console.log(`Starting deleted files carving on RAW file: ${filepath}`);
//     console.log(`Results will be in folder: ${specifiedCaseFolder}`);

//     const carver = spawnSync(CARVER_EXE_PATH, [filepath, specifiedCaseFolder]);

//     if (carver.status === 0) {
//         console.log(`C program successfully recovered deleted files and distributed them`);

//     } else {
//         console.log(`Error: ${carver.stderr.toString()}`);
//     }
// };



const startCarvingEngine = (filepath, dateId, filename) => {
    return new Promise((resolve, reject) => {
        const CARVER_EXE_PATH = path.join(process.cwd(), 'src', 'services', 'Carver.exe');
        const specifiedCaseFolder = path.join(process.cwd(), 'data', `case_${dateId}-${filename}`);

        console.log(`Starting deleted files carving on RAW file: ${filepath}`);
        console.log(`Results will be in folder: ${specifiedCaseFolder}`);

        const carverProces = spawn(CARVER_EXE_PATH, [filepath, specifiedCaseFolder]);

        carverProces.stdout.on('data', (data) => {
            console.log(`[C-Program]: ${data.toString().trim()}`);
        })

        carverProces.on('error', (err) => {
            console.error("Error:", err);
            reject(err);
        });

        carverProces.on('close', (code) => {
            if (code === 0) {
                console.log("C program successfully finished file carving");
                resolve();
            } else {
                reject(new Error(`C program crashed with error: ${code}`));
            }
        });
    });
}

module.exports = startCarvingEngine;