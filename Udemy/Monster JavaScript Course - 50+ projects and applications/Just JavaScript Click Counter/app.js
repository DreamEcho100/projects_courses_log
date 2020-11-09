let counter = 0;

document.addEventListener("DOMContentLoaded", function(event) {
	const body = document.querySelector("body");
	const output = document.createElement("div");

	output.innerHTML = "Click the button";
	output.style.fontSize = "2em";
	output.style.padding = "5px";
	output.style.fontFamily = "fantasy";
	output.setAttribute("class", "msg");
	body.appendChild(output);
	const btn = document.createElement("button");
	btn.innerHTML = "Click me";
	btn.style.border = "1px solid #ddd";
	btn.style.padding = "25px";
	btn.style.width = "400px";
	btn.style.fintSize = "2em";
	btn.style.textAlign = "center";
	btn.style.backgroundColor = "red";
	btn.style.color = "white";
	btn.addEventListener("click", function() {
		counter++;
		let txt = `You clicked me ${counter} times`;
		let msg = document.querySelector(".msg");
		msg.innerHTML = txt;

	});
	body.appendChild(btn);

})