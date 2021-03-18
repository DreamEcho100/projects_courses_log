// Canvas setup
const container = document.querySelector('.container');
const canvas = container.querySelector('.canvas-1');
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
context.font = '5rem Georgia';

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
	// console.log(event, mouse.x, mouse.y, event.clientX, event.clientY);
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
		this.frameX = 0;
		this.frameY = 0;
		this.frame = 0;
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
	}
	draw() {
		if (mouse.click) {
			context.lineWidth = 0.2;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(mouse.x, mouse.y);
			context.stroke();
		}
		context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		context.fill();
		context.closePath();
		context.fillRect(this.x, this.y, this.radius, 10);

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

		context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		context.fillRect(this.x, this.y, this.radius, 10);

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
				0 - 60,
				0 - 45,
				this.spriteWidth / 4,
				this.spriteHeight / 4
			);
		} else {
			context.drawImage(
				playerRight,
				this.frameX * this.spriteWidth,
				this.frameY * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				0 - 60,
				0 - 45,
				this.spriteWidth / 4,
				this.spriteHeight / 4
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
		context.fillStyle = 'blue';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		context.stroke();
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
// Animation Loop
const animate = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	player.draw();
	context.fillStyle = 'black';
	context.fillText(`Score: ${score}`, 10, 50);
	handleBubbles();
	gameFrame++;
	requestAnimationFrame(animate);
};

animate();

/*
function gameResize() {
  if (froggeyGameSection.clientWidth < gameWrapper.clientWidth + 10 || froggeyGameSection.clientHeight < gameWrapper.clientHeight + 10) {
      gameWrapper.style.width = `${gameWrapper.clientWidth * 0.75}px`;
      gameWrapper.style.height = `${gameWrapper.clientHeight * 0.75}px`;
      if (froggeyGameSection.clientWidth < gameWrapper.clientWidth + 10 || froggeyGameSection.clientHeight < gameWrapper.clientHeight + 10) gameResize();
  } else if (froggeyGameSection.clientWidth < gameWrapperOriginalWidth + 10 && froggeyGameSection.clientHeight > gameWrapper.clientHeight + 10) {
      gameWrapper.style.width = `${gameWrapperOriginalWidth}px`;
      gameWrapper.style.height = `${gameWrapperOriginalHeight}px`;
  }
}

window.addEventListener("resize", gameResize);

gameResize();*/
