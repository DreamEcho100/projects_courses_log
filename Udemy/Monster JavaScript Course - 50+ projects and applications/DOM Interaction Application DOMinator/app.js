const classArray = ["padded", "bigger", "borderAdd"];
const elementArray = ["div", "p", "span"];
const selClasses = document.querySelector("select[name=classes]");
const eleMaker = document.querySelector("select[name=eleMaker]");
const addElement = document.querySelector("select[name=addElement]");
const adder = document.querySelector("button[name=adder]");
const selElement = document.querySelector("div");
const seInput = document.querySelector("input[name=outputText]");
const seBg = document.querySelector("input[name=bg]");
const seTxt = document.querySelector("input[name=txt]");
const btn = document.querySelector(".btn");
const main = document.querySelector("#main");
let nodeListener;

document.addEventListener("DOMContentLoaded", function() {
	classArray.forEach((item) => {
		let opt = document.createElement("option");
		opt.value = item;
		opt.innerHTML = item;
		selClasses.appendChild(opt);
	});
	elementArray.forEach((item) => {
		let opt = document.createElement("option");
		opt.value = item;
		opt.innerHTML = item;
		addElement.appendChild(opt);
	});
	nodeListener = document.querySelectorAll("#main >*");
	removerElems();
	dropDownBuilder();
});

btn.addEventListener("click", function(event) {
	let temp = nodeListener[eleMaker.value];
	temp.textContent = seInput.value;
	temp.style.backgroundColor = seBg.value;
	temp.style.color = seTxt.value;
	temp.classList.toggle(selClasses.value);
})

adder.addEventListener("click", function() {
	let tempElem = document.createElement(addElement.value);
	tempElem.textContent = addElement.value;
	tempElem.addEventListener("click", removeElem);
	main.appendChild(tempElem);
	dropDownBuilder();
});

function removerElems() {
	nodeListener.forEach(function(item) {
		item.addEventListener("click", removeElem)
	})
}

function removeElem() {
	main.removeChild(this);
	dropDownBuilder();
}

function dropDownBuilder() {
	eleMaker.innerHTML = "";
	nodeListener = document.querySelectorAll("#main >*");
	nodeListener.forEach((item, idx) => {
		let opt = document.createElement("option");
		opt.value = idx;
		opt.innerHTML = item.tagName;
		eleMaker.appendChild(opt);
	});
}