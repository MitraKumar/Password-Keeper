const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

app.on('ready', () => {
    win = new BrowserWindow({ width: 500, height: 500 });

    win.on('closed', () => {
        app.quit();
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, './src/windows/main/main.html'),
        protocol: 'file',
        slashes: true
    }))
})