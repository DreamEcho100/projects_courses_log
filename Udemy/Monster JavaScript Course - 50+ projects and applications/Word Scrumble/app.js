const msg1 = document.getElementById("msg-1");
const msg2 = document.getElementById("msg-2");
const inp = document.querySelector("input");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");

let inplay = false;

document.addEventListener("DOMContentLoaded", function() {
	let words = ["html", "javascript", "node.js"];
	let random;

	btn1.addEventListener("click", function() {
		
		if (inplay === false) {
			inplay = true;
			random = Math.floor(Math.random() * words.length);
			msg1.innerText = scramble(words[random]);
			btn1.innerText = "Guess";
			inp.classList.toggle("hidden");
			msg1.classList.toggle("hidden");
			btn2.classList.toggle("hidden");
		} else {
			let trueWord = words[random];
			let typed = inp.value;
			if (trueWord === typed) {
				msg2.innerText = "You are right.";
			} else {
				msg2.innerText = "Try again.";
			}
		}
	})
	btn2.addEventListener("click", again);
})

function again() {
	inplay = false;
	inp.classList.toggle("hidden");
	msg1.classList.toggle("hidden");
	btn2.classList.toggle("hidden");
	btn1.innerText = "Start again?";
	msg2.innerText = "";
	inp.value = "";
}


/*
function scramble(str) {
	let obj = {};
	let arr = str.split("");
	arr.map(elem => {
		obj[elem] = ++obj[elem] || 1;
	})

	let newArr = [];
	while(newArr.length !== arr.length){
		let random = Math.floor(Math.random() * arr.length);
		let char = arr[random];
		if ( obj[char] !== 0) {
			newArr.push(char);
			obj[char] = --obj[char];
		}
	}

	if (newArr.join("") !== arr.join("")) {
		return newArr.join("");
	} else {
		return scramble(ar.join(""))
	}
	
}
*/

function scramble(str) {
	arr = str.split("")
	for (var i = arr.length - 1; i >= 0; i--) {
		let temp = arr[i];
		let j = Math.floor(Math.random() * arr.length);
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr.join("");
}