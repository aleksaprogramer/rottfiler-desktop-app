import { convertBytes } from './convertBytes.js';

describe(`Bytes converting`, () => {

    test(`should return a given result`, () => {
        const result = convertBytes(1000000);
        expect(result.bytesToMB).toBe('0.95');
        expect(result.bytesToGB).toBe('0.00');
    });

    test(`should return a given result`, () => {
        const result = convertBytes(2000000000);
        expect(result.bytesToMB).toBe('1907.35');
        expect(result.bytesToGB).toBe('1.86');
    })
});