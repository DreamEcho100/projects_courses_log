// G  ravity is a constant force
// that points vertically downward. Its effect is therefore to pull objects downward, making them accelerate as they do
// so. Accelerate? Yes, that means it increases the speed of the object.

// But because gravity
// acts downward, it does not affect the horizontal speed of an object.
// Every time the ball hits the ground, the latter exerts a contact force on it (a contact force is a force that two solid
// objects exert on each other when in direct contact). This force acts upward for a very brief time. Unlike gravity, it is
// not easy to model this contact force directly. Therefore, we’ll simplify things and model its effect instead. Its effect is to
// reverse the motion of the ball from downward to upward while reducing the speed of the ball.

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let radius = 20;
let color = '#0000ff';
let g = 0.1; // acceleration due to gravity
let x = 50; // initial horizontal position
let y = 50; // initial vertical position
let vx = 2; // initial horizontal speed
let vy = 0; // initial vertical speed

const drawBall = () => {
	with (context) {
		clearRect(0, 0, canvas.width, canvas.height);
		fillStyle = color;
		beginPath();
		arc(x, y, radius, 0, 2 * Math.PI, true);
		closePath();
		fill();
	}
};
const onEachStep = () => {
	vy += g; // gravity increases the vertical speed
	x += vx; // horizontal speed increases horizontal position
	y += vy; // vertical speed increases vertical position
	if (y > canvas.height - radius) {
		// if ball hits the ground
		y = canvas.height - radius; // reposition it at the ground
		vy *= -0.8; // then reverse and reduce its vertical speed
	}
	if (x > canvas.width + radius) {
		// if ball goes beyond canvas
		x = -radius; // wrap it around
		// y = 50;
	}
	drawBall(); // draw the ball
};
const init = () => {
	// setInterval(onEachStep, 1000 / 60); // 60 fps
	onEachStep();
	requestAnimationFrame(init);
};

window.onload = init;
