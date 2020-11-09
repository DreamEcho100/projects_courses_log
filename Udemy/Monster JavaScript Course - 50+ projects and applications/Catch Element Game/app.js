const output = document.querySelector(".output");
const msgOut = document.querySelectorAll(".msg span");
let score = 0;

output.addEventListener("mouseenter", function () {
	output.style.backgroundColor = "blue";
});

output.addEventListener("mouseleave", function () {
	output.style.backgroundColor = "white";
});

output.addEventListener("mousemove", function (e) {
	msgOut[0].innerText = e.x;
	msgOut[1].innerText = e.y;
});

document.addEventListener("DOMContentLoaded", function () {
	let div = document.createElement("div");
	div.classList.add("box");
	output.appendChild(div);
	div.x = div.offsetLeft;
	div.y = div.offsetTop;
	div.tempColor = `#${Math.random().toString(16).substr(-6)}`;
	div.style.backgroundColor = div.tempColor;
	div.addEventListener("mouseenter", function () {
		div.style.backgroundColor = "red";
	});
	div.addEventListener("mouseleave", function () {
		div.style.backgroundColor = div.tempColor;
	});
	div.addEventListener("click", function () {
		div.tempColor = `#${Math.random().toString(16).substr(-6)}`;
		div.style.backgroundColor = div.tempColor;
		score++;
		msgOut[2].innerText = score;
	});
	div.steps = Math.random() * 20;
	div.direction = Math.floor(Math.random() * 4);
	window.requestAnimationFrame(move);
})

function move() {
	let speed = Math.random() * 15 + 10;
	const box = document.querySelector(".box");
	let bounds = output.getBoundingClientRect();
	box.steps--;
	if (box.steps < 0) {
		box.direction = Math.floor(Math.random() * 4);
		box.steps = Math.random() * 20;
	}
	if (box.direction === 0 && box.offsetLeft < bounds.width  - box.offsetWidth) {
		box.x += speed;
	}
	if (box.direction === 1 && box.x > bounds.left) {
		box.x -= speed;
	}
	if (box.direction === 2 && box.offsetTop < bounds.height - box.offsetHeight + bounds.top) {
		box.y += speed;
	}
	if (box.direction === 3 && box.y > bounds.top) {
		box.y -= speed;
	}
	box.style.top = `${box.y}px`;
	box.style.left = `${box.x}px`;
	window.requestAnimationFrame(move);
}