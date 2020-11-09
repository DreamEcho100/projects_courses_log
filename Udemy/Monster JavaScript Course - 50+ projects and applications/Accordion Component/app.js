const mainElem = document.querySelectorAll(".main");
const contentElem = document.querySelectorAll(".content");

for (let i = 0; i < mainElem.length; i++) {
	mainElem[i].addEventListener("click", function () {
		let temp = mainElem[i].nextElementSibling;
		clearActive(temp);
		if (!(temp.active)) {
			temp.classList.toggle("active");
		}
	})
}

function clearActive() {
	for (let i = 0; i < contentElem.length; i++) {
		let includedActive = (contentElem[i].classList.contains("active")) ? true : false;
		contentElem[i].classList.remove("active");
		mainElem[i].nextElementSibling.active = false;
		if (includedActive) {
			mainElem[i].nextElementSibling.active = true;
		}
	}
}