const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll("input[type='range']");
const currentHexes = document.querySelectorAll(".color h2");
const popup = document.querySelector(".copy-container");
const adjustBtns = document.querySelectorAll(".adjust");
const locktBtns = document.querySelectorAll(".lock");
const closeAdjustments = document.querySelectorAll(".close-adjustment");
const slidersContainers = document.querySelectorAll(".sliders")
let initialColors;

let savedPalettes = [];

generateBtn.addEventListener("click", randomColors);
sliders.forEach( slider => {
	slider.addEventListener("input", hslControls);
} );
colorDivs.forEach( (div, idx) => {
	div.addEventListener("change", () => {
		updateTxtUI(idx);
	} );
} );
currentHexes.forEach( (hex) => {
	hex.addEventListener("click", () => {
		copyToClipboard(hex);
	} );
} );
popup.addEventListener("transitionend", () => {
	if (popup.classList.contains("active")) {
		const popupBox = popup.children[0];
		popup.classList.remove("active");
		popupBox.classList.remove("active");
	}
} );
locktBtns.forEach( (btn, idx) => {
	btn.addEventListener("click", (e) => {
		lockLayer(e, idx);
	} );
} );
/*
[adjustBtns, closeAdjustments].forEach( item => {
	item.forEach( (btn, idx) => {
		btn.addEventListener("click", () => {
			AdjustPanelStats(idx);
		} );
	} );
} );
*/
adjustBtns.forEach( (btn, idx) => {
	btn.addEventListener("click", () => {
		AdjustPanelStats(idx);
	} );
	closeAdjustments[idx].addEventListener("click", () => {
		AdjustPanelStats(idx);
	} );
} );


function generateHex() {
	return chroma.random().hex();
	//return `#${Math.random().toString(16).substr(-6)}`;
};

function randomColors() {
	initialColors = [];
	colorDivs.forEach( (div, idx) => {
		const hexTxt = div.children[0];
		let randomColor;

		if (div.classList.contains("locked")) {
			initialColors.push(hexTxt.innerText);
			return;
		} else {
			randomColor = generateHex();
			initialColors.push(chroma(randomColor).hex());
		}

		div.style.backgroundColor = randomColor;
		hexTxt.innerText = randomColor;

		//initialColors.push(hexTxt.innerText);

		checkTextConstrast(randomColor, hexTxt);

		const color = chroma(randomColor);
		const sliders = div.querySelectorAll('.sliders input');
		const hue = sliders[0];
		const brightness = sliders[1];
		const saturation = sliders[2];

		colorizeSliders(color, hue, brightness, saturation);

	} );
	
	resetInputs();

	adjustBtns.forEach( (btn, idx) => {
		checkTextConstrast(initialColors[idx], btn);
		checkTextConstrast(initialColors[idx], locktBtns[idx]);
	} );
}

function checkTextConstrast(color, txt) {
	const luminance = chroma(color).luminance()
	txt.style.color = luminance > 0.5 ? "black" : "white";
}

function colorizeSliders(color, hue, brightness, saturation) {
	const noSat = color.set("hsl.s", 0);
	const fullSat = color.set("hsl.s", 1);
	const scaleSat = chroma.scale([noSat, color, fullSat]);

	const midBright = color.set("hsl.l", 0.5);
	const scaleBright = chroma.scale(["black", midBright, "white"]);

	saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
	brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`;
	hue.style.backgroundImage = `linear-gradient(to right, 
	rgb(204, 75, 75), 
	rgb(204, 204, 75), 
	rgb(75, 204, 75),
	rgb(75, 204, 204), 
	rgb(75, 75, 204), 
	rgb(204, 75, 204), 
	rgb(204, 75, 75)`;

}

function hslControls(e) {
	const idx = e.target.getAttribute("data-bright") ||
				e.target.getAttribute("data-sat") ||
				e.target.getAttribute("data-hue");
	
	let sliders = e.target.parentElement.querySelectorAll("input[type='range']");

	const hue = sliders[0];
	const brightness = sliders[1];
	const saturation = sliders[2];

	const bgColor = initialColors[idx];

	let color = chroma(bgColor)
	.set('hsl.s', saturation.value)
	.set('hsl.l', brightness.value)
	.set('hsl.h', hue.value);

	colorDivs[idx].style.backgroundColor = color;

	colorizeSliders(color, hue, brightness, saturation);
}

function updateTxtUI(idx) {
	const activeDiv = colorDivs[idx];
	const color = chroma(activeDiv.style.backgroundColor);
	const txtHex = activeDiv.querySelector("h2");
	const icons = activeDiv.querySelectorAll(".control button");
	txtHex.innerText = color.hex();

	checkTextConstrast(color, txtHex);
	for (icon of icons) {
		checkTextConstrast(color, icon);
	}

	
	checkTextConstrast(color, adjustBtns[idx]);
	checkTextConstrast(color, currentHexes[idx]);
	checkTextConstrast(color, locktBtns[idx]);
}

function resetInputs() {
	const sliders = document.querySelectorAll(".sliders input");
	sliders.forEach( slider => {
		if (slider.parentElement.parentElement.classList.contains("locked")) {
			return;
		} else if (slider.name === 'hue') {
			const hueColor = initialColors[slider.getAttribute('data-hue')];
			const hueValue = chroma(hueColor).hsl()[0];
			slider.value = Math.floor(hueValue);//.toFixed(2);
		} else if (slider.name === 'brightness') {
			const brightColor = initialColors[slider.getAttribute('data-bright')];
			const brightValue = chroma(brightColor).hsl()[2];
			slider.value = brightValue.toFixed(2);
		} else if (slider.name === 'saturation') {
			const satColor = initialColors[slider.getAttribute('data-sat')];
			const satValue = chroma(satColor).hsl()[1];
			slider.value = satValue.toFixed(2);
		}
	} );
}

function copyToClipboard(hex) {
	const el = document.createElement("textarea");
	el.value = hex.innerText;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);

	const popupBox = popup.children[0];
	popup.classList.add("active");
	popupBox.classList.add("active");
	setTimeout(() => {
		if (popup.classList.contains("active")) {
			const popupBox = popup.children[0];
			popup.classList.remove("active");
			popupBox.classList.remove("active");
		}
	}, 550);
}

function AdjustPanelStats(idx) {
	slidersContainers[idx].classList.toggle("active");
}

function lockLayer(e, idx) {
	const lockSVG = e.target.children[0];
	const activeBg = colorDivs[idx];
	activeBg.classList.toggle("locked");

	if (lockSVG.classList.contains("fa-lock-open")) {
		e.target.innerHTML = "<i class='fas fa-lock'></i>";
	} else {
		e.target.innerHTML = "<i class='fas fa-lock-open'></i>";
	}
  
}

const saveBtn = document.querySelector(".save");
const submitSave = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInp = document.querySelector(".save-container input");
const libraryContainer = document.querySelector(".library-popup");
const libraryBtn = document.querySelector(".library");
const closelibrary = document.querySelector(".close-library");

saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);

libraryBtn.addEventListener("click", openLibrary);
closelibrary.addEventListener("click", closeLibrary);

function openPalette(e) {
	const popup = saveContainer.children[0];
	saveContainer.classList.add("active");
	popup.classList.add("active");
}
function closePalette(e) {
	const popup = saveContainer.children[0];
	saveContainer.classList.remove("active");
	popup.classList.remove("active");
}
function savePalette(e) {
	saveContainer.classList.remove("active");
	popup.classList.remove("active");
	const name = saveInp.value;
	const colors = [];
	currentHexes.forEach( hex => {
		colors.push(hex.innerText);
	} );

	let paletteNum = savedPalettes.length;
	const paletteObj = {name, colors, paletteNum};
	savetoLocal(paletteObj)
	saveInp.value = "";

	buildingPalettes(paletteObj);

}

function buildingPalettes(obj) {
	savedPalettes.push(obj);

	const palette = document.createElement("div");
	palette.classList.add("custom-palette");
	libraryContainer.appendChild(palette);

	const title = document.createElement("h4");
	title.innerText = obj.name;
	palette.appendChild(title);

	const preview = document.createElement("div");
	preview.classList.add("small-preview");
	obj.colors.forEach( smallColor => {
		const smallDiv = document.createElement("div");
		smallDiv.style.backgroundColor = smallColor;
		preview.appendChild(smallDiv);
	} );
	palette.appendChild(preview);

	const paletteBtn = document.createElement("button");
	paletteBtn.classList.add(obj.paletteNum);
	paletteBtn.classList.add("pick-palette-btn");
	paletteBtn.innerText = "select";
	paletteBtn.addEventListener( "click", e => {
		closeLibrary();
		const paletteIdx = e.target.classList[0];
		initialColors = [];
		savedPalettes[paletteIdx].colors.forEach( (color, idx) => {
			initialColors.push(color);
			colorDivs[idx].style.backgroundColor = color;
			const txt = colorDivs[idx].children[0];
			checkTextConstrast(color, txt);
			updateTxtUI(idx);
		} );
		resetInputs();
	} );
	palette.appendChild(paletteBtn);
}

function savetoLocal(paletteObj) {
	let localPalettes = localCheck("coloorsPalettes");
	localPalettes.push(paletteObj);
	localStorage.setItem("coloorsPalettes", JSON.stringify(localPalettes));
}


function openLibrary() {
	const popup = libraryContainer.parentElement;
	libraryContainer.classList.add("active");
	popup.classList.add("active");
}
function closeLibrary() {
	const popup = libraryContainer.parentElement;
	libraryContainer.classList.remove("active");
	popup.classList.remove("active");
}

function localCheck(name) {
	if (localStorage.getItem(name) === null) {
		return [];
	} else {
		return JSON.parse(localStorage.getItem(name));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let localPalettes = localCheck("coloorsPalettes");
	localPalettes.forEach( obj => buildingPalettes(obj) );
});

randomColors();