const container = document.querySelector(".container");
const score = document.querySelector(".score");
const startGame = document.querySelector(".startGame");

startGame.addEventListener("click", function() {
	startGame.style.display = "none";
	let ranTime = Math.random() * 2000 + 1000;
	setTimeout(makeIt, ranTime);
});

function makeIt() {
	let boundary = container.getBoundingClientRect();
	let scoreHeight = score.getBoundingClientRect().height;
    
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = `${Math.random() * boundary.width}px`;
	div.style.top = `${Math.random() * boundary.height}px`;
	div.style.width = `${Math.random() * 10 + 40}px`;
	div.style.height = `${Math.random() * 10 + 40}px`;
	div.style.borderRadius = "10%";
    div.style.cursor = "pointer";
    div.style.backgroundColor = `#${Math.random().toString(16).substr(-6)}`;
    div.style.border = "1px solid black";
    div.startTime = Date.now();
    let diff;
    ranTime = Math.random() * 2000 + 1000;
    div.addEventListener("click", function() {
    	div.endTime = Date.now();
    	diff = (div.endTime - div.startTime) / 1000;
    	score.innerHTML = `Clicked in ${diff} seconds`;
    	clearTimeout(div.timer);
    	container.removeChild(div);
    	makeIt();
    })
    div.timer = setTimeout(function () {
    	container.removeChild(div);
    	makeIt();
    },1000)
    container.appendChild(div);
	ranTime = Math.random() * 2000 + 1000;
	if (div.offsetTop < scoreHeight) {
		div.style.top = `${score.height + div.offsetHeight
			+ (Math.random() * 5)}px`;
	}
	if (div.offsetTop + div.offsetHeight >  boundary.height) {
		div.style.top = `${boundary.height - div.offsetHeight - (Math.random() * 5)}px`;
	}
	if (div.offsetLeft + div.offsetWidth > boundary.width) {
		div.style.left = `${boundary.width - div.offsetWidth - (Math.random() * 5)}px`;
	}
}
