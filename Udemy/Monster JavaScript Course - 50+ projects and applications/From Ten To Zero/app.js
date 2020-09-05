let counterStart1 = 10;
let h1 = document.querySelector('h1');
const intervalId = window.setInterval(counter, 1000);

function counter() {
	h1.innerText = counterStart1;
	counterStart1--;
	if (counterStart1 < 0) {
		clearInterval(intervalId);
	}
}

let counterStart2 = 0;
const elem = document.querySelector('div');
elem.style.width = '100px';
elem.style.height = '100px';
elem.style.backgroundColor = 'red';

function step() {
	counterStart2++;
	elem.style.transform = `translateX(${counterStart2}px)`;
	if (counterStart1 > 0) {
		window.requestAnimationFrame(step);
	}
}
window.requestAnimationFrame(step);
//
