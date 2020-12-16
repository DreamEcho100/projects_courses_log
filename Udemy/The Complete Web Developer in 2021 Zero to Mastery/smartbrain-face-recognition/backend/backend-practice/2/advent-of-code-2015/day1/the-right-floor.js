const fs = require('fs');
let counter = 0;

fs.readFile("./(=up&)=down.txt", (error, data) => {
	console.time('funchallenge-1');
	if (error) console.error("Errrrrrrrrrrrrooooooooooorrrrrrrrrrr", error);

	const tempData = data.toString();
	let i;
	for (i = 0; i < data.length; i++) {
		if (tempData[i] === "(") counter++;
		else if (tempData[i] === ")") counter--;
		/*if (counter < 0 && !haveWentToTheBasement) {
			console.log(`the position of the character that causes to first time enter the basement is ${i}`);
			haveWentToTheBasement = true;
		}*/
	}
	console.log(counter);
	console.timeEnd('funchallenge-1');

	console.time('funchallenge-2');
	let accumulater = 0, counter2 = 0;
	tempData.split("").some(currentItem => {
		if(currentItem === "(") accumulater++;
		if(currentItem === ")") accumulater--;
		counter2++;
		return accumulater < 0;
	});
	console.log(counter2);
	console.timeEnd('funchallenge-2');
});
