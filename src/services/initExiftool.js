const { spawn } = require(`child_process`);
const path = require(`path`);

const initExiftool = (filepath) => {
    return new Promise((resolve, reject) => {
        const exiftoolPath = path.join(process.cwd(), 'src', 'services', 'exiftool', 'exiftool.exe');

        const response = spawn(exiftoolPath, ['-j', filepath]);

        let jsonData = '';

        response.stdout.on('data', (chunk) => {
            jsonData += chunk.toString();
        });

        response.on('close', (code) => {

            if (code !== 0) {
                return reject(new Error(`Exiftool finished with error (status code: ${code})`));
            }

            try {

                const parsedData = JSON.parse(jsonData);
                resolve(parsedData[0]);
                
            } catch (err) {
                reject(err);
            }
        });
    })
}

module.exports = initExiftool;