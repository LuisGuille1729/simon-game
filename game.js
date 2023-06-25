const buttons = {
    "green": document.querySelector(".green"),
    "red": document.querySelector(".red"),
    "yellow": document.querySelector(".yellow"),
    "blue": document.querySelector(".blue")
}

const sound = {
    "green": new Audio('https://github.com/LuisGuille1729/simon-game/raw/main/sounds/green.mp3'),
    "red": new Audio('https://github.com/LuisGuille1729/simon-game/raw/main/sounds/red.mp3'),
    "yellow": new Audio('https://github.com/LuisGuille1729/simon-game/raw/main/sounds/yellow.mp3'),
    "blue": new Audio('https://github.com/LuisGuille1729/simon-game/raw/main/sounds/blue.mp3'),
    "wrong": new Audio('https://github.com/LuisGuille1729/simon-game/raw/main/sounds/wrong.mp3')
}

function nextSequence() {
    const colors = ["green", "red", "yellow", "blue"];
    return colors[Math.floor(Math.random()*4)]; // returns random color
}

function blink(color) {
    setTimeout(() => {
        buttons[color].classList.remove("blink");
        acceptClick = true;
    }, 220)
    buttons[color].classList.add("blink");
    acceptClick = false;    // do not accept clicks while something is blinking
}

function pressed(color) {
    setTimeout(() => {
        buttons[color].classList.remove("pressed");
    }, 220)
    buttons[color].classList.add("pressed");
    sound[color].play();
}

const text = document.querySelector("#level-title")



let curSequence = [];
let active = false;
let acceptClick = false;
let curPlace = 0;
let playerClicks = []

document.addEventListener("keydown", function() {
    if (active) return; // do nothing if already active

    document.body.classList.remove("game-over");
    curSequence = [nextSequence()]; //start the sequence
    active = true;
    text.textContent = "Level 1"
    playerClicks = []

    setTimeout(() => blink(curSequence[0]), 350)
    curPlace = 0;
    acceptClick = true;
})

for (let btn in buttons) {
    buttons[btn].addEventListener("click", function() {
        if (!active || !acceptClick) return;    // do nothing if not active and not accepting clicks

        playerClicks.push(btn);
    
        pressed(btn);
    
        if (playerClicks[curPlace] !== curSequence[curPlace]) { // if incorrect button pressed, then finish game
            document.body.classList.add("game-over");
            text.textContent = "Game Over!"
            sound["wrong"].play();
            active = false;
            setTimeout(() => {
                if (!active) {
                document.body.classList.remove("game-over");
                text.textContent = "Press Key to Start"
                }
            }, 1500)
            
        }
        else if (curPlace === curSequence.length-1) {    // finished level, go to next level
            text.textContent = `Level ${curPlace+2}` 
            const newColor = nextSequence()
            curSequence.push(newColor)
            for (let i = 0; i < curSequence.length; i++) {
            setTimeout(() => blink(curSequence[i]), 500*i + 500)
            }
            curPlace = 0
            playerClicks = []
        } else {    // otherwise, correct button was pressed, check next
            curPlace++
        }
    })   
}



