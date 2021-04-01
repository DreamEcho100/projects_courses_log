const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let g = 0.1;

function Ball(radius, color) {
	this.radius = radius;
	this.color = color;
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
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
	}
	this.draw(context);
};
const ball = new Ball(20, '#00f');
const animate = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.onEachStep();
	requestAnimationFrame(animate);
};
const init = () => {
	ball.vx = 2;
	animate();
};

window.onload = init;
