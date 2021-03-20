// Canvas setup
const container = document.querySelector('.container');
const canvas = container.querySelector('.canvas-1');
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
let gameSpeed = 1;
let gameOver = false;
context.font = '50px Georgia';

// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	click: false,
};

canvas.addEventListener('mousedown', (event) => {
	mouse.click = false;
	mouse.x = event.x - canvasPosition.left;
	mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener('mouseup', (event) => {
	mouse.click = true;
});

// Player
const playerLeft = new Image();
playerLeft.src = './sptites/player/fish_swim_left.png';
const playerRight = new Image();
playerRight.src = './sptites/player/fish_swim_right.png';

class Player {
	constructor() {
		this.x = canvas.width;
		this.y = canvas.height / 2;
		this.radius = 50;
		this.speedPerDistanceX = 30;
		this.speedPerDistanceY = 30;
		this.angle = 0;
		this.frame = 0;
		this.frameX = 0;
		this.frameY = 0;
		this.spriteWidth = 498; // 1992 / 4;
		this.spriteHeight = 327; // 981 / 3;
	}
	update() {
		const dx = this.x - mouse.x;
		const dy = this.y - mouse.y;
		// Calculate theta
		this.angle = Math.atan2(dy, dx);
		if (mouse.x !== this.x) {
			this.x -= dx / this.speedPerDistanceX;
		}
		if (mouse.y !== this.y) {
			this.y -= dy / this.speedPerDistanceY;
		}
		if (gameFrame % 5 === 0) {
			this.frame++;
			if (this.frame >= 12) {
				this.frame = 0;
			}
			if (this.frame === 3 || this.frame === 7 || this.frame === 11) {
				this.frameX = 0;
			} else {
				this.frameX++;
			}
			if (this.frame < 3) {
				this.frameY = 0;
			} else if (this.frame < 7) {
				this.frameY = 1;
			} else if (this.frame < 11) {
				this.frameY = 2;
			} else {
				this.frameY = 0;
			}
		}
	}
	draw() {
		if (mouse.click) {
			context.lineWidth = 0.2;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(mouse.x, mouse.y);
			context.stroke();
		}
		/*context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		context.fill();
		context.closePath();
		context.fillRect(this.x, this.y, this.radius, 10);*/

		/*context.drawImage(
			playerLeft,
			this.frameX * this.spriteWidth,
			this.frameY * this.spriteHeight,
			this.spriteWidth,
			this.spriteHeight,
			this.x - 60,
			this.y - 45,
			this.spriteWidth / 4,
			this.spriteHeight / 4
		);*/

		/*context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		context.fillRect(this.x, this.y, this.radius, 10);*/

		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.angle);
		if (this.x >= mouse.x) {
			context.drawImage(
				playerLeft,
				this.frameX * this.spriteWidth,
				this.frameY * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				0 - 65,
				0 - 55,
				this.spriteWidth / 3.8,
				this.spriteHeight / 3.1
			);
		} else {
			context.drawImage(
				playerRight,
				this.frameX * this.spriteWidth,
				this.frameY * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				0 - 65,
				0 - 55,
				this.spriteWidth / 3.8,
				this.spriteHeight / 3.1
			);
		}
		context.restore();
	}
}

const player = new Player();

/*
// Bubbles
const bubblesArray = [];
const handleBubbles = () => {
	const bubblesArrayToDelete = [];
	if (gameFrame % 50 === 0) {
		bubblesArray.push(new Bubble());
	}
	let i;
	for (i = 0; i < bubblesArray.length; i++) {
		bubblesArray[i].update();
		if (bubblesArray[i].y < -bubblesArray[i].radius) {
			bubblesArrayToDelete.push(i);
			continue;
		}
		bubblesArray[i].draw();
	}
	for (i = 0; i < bubblesArrayToDelete.length; i++) {
		bubblesArray.splice(bubblesArrayToDelete[i], 1);
	}
};
*/

// Bubbles
const bubblesObj = {
	counter: 0,
	bubbles: {},
};

const bubbleImage1 = new Image();
bubbleImage1.src = './sptites/bubble/bubble_pop_one/bubble_pop_frame_01.png';

class Bubble {
	constructor() {
		this.radius = 50;
		this.x = Math.random() * canvas.width;
		this.y = this.radius + canvas.height + Math.random() * canvas.height;
		this.speedX = Math.random() * 5 + 1;
		this.speedY = Math.random() * 5 + 1;
		this.distance;
		this.counted = false;
		this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
	}
	update() {
		this.y -= this.speedY;
		if (this.counted) {
			return;
		}
		const dx = this.x - player.x;
		const dy = this.y - player.y;
		this.distance = Math.sqrt(dx * dx + dy * dy);
	}
	draw() {
		/*context.fillStyle = 'blue';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		context.stroke();*/
		context.drawImage(
			bubbleImage1,
			this.x - 65,
			this.y - 65,
			this.radius * 2.6,
			this.radius * 2.6
		);
	}
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = './sounds/bubbles/Plog.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = './sounds/bubbles/bubbles-single2.wav';

const handleBubbles = () => {
	if (gameFrame % 50 === 0) {
		bubblesObj.bubbles[bubblesObj.counter] = new Bubble();
		bubblesObj.counter++;
	}
	let bubble;
	for (bubble in bubblesObj.bubbles) {
		bubblesObj.bubbles[bubble].update();
		if (bubblesObj.bubbles[bubble].y < -bubblesObj.bubbles[bubble].radius) {
			delete bubblesObj.bubbles[bubble];
			continue;
		}
		if (
			bubblesObj.bubbles[bubble].distance <
			bubblesObj.bubbles[bubble].radius + player.radius
		) {
			score++;
			bubblesObj.bubbles[bubble].counted = true;
			if (bubblesObj.bubbles[bubble].sound === 'sound1') {
				bubblePop1.play();
			} else {
				bubblePop2.play();
			}
			delete bubblesObj.bubbles[bubble];
			continue;
		}
		bubblesObj.bubbles[bubble].draw();
	}
};

// Repeating backgrounds
const background = new Image();
background.src = './images/backgrounds/background1.png';

const BG = {
	x1: 0,
	x2: canvas.width,
	y: 0,
	width: canvas.width,
	height: canvas.height,
};

const handleBackground = () => {
	BG.x1 -= gameSpeed;
	if (BG.x1 < -BG.width) {
		BG.x1 = BG.width;
	}
	BG.x2 -= gameSpeed;
	if (BG.x2 < -BG.width) {
		BG.x2 = BG.width;
	}
	context.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
	context.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
};

// Enemies
const enemy1Image = new Image();
enemy1Image.src = './sptites/enemies/yellow_cartoon_fish_01_swim.png';

class Enemy {
	constructor() {
		this.x = canvas.width + 200;
		this.y = Math.random() * (canvas.height - 150) + 90;
		this.radius = 60;
		this.speed = Math.random() * 2 + 2;
		this.frame = 0;
		this.frameX = 0;
		this.frameY = 0;
		this.spriteWidth = 418;
		this.spriteHeight = 397;
	}
	update() {
		this.x -= this.speed;
		if (this.x < 0 - this.radius * 2) {
			this.x = canvas.width + 200;
			this.y = Math.random() * (canvas.height - 150) + 90;
			this.speed = Math.random() * 2 + 2;
		}
		if (gameFrame % 5 === 0) {
			this.frame++;
			if (this.frame >= 12) {
				this.frame = 0;
			}
			if (this.frame === 3 || this.frame === 7 || this.frame === 11) {
				this.frameX = 0;
			} else {
				this.frameX++;
			}
			if (this.frame < 3) {
				this.frameY = 0;
			} else if (this.frame < 7) {
				this.frameY = 1;
			} else if (this.frame < 11) {
				this.frameY = 2;
			} else {
				this.frameY = 0;
			}
		}
		// Collision with player
		const dx = this.x - player.x;
		const dy = this.y - player.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < this.radius + player.radius) {
			handleGameOver();
		}
	}
	draw() {
		/*context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();*/

		context.drawImage(
			enemy1Image,
			this.frameX * this.spriteWidth,
			this.frameY * this.spriteHeight,
			this.spriteWidth,
			this.spriteHeight,
			this.x - 60,
			this.y - 70,
			this.spriteWidth / 3,
			this.spriteHeight / 3
		);
	}
}

const enemy = new Enemy();
const handleEnemies = () => {
	enemy.draw();
	enemy.update();
};

// Animation Loop
let animateId;
const animate = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	handleBubbles();
	player.update();
	player.draw();
	handleEnemies();
	handleBackground();
	context.fillStyle = 'black';
	context.fillText(`Score: ${score}`, 10, 50);
	gameFrame++;
	// animateId = requestAnimationFrame(animate);
	if (!gameOver) animateId = requestAnimationFrame(animate);
};

function handleGameOver() {
	context.fillStyle = 'white';
	context.fillText(`Game Over, your score: ${score}`, 110, 250);
	gameOver = true;
	// cancelAnimationFrame(animateId);
}

const gameResize = () => {
	/*if (
		canvas.clientWidth > document.body.clientWidth &&
		canvas.clientWidth * 0.75 < document.body.clientWidth &&
		canvas.clientWidth < 500
	) {
		canvas.style.width = `${canvas.clientWidth * 0.75}px`;
		canvas.style.height = `${canvas.clientHeight * 0.75}px`;
	} else if (
		canvas.clientWidth < document.body.clientWidth &&
		canvas.clientWidth * 1.25 > document.body.clientWidth
	) {
		canvas.style.width = `${canvas.clientWidth * 1.25}px`;
		canvas.style.height = `${canvas.clientHeight * 1.25}px`;
	}

	if (
		(canvas.clientWidth > document.body.clientWidth &&
			canvas.clientWidth * 0.75 < document.body.clientWidth &&
			canvas.clientWidth < 500) ||
		(canvas.clientWidth < document.body.clientWidth &&
			canvas.clientWidth * 1.25 > document.body.clientWidth)
	) {
		gameResize();
	}
	canvas.width = parseInt(canvas.style.width);
	canvas.height = parseInt(canvas.style.height);*/
	canvasPosition = canvas.getBoundingClientRect();
	/*cancelAnimationFrame(animateId);
	animate();*/
};

window.addEventListener('resize', gameResize);
setTimeout(() => {
	gameResize();
	// cancelAnimationFrame(animateId);
	animate();
}, 100);
// document.body.addEventListener('animationend', gameResize);
