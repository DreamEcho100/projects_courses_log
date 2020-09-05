const output = document.querySelector(".output");
const show = document.querySelector(".show");
const close = document.querySelectorAll(".close");
const popImgs = document.querySelectorAll(".pop img");

popImgs.forEach(function (elem) {
	elem.addEventListener("click", popImage);
});

close.forEach(function (elem) {
	elem.addEventListener("click", closeImage)
});

function closeImage(e) {
	console.log(this);
	output.querySelector("img").setAttribute("src", "");
	show.classList.add("hide");
}

function popImage(e) {
	console.log(this.src);
	output.querySelector("img").setAttribute("src", this.src);
	show.classList.remove("hide");
}