const { app } = require("@electron/remote")
const { readFileSync } = require("original-fs")
const { dataPath, pauseTime } = require("../src/Managers/Reference")
const { setName, setCount } = require("../src/Managers/training")

const count = document.getElementById("count")
const name = document.getElementById("name")

const finish = document.getElementById("finish")

const data = JSON.parse(readFileSync(dataPath).toString())

const passedSound = new Audio("../assets/passed.wav")


var i = 0

var isRep = false

function nextEx() {
    const obj = JSON.parse(readFileSync(dataPath).toString())
    if (i == Object.values(obj["ex"]).length) {
        app.quit()
    }
    console.log(data["ex"][i]);
    if (data["ex"][i] != undefined) {
        console.log("ok");
    }

    setName(data["ex"][i]["name"], name)
    if (data["ex"][i]["type"] == "rep") {
        isRep = true
        setCount(data["ex"][i]["rep"], count)
    } else if (data["ex"][i]["type"] == "time") {
        isRep = false
        setCount(data["ex"][i]["time"], count)
    }

    if (isRep) {
        finish.style.display = ""
    } else {
        finish.style.display = "none"
        console.log("d");
        countdown()
    }
}

function countdown() {
    var currentTime = data["ex"][i]["time"]
    var id = setInterval(() => {
        currentTime--;
        setCount(currentTime, count)
        if (currentTime <= 0) {
            clearInterval(id)
            pause()
        }
    }, 1000);
}

function pause() {
    
    passedSound.play()
    setName("Pause", name)
    var currentPause = pauseTime
    setCount(pauseTime, count)
    finish.style.display = "none"
    var id = setInterval(() => {
        currentPause--
        setCount(currentPause, count)
        if (currentPause <= 0) {
            clearInterval(id)
            i++
            passedSound.play()
            nextEx()
        }
    }, 1000);
}


finish.addEventListener("click", () => {
    pause()
})

nextEx()