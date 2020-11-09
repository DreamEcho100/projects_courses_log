const wording = [
  "Do you like javascript as much as I do?",
  "Hope you are having fun this is a simple game you can make.",
  "Source code is included so you can create your own version of this challenge.",
];

const message = document.querySelector(".message");
const playText = document.getElementById("typingTestArea");
const btn = document.querySelector("button");

let startTime, endTime;

btn.addEventListener("click", function () {
  console.log(this.innerText);
  if (this.innerText === "Start") {
    playText.disabled = false;
    playGame();
  } else if (this.innerText === "Done") {
    playText.disabled = true;
    btn.innerText = "Start";
    endGame();
  }
});

function playGame() {
  let randomNum = Math.floor(Math.random() * wording.length);
  message.innerText = wording[randomNum];
  let date = new Date();
  startTime = date.getTime();
  btn.innerText = "Done";
}

function endGame() {
  let date = new Date();
  endTime = date.getTime();
  let totalTime = (endTime - startTime) / 1000;
  console.log(`${totalTime}s`);
  let str = playText.value;
  let wordCount = wordCounter(str);
  let speed = Math.round((wordCount / totalTime) * 60);
  let finalMessage = `You typed around ${speed} words per minute.`;
  if (str !== message.innerText) {
    finalMessage += `${compareWord(message.innerText, str)}`;
  }
  message.innerHTML = finalMessage;
}

function wordCounter(str) {
  let response = str.slice(" ").length;
  console.log(`${response}words`);
  return response;
}

function compareWord(str1, str2) {
  let words1 = str1.split(" ");
  let words2 = str2.split(" ");
  let counter = 0;
  words1.forEach((item, index) => {
    if (item === words2[index]) {
      counter++;
    }
  });
  return `<br>${counter} correct out of ${words1.length} words.`;
}
