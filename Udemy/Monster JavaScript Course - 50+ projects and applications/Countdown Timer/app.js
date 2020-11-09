const clock = document.querySelector(".clock");

const savedValue = localStorage.getItem("countDown") || false;

let clockInput;
clockField();

let timeStop = true;
let timeInterval;
const endDate = document.querySelector("input[name='endDate");


if (savedValue) {
	startClock(savedValue);
	let inputValue = new Date(savedValue);
	console.log(inputValue);
	endDate.valueAsDate = inputValue;
}





endDate.addEventListener("change", function(e) {
	e.preventDefault();
	clockField();
	clearInterval(timeInterval);

	const temp = new Date(endDate.value);
	localStorage.setItem("countDown", temp);
	timeStop = true;
	startClock(temp);
});

function startClock(d) {
	function updateCounter(){
		let tl = timeLeft(d);
		if (tl.total <= 0) {
			timeStop = false;
			clockInput = false;
			tl.days = tl.days + 1;
			clock.innerHTML = "Date Reached.";
		}
		for(let prop in tl){
			let elem = clock.querySelector(`.${prop}`);
			if (elem) {
				elem.innerHTML = tl[prop];
			}
		}		
	}
	updateCounter();
	if (timeStop) {
		timeInterval = setInterval(updateCounter, 1000);
	} else {
		clearInterval(timeInterval);
	}

}

function timeLeft(d) {
	let t = timeDifference(d);

	let seconds = Math.floor((t / 1000) % 60);
	let minutes = Math.floor((t / 1000 / 60) % 60);
	let hours = Math.floor((t / 1000 / 60 / 60) % 24);
	let days = Math.floor((t / 1000 / 60 / 60 / 24));

	return {
		"total": t,
		"days": days,
		"hours": hours,
		"minutes": minutes,
		"seconds": seconds
	}
}

function clockField() {
	let temp = timeDifference(savedValue);
	if (temp <= 0) {
		clockInput = false;
	} else if (temp > 0 || clock.innerHTML === "Date Reached."){
		clockInput = false;
	} else {
		clockInput = true;
	}
	if (clockInput === false) {
		clock.innerHTML = `
	  		<span><span class="days">0</span>Days</span>
	  		<span><span class="hours">0</span>Hours</span>
	  		<span><span class="minutes">0</span>Minutes</span>
	  		<span><span class="seconds">0</span>Seconds</span>
	  	`;
	}
	clockInput = true;
}

function timeDifference(elem){
	let currentDate = new Date();
	return Date.parse(elem) - Date.parse(currentDate);
}