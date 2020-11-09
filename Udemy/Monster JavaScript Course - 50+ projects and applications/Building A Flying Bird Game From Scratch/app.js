const score = document.querySelector(".score");
const gameArea = document.querySelector(".gameArea");
const startScreen = document.querySelector(".startScreen");
const gameMsg = document.querySelector(".gameMessage");
let birdHeight;

gameMsg.addEventListener("click", start);
startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

let keys = {};
let player = {};

function start() {
	player.inplay = true;
	player.speed = 2;
	player.score = 0;
	//removePipes();
	gameArea.innerHTML = "";
	gameMsg.classList.add("hide");
	startScreen.classList.add("hide");
	let bird = document.createElement("div");
	bird.setAttribute("class", "bird");
	//bird.style.height = `${gameArea.offsetHeight / 15.2}px`
	//bird.style.width = `${gameArea.offsetHeight / 19.08}px`
	let wing = document.createElement("span");
	wing.setAttribute("class", "wing");
	wing.pos = 15;
	wing.style.top = `${wing.pos}px`;
	bird.appendChild(wing);
	gameArea.appendChild(bird);
	birdHeight = document.querySelector(".bird").offsetHeight;
	let birdPos = bird.getBoundingClientRect();
	player.x = birdPos.left;//bird.offsetLeft;
	player.y = birdPos.top + score.offsetHeight + score.offsetTop;//bird.offsetTop;
	player.pipe = 0;
	let spacing = 500;
	let howManyPipes = Math.floor((gameArea.offsetWidth) / spacing) + 1;
	for (let i = 0; i < howManyPipes; i++) {
		buildPipes(player.pipe * spacing);
	}
	window.requestAnimationFrame(playGame);
}

function buildPipes(startPos) {
	let totalHeight = gameArea.offsetHeight;
	let totalWidth = gameArea.offsetWidth;
	player.pipe++;
	let pipeColor = clr();
	let pipe1 = document.createElement("div");
	let lastelem = gameArea.lastChild
	pipe1.start = (lastelem.getAttribute('class') === "bird") ? startPos + totalWidth : lastelem.offsetLeft + ((Math.random() * (gameArea.offsetWidth / 3)) + gameArea.offsetWidth / 4);
	
	pipe1.classList.add("pipe");
	pipe1.innerHTML = `<br>${player.pipe}`;
	pipe1.height = Math.floor(Math.random() * gameArea.offsetHeight / 2);
	pipe1.style.height = `${pipe1.height}px`;
	pipe1.style.left = `${pipe1.start}px`;
	pipe1.x = pipe1.start;
	pipe1.id = player.pipe;
	pipe1.style.top = `${score.offsetHeight + score.offsetTop}px`;
	pipe1.style.background = pipeColor;
	gameArea.appendChild(pipe1);

    let pipeSpace = Math.floor(Math.random() * (birdHeight * 2)) + birdHeight * 3;
    let pipe2 = document.createElement("div");
    pipe2.start = pipe1.start;
    pipe2.classList.add("pipe");
    pipe2.innerHTML = `<br>${player.pipe}`;
    pipe2.style.height = `${totalHeight - pipe1.height - (score.offsetHeight + score.offsetTop) - pipeSpace}px`;
    pipe2.style.left = `${pipe1.start}px`;
    pipe2.style.bottom = "0px";
    pipe2.x = pipe1.start;
    pipe2.id = player.pipe;
    pipe2.style.backgroundColor = pipeColor ;
    gameArea.appendChild(pipe2);
}

function pressOn(e) {
	e.preventDefault();
	console.log(e.code);
	keys[e.code] = true;
}

function pressOff(e) {
	e.preventDefault();
	console.log(e.code);
	keys[e.code] = false;
}

function playGame() {
	if (player.inplay) {
		let bird = document.querySelector(".bird");
		let birdPos = bird.getBoundingClientRect();
		movePipes(bird);
		let wing = document.querySelector(".wing");
		let wingMove = false;
		if ((keys.ArrowLeft || keys.Numpad4) && birdPos.left - birdPos.width / 2 > 0) {
			player.x -= player.speed;
			wingMove = true;
		}
		if ((keys.ArrowRight || keys.Numpad6) && birdPos.left < (gameArea.offsetWidth - birdPos.width - (gameArea.offsetWidth* 0.05))) {
			player.x += player.speed;
			wingMove = true;
		}
		if ((keys.ArrowUp || keys.Numpad8 || keys.Space) && birdPos.top > score.offsetHeight + score.offsetTop) {
			player.y -= (player.speed * 5);
			wingMove = true;
		}
		if ((keys.ArrowDown || keys.Numpad2) && birdPos.top + birdPos.height < (gameArea.offsetHeight - 50)) {
			player.y += player.speed;
			wingMove = true;
		}
		if (wingMove) {
			wing.pos = (wing.pos === 15) ? 25 : 15;
			wing.style.top = `${wing.pos}px`;
		}
		if (birdPos.top + birdPos.height < (gameArea.offsetHeight - birdPos.height)) {
			player.y += (player.speed * 2);
			bird.style.transform = `translate(${player.x}px, ${player.y}px)`;
			window.requestAnimationFrame(playGame);
			player.score++;
			score.innerText = `Score:${player.score}`;	
		} else {
			playGameOver(bird);
		}	
	}
}

function movePipes(bird) {
	let lines = document.querySelectorAll(".pipe");
	let counter = 0;
	lines.forEach(item => {
		item.x -= player.speed;
		item.style.left = `${item.x}px`;
		if (item.x < 0) {
			item.parentElement.removeChild(item);
			counter++;
		}
		if (isCollide(item, bird)) {
			playGameOver(bird);
		}
	});
	counter /= 2;
	for (let i = 0; i < counter; i++) {
		buildPipes(0);
	}
}

function clr() {
	return `#${Math.random().toString(16).substr(-6)}`;
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right))
}

function playGameOver(bird) {
	flipTheBird(bird);
	player.inplay = false;
	//document.removeEventListener("keydown", pressOn);
	//document.removeEventListener("keyup", pressOff);
	gameMsg.classList.remove("hide");
    gameMsg.innerHTML = `Game Over<br>You scored ${player.score} <br>Click here to start again`;
}

function flipTheBird(b) {
	b.style.transition = `all 0.3s`;
	b.style.transform = `${b.style.transform} rotate(180deg)`;
}