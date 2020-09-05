const msg = document.querySelector(".message");
const scoreOutput = document.querySelector(".score");
const badLeft = document.querySelector(".badLeft");
const btn = document.querySelector(".btn");
const basket = document.querySelector(".basket");
const container = document.querySelector(".container");

let boundBasket = basket.getBoundingClientRect();
let boundContainer = container.getBoundingClientRect();

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
	score: 0,
	totalBad: 0,
	inplay: false,
	speed: 15
}

btn.addEventListener("click", startGame);
document.addEventListener("keydown", pressKeyOn);
document.addEventListener("keyup", pressKeyOff);

function startGame() {
	msg.style.display = "none";
	btn.style.display = "none";
	basket.style.display = "block";
	player.score = 0;
	player.totalBad = 10;
	player.inplay = true;
	scoreUpdate();
	setupBadGuys(6);
	requestAnimationFrame(playGame);
}

function setupBadGuys(num) {
	for (let i = 0; i < num; i++) {
		makeBad();
	}
}

function playGame() {
	if (player.inplay === true) {
		if (keys.ArrowUp && boundBasket.y > 0) {
			boundBasket.y -= player.speed;
		}
		if (keys.ArrowDown && boundBasket.y < (boundContainer.height - boundBasket.height) ) {
			boundBasket.y += player.speed;
		}
		if (keys.ArrowLeft && boundBasket.x > 0) {
			boundBasket.x -= player.speed;
		}
		if (keys.ArrowRight && boundBasket.x < (boundContainer.width - boundBasket.width) ) {
			boundBasket.x += player.speed;
		}
		basket.style.left = `${boundBasket.x}px`;
		basket.style.top = `${boundBasket.y}px`;
		requestAnimationFrame(playGame);
		let tempEnemy = document.querySelectorAll(".baddy");
		if (tempEnemy.length === 0) {
			endGame();
		} else {
			for (let i = 0; i < tempEnemy.length; i++) {
				bgMover(tempEnemy[i]);
			}
		}
	}
}

function endGame() {
	msg.style.display = "block";
	msg.textContent = "Game Over";
	btn.style.display = "block";
	basket.inplay = false;
}

function bgMover(e) {
	e.y += e.speed;
	if (e.y > boundContainer.height - 100) {
		e.y = -100;
		e.x = Math.floor(Math.random() * boundContainer.width - 100);
		if (e.x < 0) e.x =100;
		e.style.left = `${e.x}px`;
	}
	if (isCollide(basket, e)) {
		player.score++;
		container.removeChild(e);
		scoreUpdate()
		makeBad();
		console.log("hit");
	}
	e.style.top = `${e.y}px`;
}

function makeBad() {
	if (player.totalBad > 0) {
		let temp = player.totalBad;
		player.totalBad--;
		scoreUpdate();
		let div = document.createElement("div");
		div.innerHTML = `#${temp}`;
		let ran = Math.floor(Math.random() * 50) + 50;
		div.style.height =`${ran}px`;
		div.style.lineHeight =`${ran}px`;
		div.style.backgroundColor =`#${Math.random().toString(16).substr(-6)}`;
		div.classList.add("baddy");
		div.x = Math.floor(Math.random() * boundContainer.width - 100);
		if (div.x < 0) div.x = 100;
		div.y = Math.floor( (Math.random() * 500) * -1) - 200;
		div.speed = Math.ceil(Math.random() * 10) + 3;
		container.appendChild(div);
		div.style.left = `${div.x}px`;
		div.style.right = `${div.y}px`;
	}
}

function scoreUpdate() {
	scoreOutput.textContent = player.score;
	badLeft.textContent = player.totalBad;
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

function pressKeyOn(event) {
	event.preventDefault();
	keys[event.key] = true;
}

function pressKeyOff(event) {
	event.preventDefault();
	keys[event.key] = false;
}