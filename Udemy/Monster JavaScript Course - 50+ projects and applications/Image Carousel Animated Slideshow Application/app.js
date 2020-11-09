let slideIdx = 0;
let timer;
const myImages =[
	{
	    "img" : "https://via.placeholder.com/250/09f?text=image1",
	    "caption" : "Hello World Image 1"
	},
	{
	    "img" : "https://via.placeholder.com/250/e4e?text=image2",
	    "caption" : "Hello World Image 2"
	},
	{
	    "img" : "https://via.placeholder.com/250/1f1?text=image3",
	    "caption" : "Hello World Image 3"
	}
];

builder();

function builder() {
	console.log(myImages);
	for (let i = 0; i < myImages.length; i++) {
		let slide = document.createElement("div");
		slide.setAttribute("class", "mySlide fade");
		let img = document.createElement("img");
		img.setAttribute("src", myImages[i].img);
		let cap = document.createElement("div");
		cap.classList.add("caption");
		cap.innerText = myImages[i].caption;
		slide.appendChild(img);
		slide.appendChild(cap);
		document.querySelector(".slideContainer").appendChild(slide);
		console.log(slide);
		let span = document.createElement("span");
		span.classList.add("dot");
		span.addEventListener("click", function () {
			moveSlide(i);
		});
		document.querySelector(".indicator").appendChild(span);
	}
	playSlides();
}

function playSlides() {
	const slides = document.querySelectorAll(".mySlide");
	const dots = document.querySelectorAll(".dot");
	const active = document.querySelectorAll(".active");

	if (slideIdx + 1 > myImages.length) {
		slideIdx = 0;
	}
	slides.forEach(function (elem) {
		elem.style.display = "none";
	})
	slides[slideIdx].style.display = "block";
	slideIdx++;
	console.log(slideIdx);
	timer = setTimeout(playSlides, 3000);
}

function moveSlide(num) {
	console.log(num);
	slideIdx = num;
	clearTimeout(timer);
	playSlides();
}