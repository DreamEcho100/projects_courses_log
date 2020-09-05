/*
const question = new Map();

question.set("question", "What is the is name of the latest major JavaScript version");
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES7");
question.set("correct", 3);
	question.set(true, "Correct answer :D");
	question.set(false, "Wrong, please try again!");

console.log(question.get("question"));
console.log(question.size);

if (question.has(4)) {
	question.delete(4);
}

// question.clear();

question.forEach((value, key) => console.log(`This is ${key}, and it's set to value ${value}.`));

for (let [key, value] of question.entries()) {
	if (typeof key === "number") {
		console.log(`This is ${key}, and it's set to value ${value}.`);
	}
}
*/
/*
//ES5
var Person5 = function (name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
}

Person5.prototype.calculateAge = function() {
	var age = new Date().getFullYear() - this.yearOfBirth;
	console.log(age);
}

var john5 = new Person5("John", 1980, "teacher");
john5.calculateAge();
console.log("john5", john5);

var Athleate5 = function(name, yearOfBirth, job, olymbicGames, medals) {
	Person5.call(this, name, yearOfBirth, job);
	this.olymbicGames = olymbicGames;
	this.medals = medals;
}

Athleate5.prototype = Object.create(Person5.prototype);
Athleate5.prototype.constructor = Athleate5; // Or else the constructor will point at Person5
function extend(child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}
extend(Athleate5, Person5);

Athleate5.prototype.wonMedal = function() {
	this.olymbicGames++;
	this.medals++;
	console.log(this.olymbicGames, this.medals);
}

johnAthleate5 = new Athleate5("john", 1985, "swimmer", 3, 10);
johnAthleate5.calculateAge();
johnAthleate5.wonMedal();
console.log("johnAthleate5", johnAthleate5);

//ES6
class Person6 {
	constructor(name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	}

	calculateAge() {
		let age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	}

	static greeting() {
		console.log("Greeting in ES6");
	}
}

let john6 = new Person5("John", 1990, "teacher");
john6.calculateAge();
Person6.greeting();
console.log("john6", john6);

class Athleate6 extends Person6 {
	constructor(name, yearOfBirth, job, olymbicGames, medals) {
		super(name, yearOfBirth, job);
		this.olymbicGames = olymbicGames;
		this.medals = medals;
	}

	wonMedal() {
		this.olymbicGames++;
		this.medals++;
		console.log(this.olymbicGames, this.medals);
	}
}

const johnAthleate6 = new Athleate6("john", 1980, "swimmer", 5, 11);
johnAthleate6.calculateAge();
johnAthleate6.wonMedal();
console.log("johnAthleate6", johnAthleate6);
*/
/*
class Element {
	constructor(name, buildYear) {
		this.name = name;
		this.buildYear = buildYear;
	}
}

class Park extends Element {
	constructor(name, buildYear, area,  numOfTrees) {
		super(name, buildYear);
		this.area = area; //km
		this.numOfTrees = numOfTrees;
	}

	treeDensity () {
		const density = this.numOfTrees / this.area;
		console.log(`${this.name} has a tree density of ${density} trees per square km.`);
	}
}

class Streets extends Element {
	constructor(name, buildYear, length, size = 3) {
		super(name, buildYear);
		this.length = length;
		this.size = size		
	}

	classifyStreet() {
		const classification = new Map();
		classification.set(1, "tiny");
		classification.set(2, "small");
		classification.set(3, "normal");
		classification.set(4, "big");
		classification.set(5, "huge");
		console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} ${classification.get(this.size) === 1 ? "Street" : "Streets"}.`)
	}
}

const allParks = [new Park("Green Park", 1987, 0.2, 215), 
				  new Park("National Park", 1894, 2.9, 3541),
				  new Park("Oak Park", 1953, 0.4, 949)]; 

const allStreets = [new Streets("Ocean Avenue", 1999, 1.1, 4),
					new Streets("Evergreen", 2008, 2.7, 2),
					new Streets("Sunset Boulevard", 1982, 2.5)];

function calc(arr) {
	let sum = arr.reduce((prev, cur) => prev + cur, 0);
	return [sum, sum / arr.length];
}

function reportParks(p) {
	console.log("'-------PARKS REPORT-------'");
	// Density
	p.forEach(el => el.treeDensity());
	// Average age
	const ages = p.map(el => new Date().getFullYear() - el.buildYear);
	const [totalAge, avgAge] = calc(ages);
	console.log(`Our ${p.length} parks have an average of ${avgAge.toFixed(2)} years.`);
	// Which park has more thab 100 trees
	let targetParks = p.filter(el => el.numOfTrees > 1000).map(el => el.name);
	console.log(targetParks);
	targetParks = `${targetParks.length === 1 ? `${[...targetParks]}` + " has " : `${[...targetParks].replace(/([\S\s]+)+(,)([\s\S]+)+$/, "$1 and $3").replace(/(\w+)+(,)(\w+)+/g, "$1, $3")}` + " have "}`
	console.log(`${targetParks}more than 1000 trees.`)
}	

function reportStreets(s) {
	console.log("'-------STREETS REPORT-------'");
	// Total and average length of the town's streets
	const [totalLength, avgLength] = calc(s.map(el => el.length));
	console.log(`Our ${s.length} streets have a total length of ${totalLength.toFixed(2)} km, With an average of ${avgLength} km.`);
	// Classify sizes
	s.forEach(el => el.classifyStreet());
}

console.log(reportParks(allParks));
console.log(reportStreets(allStreets));
*/

const output = document.querySelector(".output");
const msg = document.querySelector(".msg");
const prevQuestion = document.querySelector(".prevQuestion");
const nextQuestion = document.querySelector(".nextQuestion");
const rightAnswerResponse = "You are Right, Good job.";
const wrongAnswerResponse = "Sorry, Wrong answer.";
//let qNum;


	


document.addEventListener("DOMContentLoaded", function () {
	let maps = [];
	let qNum;
	class QuestionMaker {
		constructor(question, trueAnswer, ...options){
			this.question = question;
			this.trueAnswer = trueAnswer;
			this.options = [...options];
		}

		classifySection() {
			const classification = new Map();
			classification.set("question", this.question);
			this.options.forEach((current, idx) => classification.set((idx + 1), current));
			classification.set("correct", this.trueAnswer);
			maps.push(classification);
			return classification;
		}

		static displayIt(chosenQ, curNum) {
			let solution = chosenQ.get("correct");
			let question = document.createElement("h3");
			question.number = curNum;
			question.innerText = chosenQ.get("question");
			output.appendChild(question);
			let optionsHolder = document.createElement("div");
			optionsHolder.setAttribute("class", "options");
			for (let [key, value] of chosenQ.entries()) {
				console.log(key, value)
				if (typeof key === "number") {
					let div = document.createElement("button");
					div.classList.add("optionsBtn");
					div.innerText = value;
					div.number = key - 1;

					div.addEventListener("click", function () {

						if (div.number === solution) {
							msg.innerText = rightAnswerResponse;
							msg.style.backgroundColor = "lightseagreen";
							msg.style.color = "darkred";
							QuestionMaker.toggleBetweenQuestions("next", maps, question.number)
						} else {
							msg.innerText = wrongAnswerResponse;
							msg.style.backgroundColor = "darkred";
							msg.style.color = "lightseagreen";
						}

					});
					optionsHolder.appendChild(div);
				}
				msg.style.backgroundColor = "transparent";
				output.appendChild(optionsHolder);
			}

		}

		static toggleBetweenQuestions(type, arr, num) {
			if (type === "next") {
				if (num === arr.length - 1) {
					num = 0;
				} else {
					num++;
				}
			} else if (type === "prev") {
				if (num === 0) {
					num = arr.length - 1;
				} else {
					num--;
				}
			}
			qNum = num;
			setTimeout(() => {
				output.innerText = "";
				msg.innerText = "";
				msg.style.backgroundColor = "transparent";
				const chosenQ = arr[qNum];
				this.displayIt(chosenQ, qNum);
			}, 750)

		}
		static testing() {
			console.log(maps);
		}

	}
	const question1 = new QuestionMaker("Which one of those languages is a Markup Language?",
							0,
							"HTML", "Java", "C++"
							);
	q1 = question1.classifySection();
	const question2 = new QuestionMaker("Which one of those languages is not used in A.I.?",
							2,
							"Python", "C++", "CSS"
							);
	q2 = question2.classifySection();
	const question3 = new QuestionMaker("Which one of those languages is used in the Database?",
							1,
							"JavaScript", "MySQL", "PHP"
							);
	q3 = question3.classifySection();

	maps = [q1, q2, q3]

	qNum = Math.floor(Math.random() * maps.length);

	let randomQuestion = maps[qNum];
	QuestionMaker.testing();
	debugger;
	
	QuestionMaker.displayIt(randomQuestion, qNum);

	prevQuestion.addEventListener("click", function () {
		QuestionMaker.toggleBetweenQuestions("prev", maps, qNum)
	})
	nextQuestion.addEventListener("click", function () {
		QuestionMaker.toggleBetweenQuestions("next", maps, qNum)
	})


})