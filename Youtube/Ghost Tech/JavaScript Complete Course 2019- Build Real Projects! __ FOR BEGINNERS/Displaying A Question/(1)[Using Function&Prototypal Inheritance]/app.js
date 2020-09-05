const output = document.querySelector(".output");
const msg = document.querySelector(".msg");
const prevQuestion = document.querySelector(".prevQuestion");
const nextQuestion = document.querySelector(".nextQuestion");
let questionIdx ;

function Question(question, options, solution) {
	this.question = question;
	this.options = options;
	this.solution = solution;
}

Question.prototype.displayIt = function (questions) {
	let solution = this.solution;
	let question = document.createElement("h3");
	question.innerText = this.question;
	output.appendChild(question);

	let options = document.createElement("div");
	options.setAttribute("class", "options");
	for (let i = 0; i < this.options.length; i++) {
		let div = document.createElement("button");
		div.classList.add("optionBtn");
		div.innerText = this.options[i];
		div.number = i;
		div.addEventListener("click", changingTheOutput);
		function changingTheOutput() {
			if (div.number === solution) {
				msg.innerText = "You are Right, Good job.";
				msg.style.backgroundColor = "lightseagreen";
				msg.style.color = "darkred";
				nextQuest(questions);
			} else {
				msg.innerText = "Sorry, Wrong answer.";
				msg.style.backgroundColor = "darkred";
				msg.style.color = "lightseagreen";
			}
		}
		options.appendChild(div);
	}
	output.appendChild(options);
	msg.style.backgroundColor = "transparent";
}

function nextQuest(questions) {
	let max = (questions.length - 1);
	if (questionIdx === max) {
		questionIdx = 0;
	} else {
		questionIdx++;
	}
	setTimeout(function() {
		output.innerText = "";
		msg.innerText = "";
		msg.style.backgroundColor = "transparent";
		randomQuestion = questions[questionIdx];
		randomQuestion.displayIt(questions);
	}, 1000)
}

document.addEventListener("DOMContentLoaded", function () {
	let q1 = new Question(
		"Which one of those languages is a Markup Language?",
		["HTML", "Java", "C++"],
		0
		)

	let q2 = new Question(
		"Which one of those languages is not used in A.I.?",
		["Python", "C++", "CSS"],
		2
		)

	let q3 = new Question(
		"Which one of those languages is used in the Database?",
		["JavaScript", "MySQL", "PHP"],
		1
		)

	let questions = [q1, q2, q3];
	questionIdx = Math.floor(Math.random() * questions.length);
	let randomQuestion = questions[questionIdx];
	randomQuestion.displayIt(questions);
	prevQuestion.addEventListener("click", function () {
		if (questionIdx === 0) {
			questionIdx = questions.length - 1;
		} else {
			questionIdx--;
		}
		setTimeout(function() {
			output.innerText = "";
			msg.innerText = "";
			msg.style.backgroundColor = "transparent";
			randomQuestion = questions[questionIdx];
			randomQuestion.displayIt(questions);
		}, 500);
	})
	nextQuestion.addEventListener("click", function() {
		nextQuest(questions);
	})

})