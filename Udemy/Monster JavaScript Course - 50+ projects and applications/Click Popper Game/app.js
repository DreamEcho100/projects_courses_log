const playArea = {};
const player = {};
let gameObj;

playArea.stats = document.querySelector(".stats");
playArea.main = document.querySelector(".main");
playArea.game = document.querySelector(".game");
playArea.btns = Array.from(document.querySelectorAll(".btn"));
playArea.page = Array.from(document.querySelectorAll(".page"));

player.score = 0;
player.items = 3;
player.highestScore = localStorage.getItem("highestScoreInClickPopperMiniGame") || 0;

document.addEventListener("DOMContentLoaded", getData);

function getData() {
	playArea.main.classList.add("visible"); 
	if (!localStorage.getItem("faces")) {
		let chars = ["f", "u", "c", "k"];
		let faces = [];
		for (let i = 0; i < 16; i++) {
			let word = "";
			for (let j = 0; j < chars.length; j++) {
				let randomChar = Math.floor(Math.random() * chars.length);
				word += chars[randomChar];
			}
			let url = `https://api.adorable.io/avatars/55/${word}@adorable.io.png`
			faces.push(url);
		}
		localStorage.setItem("faces" ,faces)
	}
	let test = localStorage.getItem("faces");
	test = test.split(",");
	gameObj = test;
	buildBoard();
}

function buildBoard() {
	playArea.scorer = document.createElement("span");
    playArea.scorer.innerHTML = "Press Button to Start";
    playArea.stats.appendChild(playArea.scorer);
	let rows = 4;
	let cols = 4;
	let cnt = 0;
	playArea.game.style.width = cols * 100 + (cols * 2);
	playArea.game.style.width = "fit-content";
	for (let i = 0; i < rows; i++) {
		let divMain = document.createElement("div");
		divMain.setAttribute("class", "row");
		divMain.style.width = cols * 100  + (cols * 2);
		for (let j = 0; j < cols; j++) {
			let div = document.createElement("div");
			div.setAttribute("class", "pop");
			cnt++;
			div.innerText = cnt;
			div.cnt = cnt;
			div.classList.add("gameCell");
			divMain.appendChild(div);
		}
		divMain.classList.add("gameCell");
		divMain.style.width = "fit-content";
		playArea.game.appendChild(divMain);
	}
}

playArea.btns.forEach(function(item) {
	item.addEventListener("click", handleBtn);
});

function handleBtn(e) {
	if (e.target.classList.contains("newGame")) {
		startGame();
	}
}

function startGame() {
	playArea.main.classList.remove("visible");
	playArea.game.classList.add("visible");
	player.gameOver = false;
	let wouldPop = document.querySelectorAll(".pop");
	for (let i = 0; i < wouldPop.length; i++) {
	    wouldPop[i].addEventListener("click", function() {
	    	player.score = player.score + wouldPop[i].v;
	    	wouldPop[i].v = 0;
	        wouldPop[i].innerHTML = wouldPop[i].cnt;
	        wouldPop[i].classList.remove("active");
	        wouldPop[i].removeEventListener("click", hitPop);
	        if(player.score > player.highestScore) {
			    localStorage.setItem("highestScoreInClickPopperMiniGame", player.score);
			    player.highestScore = player.score;
			}
	        if(player.score < 0) {
			    player.items = Number(player.items) - 1;
			    player.score = 0;
			}
			if (player.items < 0) {
				gameOver();
			}
	    	updateScore();
	    })
	    wouldPop[i].v = 0;
	    wouldPop[i].innerHTML = wouldPop[i].cnt;
	    wouldPop[i].classList.remove("active");
	    wouldPop[i].removeEventListener("click", hitPop);
	}
	startPop();
    updateScore();
}

function startPop() {
	let gameScores = [250, 200, 150, 100, 50, 25, 10, 5, -250, -200, -150, -100, -50, -25, -10, -5];
	let newPop = randomUp();
	newPop.classList.add("active");
	newPop.addEventListener("click", hitPop);
	const time = Math.round(Math.random() * (100) + 750);
	const val = Math.floor(Math.random() * gameObj.length);
	newPop.old = newPop.innerText;
	let score = gameScores[val]
	newPop.v = score;
	newPop.innerHTML = `<img class="face" src="${gameObj[val]}"> <br> ${score}`;
	playArea.inPlay = setTimeout(function () {
        newPop.classList.remove("active");
        newPop.removeEventListener("click", hitPop);
        newPop.innerText = newPop.cnt;
        if (!player.gameOver) {
            startPop();
        }
    }, time);
}

function randomUp() {
	const pops = document.querySelectorAll(".pop");
	const idx = Math.floor(Math.random() * pops.length);
	if (pops[idx].cnt === playArea.last) {
		return randomUp();
	}
	playArea.last = pops[idx].cnt;
	return pops[idx];
}

function hitPop(e) {
	let newPop = e.target;
	updateScore();
}

function updateScore() {
    playArea.scorer.innerHTML = `<span class="board">Score: ${player.score} Lives: ${player.items}<br>Highest Score: ${player.highestScore}</span>`;
}

function gameOver() {
    player.gameOver = true;
    playArea.main.classList.add("visible");
    playArea.game.classList.remove("visible");
    document.querySelector(".newGame").innerText = "Try Again";
    player.score = 0;
	player.items = 3;
}

/*
{
	"data":[{"icon": "\u0026#8902;", "value"10:},
			{"icon": "\u0026#10031;", "value":30},
			{"icon": "\u0026#10036;", "value":50},
			{"icon": "\u0026#10042;", "value":70},
			{"icon": "\u0026#10084;", "value":75},
			{"icon": "\u0026#9813;", "value":50},
			{"icon": "\u0026#9822;", "value":60},
			{"icon": "\u0026#9924;", "value":40},
			{"icon": "\u0026#9971;", "value":100},
			{"icon": "\u0026#9729;", "value":-50},
			{"icon": "\u0026#9785;", "value":-100},
			{"icon": "\u0026#9760;", "value":-250},
			{"icon": "\u0026#9791;", "value":-20},
			]
}
*/