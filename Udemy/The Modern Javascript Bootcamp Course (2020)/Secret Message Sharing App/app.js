
const secretMessageForm = document.querySelector('.card-panel form');

secretMessageForm.addEventListener("submit", event => {
	event.preventDefault();

	const input = secretMessageForm.querySelector('input');

	console.log(input.value);
});