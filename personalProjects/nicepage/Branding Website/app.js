const secondrayHeader = document.querySelector('.secondray-header ');
const secondrayHeaderEmptySpace = document.querySelector('.secondray-header .empty-space');
const secondrayHeaderNav = document.querySelector('.secondray-header nav');
const burgerBtn = document.querySelector('header .main-header-wrapper .hambergur-btn');
const toggleThemeButton = document.querySelector('.secondray-header nav .theme-swaper button');
const sunMoonContainer = document.querySelector('.secondray-header nav .theme-swaper .sun-moon-container');

burgerBtn.addEventListener("click", toggleSecondrayHeader);
secondrayHeaderEmptySpace.addEventListener("click", toggleSecondrayHeader);
toggleThemeButton.addEventListener("click", changeTheme);

function toggleSecondrayHeader() {
 if (secondrayHeader.classList.contains("isHidden")) {
 	secondrayHeader.classList.remove("isHidden");
 	document.body.style.overflowY = "hidden";
 	document.querySelectorAll('.main-nav .hambergur-btn .line').forEach(line => line.classList.add("clicked"));
 	setTimeout(() => secondrayHeaderNav.style.transform = "translateX(0%)", 0);
 } else {
 	// secondrayHeader.classList.add("isHidden");
 	secondrayHeaderNav.style.transform = "translateX(-100%)";
 	document.querySelectorAll('.main-nav .hambergur-btn .line').forEach(line => line.classList.remove("clicked"));
 	secondrayHeaderNav.addEventListener("transitionend", secondrayHeaderNavOnTransitionStart);
 	function secondrayHeaderNavOnTransitionStart() {
 		secondrayHeader.classList.add("isHidden");
 	document.body.style.overflowY = "auto";
 		secondrayHeaderNav.removeEventListener("transitionend", secondrayHeaderNavOnTransitionStart);
 	}
 }
}

function changeTheme() {
	document.body.classList.toggle("dark");
	const currentRotation = parseInt(
		getComputedStyle(sunMoonContainer)
		.getPropertyValue('--rotate')
	);
	sunMoonContainer.style.setProperty('--rotate', currentRotation + 180);
}