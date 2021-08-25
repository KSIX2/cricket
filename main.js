let options = document.querySelector("#options");
let choices = [].slice.call(document.querySelectorAll('.choice'), 0)
let modalparent = document.querySelector("#modalparent")
let modal = document.querySelector("#modal")
let left = document.querySelector("#left")
let right = document.querySelector("#right")
let playagain = document.querySelector("#playagain")
let status = document.querySelector("#status")

let compcanvas = document.querySelector("#compcanvas")
let humancanvas = document.querySelector("#humancanvas")
let compctx = compcanvas.getContext("2d")
let humanctx = humancanvas.getContext("2d")
var heightRatio = 0.6
let cheight = compcanvas.height = humancanvas.height = humancanvas.width * heightRatio

let humanruns = 0;
let compruns = 0;
let compGesture = new Image();
let humanGesture = new Image();
let choiceClicked;
let compChoice;

let innings;
let batToss;
window.onload = (e) => {
    if(Math.floor(Math.random()*2)){
        batToss = "human"
        status.innerHTML = "First innings : Human Batting"
    } else {
        batToss = "computer"
        status.innerHTML = "First innings : Computer Batting"
    }
    innings = 1
}

options.addEventListener("click", (e)=>{
    e.preventDefault()
    humanctx.clearRect(0, 0, humancanvas.width, cheight)
    compctx.clearRect(0, 0, humancanvas.width, cheight)

    choiceClicked = choices.indexOf(e.target)+1;
    if(choiceClicked === 1){
        humanGesture.src = "handgestures/1.png"
        humanGesture.onload = () => {
            humanctx.drawImage(humanGesture, humancanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(choiceClicked === 2){
        humanGesture.src = "handgestures/2.png"
        humanGesture.onload = () => {
            humanctx.drawImage(humanGesture, humancanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(choiceClicked === 3){
        humanGesture.src = "handgestures/3.png"
        humanGesture.onload = () => {
            humanctx.drawImage(humanGesture, humancanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(choiceClicked === 4){
        humanGesture.src = "handgestures/4.png"
        humanGesture.onload = () => {
            humanctx.drawImage(humanGesture, humancanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(choiceClicked === 5){
        humanGesture.src = "handgestures/5.png"
        humanGesture.onload = () => {
            humanctx.drawImage(humanGesture, humancanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else {
        humanGesture.src = "handgestures/6.png"
        humanGesture.onload = () => {
            humanctx.drawImage(humanGesture, humancanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    }
    
    compChoice = Math.floor(Math.random()*6 + 1)
    if(compChoice === 1){
        compGesture.src = "handgestures/1.png"
        compGesture.onload = () => {
            compctx.drawImage(compGesture, compcanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(compChoice === 2){
        compGesture.src = "handgestures/2.png"
        compGesture.onload = () => {
            compctx.drawImage(compGesture, compcanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(compChoice === 3){
        compGesture.src = "handgestures/3.png"
        compGesture.onload = () => {
            compctx.drawImage(compGesture, compcanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(compChoice === 4){
        compGesture.src = "handgestures/4.png"
        compGesture.onload = () => {
            compctx.drawImage(compGesture, compcanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else if(compChoice === 5) {
        compGesture.src = "handgestures/5.png"
        compGesture.onload = () => {
            compctx.drawImage(compGesture, compcanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    } else {
        compGesture.src = "handgestures/6.png"
        compGesture.onload = () => {
            compctx.drawImage(compGesture, compcanvas.width/2 - cheight/2, 0, cheight, cheight)
        }
    }
    console.log(humancanvas.width)
    gameLogic();
})  

function gameLogic(){
    if(batToss === "human" && innings === 1){
        if(compChoice === choiceClicked){
            status.innerHTML = "Human Out! Computer Batting, Human Bowling"
            innings++
        } else {
            humanruns += choiceClicked
        }
    } else if(batToss === "computer" && innings === 1) {
        if(compChoice === choiceClicked && innings === 1){
            status.innerHTML = "Computer Out! Human Batting, Computer Bowling"
            innings++
        } else {
            compruns += compChoice
        }
    } else if(status.innerHTML === "Human Out! Computer Batting, Human Bowling" && innings === 2){
        if(compChoice === choiceClicked){
            endGame()
            if(humanruns > compruns){
                modal.children[2].innerHTML = "Human Wins"
            } else if (humanruns < compruns){
                modal.children[2].innerHTML = "Computer Wins"
            } else {
                modal.children[2].innerHTML = "Tie"
            }
        } else {
            compruns += compChoice
            if(compruns > humanruns){
                endGame()
                modal.children[2].innerHTML = "Computer Wins"
            }
        }
    } else if(status.innerHTML === "Computer Out! Human Batting, Computer Bowling" && innings === 2){
        if(compChoice === choiceClicked){
            endGame()
            if(humanruns > compruns){
                modal.children[2].innerHTML = "Human Wins"
            } else if (humanruns < compruns){
                modal.children[2].innerHTML = "Computer Wins"
            } else {
                modal.children[2].innerHTML = "Tie"
            }
        } else {
            humanruns += choiceClicked
            if(humanruns > compruns){
                endGame()
                modal.children[2].innerHTML = "Computer Wins"
            }
        }
    }
}

function endGame(){
    status.innerHTML = "Game Over"
    left.style.filter = "blur(5px)"
    right.style.filter = "blur(5px)"
    options.style.filter = "blur(5px)"
    modalparent.style.display = "block"
    modal.children[0].innerHTML = `Human Runs scored = ${humanruns}`
    modal.children[1].innerHTML = `Computer Runs scored = ${compruns}`
}

playagain.addEventListener("click", ()=>{
    location.reload();
})

