const path = require(`path`);
const { app, BrowserWindow, ipcMain } = require('electron');
const init = require(`./services/init.js`);

// === DESKTOP APP WINDOW CONFIG ===
const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    icon: path.join(__dirname, '..', 'public', 'favicon.png'),
    webPreferences: {
      preload: path.join(__dirname, `preload.js`)
    }
  })

  win.maximize();
  win.setMenu(null);

  win.loadFile('index.html');
};

// === DESKTOP APP INITIALIZATION ===
app.whenReady().then(() => {
  createWindow();

  ipcMain.on('raw-file-input', async (e, filepath) => {
    const data = await init(filepath);
    e.sender.send(`report-data`, data);
  })
});