const score = document.querySelector(".score");
const gameMsg = document.querySelector(".gameMsg");
const gameArea = document.querySelector(".gameArea");

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
document.addEventListener("click", start);

let keys = {
	space: false
}
let player = {
	score: 0,
	speed: 2,
	inplay: false
}

function start() {
	gameMsg.classList.add("hide");
	if (!player.inplay) {
		player.level = 10;
		gameArea.innerHTML = "";
		makeEnemy();
		player.inplay = true;
		player.score = 2000;
		player.ready = true;
		player.activeBomb = 0;
		player.plane = document.createElement("div");
		player.plane.setAttribute("class", "plane");
		gameArea.appendChild(player.plane);
		window.requestAnimationFrame(playGame);
		player.x = player.plane.offsetLeft;
		player.y = player.plane.offsetTop;
	}
}

function makeBomb() {
	if (player.ready) {
		player.score -= 300;
		player.activeBomb++;
		let bomb = document.createElement("div");
		bomb.classList.add("bomb");
		bomb.innerHTML = `${player.activeBomb}`;
		bomb.x = player.x;
		bomb.y = player.y;
		bomb.style.left = `${bomb.x}px`;
		bomb.style.top = `${bomb.y}px`;
		gameArea.appendChild(bomb);
		player.ready = false;
		setTimeout(function(){
            player.ready = true;
        },500);
	}
}

function moveBombs() {
	let bombs = document.querySelectorAll(".bomb");
	bombs.forEach(function (item) {
		item.y +=5;
		item.style.top = `${item.y}px`;
		if (item.y > window.innerHeight * 2) {
			player.activeBomb--;
			item.parentElement.removeChild(item);
		}
		if (isCollide(item, player.base)) {
			player.score += 2000;
			player.activeBomb--;
			player.base.parentElement.removeChild(player.base);
			item.parentElement.removeChild(item);
			makeEnemy();
		}
	})
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function makeEnemy() {
	player.level--;
	if (player.level < 0) {
		endGame();
	} else {
		player.base = document.createElement("div");
		player.base.setAttribute("class", "base");
		player.base.style.width = `${Math.floor(Math.random() * (gameArea.offsetWidth / 10)) + (gameArea.offsetWidth / 15)}px`;
		player.base.style.height = `${Math.floor(Math.random() * (window.innerHeight / 2.8)) + (gameArea.offsetWidth / 10)}px`;
		player.base.style.left = `${Math.floor(Math.random() * gameArea.offsetWidth)}px`;
		gameArea.appendChild(player.base);
		while(player.base.offsetLeft < (gameArea.offsetWidth / 90) || player.base.offsetLeft > (gameArea.offsetWidth / 1.3)) {
			let enemyBase = document.querySelector(".base");
			enemyBase.style.left = `${Math.floor(Math.random() * gameArea.offsetWidth)}px`;
		}

	}
}

function endGame() {
	player.inplay = false;
	gameMsg.classList.remove("hide");
}

function playGame() {
	if (player.inplay) {
		moveBombs();
		if (keys.space) {
			makeBomb();
		}
		if (keys.ArrowUp && player.y > score.offsetHeight + score.offsetTop + 2) {
			player.y -= player.speed;
		}
		if (keys.ArrowDown && player.y < Math.floor(window.innerHeight / 2.5)) {
			player.y += player.speed;
		}
		if (keys.ArrowLeft && player.x > 0) {
			player.x -= player.speed;
		}
		if (keys.ArrowRight && player.x < (gameArea.offsetWidth - 50)) {
			player.x += player.speed;
		}
		player.x += (player.speed * 2);
		if (player.x > gameArea.offsetWidth) {
			player.x = 0;
			player.score -= 100;
		}
		player.score--;
		if (player.score < 0) {
			player.score = 0;
		}
		player.plane.style.left = `${player.x}px`;
		player.plane.style.top = `${player.y}px`;
		window.requestAnimationFrame(playGame);
		score.innerHTML = `Score: ${player.score}`;
	}
}

function pressOn(e) {
	e.preventDefault();
    let tempKey = (e.key == " ") ? "space" : e.key;
    keys[tempKey] = true;
}

function pressOff(e) {
	e.preventDefault();
    let tempKey = (e.key == " ") ? "space" : e.key;
    keys[tempKey] = false;
}