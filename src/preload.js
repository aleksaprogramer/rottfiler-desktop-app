const { contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

  sendFile: (file) => {
    const filepath = webUtils.getPathForFile(file);
    ipcRenderer.send('raw-file-input', filepath);
  },

  onReportData: (callback) => {
    ipcRenderer.on(`report-data`, (e, data) => callback(data));
  }
});