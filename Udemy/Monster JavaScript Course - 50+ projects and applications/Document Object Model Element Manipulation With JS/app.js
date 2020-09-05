let box = {};
const score = document.querySelector(".score");
const gameAreaElem = document.querySelector(".gameArea");
const gameArea = gameAreaElem.getBoundingClientRect();
let squares = [];
let gameBox = {
	x: Math.floor(gameArea.width / 100),
	y: Math.floor(gameArea.height / 100)
}
let player = {
	speed: 100,
	square: 1,
	score: 0
}

document.addEventListener("DOMContentLoaded", build);
document.addEventListener("keyup", function (e) {
	allowedKeys = {
		37:"left",
        38:"up",
        39:"right",
        40:"down"
	};
	if (allowedKeys[e.keyCode]) {handleKeyPress(allowedKeys[e.keyCode])};
});

function handleKeyPress(key) {
	if (key === "up" && box.y > gameArea.top) {
		box.y -= player.speed;
		player.square -= gameBox.x;
	}
	if (key === "down" && box.y < gameArea.height - box.offsetWidth) {
		box.y += player.speed;
		player.square += gameBox.x;
	}
	if (key === "left" && box.x > gameArea.left) {
		box.x -= player.speed;
		player.square--;
	}
	if (key === "right" && box.x < gameAreaElem.offsetWidth - box.offsetWidth) {
		box.x += player.speed;
		player.square++;
	}
	box.style.top = `${box.y}px`;
	box.style.left = `${box.x}px`;
	if (squares[player.square].classList.contains("active")) {
		squares[player.square].classList.remove("active");
		makeActive();
		player.score++;
		score.innerHTML = player.score;
	}
}

function makeActive() {
	let randomIdx = Math.floor(Math.random() * squares.length);
	if (randomIdx !== 0 && randomIdx !== player.square) {
		squares[randomIdx].classList.add("active");
	} else {
		makeActive();
	}
}

function build() {
	let counter = 1;
	for (let y = 0; y < gameBox.y; y++) {
		for (let x = 0; x < gameBox.x; x++) {
			squares[counter] = document.createElement("div");
			squares[counter].classList.add("square");
			squares[counter].innerText = counter;
			if (counter === 1) {squares[counter].setAttribute("id", "boxStartHere")}
			gameAreaElem.appendChild(squares[counter]);
			counter++;
		}
	}
	box = document.createElement("div");
	box.classList.add("box");
	box.x = document.querySelector("#boxStartHere").offsetTop; // gameArea.left;
	box.y = document.querySelector("#boxStartHere").offsetLeft; // gameArea.top;
	box.style.top = `${box.y}px`;
	box.style.left = `${box.x}px`;
	gameAreaElem.appendChild(box);

	makeActive();
}