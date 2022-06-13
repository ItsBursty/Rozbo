"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshJson = exports.saveRep = exports.saveTime = void 0;
const fs_1 = __importDefault(require("fs"));
const Reference_1 = require("./Reference");
const os_1 = require("os");
function createDefaultJson() {
    const defaultJson = '{"ex": []}';
    if (!fs_1.default.existsSync((0, os_1.homedir)() + "\\bursty-training")) {
        fs_1.default.mkdirSync((0, os_1.homedir)() + "\\bursty-training");
    }
    fs_1.default.writeFileSync(Reference_1.dataPath, defaultJson);
}
function saveTime(name, time) {
    if (!fs_1.default.existsSync(Reference_1.dataPath)) {
        console.log("create default json");
        createDefaultJson();
    }
    const jsonCurrentData = JSON.parse(fs_1.default.readFileSync(Reference_1.dataPath).toString());
    var toSave = { "name": name, "type": "time", "time": time };
    jsonCurrentData["ex"][Object.keys(jsonCurrentData["ex"]).length] = toSave;
    fs_1.default.writeFileSync(Reference_1.dataPath, JSON.stringify(jsonCurrentData));
    refreshJson();
}
exports.saveTime = saveTime;
function saveRep(name, rep) {
    if (!fs_1.default.existsSync(Reference_1.dataPath)) {
        createDefaultJson();
    }
    const jsonCurrentData = JSON.parse(fs_1.default.readFileSync(Reference_1.dataPath).toString());
    var toSave = { "name": name, "type": "rep", "rep": rep };
    jsonCurrentData["ex"][Object.keys(jsonCurrentData["ex"]).length] = toSave;
    fs_1.default.writeFileSync(Reference_1.dataPath, JSON.stringify(jsonCurrentData));
    refreshJson();
}
exports.saveRep = saveRep;
function refreshJson() {
    var _a, _b;
    var obj = JSON.parse(fs_1.default.readFileSync(Reference_1.dataPath).toString());
    if (Object.keys(obj["ex"]).length != 0) {
        //@ts-ignore
        (_a = document.getElementById("list")) === null || _a === void 0 ? void 0 : _a.innerHTML = "";
        var i = 0;
        for (var item in obj["ex"]) {
            i++;
            const divElement = document.createElement("div");
            (_b = document.getElementById("list")) === null || _b === void 0 ? void 0 : _b.appendChild(divElement);
            //@ts-ignore
            divElement.innerText = `${obj["ex"][item]["name"]} - ${obj["ex"][item]["type"] === "rep" ? obj["ex"][item]["rep"] + " répétitions" : obj["ex"][item]["time"] + "s"}`;
            const deleteButton = document.createElement("button");
            divElement.appendChild(deleteButton);
            deleteButton.innerText = "X";
            deleteButton.className += i;
            deleteButton.className += " delete";
            deleteButton.setAttribute("onclick", "removeElement(this.classList);");
        }
    }
    else {
        const divElement = document.getElementById("list");
        //@ts-ignore
        divElement.innerHTML = "";
    }
}
exports.refreshJson = refreshJson;
