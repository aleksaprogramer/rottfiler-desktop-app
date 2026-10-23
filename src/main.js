const path = require(`path`);
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const init = require(`./services/init.js`);
const startCarvingEngine = require(`./services/startCarvingEngine.js`);
const getRecoveredFiles = require(`./services/utils/getRecoveredFiles.js`);
const getReportData = require(`./services/utils/getReportData.js`);

// === SPLASH SCREEN ===
let splashWin;

const createSplashWindow = () => {
  splashWin = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    center: true,
    show: false,
    icon: path.join(__dirname, '..', 'public', 'favicon.png'),
  });

  splashWin.loadFile(path.join(process.cwd(), 'public', 'splash.html'));

  splashWin.once(`ready-to-show`, () => {
    splashWin.show();
  })
}

// === DESKTOP APP WINDOW CONFIG ===
const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    frame: false,
    show: false,
    icon: path.join(__dirname, '..', 'public', 'favicon.png'),
    webPreferences: {
      preload: path.join(__dirname, `preload.js`)
    }
  })

  // Delete in production
  win.webContents.openDevTools();

  win.loadFile('index.html');

  win.once(`ready-to-show`, () => {
    setTimeout(() => {

      splashWin.close();
      win.maximize();
      win.setMenu(null);
      win.show();
      
    }, 2000); // 5000
  })

  return win;
};

// === DESKTOP APP INITIALIZATION ===
app.whenReady().then(() => {

  // STARTIG FIRST THE SPLASH SCREEN THEN THE MAIN APP WINDOW
  createSplashWindow();
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
    console.log(`Fajl je stigo do main.js`);
    const data = await init(filepath);
    e.sender.send(`report-data`, data);
  })

  // STARTING FILE RECOVERING
  ipcMain.on('recover-files', async (e, filepath, dateId, filename) => {
    await startCarvingEngine(filepath, dateId, filename);
    const allRecoveredFiles = getRecoveredFiles(dateId, filename);
    const allRecoveredFilesJson = JSON.stringify(allRecoveredFiles);
    e.sender.send('recovered-files', allRecoveredFilesJson);
  })

  // RETURNING ALREADY PROCESSED DATA FROM A FOLDER
  ipcMain.on('folder-file-input', async (e, filepath) => {
    const folderPath = path.dirname(filepath);
    const folderNamingPattern = /case_([0-9\-_]+)-(.*)/;
    const match = folderPath.match(folderNamingPattern);

    if (match) {
      const dateId = match[1];
      const filename = match[2];

      const reportData = getReportData(dateId, filename);
      const recoveredFiles = getRecoveredFiles(dateId, filename);

      const data = {
        reportData: reportData,
        recoveredFiles: recoveredFiles
      };

      const dataJson = JSON.stringify(data);

      e.sender.send('folder-data', dataJson);

    } else {
      console.log(`Error: Invalid input`);
    }
  })

  // OPENING A FILE WITH OS
  ipcMain.on('open-file-with-system', (e, filepath) => {
    shell.openPath(filepath);
  });
});