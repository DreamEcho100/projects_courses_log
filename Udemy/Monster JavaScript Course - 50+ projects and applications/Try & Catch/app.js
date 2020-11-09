const inp = document.querySelector("input");
const btn = document.querySelector("button");
const h1 = document.querySelector("h1");

btn.addEventListener('click', tester);
inp.addEventListener('keydown', (event) => {
	if (event.keyCode === 13) {tester()};
});

function tester() {
	let num = inp.value;
	console.log(num);
	try {
		let cases = ["no Value", "not a number", "over 5", "under 5"];
		let testCase;
		if (num === "") {h1.textContent = `"${num}" is ${cases[0]}`; throw cases[0];};
		if (isNaN(num)) {h1.textContent = `"${num}" is ${cases[1]}`; throw cases[1];};
		num = Number(num);
		if (num > 5) {h1.textContent = `"${num}" is ${cases[2]}`; throw cases[2];};
		if (num < 5) {h1.textContent = `"${num}" is ${cases[3]}`; throw cases[3];};
	} catch (error) {
		console.log(error);
	} finally {
		console.log("This will always show.");
		inp.value = '';
	}
}