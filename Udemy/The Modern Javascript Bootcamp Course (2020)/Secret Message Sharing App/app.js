const messageForm = document.getElementById('message-form');
const linkForm = document.getElementById('link-form');
const secretMessageForm = document.querySelector('.card-panel-1 form');

const { hash } = window.location;
const message = atob(hash.replace("#", ""));

if (message) {
	document.querySelector('.card-panel-1').style.justifyContent = "normal";
	const secretMessageShow = document.getElementById('message-show');
	messageForm.classList.add("isHidden");
	secretMessageShow.classList.remove("isHidden");
	secretMessageShow.querySelector('h2').innerText = message;
}

secretMessageForm.addEventListener("submit", event => {
	event.preventDefault();

	const input = secretMessageForm.querySelector('#message-input');
	const encrypted = btoa(input.value);

	const linkInput = document.getElementById("link-input");
	linkInput.value = `${window.location}#${encrypted}`;

	messageForm.classList.add("isHidden");
	linkForm.classList.remove("isHidden");
	linkForm.querySelector('.copy-btn').addEventListener("click", () => {
		linkInput.select();
		document.execCommand("copy");
	});
});