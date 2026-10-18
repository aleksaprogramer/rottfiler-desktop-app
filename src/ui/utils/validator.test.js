import { validateFolderInput } from "./validator.js";

describe(`Validation of folder input`, () => {

    test(`should return an error if folder is empty`, () => {
        const result = validateFolderInput([], undefined);
        expect(result.valid).toBe(false);
        expect(result.message).toBe(`Provided folder is empty.`);
    });

    test(`should return an error if name of a input folder did not match with RegEx`, () => {
        const files = [
            { name: `report_usb-drive.001.json`,  }
        ];
        const file = { webkitRelativePath: `invalid-folder/report_usb-drive.001.json` };

        const result = validateFolderInput(files, file);
        expect(result.valid).toBe(false);
        expect(result.message).toBe(`Please provide a folder with valid name.`);
    });

    test(`should return an error if input folder does not coinain report file`, () => {
        const files = [
            { name: `file_1.PDF` },
            { name: `file_2.PDF` },
            { name: `file_3.PDF` }
        ];
        const file = { webkitRelativePath: `case_2026-10-17_12-39-18-usb-drive.001/file_1.PDF` };
        
        const result = validateFolderInput(files, file);
        expect(result.valid).toBe(false);
        expect(result.message).toBe(`Please provide a folder with valid report file.`);
    });
});