const { contextBridge, ipcRenderer, webUtils } = require('electron');

// ELECTRON API CONTEXT BRIDG (CONNECTS renderer.js AND main.js)
contextBridge.exposeInMainWorld('electronAPI', {

  // MINIMIZING APP WINDOW
  minimizeWindow: () => ipcRenderer.send('minimize-window'),

  // CLOSING APP WINDOW
  closeWindow: () => ipcRenderer.send('close-window'),

  // SENDING FILE TO main.js
  sendFile: (file) => {
    const filepath = webUtils.getPathForFile(file);
    ipcRenderer.send('raw-file-input', filepath);
  },

  // SENDING REPORT DATA TO renderer.js
  onReportData: (callback) => {
    ipcRenderer.on(`report-data`, (e, data) => callback(data));
  }
});