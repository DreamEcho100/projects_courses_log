let myData = [
				["Title", "Content"],
				["Row1", "Content1, comma"],
				["Row2", "Hello World"],
				["Row3", "JavaScript"]
				];
let url;
const output = document.querySelector(".output");
const btn = document.querySelector("button");

const feedID = "1pcFnzsPZYMdiKJgsDdkH4FFjxPBZrnGaC-BCba9EX_Q";
const feed = `https://spreadsheet.google.com/feeds/list/${feedID}/1/public/values?alt=json`;

document.addEventListener("DOMContentLoaded", loadJSON);

function loadJSON() {
	fetch(feed)
	.then( res => res.json())
	.then( data => {
		let mainArr = [];
		let heading = [];
		let firstRun = true;
		data.feed.entry.forEach( item => {
			console.log(item);
			let holder = [];
			for(let key in item) {

				if (key.substring(0, 3) === "gsx") {
					if (firstRun) {
						heading.push(key.split("$")[1]);
					}
					console.log(key.split("$")[1]);
					console.log(item[key].$t);
					holder.push(item[key].$t);
				}
				if (firstRun) {
					firstRun = false;
					mainArr.push(heading)
				}
			}
			mainArr.push(holder);
		})
		console.log(mainArr);
		myData = mainArr;
	})
}

btn.style.backgroundColor = "green";
btn.style.color = "white";
btn.style.padding = "15px";
btn.style.fontSize = "1.5em";
btn.addEventListener("click", function() {
	createCSV(myData);
});

function createCSV(data) {
	console.log(data);
	let holder = "";
	let file;
	if (url !== null) {
		window.URL.revokeObjectURL(url);
	}
	let fileName = "test.csv";
	let properties = { type: "text/csv;charset=utf-8;" };
	data.forEach( (item) => holder += `${clean(item)} \n` );
	file = new File([holder], fileName, properties);
	let link = document.createElement("a");
	url = window.URL.createObjectURL(file);
	link.setAttribute("href", url);
	link.setAttribute("download", fileName);
	link.style.visibility = "hidden"
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function clean(row) {
	let rep = "";
	row.forEach((cell, idx) => {
		cell = cell === null ? "" : cell.toString();
		if (cell.search(/"|,|\n/g) >= 0) cell = '"' + cell + '"';
		if (idx > 0) rep += ",";
		rep += cell;
	});
	console.log(rep);
	return rep;
}