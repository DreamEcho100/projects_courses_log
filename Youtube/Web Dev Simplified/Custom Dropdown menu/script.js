// import Select from './select';

const selectElements = document.querySelectorAll('[data-custom]');

selectElements.forEach((element) => {
	new Select(element);
});
