let myWords = ["javascript","course","laurence"];
let newArrOfWords = [];
let player = {};

const output1 = document.querySelector(".output1");
const output2 = document.querySelector(".output2");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");

btn.addEventListener("click", function() {
	output1.innerHTML = "";
	output2.innerHTML = "";
	msg.innerHTML = "";
	btn.style.display = "none";
	if (myWords.length <= 0) {
		let emptyArr = [];
		[myWords, newArrOfWords] = [newArrOfWords, []];		
	}

	myWords.sort(() => {
		return 0.5 - Math.random();
	});
	let theWord = myWords.pop();
	newArrOfWords.push(theWord);

	player.solution = theWord.split("");
	buildBored();
})

function buildBored() {
	player.solution.forEach(function (letter) {
		let div = document.createElement("div");
		div.classList.add("letter2");
		div.innerText = "_";
		div.myLetter = letter;
		output2.appendChild(div);
	})
	solutionLetters = document.querySelectorAll(".letter2");
	for (var i = 0; i < 26; i++) {
		let temp = String.fromCharCode(65 + i);
		let div = document.createElement("div");
		div.classList.add("letter");
		div.myLetter = temp;
		let handler = function (e) {
			div.removeEventListener("click", handler);
			div.classList.add("done");
			let counter = 0;
			let guess = 0;
			let mes;
			solutionLetters.forEach(function (letter) {
				if (letter.innerHTML !== "_") {
					counter++;
				}
				if (letter.myLetter.toUpperCase() === temp) {
					letter.innerHTML = temp;
					guess++;
				}
			})
			let letterLeft = solutionLetters.length - (guess + counter);
			if (guess > 0) {
				let mul = guess > 1 ? "times" : "time";
				mes = `You found '${temp}' letter ${guess} ${mul}`;
				msg.style.color = "green";
			} else {
				if (letterLeft > 1) {
					mes = `Not Found!!!`;
					msg.style.color = "red";
				}
			}
			let letter_s = letterLeft === 1 ? "letter" : "letters";
			if (letterLeft > 0) {
				msg.innerHTML = `${mes} <br> ${letterLeft} ${letter_s} left`;
			} else {
				msg.innerHTML = `There is no more letters lift :)`;
			}
			if (letterLeft < 1) {
				btn.style.display = "block";
			}
		}
		div.addEventListener("click", handler);
		div.innerText = temp;
		output1.appendChild(div);
	}
}