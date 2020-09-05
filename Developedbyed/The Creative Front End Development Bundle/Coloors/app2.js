class Coloors {
	constructor(){
		this.colorDivs = document.querySelectorAll(".color");
		this.generateBtn = document.querySelector(".generate");
		this.sliders = document.querySelectorAll("input[type='range']");
		this.currentHexes = document.querySelectorAll(".color h2");
		this.popup = document.querySelector(".copy-container");
		this.adjustBtns = document.querySelectorAll(".adjust");
		this.locktBtns = document.querySelectorAll(".lock");
		this.closeAdjustments = document.querySelectorAll(".close-adjustment");
		this.slidersContainers = document.querySelectorAll(".sliders");
		this.initialColors;
		this.savedPalettes = [];
		//--------------------------------------------------------------------------------------//
		this.saveBtn = document.querySelector(".save");
		this.submitSave = document.querySelector(".submit-save");
		this.closeSave = document.querySelector(".close-save");
		this.saveContainer = document.querySelector(".save-container");
		this.saveInp = document.querySelector(".save-container input");
		this.libraryContainer = document.querySelector(".library-popup");
		this.libraryBtn = document.querySelector(".library");
		this.closelibrary = document.querySelector(".close-library");

	}

	init() {
		let localPalettes = this.localCheck("coloorsPalettes");
		localPalettes.forEach( obj => this.buildingPalettes(obj) );
	}

	randomColors(obj) {
		obj.initialColors = [];
		obj.colorDivs.forEach( (div, idx) => {
			const hexTxt = div.children[0];
			let randomColor;

			if (div.classList.contains("locked")) {
				obj.initialColors.push(hexTxt.innerText);
				return;
			} else {
				randomColor = obj.generateHex();
				obj.initialColors.push(chroma(randomColor).hex());
			}

			div.style.backgroundColor = randomColor;
			hexTxt.innerText = randomColor;

			//obj.initialColors.push(hexTxt.innerText);

			obj.checkTextConstrast(randomColor, hexTxt);

			const color = chroma(randomColor);
			const sliders = div.querySelectorAll('.sliders input');
			const hue = sliders[0];
			const brightness = sliders[1];
			const saturation = sliders[2];

			obj.colorizeSliders(color, hue, brightness, saturation);

		} );
		
		obj.resetInputs();

		obj.adjustBtns.forEach( (btn, idx) => {
			obj.checkTextConstrast(obj.initialColors[idx], btn);
			obj.checkTextConstrast(obj.initialColors[idx], obj.locktBtns[idx]);
		} );
	}

	generateHex() {
		return chroma.random().hex();
		//return `#${Math.random().toString(16).substr(-6)}`;
	};

	checkTextConstrast(color, txt) {
		const luminance = chroma(color).luminance()
		txt.style.color = luminance > 0.5 ? "black" : "white";
	}

	colorizeSliders(color, hue, brightness, saturation) {
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

	resetInputs() {
		const sliders = document.querySelectorAll(".sliders input");
		sliders.forEach( slider => {
			if (slider.parentElement.parentElement.classList.contains("locked")) {
				return;
			} else if (slider.name === 'hue') {
				const hueColor = this.initialColors[slider.getAttribute('data-hue')];
				const hueValue = chroma(hueColor).hsl()[0];
				slider.value = Math.floor(hueValue);//.toFixed(2);
			} else if (slider.name === 'brightness') {
				const brightColor = this.initialColors[slider.getAttribute('data-bright')];
				const brightValue = chroma(brightColor).hsl()[2];
				slider.value = brightValue.toFixed(2);
			} else if (slider.name === 'saturation') {
				const satColor = this.initialColors[slider.getAttribute('data-sat')];
				const satValue = chroma(satColor).hsl()[1];
				slider.value = satValue.toFixed(2);
			}
		} );
	}

	hslControls(e) {
		const idx = e.target.getAttribute("data-bright") ||
					e.target.getAttribute("data-sat") ||
					e.target.getAttribute("data-hue");
		
		let sliders = e.target.parentElement.querySelectorAll("input[type='range']");

		const hue = sliders[0];
		const brightness = sliders[1];
		const saturation = sliders[2];

		const bgColor = this.initialColors[idx];

		let color = chroma(bgColor)
		.set('hsl.s', saturation.value)
		.set('hsl.l', brightness.value)
		.set('hsl.h', hue.value);

		this.colorDivs[idx].style.backgroundColor = color;

		this.colorizeSliders(color, hue, brightness, saturation);
	}

	updateTxtUI(idx) {
		const activeDiv = this.colorDivs[idx];
		const color = chroma(activeDiv.style.backgroundColor);
		const txtHex = activeDiv.querySelector("h2");
		const icons = activeDiv.querySelectorAll(".control button");
		txtHex.innerText = color.hex();

		this.checkTextConstrast(color, txtHex);
		for (icon of icons) {
			this.checkTextConstrast(color, icon);
		}

		
		this.checkTextConstrast(color, this.adjustBtns[idx]);
		this.checkTextConstrast(color, this.currentHexes[idx]);
		this.checkTextConstrast(color, this.locktBtns[idx]);
	}

	copyToClipboard(hex) {
		const el = document.createElement("textarea");
		el.value = hex.innerText;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);

		const popupBox = this.popup.children[0];
		this.popup.classList.add("active");
		popupBox.classList.add("active");
		setTimeout(() => {
			if (this.popup.classList.contains("active")) {
				const popupBox = this.popup.children[0];
				this.popup.classList.remove("active");
				popupBox.classList.remove("active");
			}
		}, 550);
	}

	lockLayer(e, idx) {
		const lockSVG = e.target.children[0];
		const activeBg = this.colorDivs[idx];
		activeBg.classList.toggle("locked");

		if (lockSVG.classList.contains("fa-lock-open")) {
			e.target.innerHTML = "<i class='fas fa-lock'></i>";
		} else {
			e.target.innerHTML = "<i class='fas fa-lock-open'></i>";
		}
	  
	}

	AdjustPanelStats(idx) {
		this.slidersContainers[idx].classList.toggle("active");
	}

	//--------------------------------------------------------------------------------------//

	openPalette() {
		const popup = this.saveContainer.children[0];
		this.saveContainer.classList.add("active");
		popup.classList.add("active");
	}
	closePalette() {
		const popup = this.saveContainer.children[0];
		this.saveContainer.classList.remove("active");
		popup.classList.remove("active");
	}
	savePalette() {debugger;
		this.saveContainer.classList.remove("active");
		this.popup.classList.remove("active");
		const name = this.saveInp.value;
		const colors = [];
		this.currentHexes.forEach( hex => {
			colors.push(hex.innerText);
		} );

		let paletteNum = this.savedPalettes.length;
		const paletteObj = {name, colors, paletteNum};
		this.savetoLocal(paletteObj)
		this.saveInp.value = "";

		this.buildingPalettes(paletteObj);

	}

	buildingPalettes(obj) {
		this.savedPalettes.push(obj);

		const palette = document.createElement("div");
		palette.classList.add("custom-palette");
		this.libraryContainer.appendChild(palette);

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
			this.closeLibrary();
			const paletteIdx = e.target.classList[0];
			this.initialColors = [];
			this.savedPalettes[paletteIdx].colors.forEach( (color, idx) => {
				this.initialColors.push(color);
				this.colorDivs[idx].style.backgroundColor = color;
				const txt = this.colorDivs[idx].children[0];
				this.checkTextConstrast(color, txt);
				this.updateTxtUI(idx);
			} );
			this.resetInputs();
		} );
		palette.appendChild(paletteBtn);
	}

	savetoLocal(paletteObj) {
		let localPalettes = this.localCheck("coloorsPalettes");
		localPalettes.push(paletteObj);
		localStorage.setItem("coloorsPalettes", JSON.stringify(localPalettes));
	}


	openLibrary() {
		const popup = this.libraryContainer.parentElement;
		this.libraryContainer.classList.add("active");
		popup.classList.add("active");
	}
	closeLibrary() {
		const popup = this.libraryContainer.parentElement;
		this.libraryContainer.classList.remove("active");
		popup.classList.remove("active");
	}

	localCheck(name) {
		if (localStorage.getItem(name) === null) {
			return [];
		} else {
			return JSON.parse(localStorage.getItem(name));
		}
	}

}

const coloors = new Coloors();
coloors.randomColors(coloors);

coloors.generateBtn.addEventListener("click", () => {
	coloors.randomColors(coloors);
});
coloors.sliders.forEach( slider => {
	slider.addEventListener("input", (e) => {
		coloors.hslControls(e);
	});
} );
coloors.colorDivs.forEach( (div, idx) => {
	div.addEventListener("change", () => {
		coloors.updateTxtUI(idx);
	} );
} );
coloors.currentHexes.forEach( (hex) => {
	hex.addEventListener("click", () => {
		coloors.copyToClipboard(hex);
	} );
} );
coloors.popup.addEventListener("transitionend", () => {
	if (coloors.popup.classList.contains("active")) {
		const popupBox = coloors.popup.children[0];
		coloors.popup.classList.remove("active");
		popupBox.classList.remove("active");
	}
} );
coloors.locktBtns.forEach( (btn, idx) => {
	btn.addEventListener("click", (e) => {
		coloors.lockLayer(e, idx);
	} );
} );
coloors.adjustBtns.forEach( (btn, idx) => {
	btn.addEventListener("click", () => {
		coloors.AdjustPanelStats(idx);
	} );
	coloors.closeAdjustments[idx].addEventListener("click", () => {
		coloors.AdjustPanelStats(idx);
	} );
} );

//--------------------------------------------------------------------------------------//
coloors.saveBtn.addEventListener("click", () => {
	coloors.openPalette();
} );
coloors.closeSave.addEventListener("click", () => {
	coloors.closePalette();
} );
coloors.submitSave.addEventListener("click", () => {
	coloors.savePalette();
} );

coloors.libraryBtn.addEventListener("click", () => {
	coloors.openLibrary();
} );
coloors.closelibrary.addEventListener("click", () => {
	coloors.closeLibrary();
} );

coloors.init();
