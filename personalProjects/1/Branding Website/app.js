const secondrayHeader = document.querySelector('.secondray-header ');
const secondrayHeaderEmptySpace = document.querySelector('.secondray-header .empty-space');
const secondrayHeaderNav = document.querySelector('.secondray-header nav');
const burgerBtn = document.querySelector('header .main-header-wrapper .hambergur-btn');

burgerBtn.addEventListener("click", toggleSecondrayHeader);
secondrayHeaderEmptySpace.addEventListener("click", toggleSecondrayHeader);

function toggleSecondrayHeader() {
 if (secondrayHeader.classList.contains("isHidden")) {
 	secondrayHeader.classList.remove("isHidden");
 	document.body.style.overflowY = "hidden";
 	setTimeout(() => secondrayHeaderNav.style.transform = "translateX(0%)", 0);
 } else {
 	// secondrayHeader.classList.add("isHidden");
 	secondrayHeaderNav.style.transform = "translateX(-100%)";
 	secondrayHeaderNav.addEventListener("transitionend", secondrayHeaderNavOnTransitionStart);
 	function secondrayHeaderNavOnTransitionStart() {
 		secondrayHeader.classList.add("isHidden");
 	document.body.style.overflowY = "auto";
 		secondrayHeaderNav.removeEventListener("transitionend", secondrayHeaderNavOnTransitionStart);
 	}
 }
}