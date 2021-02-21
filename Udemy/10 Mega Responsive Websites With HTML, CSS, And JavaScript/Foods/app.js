const section1Animation = () => {
	const icons = document.querySelectorAll('.section-1 .icons-holder i');
	let counter = 1;

	setInterval(() => {
		counter++;

		const icon = document.querySelector('.section-1 .icons-holder i.change');

		icon.classList.remove('change');

		if (counter > icons.length) {
			icons[0].classList.add('change');
			counter = 1;
		} else {
			icon.nextElementSibling.classList.add('change');
		}
	}, 1000);
};

document.body.addEventListener('animationend', () => {
	section1Animation();
});
