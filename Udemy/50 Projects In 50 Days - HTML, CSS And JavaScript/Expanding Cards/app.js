const panels = document.querySelectorAll('.panel');
const modeButton = document.querySelector('.mode');

panels.forEach((panel) => {
	panel.addEventListener('click', () => {
		if (!panel.classList.contains('active')) {
			removeClasses(panels, 'active');
			panel.classList.add('active');
		}
	});
});

function removeClasses(elements, items) {
	elements.forEach((element) => {
		element.classList.remove(items);
	});
}

modeButton.addEventListener('click', () => {
	if (document.body.classList.contains('light')) {
		document.body.classList.add('dark');
		document.body.classList.remove('light');
		modeButton.textContent = 'Light Mode';
	} else if (document.body.classList.contains('dark')) {
		document.body.classList.add('light');
		document.body.classList.remove('dark');
		modeButton.textContent = 'Dark Mode';
	}
});
