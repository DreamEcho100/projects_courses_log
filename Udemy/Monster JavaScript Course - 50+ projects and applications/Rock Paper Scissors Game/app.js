const body = document.querySelector("body");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const btns = document.querySelectorAll("button");

body.style.textAlign = "center";

const handChoice = ["Rock", "Paper", "Scissors"];
let scores = [0, 0]; //Player score index is 0, Comuter score index is 1

for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener("click", playingRockPaperScissors)
}

function playingRockPaperScissors(event) {
    let playerChoice = event.target.innerText;
    let randomChoice = Math.floor(Math.random() * handChoice.length);
    let computerChoice = handChoice[randomChoice];

    let board = {
        Rock: ["Paper", "Scissors", "Rock"],
        Paper: ["Scissors", "Rock", "Paper"],
        Scissors: ["Rock", "Paper", "Scissors"]
    }

    let winLoseOrTide = board[computerChoice].indexOf(playerChoice);
    let result;


    if (winLoseOrTide === 0) {
        result = "win";
        scores[0]++;
    } else if (winLoseOrTide === 1) {
        result = "lose";
        scores[1]++;
    } else {
        result = "Tide";
    }

    message.innerHTML = `You chosed ${playerChoice} || Computer chosed ${computerChoice}<br>You ${result} this round!`;
    score.innerHTML = `Scores<br>Player ${scores[0]} || Computer ${scores[1]}`;

    console.log(`You chosed ${playerChoice} and the Computer chosed ${computerChoice}, You ${result}.`);

}