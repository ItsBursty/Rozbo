import fs from "fs";
import {dataPath} from "./Reference"
import {homedir} from "os"

function createDefaultJson() {
  const defaultJson = '{"ex": []}';
  if(!fs.existsSync(homedir() + "\\bursty-training")){
    fs.mkdirSync(homedir() + "\\bursty-training")
  }
  fs.writeFileSync(dataPath, defaultJson);
}

export function saveTime(name: string, time: number){
  if (!fs.existsSync(dataPath)) {
    console.log("create default json");
    
    createDefaultJson();
  }

  const jsonCurrentData = JSON.parse(
    fs.readFileSync(dataPath).toString()
  );

  var toSave = {"name": name,"type": "time", "time": time};
  
  jsonCurrentData["ex"][Object.keys(jsonCurrentData["ex"]).length] = toSave;

  fs.writeFileSync(dataPath, JSON.stringify(jsonCurrentData));
  refreshJson()
}


export function saveRep(name: string, rep: number){
  if (!fs.existsSync(dataPath)) {
    createDefaultJson();
  }

  const jsonCurrentData = JSON.parse(
    fs.readFileSync(dataPath).toString()
  );

  var toSave = {"name": name,"type": "rep", "rep": rep};
  jsonCurrentData["ex"][Object.keys(jsonCurrentData["ex"]).length] = toSave;

  fs.writeFileSync(dataPath, JSON.stringify(jsonCurrentData));
  refreshJson()
}

export function refreshJson(){
  var obj = JSON.parse(fs.readFileSync(dataPath).toString())
  
  if(Object.keys(obj["ex"]).length != 0){
    //@ts-ignore
    document.getElementById("list")?.innerHTML = ""
    var i = 0
    for (var item in obj["ex"]){
      i++
      const divElement = document.createElement("div")
      document.getElementById("list")?.appendChild(divElement)
      //@ts-ignore
      divElement.innerText = `${obj["ex"][item]["name"]} - ${obj["ex"][item]["type"] === "rep" ? obj["ex"][item]["rep"] + " répétitions" : obj["ex"][item]["time"] + "s"}`

      const deleteButton = document.createElement("button")
      divElement.appendChild(deleteButton)
      deleteButton.innerText = "X"
      deleteButton.className += i
      deleteButton.className += " delete"
      deleteButton.setAttribute("onclick", "removeElement(this.classList);")
    }
  }else{
    const divElement = document.getElementById("list")
    //@ts-ignore
    divElement.innerHTML = ""
  }
}