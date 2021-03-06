"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function createWindow() {
    const win = new electron_1.BrowserWindow({
        center: true,
        frame: false,
        fullscreenable: false,
        height: 600,
        width: 800,
        backgroundColor: "#353635",
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    require("@electron/remote/main").initialize();
    require("@electron/remote/main").enable(win.webContents);
    win.loadFile("./src/index.html");
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.ipcMain.on("open_training_window", () => {
    const win = new electron_1.BrowserWindow({
        fullscreen: true,
        resizable: false,
        frame: false,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    require("@electron/remote/main").enable(win.webContents);
    win.loadFile("./src/training.html");
});
