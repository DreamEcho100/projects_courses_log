const mainCanvas = document.getElementById('main-canvas');
const context = mainCanvas.getContext("2d");
const bgColor = getComputedStyle(document.body).getPropertyValue('--linear-gradient-1').trim();
const ballColor = getComputedStyle(document.body).getPropertyValue('--color-1').trim();

const mouseCoor = {
	x: null,
	y: null
};


mainCanvas.width = innerWidth;
mainCanvas.height = innerHeight;

context.imageSmoothingEnabled = false;

mainCanvas.parentNode.addEventListener("mousemove", () => {
  mouseCoor.x = event.x;
  mouseCoor.y = event.y;
});

let resizeId;
let animateId;
let resizing = true;
window.addEventListener("resize", () => {
	resizing = true;
	clearTimeout(resizeId);
	cancelAnimationFrame(animateId);
	resizeId = setTimeout(() => {
		init();
		animate();
	}, 10);
});

let numberOfParticales;
let particalesArray;

class Particale {
	constructor(x, y, radius, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speedX = speedX;
		this.speedY = speedY;
	}

	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.fillStyle = ballColor;
		context.closePath();
		context.fill();
	}

	update() {
		if (
			this.x - this.radius < 0 ||
			this.x + this.radius > mainCanvas.width
		) {
			this.speedX = -this.speedX;
		}
		if (
			this.y - this.radius < 0 ||
			this.y + this.radius > mainCanvas.height
		) {
			this.speedY = -this.speedY;
		}

		particalesArray.forEach(particale => {
			if (
        arcsCollision(particale, this)
			) {
				this.speedX = -this.speedX;
				this.speedY = -this.speedY;
				particale.speedX = -particale.speedX;
				particale.speedY = -particale.speedY;
			}
		});
		
		this.x += this.speedX;
		this.y += this.speedY;

		this.draw();

	}

};


function arcsCollision(first, second) {
	const dx = first.x - second.x;
	const dy = first.y - second.y;
	const distance = Math.sqrt(dx**2 + dy**2);
	return (
		Math.sqrt((first.x - second.x)**2 + (first.y - second.y)**2)
		<=
		(first.radius + second.radius + 0.1)
	);
}

function arcAndRectCollision(arc, rect) {

	return (
		arc.x - arc.radius < rect.x ||
		arc.x + arc.radius > rect.width ||
		arc.y - arc.radius < rect.y ||
		arc.y + arc.radius > rect.height
	);
}


function init() {
	let resizing = false;
	particalesArray = [];
	let x = 0;
	let y = 0;
	let radius = (mainCanvas.width * mainCanvas.height) / 8000;
	let speedX = 0.25;
	let speedY = 0.25;

	mainCanvas.width = innerWidth;
	mainCanvas.height = innerHeight;
	numberOfParticales = (mainCanvas.width * mainCanvas.height) / (2000 * radius * 0.5);

	for (let i = 0; i < numberOfParticales; i++) {
		const protection = 1000;
		let protectionCounter = 0;
		do {
			x = (Math.random() * mainCanvas.width);
			y = (Math.random() * mainCanvas.height)
			protectionCounter++;
		} while (
			!resizing &&
			protectionCounter <= protection &&
			(
				particalesArray.some(particale => arcsCollision(particale, {x, y, radius})) ||
				arcAndRectCollision({ x, y, radius }, {x: mainCanvas.getBoundingClientRect().x, y: mainCanvas.getBoundingClientRect().y, width: mainCanvas.width, height: mainCanvas.height})
			)
		);
		if (resizing) return;
		particalesArray.push(new Particale(x, y, radius, speedX, speedY));
	}
}

function animate() {
	context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	context.fillStyle = bgColor;

	particalesArray.forEach(particale => particale.update());

	animateId = requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
	init();
	animate();
});