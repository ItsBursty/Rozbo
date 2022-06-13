const {BrowserWindow} = require("@electron/remote")

const closeBtn = document.getElementById("close")
const minimizeBtn = document.getElementById("minimize")

closeBtn.addEventListener("click", () => {
    BrowserWindow.getFocusedWindow().close();
})

minimizeBtn.addEventListener("click", () => {
  BrowserWindow.getFocusedWindow().minimize();
});