const tooltips = document.querySelectorAll(".tooltip");
const output = document.querySelector(".output");
let myInterval;



for (let i = 0; i < tooltips.length; i++) {
	tooltips[i].addEventListener("mousemove", function (e) { // mouseover
		let holder = this.getAttribute("data-toolContent");
		console.log(holder);
		clearInterval(myInterval);
		output.style.display = "block";
		output.style.top = `${e.clientY + 5}px`;
		output.style.left = `${e.clientX + 5}px`;
		output.innerHTML = holder;
		myInterval = setInterval(function () {
			output.style.display = "none";
		}, 3000)
	})
	tooltips[i].addEventListener("mouseout", function () {
		output.style.display = "none";
	})
}