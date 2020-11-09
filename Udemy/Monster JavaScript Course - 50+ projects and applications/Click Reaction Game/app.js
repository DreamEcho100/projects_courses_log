const msg = document.querySelector(".msg");
const btn = document.querySelector("button");
const gameArea = document.querySelector(".gameArea");
let inPlay = false;
let playArea = {}

messegr("Click start button");

function messegr(mes) {
	msg.innerText  = mes;
}

btn.addEventListener("click", function() {
	if (!inPlay) {
		inPlay = true;
		btn.style.display = "none";
		messegr("Click the circles as quickly as you see them");
		showBox();
	}
})

function showBox() {
	playArea.timer = setTimeout(myBox, rand(3000));
	console.log(playArea.timer);
}

function rand(num) {
	//let temp = (num === 1) ? (Math.random() * num) + 0.7 : Math.floor(Math.random() * num);
	let temp = Math.floor(Math.random() * num);
	return temp;
}

function myBox() {
	let elem = document.createElement("div");
	elem.classList.add("box");
	let r = getColor();
	elem.style.backgroundColor = r;//`rgba(${rand(256)}, ${rand(256)}, ${rand(256)}, ${rand(1)})`
	console.log(r)
	elem.style.width = `${rand(30) + 70}px`;
	elem.style.height = `${rand(30) + 70}px`;
	elem.style.borderRadius = `${rand(50)}%`;
	elem.style.position = `relative`;
	elem.style.top = `${rand(150)}px`;
	elem.style.left = `${rand(150)}px`;
	elem.addEventListener("click", hit);
	elem.start = new Date().getTime();
	console.log(elem);
	gameArea.appendChild(elem)
}

function getColor() {
	function randomNumNHex() {
		let hex = rand(255).toString(16);
		return `${String(hex).substr(-2)}`;
	}
	let hexColor = `#${randomNumNHex()}${randomNumNHex()}${randomNumNHex()}`
	return hexColor.length === 7 ? hexColor : hexColor + `${randomNumNHex()[0]}`;
}

function hit(e) {
	console.log(e.target);
	let end = new Date().getTime();
	let start = e.target.start;
	let duration = (end - start) / 1000;
	messegr(`It took ${duration} seconds to click`);
	clearTimeout(playArea.timer);
	gameArea.children[0].remove();
	playArea.timer = setTimeout(myBox, rand(3000));

}