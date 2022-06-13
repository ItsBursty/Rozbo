const { ipcRenderer } = require("electron");
const { writeFileSync, readFileSync, fstat, existsSync } = require("original-fs");
const { saveRep, saveTime, refreshJson } = require("../src/Managers/jsonData");
const { dataPath } = require("../src/Managers/Reference");

console.log("Initialisation du script principal");

// Gestion de l'ajout d'exercices
const add = document.getElementById("add");
const exName = document.getElementById("name");
const typeInput = document.getElementById("type");
const repRange = document.getElementById("rep-range");
const timeRange = document.getElementById("time-range");

var nameEx = "";
var type = "";
var rep = 0;
var time = 0;

repRange.style.display = "none";
timeRange.style.display = "none";
typeInput.value = "none";

document.addEventListener("DOMContentLoaded", () => {
  refreshJson()
})

typeInput.addEventListener("change", () => {
  if (typeInput.value == "rep") {
    repRange.style.display = "";
    timeRange.style.display = "none";
    type = "rep"
  } else if (typeInput.value == "time") {
    repRange.style.display = "none";
    timeRange.style.display = "";
    type = "time"
  } else {
    console.log("no value");
  }
});

add.addEventListener("click", () => {
  if (exName.value.length === 0 || typeInput.value.length == 0) {
    console.log("vide");
  } else {
    if (typeInput.value === "rep" && repRange.value.length == 0) {
      console.log("rep vide");
    } else if (typeInput.value === "time" && timeRange.value.length == 0) {
      console.log("time vide");
    } else if (typeInput.value === "none") {
      console.log("pas de type");
    } else {
      console.log("reussi");
      nameEx = exName.value;
      rep = repRange.value;
      time = timeRange.value;
      if (type === "time") {
        saveTime(nameEx, time)
      } else {
        saveRep(nameEx, rep);
      }

    }
  }
});

const start = document.getElementById("start")
start.addEventListener("click", () => {
  if (existsSync(dataPath)) {
    const obj = JSON.parse(readFileSync(dataPath).toString())
    if (Object.values(obj["ex"]).length > 0)
      ipcRenderer.send("open_training_window")
  }

})

function removeElement(classList) {
  const listDiv = document.getElementById("list");

  for (const i in listDiv.children) {
    if (classList[0] - 1 == i) {
      const obj = JSON.parse(readFileSync(dataPath).toString())
      console.log(JSON.stringify(obj["ex"][i]));
      console.log(dataPath);
      obj["ex"].splice(i, 1)

      console.log(JSON.stringify(obj));

      writeFileSync(dataPath, JSON.stringify(obj))
      refreshJson()
      return
    }

  }
}