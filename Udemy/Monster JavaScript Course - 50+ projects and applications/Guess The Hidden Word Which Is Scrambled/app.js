window.addEventListener("load", init);
const myWords = ["javascript", "html", "course", "laurence", "coding", "brackets", "sublime", "vscode"];
let done = [];
let current = 0;
let startTime;

function init() {
	console.log("ready");
	let div = document.createElement("div");
	div.setAttribute("class", "msg");
	div.innerText = "Press the start button";
	document.body.appendChild(div);
	let btn = document.createElement("button");
	btn.type = "button";
	btn.innerText = "Start Game";
	btn.addEventListener("click", start);
	document.body.appendChild(btn);
	let div2 = document.createElement("div");
	div2.classList.add("game");
	document.body.appendChild(div2);
}

function start() {
	this.style.display = "none";
	startTime = Date.parse(new Date);
	myWords.sort((a, b) => (0.5 - Math.random()));
	console.log(myWords);
	const game = document.querySelector(".game");
	myWords.forEach((item) => {
		let temp = item.split("").sort((a, b) => (0.5 - Math.random())).join("");
		while(temp === item || temp.slice(0, 1) === item.slice(0, 1)) {temp = item.split("").sort((a, b) => (0.5 - Math.random())).join("");}
		console.log(temp);
		console.log(item);
		let div = document.createElement("div");
		div.innerText = "Select";
		div.classList.add("box");
		div.style.backgroundColor = "red";
		div.word = item;
		div.addEventListener("mouseenter", function() {
			div.style.backgroundColor = "white";
			div.innerText = temp;
		});
		div.addEventListener("mouseleave", function() {
			div.style.backgroundColor = "red";
			div.innerText = "Select";
		});
		div.addEventListener("click", function() {
			if (div.word === myWords[current]) {
				console.log("right");
				div.classList.add("hidden");
				current = Math.floor(Math.random() * myWords.length);
				nextWord();
			} else {
				console.log("wrong");
			}
		});
		game.appendChild(div);
	})
	nextWord();
}

function message(txt) {
	document.querySelector(".msg").innerHTML = txt;
}

function nextWord() {
	if (done.length >= myWords.length) {
		let endTime = Date.parse(new Date);
		let duration = (endTime - startTime) / 1000;
		document.querySelector(".game").innerText = "";
		document.querySelector("button").style.display = "block";
		message(`Game Over it took ${duration} seconds`);
		done = [];
		return;
	}
	if (done.indexOf(myWords[current]) === -1) {
		done.push(myWords[current]);
		message(`Select this Word ${myWords[current]}`);
	} else {
		while(!(done.indexOf(myWords[current]) === -1)) {
			current = Math.floor(Math.random() * myWords.length);
		}
		done.push(myWords[current]);
		message(`Select this Word ${myWords[current]}`);
	}
}



/*
        div.addEventListener("click", function () {
            console.log(this.word);
            cur++;
            nextWord();
        })
        game.appendChild(div);
    })
    nextWord();
}
function nextWord(){
    message("Select this Word "+myWords[cur]);
}

function message(output) {
    document.querySelector(".message").innerHTML = output;
}*/