const { spawnSync } = require(`child_process`);
const { spawn } = require(`child_process`);
const fs = require(`fs`);
const path = require(`path`);

const startCarvingEngine = async (filepath, dateId, filename) => {
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

                fs.unlink(filepath, (err) => {
                    
                    if (err) {
                        console.log(`Cannot delete the file ${filepath}`);
                        return;
                    }

                    console.log(`File is successsfuly deleted`);
                });

                resolve();
            } else {
                reject(new Error(`C program crashed with error: ${code}`));
            }
        });
    });
}

module.exports = startCarvingEngine;