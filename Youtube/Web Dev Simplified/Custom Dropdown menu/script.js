// import Select from './select';

const selectElements = document.querySelectorAll('[data-custom]');

let select;
selectElements.forEach(element => {
	select = new Select(element);
	console.log(select);
	// select.setValue('4');
});