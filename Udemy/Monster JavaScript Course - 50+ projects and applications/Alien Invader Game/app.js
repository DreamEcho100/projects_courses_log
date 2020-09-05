const btnStart = document.querySelector(".startButton");
const myShip = document.querySelector(".myShip");
const container = document.querySelector(".container");
const fireme = document.querySelector(".fireme");
const msg = document.querySelector(".message");
const score = document.querySelector(".score");

let containerDim = container.getBoundingClientRect();
btnStart.addEventListener("click", startGame);
let player = {
	score: 0,
	speed: 5,
	gameOver: true,
	fire: false,
	alienSpeed: 5
}

let keyV = {};
document.addEventListener("keydown", (e) => {
	let key = e.keyCode;
	switch (key) {
		case 37:
			keyV.left = true;
			break;
		case 39:
			keyV.right = true;
			break;
		case 38:
		case 32:
			if (!player.fire) {addShot();}
			break;
	}
});

document.addEventListener("keyup", (e) => {
	let key = e.keyCode;
	switch (key) {
		case 37:
			keyV.left = false;
			break;
		case 39:
			keyV.right = false;
			break;
	}
});

function clearAliens() {
	let tempAliens = document.querySelectorAll(".alien");
	tempAliens.forEach( item => item.parentNode.removeChild(item) );
}

function startGame() {
	if (player.gameOver) {
		player.gameOver = false;
		msgOutput("");
		player.fire = false;
		player.score = 0;
		clearAliens();
		btnStart.style.display = "none";
		player.alienSpeed = 5;
		setupAliens(30);
		console.log("start game :)");
		player.animeFrame = requestAnimationFrame(update);
	}
}

function setupAliens(num) {
	let tempWidth = 70;
	let lastCol = containerDim.width - tempWidth;
	let row = {
		x: containerDim.left + 50,
		y: 50
	}
	for (let i = 0; i < num; i++) {
		if (row.x > (lastCol - tempWidth)) {
			row.y += 70;
			row.x = containerDim.left + 50;
		}
		alienMaker(row, tempWidth);
		row.x += tempWidth + 20;
	}
}

function randomColor() {
	return `#${Math.random().toString(16).substr(-6)}`;
}

function alienMaker(row, tempWidth) {
	if (row.y > (containerDim.height - (containerDim.height / 2.5))) {
		return;
	}
	let div = document.createElement("div");
	div.classList.add("alien");
	div.style.backgroundColor = randomColor();
	
	let mouth = document.createElement("span");
	mouth.classList.add("mouth");
	div.appendChild(mouth);
	
	
	let eye1 = document.createElement("span");
	eye1.classList.add("eye");
	eye1.style.left = "10px"
	div.appendChild(eye1);
	
	
	let eye2 = document.createElement("span");
	eye2.classList.add("eye");
	eye2.style.right = "10px"
	div.appendChild(eye2);

	div.style.width = `${tempWidth}px`;
	div.xPos = Math.floor(row.x);
	div.yPos = Math.floor(row.y);
	div.style.left = `${div.xPos}px`;
	div.style.top = `${div.yPos}px`;
	div.directionMove = 1;
	container.appendChild(div);
	console.log(row, div);
}

function addShot() {
	player.fire = true;
	fireme.classList.remove("hide");
	fireme.xPos = (myShip.offsetLeft + (myShip.offsetWidth / 2) - (fireme.offsetWidth / 2));
	fireme.yPos = myShip.offsetTop - (myShip.offsetHeight / 2);
	fireme.style.left = `${fireme.xPos}px`;
	fireme.style.top = `${fireme.yPos}px`;
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

function msgOutput(txt) {
	msg.innerHTML = txt;
}

function update() {
	if (!player.gameOver) {

		containerDim = container.getBoundingClientRect();
		let tempPos = myShip.offsetLeft;

		if (player.fire) {
			if (fireme.yPos > containerDim.top + fireme.offsetHeight) {
				fireme.yPos -=15;
				fireme.style.top = `${fireme.yPos}px`;
			} else {
				player.fire = false;
				fireme.classList.add("hide");
				fireme.yPos = containerDim.height + 100;
			}
		}

		if (keyV.left && tempPos > containerDim.left) { tempPos -= player.speed; }
		if ( tempPos < containerDim.left ) { tempPos = containerDim.left; }

		if (keyV.right && (tempPos + myShip.offsetWidth) < containerDim.right) { tempPos += player.speed; }
		if ( tempPos > containerDim.right ) { tempPos = containerDim.right - myShip.offsetWidth; }

		myShip.style.left = `${tempPos}px`;
		player.animeFrame = requestAnimationFrame(update);

		let tempAliens = document.querySelectorAll(".alien");
		if (tempAliens.length === 0) {
			player.gameOver = true;
			gameOver();
			msgOutput("You Won :)");
		}
		for (let i = tempAliens.length - 1; i > -1; i--) {
			let elem = tempAliens[i];
			if (isCollide(elem, fireme)) {
				console.log("Hit");
				player.alienSpeed++;
				player.score++;
				score.textContent = player.score;
				player.fire = false;
				fireme.classList.add("hide");
				fireme.yPos = containerDim.height + 100;
				elem.parentNode.removeChild(elem);

			}
			if (elem.xPos > (containerDim.width - elem.offsetWidth) || elem.xPos < containerDim.left) {
				elem.directionMove *= -1;
				elem.yPos += 40;
				if (elem.yPos + elem.offsetHeight > (myShip.offsetTop)) {
					console.log("Game Over");
					player.gameOver = true;
					gameOver();
					msgOutput("You Lost :(");
				}
			}

			elem.xPos += (player.alienSpeed * elem.directionMove);
			elem.style.left = `${elem.xPos}px`;
			elem.style.top = `${elem.yPos}px`;
		}

	}
}

function gameOver() {
	player.gameOver = true;
	btnStart.style.display = "block";
	btnStart.innerHTML = "Restart New Game";
	player.fire = true;
	fireme.classList.add("hide");
}