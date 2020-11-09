const stars = document.querySelectorAll(".star");
const zeroRating = document.querySelector(".zeroRating");
const output = document.querySelector(".output");

for (let i = 0; i < stars.length; i++) {
	stars[i].starValue = (i + 1);
	console.log(stars[i]);
	["mouseover", "mouseout", "click"].forEach(function (e) {
		stars[i].addEventListener(e, starRate);
	})
}

function starRate(e) {
	console.log(this.starValue);
	let t = e.type;
	let starValue = this.starValue;
	if (t === "click") {
		let temp = starValue === 1 ? "star" : "stars"
        output.innerText = `You rated this ${starValue} ${temp}.`;
    }
	stars.forEach(function (el, idx) {
		console.log(el, idx);
		if (t === "click") {
			if (idx < starValue) {
				el.classList.add("orange");
			} else {
				el.classList.remove("orange");
			}
		}
		if (t === "mouseover") {
			if (idx < starValue) {
				el.classList.add("yellow");
			} else {

				el.classList.remove("yellow");
			}
		}
		if (t === "mouseout") {
			el.classList.remove("yellow")
		}
	});
}

zeroRating.addEventListener("click", function function_name() {
	stars.forEach(function (el) {
		el.classList.remove("orange");
        output.innerText = `You rated this 0 stars.`;
	})
})