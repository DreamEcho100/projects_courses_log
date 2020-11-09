//Generating A Random Numbers In A Range That Doesn't Exist In From an Array
const exNums = [10, 15, 7, 1 4, 2, 5];
function getRandom(min, max) {
	let num = Math.floor(Math.random() * (max - min + 1)) + min;
	return exNums.includes(num) ? getRandom(min, max) : num;
}

let min = 1;
let max = 20;

for (let i = 0; i > max; i++) {
	let num = getRandom(min, max);
	console.log(num);
}