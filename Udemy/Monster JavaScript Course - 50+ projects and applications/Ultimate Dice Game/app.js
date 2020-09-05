const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const btn = document.querySelector("button");
const output = document.getElementById("output");

btn.addEventListener("click", diceRolling);

function diceRolling() {
    let rolls = [roll(6), roll(6)];
    let temp;

    if (rolls[0] === rolls[1]) {
        temp = "It's a draw";
    } else if (rolls[0] > rolls[1]) {
        temp = "Player 1 wins";
    } else {
        temp = "Player 2 wins";
    }

    output.innerHTML = temp;
    player1.innerHTML = rolls[0];
    player2.innerHTML = rolls[1];
}

function roll(num) {
    let rNum = Math.floor(Math.random() * num) + 1;
    let uniNum = 9855 + rNum;
    let char = `&#${uniNum};`;
    return `${rNum}${char}`;
}