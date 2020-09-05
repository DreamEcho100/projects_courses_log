const rawtxt = document.querySelector("textarea[name=textarea]");
const fintxt = document.querySelector("textarea[name=output]");
const btn = document.querySelector("button");
const counter = document.querySelector(".counter");

btn.addEventListener("click", function () {
	let temp = rawtxt.value;
	//let exp = /([A-Za-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
	let exp = /([\w\d.-]+@[\w\d.-]+\.[\w\d.-]+)/gi;
	let emailData = temp.match(exp);
	counter.innerText = `Emails found ${emailData.length}\n`;
	/*
	let holder = [];
	emailData.map((item) => {
		holder.push(item);
	});
	let tempholder = holder.join(";");
	*/
	fintxt.innerText = emailData.join(";");
})

fintxt.addEventListener("click", function () {
	this.select();
})