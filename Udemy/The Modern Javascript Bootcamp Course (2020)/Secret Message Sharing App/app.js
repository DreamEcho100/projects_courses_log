const { hash } = window.location;
const message = atob(hash.replace("#", ""));

if (message) {
	const secretMessageShow = document.getElementById('message-show');
	document.getElementById('message-form').classList.add("isHidden");
	secretMessageShow.classList.remove("isHidden");
	secretMessageShow.querySelector('h2').innerText = message;


}

const secretMessageForm = document.querySelector('.card-panel-1 form');

secretMessageForm.addEventListener("submit", event => {
	event.preventDefault();

	const input = secretMessageForm.querySelector('#message-input');
	const encrypted = btoa(input.value);

	const linkInput = document.getElementById("link-input");
	linkInput.value = `${window.location}#${encrypted}`;
	linkInput.select();
	//document.execCommand("copy");

	document.getElementById('message-form').classList.add("isHidden");
	document.getElementById('link-form').classList.remove("isHidden");

});