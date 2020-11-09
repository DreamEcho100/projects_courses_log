const msg = document.querySelector(".message");
const btns = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
const userPlay = document.querySelector(".userPlay");
const res = document.querySelector(".res");
const inp = document.querySelector("input");
let deck;
let players;
let deals;
let round;
let inplay;
let total;
msg.style.color = "red";
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suits = ["hearts", "diams", "clubs", "spades"];

const cleanStart = () => {
	deck = [];
	players = [];
	deals = [];
	round = 0;
	inplay = false;
	total = 0;
	gameplay.innerHTML = "";
	res.innerHTML = "";
}

cleanStart();

btns.forEach( (item) => item.addEventListener("click", playGame) );

function playGame(e) {
	let temp = e.target.textContent;
	 if (temp === "Start") {
	 	startGame();
	 	btnToggle();
	 }
	 if (temp === "Attack") {
	 	let tempRounds = inp.value;
	 	res.innerHTML = "";
	 	round = 0;
	 	for (var i = 0; i < tempRounds; i++) {
	 		if (inplay) {
	 			msg.innerHTML = `Round ${i + 1}`;
	 			makeCards();
	 		}
	 	}
	 }
};

const btnToggle = () => {
	btns[0].classList.toggle("hide");
	btns[1].classList.toggle("hide");
};

const startGame = () => {
	cleanStart();
	inp.classList.toggle("hide");
	inp.value = "3";
	inplay = true;
	let numOfPlayers = inp.value;
	buildDeck();
	setupPlayers(numOfPlayers);
	dealCards(0);
	makeCards();
	inp.value = "1";
};

const showCard = (el, card) => {
	if (card !== undefined) {
		el.style.backgroundColor = "white";
		let html1 = `${card.rank}<br>&${card.suit};`;
		let html2 = `${card.rank}&${card.suit};`
		let div = document.createElement("div");
		div.classList.add("card");
		if (card.suit === "hearts" || card.suit === "diams") {
			div.classList.add("red");
		}

		let span1 = document.createElement("span");
		span1.innerHTML = html2;
		span1.classList.add("tiny");
		div.appendChild(span1);

		let span2 = document.createElement("span");
		span2.innerHTML = html1;
		span2.classList.add("big");
		div.appendChild(span2);
		el.appendChild(div);

	}
}

const dealRound = (playerList, tempHolder) => {
	let curWinner = {
		"high": null,
		"player": null
	};
	let playOff = [];
	for (let i = 0; i < playerList.length; i++) {
		let tempplayerListIdx = playerList[i];
		if (deals[tempplayerListIdx].length > 0) {
			let card = deals[tempplayerListIdx].shift();
			if (curWinner.high === card.value) {
				if (playOff.length === 0) {
					playOff.push(curWinner.player);
				}
				playOff.push(tempplayerListIdx);
			}
			if (!curWinner.high || curWinner.high < card.value) {
				curWinner.high = card.value;
				curWinner.player = tempplayerListIdx;
				curWinner.card = card;
			}
			tempHolder.push(card);
			showCard(players[tempplayerListIdx], card)
		}
	}
	if (playOff.length > 0) {
		dealRound(playOff, tempHolder);
	} else {
		updater(curWinner.player, tempHolder);
	}
}

const makeCards = () => {
	let tempHolder = [];
	let playerList = [];
	for (let i = 0; i < players.length; i++) {
		players[i].innerHTML = "";
		players[i].parentElement.style.backgroundColor = "white";
		if (deals[i].length > 0) {
			playerList.push(i);
		}
	}
	dealRound(playerList, tempHolder);
}

const winGame = () => {
	btnToggle();
	let inplay = false;
	msg.innerHTML = "Select number of Players";
	inp.classList.toggle("hide");
	/*
	for (let x = 0; x < players.length; x++) {
		players[x].innerHTML += (deals[x].length >= total) ? "WINNER" : "LOSER";
	}
	*/

};

const updater = (winner, tempHolder) => {
	players[winner].style.backgroundColor = "green";
	players[winner].parentElement.style.backgroundColor = "lightgreen";
	tempHolder.sort( () => 0.5 - Math.random() );

	for (let record of tempHolder) {
		deals[winner].push(record);
	}
	for (let i = 0; i < players.length; i++) {
		let div = document.createElement("div");
		div.classList.add("stats");
		if (deals[i].length >= total) {
			div.innerHTML = `WINNER :)<br>${deals[i].length}`;
			winGame();
		} else {
			if (!players[i].querySelector('.stats')) {
				div.innerHTML = deals[i].length < 1 ? "Lost" : `Cards: ${deals[i].length}`;
			} else if (players[i].querySelector('.stats').innerHTML === "Cards: 51") {
				div.innerHTML = "Winner :)";
			} else if (players[i].querySelector('.stats') && players[i].querySelector('.stats').innerHTML !== "Lost :(") {
				div.innerHTML = deals[i].length < 1 ? "Lost :(" : `Cards: ${deals[i].length}`;
			}
		}
		
		players[i].appendChild(div);
	}
	res.innerHTML += `Player${winner + 1} won ${tempHolder.length} cards<br>`;
}

const buildDeck = () => {
	deck = [];
	for (let i = 0; i < suits.length; i++) {
		let j;
		for (j = 0; j < ranks.length; j++) {
			total++;
			let card = {};
			card.suit = suits[i];
			card.rank = ranks[j];
			card.value = (j + 1);
			deck.push(card);
		}
	}
}

const setupPlayers = (num) => {
	players = [];
	deals = [];
	for (let i = 0; i < num; i++) {
		let div = document.createElement("div");
		div.setAttribute("id", `player-${i + 1}`);
		div.classList.add("player");
		let div1 = document.createElement("div");
		div1.textContent = `Player${parseInt(i) + 1}`;
		players[i] = document.createElement("div");
		players[i].textContent = "Cards";
		div.appendChild(div1);
		div.appendChild(players[i]);
		gameplay.appendChild(div);
		deals.push([]);
	}
}

const dealCards = (playerCard) => {
	playerCard = (playerCard >= players.length) ? 0 : playerCard;
	if (deck.length > 0) {
		let ranIdx = Math.floor(Math.random() * deck.length);
		let card = deck.splice(ranIdx, 1)[0];
		deals[playerCard].push(card);
		playerCard++;
		return dealCards(playerCard);
	} else {
		msg.textContent = "Cards dealt now";
		return;
	}
};