let game = {
	"min": 1,
	"max":10
}

document.addEventListener("DOMContentLoaded", () => {
	game.output = document.querySelector(".output");
	game.msg = document.querySelector(".message");
	game.guessInput = document.querySelector("input");
	game.btn = document.querySelector("button");
	game.btn.addEventListener("click", guessValue);
	game.output.addEventListener("keydown", (e) => {
		console.log(e);		if (e.code === "Enter" || e.code === "Space") {
			guessValue();
		}
	});
	init();
});

function guessValue() {
	if (game.btn.classList.contains("replay")) {
		init();
		game.btn.innerHTML = "Guess";
		game.guessInput.style.display = "block";
		game.btn.classList.remove("replay");
	} else {
		game.guess++;
		let tempGuess = game.guessInput.value;
		game.guessInput.value = "";
		tempGuess = parseInt(tempGuess);
		if (isNaN(tempGuess)) {
			message(`Please enter only Digits`, "red");
		} else if (tempGuess === game.num) {
			message(`Correct guess of the number ${game.num} in ${game.guess} guesses`);
			gameOver();
		} else {
			let holder = (tempGuess > game.num) ? {
				"c": "blue",
				"m": "You guess is Higher"
			} : {
				"c": "purple",
				"m": "Your guess is Lower"
			};
			message(holder.m, holder.c);
		}
	}
}

function gameOver() {
	game.btn.innerHTML = "Restart Game?";
	game.guessInput.style.display = "none";
	game.btn.classList.add("replay");
	game.max += 5;

}

function init() {
	game.guess = 0;
	game.num = ranNumber(game.min, game.max);
	let tempMsg = `Guess a number from ${game.min} to ${game.max}`;
	message(tempMsg, "blue");
}

function ranNumber(min, max) {
	return Math.floor( (Math.random() * (max - min + 1)) + min);
}

function message(mes, clr) {
	game.msg.innerHTML = mes;
	game.msg.style.color = clr || "black";
	game.guessInput.style.borderColor = clr || "black";
	game.btn.style.backgroundColor = clr || "black";
	game.btn.style.color = "white";
}