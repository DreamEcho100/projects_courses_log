const msg = document.querySelector(".message");
const question = document.querySelector("input");
const btn = document.querySelector("button");
const answerArr = ["It will work", "Maybe mabye not", "Probably Not", "I don't know"]

btn.addEventListener("click", function () {
    let temp = question.value;
    let result = Math.floor(Math.random() * answerArr.length);
    msg.innerHTML = `${temp}<br>
                    ${answerArr[result]}`;
    question.value = "";
});