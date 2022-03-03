const { app, BrowserWindow, ipcMain } = require('electron');
const GPIO = require('onoff').Gpio;

const PIN_LED = 17;
const LED = new GPIO(PIN_LED, 'out');
const DEBUG_DISABLE_FULLSCREEN = false;
const DEBUG_LOG_IPC_MESSAGES = true;

ipcMain.on('ledOn', () => {
    if (DEBUG_LOG_IPC_MESSAGES) console.log('ledOn');
    LED.writeSync(1);
});

ipcMain.on("ledOff",() => {
    if (DEBUG_LOG_IPC_MESSAGES) console.log("ledOff");
    LED.writeSync(0);
});

ipcMain.on("buttonClose", () => {
    if (DEBUG_LOG_IPC_MESSAGES) console.log("buttonClose");
    LED.unexport();
    app.quit();
});

app.on('ready', function() {
    var mainWindow = new BrowserWindow({
        fullscreen: !DEBUG_DISABLE_FULLSCREEN,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');
});


// HOT RELOAD
try {
    require('electron-reloader')(module);
} catch (_) {}