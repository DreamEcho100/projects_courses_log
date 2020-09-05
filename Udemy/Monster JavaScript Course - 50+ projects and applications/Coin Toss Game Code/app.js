const message = document.querySelector(".message");
const btns = document.querySelectorAll("button");
const coinArray = ["Heads", "Tails"];
let score = [0, 0];

for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener("click", toosCoin);
}

function toosCoin(event) {
    console.log();
    let playerGuess = event.target.innerText;
    let computerToss = Math.floor(Math.random() * coinArray.length);
    let computerGuess = coinArray[computerToss];
    message.innerHTML = `Computer Selected ${computerGuess} <br>`;
    let output;
    if (playerGuess === computerGuess) {
        output = "Player Wins";
        score[0]++;
    } else {
        output = "Computer Wins";
        score[1]++;
    }
    message.innerHTML += `${output} <br>Player ${score[0]} Computer ${score[1]}`
}