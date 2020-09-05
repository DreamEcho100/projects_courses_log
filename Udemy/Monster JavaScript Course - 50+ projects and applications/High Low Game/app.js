const msg = document.querySelector(".message");
const score = document.querySelector(".score");
const btns = document.querySelectorAll("button");
const gamePlay = document.querySelector(".gamePlay");

let curCardValue = 0;
let scoreValue = 0;
let deck  = [];
const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"];
const suits = ["hearts", "diams", "clubs", "spades"];

for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", playGame);
}

function playGame(e) {
    let temp = e.target.innerText;
    let myCard = drawCard();
    let win;
    if (temp == "Start") {
        msg.innerHTML = "Higher or Lower";
        gamePlay.innerHTML = "";
        makeCard(myCard);
        toggleBtns();
        return;
    }
    if(myCard.value === curCardValue){
        win= "draw";
        msg.innerHTML = "Draw";
    }else{
        if((temp === "Higher" && (myCard.value > curCardValue)) || (temp === "Lower" && (myCard.value < curCardValue))){
            scoreValue++;
            score.innerHTML = scoreValue;
            msg.innerHTML = "Correct, Next?";
        }else{
            msg.innerHTML = "Wrong Game Over";
            toggleBtns();
        }
    }
    makeCard(myCard);
}
	

function toggleBtns() {
	btns[0].classList.toggle("hideButton");
	btns[1].classList.toggle("hideButton")
	btns[2].classList.toggle("hideButton");
}

function makeCard(card) {
	let html1 = `${card.rank}<br>&${card.suit};`;
	let html2 = `${card.rank}&${card.suit};`;
	let curCards = document.querySelectorAll(".card");

	let div = document.createElement("div");
	div.setAttribute("class", "card");
	div.style.left = `${(curCards.length * 25)}px`;
	curCardValue = card.value;
	if (card.suit === "hearts" || card.suit === "diams") {
		div.classList.add("red");
	}

	let span1 = document.createElement("span");
	span1.setAttribute("class", "tiny");
	span1.innerHTML = html2;
	div.appendChild(span1);

	let span2 = document.createElement("span");
	span2.setAttribute("class", "big");
	span2.innerHTML = html1;
	div.appendChild(span2);

	//div.innerHTML = html1;
	gamePlay.appendChild(div);
}

function drawCard() {
	if (deck.length > 0) {
		let randomIndex = Math.floor(Math.random() * deck.length);
		let card = deck.splice(randomIndex, 1)[0];
		return card;
	} else {
		makeDeck();
		return drawCard();
	}
}

function makeDeck() {
	deck = [];
	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < ranks.length; j++) {
			let card = {};
			card.suit = suits[i];
			card.rank = ranks[j];
			card.value = (j + 1);
			deck.push(card);
		}
	}
}