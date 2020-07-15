const {app, BrowserWindow} = require('electron');

function createWindow() {

    const win = new BrowserWindow({
        show: false,
        // fullscreen: true,
        // frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.once('ready-to-show', () => win.show());

    win.loadFile(`${__dirname}/docs/index.html`);

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
