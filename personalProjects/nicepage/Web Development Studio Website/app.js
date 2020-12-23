const contentContainer = document.querySelector('.main-section-6 .slider .content-container');

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
							<div class="text-holder full-w-h-container">
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
	slider.innerHTML = sliderHTMLBuilder(content[currentSliderIndex]);

	if (type === "next") slider.style.left = "110%";

	contentContainer.appendChild(slider);


}

function sliderAnimationHandler() {
	let currentSlider, nextSlider;
	setTimeout(() => {
	  sliderContentContainerBuilder("current", currentSliderIndex);

		currentSliderIndex = nextSliderIndex;
		if (nextSliderIndex > content.length) nextSliderIndex = 0;
		else nextSliderIndex++;
	}, 1000)
}

sliderContentContainerBuilder("current", currentSliderIndex);