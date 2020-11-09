let player = {
	speed: 100,
	x: 100,
	y: 100
}
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', build);
document.addEventListener('keydown', (event) => {
	let key = event.keyCode;
	console.log(key);
	if (key === 37) {player.x  -= player.speed};
	if (key === 39) {player.x  += player.speed};
	if (key === 40) {player.y  += player.speed};
	if (key === 38) {player.y -= player.speed};

	player.el.style.left = `${player.x}px`;
	player.el.style.top = `${player.y}px`;
});

function build() {
	player.el = document.createElement('div');
	player.x = 100;
	player.y = 100;
	let elDiv = player.el;
	elDiv.classList.add('player');
	elDiv.style.top = `${player.x}px`;
	elDiv.style.top = `${player.y}px`;
	body.appendChild(elDiv);
}