const navBtn = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = navBtn.querySelectorAll('a');

burger.addEventListener("click", () => {
  navBtn.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
	  navBtn.classList.toggle("nav-open");
	  burger.classList.toggle("toggle");
	});
})