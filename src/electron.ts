import { app, BrowserWindow, ipcMain, screen } from "electron";

function createWindow() {
  const win = new BrowserWindow({
    center: true,
    frame: false,
    fullscreenable: false,
    height: 600,
    width: 800,
    backgroundColor: "#353635",
    webPreferences:{
        devTools: true,
        nodeIntegration: true,
        contextIsolation: false
    }
  });
  
  

  require("@electron/remote/main").initialize()
  require("@electron/remote/main").enable(win.webContents)
  win.loadFile("./src/index.html");
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})

ipcMain.on("open_training_window", () => {
  const win = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    frame: false,
    webPreferences:{
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  require("@electron/remote/main").enable(win.webContents)
  win.loadFile("./src/training.html")
})