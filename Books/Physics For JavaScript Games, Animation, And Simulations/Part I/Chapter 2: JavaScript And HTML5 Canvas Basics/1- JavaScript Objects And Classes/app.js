const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let g = 0.1;

const balls = []; // new Array();
const numberOfBalls = 50;

function Ball(radius, color) {
	this.radius = radius;
	this.color = color;
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * (canvas.height / 5);
	this.vx = Math.random() * 5; // 2;
	this.vy = (Math.random() - 0.5) * 4; // 0;
}
Ball.prototype.draw = function (context) {
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();
};
Ball.prototype.onEachStep = function () {
	this.vy += g;
	this.x += this.vx;
	this.y += this.vy;
	if (this.y > canvas.height - this.radius) {
		this.y = canvas.height - this.radius;
		this.vy *= -0.8;
	}
	if (this.x > canvas.width + this.radius) {
		this.x = -this.radius;
		this.vx = Math.random() * 5;
		this.vy = (Math.random() - 0.5) * 4;
	}
	this.draw(context);
};
const ball = new Ball(20, '#00f');
const animate = () => {
	let i;
	const playAnimation = () => {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (i = 0; i < numberOfBalls; i++) {
			balls[i].onEachStep();
		}
		requestAnimationFrame(playAnimation);
	};
	playAnimation();
};

const init = () => {
	let i, ball;
	for (i = 0; i < numberOfBalls; i++) {
		ball = new Ball(
			Math.floor(Math.random() * 20) + 10,
			`hsl(${Math.floor(Math.random() * 361)}, 100%, 50%)`
		);
		ball.x = Math.random() * canvas.width;
		ball.y = Math.random() * (canvas.height / 5);
		ball.vx = Math.random() * 5; // 2;
		ball.vy = (Math.random() - 0.5) * 4; // 0;
		ball.draw(context);
		balls.push(ball);
	}
	animate();
};

window.onload = init;
