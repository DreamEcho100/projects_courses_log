//eval() - Function()
const myCalculator = document.querySelector(".myCal");
const myKeys = [["C"], ["1", "2", "3", "+"], ["4", "5", "6", "-"], ["7", "8", "9", "*"], ["0", ".", "=", "/"]];
const myOper= ["+", "-", "*", "/"];
let myOutput;

document.addEventListener("DOMContentLoaded", function () {
	myOutput = document.createElement("div");
	myOutput.innerHTML = "0";
	myOutput.classList.add("output");
	myCalculator.appendChild(myOutput);
	for (let y = 0; y < myKeys.length; y++) {
		let div = document.createElement("div");
		div.classList.add("row");
		for (let x = 0; x < myKeys[y].length; x++) {
			let btn = document.createElement("div");
			btn.innerHTML = myKeys[y][x];
			btn.classList.add("btn");
			btn.addEventListener("click", btnHit);
			div.appendChild(btn);
		}
		myCalculator.appendChild(div);
	}
});

function btnHit(e) {
	let myVlaue = this.innerText;
	let myCal = myOutput.innerText;
	let lastChar = myCal.substring(myCal.length - 1);
	let beforeLastChar = myCal.substring(myCal.length - 2);
	let beforeBeforeLastChar = myCal.substring(myCal.length - 3);


	if (myCal === "0") {
		myCal = "";
	}

	if (myVlaue === "=") {
		if (myOper.includes(lastChar) || lastChar === ".") {
			myCal = myCal.substring(0, myCal.length - 1);
		}
	
		if (myCal.length === 1 && myOper.includes(lastChar)) {
			if (lastChar !== "-") {
				myCal = 0;
			}			
		}
		if (myCal.length === 0) {
			myCal = 0;
		}
		 else {
			myCal = eval(myCal);
		}
		myVlaue = "";
	} else {
		if (myOper.includes(myVlaue)) {
			if (myVlaue === "-" && lastChar === "-") {
				myCal = myCal.substring(0, myCal.length - 1) + "+";
				myVlaue = "";
			}
			else {
				if (myOper.includes(lastChar)) {
					myCal = myCal.substring(0, myCal.length - 1);
				}					
			}
		}
		if (myOper.includes(lastChar)) {
			if (myCal.length === 1 && !(isNaN(Number(myVlaue))) ) {
				if (lastChar !== "-" && lastChar !== "+") {
					myCal = "";
				}
			}			
		}
	}

	myCal = myCal + myVlaue;

	if (myVlaue == "C") {
		myCal = 0;
	}

	if (!(myCal)) {
		myOutput.innerText = 0;
	} else {
		myOutput.innerText = myCal;
	}
	
}
