const contentContainer = document.querySelector('.main-section-6 .slider');
const leftArrow = document.querySelector('.main-section-6 .slider .left-arrow');
const rightArrow = document.querySelector('.main-section-6 .slider .right-arrow');
let previousSlider, currentSlider, nextSlider;

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

let currentSliderIndex = 0,
nextSliderIndex = currentSliderIndex + 1 >= content.length ? content.length - 1 : currentSliderIndex + 1,
previousSliderIndex = currentSliderIndex - 1 < 0 ? content.length - 1 : currentSliderIndex - 1;

leftArrow.addEventListener("click", sliderAnimationHandlerToTheLeft);

function sliderHTMLBuilder(obj, type) {
	const { name, imageUrl, text } = obj;
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
		slider.style.opacity = "0";
		slider.style.transform = 'scale(0.1)';
	} else if (type === "previous") {
		slider.style.left = "-110%";
		slider.style.opacity = "0";
		slider.style.transform = 'scale(0.1)';
	}

	contentContainer.appendChild(slider);

	return slider;

}

let sliderToLeftSetTimeout,
sliderToLeftSetTimeoutRec;

function sliderAnimationHandlerToTheLeft() {
  clearInterval(sliderToLeftSetTimeout);
  clearInterval(sliderToLeftSetTimeoutRec);

	currentSlider.style.left = '-110%';
	currentSlider.style.opacity = "0";
	currentSlider.style.transform = 'scale(0.1)';

	nextSlider.style.left = '5%';
	nextSlider.style.opacity = "1";
	nextSlider.style.transform = 'scale(1)';

	sliderToLeftSetTimeout = setTimeout(
		() => currentSliderTransitionEnd(),
		(parseInt(getComputedStyle(document.body).getPropertyValue("--scecond-transition-delay")) + 0.1) * 1000
		);

	function currentSliderTransitionEnd() {

		currentSlider.parentElement.removeChild(currentSlider);
		previousSlider.parentElement.removeChild(previousSlider);

		currentSliderIndex = nextSliderIndex;
		if (nextSliderIndex + 1 >= content.length) nextSliderIndex = 0;
		else nextSliderIndex++;
		if (previousSliderIndex - 1 < 0) previousSliderIndex = content.length - 1;
		else previousSliderIndex--;


		currentSlider = nextSlider;

		nextSlider = sliderContentContainerBuilder("next", nextSliderIndex);
		previousSlider = sliderContentContainerBuilder("previous", previousSliderIndex);

		sliderToLeftSetTimeoutRec = setTimeout(() => sliderAnimationHandlerToTheLeft(), 5000);
	}
}

let sliderToRightSetTimeout,
sliderToRightSetTimeoutRec;

rightArrow.addEventListener("click", sliderAnimationHandlerToTheRight);
function sliderAnimationHandlerToTheRight() {
  clearInterval(sliderToLeftSetTimeout);
  clearInterval(sliderToLeftSetTimeoutRec);

	currentSlider.style.left = '110%';
	currentSlider.style.opacity = "0";
	currentSlider.style.transform = 'scale(0.1)';

	previousSlider.style.left = '5%';
	previousSlider.style.opacity = "1";
	previousSlider.style.transform = 'scale(1)';

	sliderToRightSetTimeout = setTimeout(
		() => currentSliderTransitionEnd(),
		(parseInt(getComputedStyle(document.body).getPropertyValue("--scecond-transition-delay")) + 0.1) * 1000
		);

	function currentSliderTransitionEnd() {

		currentSlider.parentElement.removeChild(currentSlider);
		nextSlider.parentElement.removeChild(nextSlider);

		currentSliderIndex = previousSliderIndex;
		if (previousSliderIndex + 1 >= content.length) previousSliderIndex = 0;
		else previousSliderIndex++;
		if (nextSliderIndex - 1 < 0) nextSliderIndex = content.length - 1;
		else nextSliderIndex--;


		currentSlider = previousSlider;

		nextSlider = sliderContentContainerBuilder("next", nextSliderIndex);
		previousSlider = sliderContentContainerBuilder("previous", previousSliderIndex);

		sliderToLeftSetTimeoutRec = setTimeout(() => sliderAnimationHandlerToTheLeft(), 5000);
	}
}

previousSlider = sliderContentContainerBuilder("previous", nextSliderIndex);
currentSlider = sliderContentContainerBuilder("current", currentSliderIndex);
nextSlider = sliderContentContainerBuilder("next", nextSliderIndex);

sliderAnimationHandlerToTheLeft();