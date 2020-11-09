let durationInp;
let startBtn;
let pauseBtn;
document.addEventListener("DOMContentLoaded", function () {
	durationInp = document.querySelector("#duration");
	startBtn = document.querySelector("#start");
	pauseBtn = document.querySelector("#pause");
	const circle = document.querySelector("circle");

	const perimeter = circle.getAttribute("r") * 2 * Math.PI;
	circle.setAttribute("stroke-dasharray", perimeter);
	let currOffset = 0;
	let duration;
	/*
stroke-dasharray="56"
			  stroke-dashoffse
			  */
	const timer = new Timer(durationInp, startBtn, pauseBtn, {
		onStart(totalDuration) {
			duration = parseFloat(totalDuration);
		},
		onTick(timeRemaining) {
			circle.setAttribute(
				"stroke-dashoffset",
				(perimeter * parseFloat(timeRemaining)) / duration - perimeter
			);
			currOffset -= 1;
		},
		onComplete() {},
	});
});
