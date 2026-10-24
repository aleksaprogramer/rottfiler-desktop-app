const fs = require(`fs`);
const path = require(`path`);
const crypto = require(`crypto`);

const hashFile = async (filepath) => {
    return new Promise((resolve, reject) => {


        if (!fs.existsSync(filepath)) {
            throw new Error(`File not found`);
            return;
        }

        console.log(`Start hashing file at filepath: ${filepath}`);

        const hashMd5 = crypto.createHash(`md5`);
        const hashSha256 = crypto.createHash(`sha256`);
        const hashSha1 = crypto.createHash(`sha1`);

        const stream = fs.createReadStream(filepath);

        stream.on('data', (data) => {
            hashMd5.update(data);
            hashSha256.update(data);
            hashSha1.update(data);
        });

        stream.on('end', () => {
            const fileHashMd5 = hashMd5.digest(`hex`);
            const fileHashSha256 = hashSha256.digest(`hex`);
            const fileHashSha1 = hashSha1.digest(`hex`);

            const hashes = {
                file_hash_md5: fileHashMd5,
                file_hash_sha256: fileHashSha256,
                file_hash_sha1: fileHashSha1
            };

            console.log(`File hashing finished.`);

            resolve(hashes);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    })
};

module.exports = hashFile;