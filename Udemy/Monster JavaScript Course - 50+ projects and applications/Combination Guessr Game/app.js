const gameArea = document.querySelector(".game");
const btn = document.querySelector("button");
const msg = document.querySelector(".message");
let gamePlay = false;
let round = 0;

btn.addEventListener("click", function () {
  if (!gamePlay) {
    gamePlay = true;
    round = 0;
    winCondition = 0;
    gameArea.innerHTML = "";
    maker(4);
    msg.innerHTML = "Guess the Combo";
    btn.innerHTML = "Check Combo";
  } else {
    console.log("Checker");
    round++;
    msg.innerHTML = `Guess ${round}`;
    const numbers = document.querySelectorAll(".numb");
    let winCondition = 0;
    console.log(numbers);
    for (let i = 0; i < numbers.length; i++) {
      let num = numbers[i];
      let value = Number(num.value);
      let correct = num.correct;
      if (value === correct) {
        num.style.backgroundColor = "green";
        num.style.color = "white";
        console.log("Match.");
        winCondition++;
      } else {
        let color = value < correct ? "blue" : "red";
        num.style.backgroundColor = color;
        num.style.color = "black";
        console.log("No Match.");
      }
      if (winCondition === numbers.length) {
        gameEnd();
      }
    }
  }
});

function gameEnd() {
  msg.innerHTML = `You solved the combo in ${round} guesses.`;
  gamePlay = false;
  btn.innerHTML = "Restart Game?";
}

function maker(num) {
  for (let i = 0; i < num; i++) {
    let elem = document.createElement("input");
    elem.setAttribute("type", "number");
    elem.max = 9;
    elem.min = 0;
    elem.size = 1;
    elem.style.width = "50px";
    elem.classList.add("numb");

    elem.order = i;
    elem.correct = Math.floor(Math.random() * elem.max + 1);
    elem.value = 0;
    console.log(elem);
    gameArea.appendChild(elem);
  }
}
