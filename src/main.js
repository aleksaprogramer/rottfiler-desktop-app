const path = require(`path`);
const { app, BrowserWindow, ipcMain } = require('electron');
const init = require(`./services/init.js`);
const startCarvingEngine = require(`./services/startCarvingEngine.js`);

// === DESKTOP APP WINDOW CONFIG ===
const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    frame: false,
    icon: path.join(__dirname, '..', 'public', 'favicon.png'),
    webPreferences: {
      preload: path.join(__dirname, `preload.js`)
    }
  })

  win.maximize();
  win.setMenu(null);

  win.loadFile('index.html');
  return win;
};

// === DESKTOP APP INITIALIZATION ===
app.whenReady().then(() => {
  const win = createWindow();

  // MINIMIZING APP WINDOW
  ipcMain.on('minimize-window', () => {
    if (win) win.minimize();
  });

  // CLOSING APP WINDOW
  ipcMain.on('close-window', () => {
    if (win) win.close();
  });

  // SENDING RAW FILE FOR PROCESSING AND RETURNING BACK DATA TO preload.js
  ipcMain.on('raw-file-input', async (e, filepath) => {
    const data = await init(filepath);
    e.sender.send(`report-data`, data);
  })

  // STARTING FILE RECOVERING
  ipcMain.on('recover-files', async (e, filepath, dateId, filename) => {
    await startCarvingEngine(filepath, dateId, filename);
  })
});