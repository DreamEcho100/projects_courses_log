export default class Card {
	constructor(
		type,
		container,
		details = {
			containerPerspective: "500px",
			// cardTransitionStyle: "preserve-3d",
			extraElements: [],
		}
	) {
		this.container = container;
		this.details = details;
		this.move = true;
		handle(type, this);
	}
}

function handle(type, obj) {
	const noTypeFound = () => {
		console.error("Error, type is not found");
	};
	((
		{
			"3d": () => {
				setup3DCard(obj);
				apply3DCardStylies(obj);
			},
		}[type] || noTypeFound
	)());
}

function setup3DCard(obj) {
	const { container, details } = obj;
	const { containerPerspective, extraElements } = details;

	container.style.perspective = containerPerspective;
	container.style.perspective = containerPerspective;

	obj.card = container.querySelector(".card");
	obj.cardTransitionDelay = obj.card.dataset.transitiondelay;
	obj.cardTransitionTimingFunction = obj.card.dataset.transitiontimingfunction;

	obj.Style3DElements = [];
	const elementsArray = extraElements.length
		? [...extraElements, ...container.querySelectorAll(".Style3D")]
		: container.querySelectorAll(".Style3D");
	elementsArray.forEach((element) => {
		const { transformfrom, transformto, transition } = element.dataset;
		element.style.transition = transition;
		element;
		obj.Style3DElements.push({
			element,
			transformfrom,
			transformto,
			transition,
		});
	});
}

function apply3DCardStylies({
	container,
	card,
	cardTransitionDelay,
	cardTransitionTimingFunction,
	Style3DElements,
	move,
}) {
	container.addEventListener("mousemove", (event) => {
		if (!move) return;

		const xAxis = (innerWidth / 2 - event.pageX) / 25;
		const yAxis = (innerHeight / 2 - event.pageY) / 25;

		Style3DElements.forEach((item) => {
			const { element, transformto } = item;
			element.style.transition = "none";
			element.style.transform = `${transformto}`;
		});

		card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
	});

	container.addEventListener("mouseenter", (event) => {
		move = false;
		const delay = cardTransitionDelay;
		card.style.transition = `all ${
			delay / 1000
		}s ${cardTransitionTimingFunction}`;
		Style3DElements.forEach((item) => {
			const { element, transformto } = item;
			element.style.transform = `${transformto}`;
			element.style.transition = `all ${delay / 1000}s ease`;
		});

		const xAxis = (innerWidth / 2 - event.pageX) / 25;
		const yAxis = (innerHeight / 2 - event.pageY) / 25;
		card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

		setTimeout(() => {
			card.style.transition = "none";
			Style3DElements.forEach((item) => {
				const { element } = item;
				element.style.transition = "none";
			});
			move = true;
		}, delay);
	});

	/*container.addEventListener("mouse", () => { 

	});*/

	container.addEventListener("mouseleave", (event) => {
		card.style.transition = "all 0.5s ease";
		card.style.transform = `rotateY(0deg) rotateX(0deg)`;

		Style3DElements.forEach((item) => {
			const { element, transformfrom } = item;
			element.style.transition = "all 0.5s ease";
			element.style.transform = `${transformfrom}`;
		});
	});
}
