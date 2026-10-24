const fs = require(`fs`);
const path = require(`path`);
const hashFile = require(`./hashFile.js`);

describe(`File hashing`, () => {

    const testFilepath = path.join(__dirname, 'test_file_for_hashFile.txt');

    beforeAll(() => {
        fs.writeFileSync(testFilepath, 'content');
    });

    afterAll(() => {

        if (fs.existsSync(testFilepath)) {
            fs.unlinkSync(testFilepath);
        }
    });
    
    test(`should return an object of hashed values`, async () => {
        const result = await hashFile(testFilepath);

        expect(result).toBeDefined();
        expect(typeof result).toBe(`object`);
        expect(typeof result.file_hash_md5).toBe(`string`);
        expect(typeof result.file_hash_sha256).toBe(`string`);
        expect(typeof result.file_hash_sha1).toBe(`string`);

        expect(result.file_hash_md5).toBe(`9a0364b9e99bb480dd25e1f0284c8555`);
        expect(result.file_hash_sha256).toBe(`ed7002b439e9ac845f22357d822bac1444730fbdb6016d3ec9432297b9ec9f73`);
        expect(result.file_hash_sha1).toBe(`040f06fd774092478d450774f5ba30c5da78acc8`);
    });
});