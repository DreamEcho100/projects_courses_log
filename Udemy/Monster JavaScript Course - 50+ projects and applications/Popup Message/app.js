const popups = document.querySelectorAll(".popup");
const popup = document.querySelector(".output");
const popMsg = document.querySelector(".msg");
const closeBtn = document.querySelector(".close");


closeBtn.addEventListener("click", () =>{
	 popup.classList.add("hide");
	 document.removeEventListener("keydown", closePopup);
});


popups.forEach(function (item) {
	item.addEventListener("click", function() {
		let outputTxt = item.getAttribute("data-message");
		msg(outputTxt);
	})
})

function msg(output) {
	popup.classList.remove("hide");
	popMsg.innerText = output;
	document.addEventListener("keydown", closePopup);
}

function closePopup(e) {
	if (e.key === "Escape") {
		popup.classList.add("hide");
	 	document.removeEventListener("keydown", closePopup);
	}
}