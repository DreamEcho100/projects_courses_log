import Card from "./Card.js";

const card = new Card("3d", document.querySelector(".container"), {
	containerPerspective: "400px",
	extraElements: [],
});
console.log(
	card
); /*
const card = document.querySelector(".card");
const container = document.querySelector(".container");

const title = card.querySelector(".title");
const sneaker = card.querySelector(".sneaker img");
const purchase = card.querySelector(".purchase button");
const description = card.querySelector(".info h3");
const sizes = card.querySelector(".sizes");

container.style.perspective = "500px";

container.addEventListener("mousemove", (event) => {
	let xAxis = (innerWidth / 2 - event.pageX) / 25;
	let yAxis = (innerHeight / 2 - event.pageY) / 25;
	title.style.transform = "translateZ(50px)";
  //Popout
  title.style.transform = "translateZ(750px)";
  sneaker.style.transform = "translateZ(100px) rotateZ(-45deg)";
  info.style.transform = "translateZ(75px)";
  sizes.style.transform = "translateZ(50px)";
  purchase.style.transform = "translateZ(100px)";

	card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
container.addEventListener("mouseenter", (event) => {
	const delay = 300;
	card.style.transition = `all ${delay / 1000}s ease`;
	title.style.transition = `all ${delay / 1000}s ease`;
	setTimeout(() => {
		card.style.transition = "none";
		title.style.transition = "none";
	}, delay);
});
container.addEventListener("mouseleave", (event) => {
	card.style.transition = "all 0.5s ease";
	card.style.transform = `rotateY(0deg) rotateX(0deg)`;

	title.style.transition = "all 0.5s ease";
	title.style.transform = "translateZ(0)";
  //Popback
  title.style.transform = "translateZ(0px)";
  sneaker.style.transform = "translateZ(0px) rotateZ(0deg)";
  description.style.transform = "translateZ(0px)";
  sizes.style.transform = "translateZ(0px)";
  purchase.style.transform = "translateZ(0px)";
});
*/
