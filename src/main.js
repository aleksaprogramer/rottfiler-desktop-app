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
  return win;
};

// === DESKTOP APP INITIALIZATION ===
app.whenReady().then(() => {
  const win = createWindow();

  ipcMain.on('raw-file-input', (e, filepath) => {
    const data = init(filepath);
    win.webContents.on(data, () => {
      win.webContents.send('backend-data', data);
    })
  })
});