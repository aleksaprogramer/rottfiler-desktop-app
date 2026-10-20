export const convertBytes = (bytes) => {
    const bytesToMB = (bytes / (1024 * 1024)).toFixed(2);
    const bytesToGB = (bytes / (1024 * 1024 * 1024)).toFixed(2);
    return {
        bytesToMB: bytesToMB,
        bytesToGB: bytesToGB
    };
};