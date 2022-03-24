const { app, BrowserWindow, ipcMain } = require('electron');
const GPIO = require('onoff').Gpio;

const PIN_SOLENOID = 17;
const SOLENOID = new GPIO(PIN_SOLENOID, 'out');
const DEBUG_DISABLE_FULLSCREEN = false;
const DEBUG_LOG_IPC_MESSAGES = true;

ipcMain.on('moveSolenoid', () => {
    if (DEBUG_LOG_IPC_MESSAGES) console.log('moveSolenoid on');
    // ソレノイド駆動
    SOLENOID.writeSync(1);

    // 10秒後に停止
    setTimeout(function() {
        if (DEBUG_LOG_IPC_MESSAGES) console.log('moveSolenoid off');
        SOLENOID.writeSync(0);
    }, 10000);
});

ipcMain.on("ledOff",() => {
    if (DEBUG_LOG_IPC_MESSAGES) console.log("ledOff");
    SOLENOID.writeSync(0);
});

ipcMain.on("buttonClose", () => {
    if (DEBUG_LOG_IPC_MESSAGES) console.log("buttonClose");
    SOLENOID.writeSync(0);
    SOLENOID.unexport();
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