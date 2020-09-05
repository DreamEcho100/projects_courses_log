const btn = document.getElementById('backgroundChanger');
const body = document.querySelector('body');

btn.addEventListener('click', () => {
	let hexNum = randomHexNum();
	body.style.backgroundColor = hexNum;
});

function randomHexNum() {
	hexNum = Math.random().toString().substr(-6);
	return `#${hexNum}`;
}