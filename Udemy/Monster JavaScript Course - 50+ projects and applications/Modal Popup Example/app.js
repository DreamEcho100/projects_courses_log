const btns = document.querySelectorAll(".modal");
const modalWrapper = document.querySelector(".modalWrapper");
const body = document.querySelector("body");

btns.forEach(function (btn) {
	console.log(btn);
	makeClick(btn);
});

function makeClick(elem) {
	elem.addEventListener("click", function () {
		console.log("click");
		modalWrapper.classList.add("showModal");
		let closeBtn = document.querySelector(".close");
		closeBtn.addEventListener("click", function () {
			modalWrapper.classList.remove("showModal");
		})
		modalWrapper.addEventListener("click", function () {
			modalWrapper.classList.remove("showModal");
		})
		body.addEventListener("keydown", function (e) {
			if (e.keyCode === 27) {
				modalWrapper.classList.remove("showModal");
			}
		})
	});
}