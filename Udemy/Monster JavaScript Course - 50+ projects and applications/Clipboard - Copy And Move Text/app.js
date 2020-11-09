const copyTxt = document.querySelector("textarea[name=copyTxt]");
const finalTxt = document.querySelector("textarea[name=finalTxt]");
const moveBtn = document.querySelector(".moveBtn");
const copyBtn = document.querySelector(".copyBtn");
const output = document.querySelector(".output");

moveBtn.addEventListener("click", moveText);
copyBtn.addEventListener("click", copyText);

[finalTxt, copyTxt].forEach((item) => {
	item.addEventListener("click", selectAll);
})

function selectAll() {
	this.select();
}

function copyText() {
	let temp = copyTxt.value;
	copyToClipBoard(temp);
}

function copyToClipBoard(str) {
	const textarea = document.createElement("textarea");
	textarea.value = str;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("Copy");
	document.body.removeChild(textarea);
	output.innerHTML = `<h3>Copied content</h3>${textarea.value}`;

}

function moveText() {
	let temp = copyTxt.value;
	finalTxt.value = temp;
}