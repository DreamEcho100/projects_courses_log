const gameColors = ["red", "blue", "green", "yellow"];
const msg = document.querySelector(".message");
const gameArea = document.querySelector(".gameArea");
const btn = document.querySelector("button");

let gameClicks = [];
let userClicks = [];
let inPlay = false;
let playNum = 1;
window.addEventListener("load", setup);

btn.addEventListener("click", function() {
	//console.log("works");
	if (!inPlay) {
		player();
	}
})

function player() {
	btn.disabled = true;
	btn.style.display = "none";
	messager("Match The Pattern");
	gameClicks = [];
	userClicks = [];
	runSequence(playNum);
}

function runSequence(num) {
	let squars = document.querySelectorAll(".box");
	num--;
	if (num < 0) {
		inPlay = true;
		return;
	}
	let randomNum = Math.floor(Math.random() * gameColors.length);
	gameClicks.push(gameColors[randomNum]);
	squars[randomNum].style.opacity = "1";
	setTimeout(function() {
		squars[randomNum].style.opacity = "0.5";
		setTimeout(function() {
			runSequence(num)
		}, 100);
	}, 500);
}

function setup() {
	console.log("page loaded");
	for (let i = 0; i < gameColors.length; i++) {
		let div = elemFactory("div");
		div.style.backgroundColor = gameColors[i];
		div.classList.add("box");
		div.style.opacity = "0.5";
		div.myColor = gameColors[i];
		div.addEventListener("click", checkAnswer);
		gameArea.appendChild(div);
	}
}

function checkAnswer(e) {
	if (inPlay) {
		let elem = e.target;
		userClicks.push(elem.myColor);
		elem.style.opacity ="1";
		setTimeout(function() {
			elem.style.opacity = "0.5";
		}, 500)
		if (userClicks.length === gameClicks.length) {
			inPlay = false;
			endGame();
		}
	}
	//console.log(userClicks);
}

function messager(mes) {
	msg.innerHTML = mes;
}

function endGame() {
	console.log("game over");
	btn.disabled = false;
	btn.style.display = "block";
	if (userClicks.toString() === gameClicks.toString()) {
		playNum++;
		console.log("correct");
		messager("correct");
	} else {
		console.log("not correct");
		messager("not correct");
		if (playNum > 1) {
			playNum--;
		}
	}
}

function elemFactory(elemType) {
	let elem = document.createElement(elemType);
	return elem;
}