const contentContainer = document.querySelector('.main-section-6 .slider');
const leftArrow = document.querySelector('.main-section-6 .slider .left-arrow');
const rightArrow = document.querySelector('.main-section-6 .slider .right-arrow');
	let currentSlider, nextSlider;

const content = [
	{
		name: "Mark Johnson",
		imageUrl: "./images/326f08696b0f3d7a9f28b5635af38ed3.png",
		text: "Our range of services include full branding, SEO, PPC, Explainer Videos, and Inbound Marketing. Our clients range from entrepreneurs to Fortune 100 companies in a wide range of industries. Our team has over 15+ years of experience in their areas of expertise."
	},
	{
		name: "Dani Yourk",
		imageUrl: "./images/32e1d1d559de737257f125559608f6f5.jpeg",
		text: "The Creative Studio is a full-service creative agency specializing in custom web design, web development, UI/UX, and software development. Having worked with almost every technology language (.NET, PHP, Laravel, Angular 1.0/2.0, etc...), we start with your business goals and then provide the right scalable solution."
	}
];

let currentSliderIndex = 0, nextSliderIndex = content.length - 1;

function sliderHTMLBuilder({ name, imageUrl, text }) {
	return `
							<div class="img-holder flex-xy-center">
								<img class="full-w-h-container" src="${imageUrl}" alt="${name}">
							</div>
							<div class="text-holder full-w-h-container flex-xy-center flex-d-c">
								<p>
									${text}
								</p>
								<h5>
									${name}
								</h5>
							</div>
	`;
}

function sliderContentContainerBuilder(type, index) {
	const slider = document.createElement("div");
	slider.classList.add("content", "flex-xy-center", "full-w-h-container");
	slider.innerHTML = sliderHTMLBuilder(content[index]);

	if (type === "next") {
		slider.style.left = "110%";
		slider.style.transform = 'scale(0.1)';
	}

	contentContainer.appendChild(slider);

	return slider;

}

let sliderToLeftSetTimeout,
sliderToLeftSetTimeoutRec;

function sliderAnimationHandlerToTheLeft() {

	currentSlider.style.left = '-110%';
	currentSlider.style.transform = 'scale(0.1)';

	nextSlider.style.left = '5%';
	nextSlider.style.transform = 'scale(1)';

	sliderToLeftSetTimeout = setTimeout(
		() => currentSliderTransitionEnd(),
		(parseInt(getComputedStyle(document.body).getPropertyValue("--scecond-transition-delay")) + 0.1) * 1000
		);

	function currentSliderTransitionEnd() {

		currentSlider.parentElement.removeChild(currentSlider);

		currentSliderIndex = nextSliderIndex;
		if (nextSliderIndex + 1 >= content.length) nextSliderIndex = 0;
		else nextSliderIndex++;

		currentSlider = nextSlider;

		nextSlider = sliderContentContainerBuilder("next", nextSliderIndex);

		sliderToLeftSetTimeoutRec = setTimeout(() => sliderAnimationHandlerToTheLeft(), 5000);
	}
}

let sliderToRightSetTimeout,
sliderToRightSetTimeoutRec;

function sliderAnimationHandlerToTheRight() {

	currentSlider.style.right = '-110%';
	currentSlider.style.transform = 'scale(0.1)';

	nextSlider.style.right = '5%';
	nextSlider.style.transform = 'scale(1)';

	sliderToRightSetTimeout = setTimeout(
		() => currentSliderTransitionEnd(),
		(parseInt(getComputedStyle(document.body).getPropertyValue("--scecond-transition-delay")) + 0.1) * 1000
		);

	function currentSliderTransitionEnd() {

		currentSlider.parentElement.removeChild(currentSlider);

		nextSliderIndex = currentSliderIndex;
		if (currentSliderIndex - 1 >= content.length) currentSliderIndex = 0;
		else currentSliderIndex--;

		currentSlider = nextSlider;

		nextSlider = sliderContentContainerBuilder("next", nextSliderIndex);

		sliderToRightSetTimeoutRec = setTimeout(() => sliderAnimationHandlerToTheRight(), 5000);
	}
}

leftArrow.addEventListener("click", () => {
  clearInterval(sliderToLeftSetTimeout);
  clearInterval(sliderToLeftSetTimeoutRec);

  sliderAnimationHandlerToTheLeft();

});

currentSlider = sliderContentContainerBuilder("current", currentSliderIndex);
nextSlider = sliderContentContainerBuilder("next", nextSliderIndex);

sliderAnimationHandlerToTheLeft();