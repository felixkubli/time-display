
// browser-window creates a native window
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;


function createWindow() {
  mainWindow = new BrowserWindow({ width: 1200, height: 900 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  createWindow();
});

app.on('activate', function () {
  if(mainWindow === null) {
    createWindow();
  }
});

