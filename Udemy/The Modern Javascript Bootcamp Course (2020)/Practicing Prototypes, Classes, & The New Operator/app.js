const colorTxtInp = document.getElementById("colorTxtInp");
const fromColorType = document.getElementById("fromColorType");
const toColorType = document.getElementById("toColorType");
const btnConvertAndAddToList = document.getElementById("btnConvertAndAddToList");
const colorsLisT = document.getElementById("colorsLisT");

document.addEventListener("DOMContentLoaded", () => setupColorTxtInp(fromColorType.value) );
btnConvertAndAddToList.addEventListener("click", colorValueConverter );

function setupColorTxtInp(type) {
	colorTxtInp.innerHTML = "";
	if (type === "rgb") {
		const attributes = [
			["type", "text"],
			["minlength", "1"],
			["maxlength", "3"]
		];
		let inp, i;
		for (i = 0; i < 3; i++) {
			inp = document.createElement("input");
			attributes.map( item => inp.setAttribute(item[0], item[1]) );
			colorTxtInp.appendChild(inp);
			inp.setAttribute("id", `inp-${i}`)
			let target = document.getElementById(`inp-${i}`);
			target.addEventListener("change", () => inpCheker(target, "rgb"));
		}
	} else if (type === "hex") {
		const attributes = [
			["type", "text"],
			["minlength", "1"],
			["maxlength", "2"]
		];
		let inp, i;
		for (i = 0; i < 3; i++) {
			inp = document.createElement("input");
			attributes.map( (item, idx) => {
				inp.setAttribute(item[0], item[1])
			} );
			colorTxtInp.appendChild(inp);
			inp.setAttribute("id", `inp-${i}`)
			let target = document.getElementById(`inp-${i}`);
			target.addEventListener("change", () => inpCheker(target, "hex"));
		}
	}
}

function inpCheker(item, type) {//debugger
	let tempNum;
	if (type === "rgb") {
		tempNum = Number(item.value);
		if (tempNum < 0 || /[^\d]/.test(tempNum)) {
			item.value = 0;
		} else if (tempNum > 255) {
			item.value = 255;
		}
	} else if (type === "hex") {
		tempNum = item.value;
		if (/[\dabcdef]/.test(tempNum)) {
			if (/[^\dabcdef]/.test(tempNum)) {
				item.value = "ff";
			}
		} else if (/[^\dabcdef]/.test(tempNum)) {
			item.value = 0;
		}
	}
}

fromColorType.addEventListener("change", () => {
	
	fromColor = fromColorType.value;
	if (fromColor === "rgb") {
		setupColorTxtInp("rgb");
	} else if (fromColor === "hex") {
		setupColorTxtInp("hex");
	}
});

function colorValueConverter() {
	color = []
	fromColor = fromColorType.value;
	toColor = toColorType.value;

	colorTxtInp.querySelectorAll("input").forEach( (inp) => {
		color.push(inp.value);
	} );

	let convertedColor =  calcColor(color, fromColor, toColor);

	addToColorsLisT(convertedColor);

}

function calcColor(color, fromColor, toColor) {
	let tempColor;
	switch(fromColor) {
		case "rgb":
			tempColor = new RGBColor(...color);
			break;
		case "hex":
			tempColor = new HEXColor(...color);
			break;
	}

	let tempNewColor;
	switch(toColor) {
		case "rgb":
			tempNewColor = tempColor.rgb();
			break;
		case "hex":
			tempNewColor = tempColor.hex();
			break;
		case "hsl":
			tempNewColor = tempColor.hsl();
	}

	return tempNewColor;
}

function addToColorsLisT(color) {
	let tempLi = document.createElement("li");
	tempLi.innerHTML = `<div class="colorSqOutput" style="background-color: ${color}"></div><span class="colorTxtOutput">${color}</span><span class="deletBtn" onclick="deletFromList(this)">X</span>`;
	colorsLisT.insertAdjacentElement("afterbegin" , tempLi);
}

function deletFromList(item) {
	item.parentElement.parentElement.removeChild(item.parentElement)
}

//|--------------------------------------------------------------------------------------------------------------------------------------------------------|
/*
function RGBColor(r = 0, g = 0, b = 0) {
		this.r = r;
		this.g = g;
		this.b = b;
}

RGBColor.prototype.rgb = function() {
	const {r, g, b} = this;
	return `rgb(${r}, ${g}, ${b})`;
		
}

RGBColor.prototype.hex = function() {
	let {r, g, b} = this;
	[r, g, b] = [Number(r), Number(g), Number(b)];
	return `#${( (1 << 24) + (r << 16) + (g << 8) + b ).toString(16).slice(1)}`;
}
*/
class RGBColor {
	constructor(r = 0, g = 0, b = 0) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	rgb() {
		const {r, g, b} = this;
		return `rgb(${r}, ${g}, ${b})`;
			
	}
	hex() {
		let {r, g, b} = this;
		[r, g, b] = [Number(r), Number(g), Number(b)];
		return `#${( (1 << 24) + (r << 16) + (g << 8) + b ).toString(16).slice(1)}`;
	}
	/*
	hsl() {
		this.calcHSL();
		return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
	}
	*/
	//calcHSL
	hsl() {
		//let { r, g, b } = this;
		let r = this.r ? this.r : 0;
		let g = this.g ? this.g : 0;
		let b = this.b ? this.b : 0;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		/*
		this.h = h;
		this.s = s;
		this.l = l;
		*/
		return `hsl(${h}, ${s}%, ${l}%)`;
	}
	rgbToHsv() {
		//let { r, g, b } = this;
		let r = this.r ? this.r : 0;
		let g = this.g ? this.g : 0;
		let b = this.b ? this.b : 0;
		// Make r, g, and b fractions of 1
		r /= 255, g /= 255, b /= 255;

		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, v = max;

		var d = max - min;
		s = max == 0 ? 0 : d / max;

		if (max == min) {
			h = 0; // achromatic
		} else {
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}

			h /= 6;
		}

		//return [ h, s, v ];
		return `hsv(${h}, ${s}%, ${v}%)`;
	}
}
/*
function HEXColor(p1 = 0, p2 = 0, p3 = 0) {
		this.p1 = p1.length === 1 ? p1 = `${p1}${p1}` : String(p1);
		this.p2 = p2.length === 1 ? p2 = `${p2}${p2}` : String(p2);
		this.p3 = p3.length === 1 ? p3 = `${p3}${p3}` : String(p3);
}

HEXColor.prototype.hex = function() {
	let {p1, p2, p3} = this;
	[p1, p2, p3] = [p1, p2, p3];
	return `#${p1}${p2}${p3}`;
		
}

HEXColor.prototype.rgb = function() {
	let {p1, p2, p3} = this;
	[p1, p2, p3] = [parseInt(p1, 16), parseInt(p2, 16), parseInt(p3, 16)];
	return `rgb(${p1}, ${p2}, ${p3})`;
	//https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html

}
*/

class HEXColor {
	constructor(p1 = 0, p2 = 0, p3 = 0) {
		this.p1 = p1.length === 1 ? p1 = `${p1}${p1}` : String(p1);
		this.p2 = p2.length === 1 ? p2 = `${p2}${p2}` : String(p2);
		this.p3 = p3.length === 1 ? p3 = `${p3}${p3}` : String(p3);
	}
	hex() {
		let {p1, p2, p3} = this;
		[p1, p2, p3] = [p1, p2, p3];
		return `#${p1}${p2}${p3}`;
			
	}
	rgb() {
		let {p1, p2, p3} = this;
		[p1, p2, p3] = [parseInt(p1, 16), parseInt(p2, 16), parseInt(p3, 16)];
		return `rgb(${p1}, ${p2}, ${p3})`;
		//https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html

	}
	/*
	hsl() {
		this.calcHSL();
		return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
	}
	*/
	//calcHSL
	hsl() {
		//let {p1, p2, p3} = this;
		let p1 = this.p1 ? this.p1 : 0;
		let p2 = this.p2 ? this.p2 : 0;
		let p3 = this.p3 ? this.p3 : 0;
		let [r, g, b] = [parseInt(p1, 16), parseInt(p2, 16), parseInt(p3, 16)];
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		/*
		this.h = h;
		this.s = s;
		this.l = l;
		*/
		return `hsl(${h}, ${s}%, ${l}%)`;
	}
}

class HSLColor {
	constructor(h = 0, s = 0, l = 0) {
		this.h = h;
		this.s = s;
		this.l = l;
		this.hsvToRgb();
	}
	hsvToRgb() {
		//let { h, s, l } = this;
		let h = this.h ? this.h / 100 : 0;
		let s = this.s ? this.s / 100 : 0;
		let l = this.l ? this.l / 100 : 0;

		let r, g, b;

		if (s == 0) {
		r = g = b = l; // achromatic
		} else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1/6) return p + (q - p) * 6 * t;
			if (t < 1/2) return q;
			if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;

		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);

		this.r = r;
		this.g = g;
		this.b = b;
		}
	}
}

//|--------------------------------------------------------------------------------------------------------------------------------------------------------|






/*
btnConvertAndAddToList.addEventListener("click", () => {
	color = colorTxtInp.value;
	fromColor = fromColorType.value;
	toColor = toColorType.value;
	console.log(color, fromColor, toColor);
	if (fromColor === rgb) {

	}
})
*/



/*
function makeColor(r = 0, g = 0, b = 0) {
	if ( (typeof r === "number" && r >= 0 && r <= 256) &&
		(typeof g === "number" && g >= 0 && g <= 256) &&
		(typeof b === "number" && b >= 0 && b <= 256)) {
		const color = {};
		color.r = r;
		color.g = g;
		color.b = b;
		color.rgb = function() {
			const {r, g, b} = this;
			// return `rgb(${this.r}, ${this.g}, ${this.b})`;
			return `rgb(${r}, ${g}, ${b})`;
		}
		color.hex = function() {
			const {r, g, b} = this;
			return `#${( (1 << 24) + (r << 16) + (g << 8) + b ).toString(16).slice(1)}`;
		}
		return color
	}
}

let example1 = makeColor(23, 42, 27);
console.log(example1);
console.log(example1.rgb());
console.log(example1.hex());
*/

/*
function Color(r = 0, g = 0, b = 0) {
	if ( (typeof r === "number" && r >= 0 && r <= 256) &&
		(typeof g === "number" && g >= 0 && g <= 256) &&
		(typeof b === "number" && b >= 0 && b <= 256)) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
}

Color.prototype.check = function(r, g, b, a) {
	if ( (typeof r === "number" && r >= 0 && r <= 256) &&
		(typeof g === "number" && g >= 0 && g <= 256) &&
		(typeof b === "number" && b >= 0 && b <= 256)) {
		if (a) {
			return (typeof a === "number" && a >= 0 && a <= 1) ? true : false;
		}
		return true;
	}
	return false;
}

Color.prototype.rgb = function() {
	const {r, g, b} = this;
	if (this.check(r, g, b)) {
		return `rgb(${r}, ${g}, ${b})`;
	} else {
		return false
	}
		
}

Color.prototype.hex = function() {
	const {r, g, b} = this;
	if (this.check(r, g, b)) {
		return `#${( (1 << 24) + (r << 16) + (g << 8) + b ).toString(16).slice(1)}`;
	} else {
		return false
	}
}

Color.prototype.rgba = function(a = 1.0) {
	const {r, g, b} = this;
	if (this.check(r, g, b, a)) {
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	} else {
		return false
	}
}

let example2 = new Color(23, 43, 133);
console.log(example2);
console.log(example2.rgb());
console.log(example2.rgba(0.3));
console.log(example2.hex());
*/

class Color {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.calcHSL();
	}

	check(type, p1, p2, p3, a) {
		if (type === "hsl") {
			[p1, p2, p3] = [this.r, this.g, this.b];
		}
		if ( (type === "rgb" || type === "hsl") &&
			(typeof p1 === "number" && p1 >= 0 && p1 <= 256) &&
			(typeof p2 === "number" && p2 >= 0 && p2 <= 256) &&
			(typeof p3 === "number" && p3 >= 0 && p3 <= 256) ) {
			return true;
		}
		if (type === "a" &&
			typeof p1 === "number" &&
			p1 >= 0 &&
			p1 <= 1 ) {
			return true;
		}
		return false;
	}

	innerRGB() {
		const {r, g, b} = this;
		if (this.check("rgb", r, g, b)) {
			return `rgb(${r}, ${g}, ${b})`;
		} else {
			return false
		}
	}

	rgb() {
		return `${this.innerRGB()}`	;
	}

	rgba(a = 1.0) {
		const {r, g, b} = this;
		if (this.check("a", a)) {
			return `${this.innerRGB()}, ${a})`;
		} else {
			return false
		}
	}

	hex() {
		const {r, g, b} = this;
		if (this.check("rgb", r, g, b)) {
			return `#${( (1 << 24) + (r << 16) + (g << 8) + b ).toString(16).slice(1)}`;
		} else {
			return false
		}
	}

	hsl() {
		if (this.check("hsl")) {
			const {h, s, l} = this;
			return `hsl(${h}, ${s}%, ${l}%)`
		} else {
			return false;
		}
	}

	fullySaturated() {
		if (this.check("hsl")) {
			const {h, l} = this;
			return `hsl(${h}, 100%, ${l}%)`
		} else {
			return false;
		}
	}

	notSaturated() {
		if (this.check("hsl")) {
			const {h, l} = this;
			return `hsl(${h}, 0%, ${l}%)`
		} else {
			return false;
		}
	}

	fullylightened() {
		if (this.check("hsl")) {
			const {h, s} = this;
			return `hsl(${h}, ${s}%, 100%)`
		} else {
			return false;
		}
	}

	notlightened() {
		if (this.check("hsl")) {
			const {h, s} = this;
			return `hsl(${h}, ${s}%, 0%)`
		} else {
			return false;
		}
	}

	opposite() {
		if (this.check("hsl")) {
			const {h, s, l} = this;
			const newHue =(h + 180) % 360;
			return `hsl(${newHue}, ${s}%, ${l}%)`
		} else {
			return false;
		}
	}

	calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		this.h = h;
		this.s = s;
		this.l = l;
	}

}

let example3 = new Color(23, 43, 133);
console.log(example3);
console.log(example3.rgb());
console.log(example3.rgba(0.3));
console.log(example3.hex());
console.log(example3.hsl());
console.log(example3.opposite());
console.log(example3.fullySaturated());
console.log(example3.notSaturated());
console.log(example3.fullylightened());
console.log(example3.notlightened());

let ex;
let bgClrList;

exAndbgClrListGenerator();

let clrsList = [];
let clr;
nextClrNList();	
setInterval(()=> {
	nextClrNList();	
}, 5000);

function nextClrNList(stack) {
	 clr = bgClrList[Math.floor(Math.random() * bgClrList.length)];
	 if (!clrsList.includes(clr) && bgClrList.length !== clrsList.length) {
		clrsList.push(clr);
		document.body.style.backgroundColor = clr;
	 } else if (clrsList.includes(clr) && bgClrList.length !== clrsList.length) {//debugger
	 	// ?  :  ?  : ;
	 	if (!stack) {nextClrNList(1)}
	 	else if (stack === 3) {freshStart();return;}
	 	else {nextClrNList(stack + 1)}
	 } else {
	 	//console.log(bgClrList, clrsList);
 		freshStart();
	 	return;
	 }
}

function exAndbgClrListGenerator() {
	ex = new Color(Math.random() * 256, Math.random() * 256, Math.random() * 256);
	bgClrList = [ex.hsl(), ex.opposite(), ex.fullySaturated(), ex.notSaturated(), ex.fullylightened(), ex.notlightened()];
}

function freshStart() {//debugger
	clrsList = [];
 	exAndbgClrListGenerator();
 	return ;
}











/*
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}
*/
/*
let x = `#loading {
    margin: 0 auto;
    width: 50px;
    height: 50px;
    border: 5px solid #000;
    border-radius: 50%;
    position: relative;
    -webkit-animation: rotating 1s linear infinite;
    -moz-animation: rotating 1s linear infinite;
    -ms-animation: rotating 1s linear infinite;
    -o-animation: rotating 1s linear infinite;
    animation: rotating 1s linear infinite;
}

user agent stylesheet
div {
    display: block;
}
#loading:before {
    content: '';
    display: block;
    position: absolute;
    width: 12px;
    left: 19px;
    top: -5px;
    bottom: -5px;
    background: #fff;
}
#loading:after {
    content: '';
    position: absolute;
    height: 12px;
    top: 19px;
    left: -5px;
    right: -5px;
    background: #fff;
}
0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
}
100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
}`

:root {
    --current-color: #603FAF;
    --current-text-color: #fff;
    --current-color-rectange-one: #AF005E;
    --current-color-rectange-two: #1B6300;
    --current-color-rectange-three: #006B4D;
}

::-webkit-scrollbar-thumb {
    background-color: var(--current-color);
    border-radius: .25rem;
    border: 1px solid #333;
}

::-webkit-scrollbar-track {
    background-color: transparent;
    border: 1px solid #333;
    border-radius: .25rem;
}

.abc:hover, .footerAbc:hover {
    box-shadow: 5px -5px 0 -3px hsl(0,0%,98%), 5px -5px var(--current-color-rectange-one), 10px -10px 0 -3px hsl(0,0%,98%), 10px -10px var(--current-color-rectange-two), 15px -15px 0 -3px hsl(0,0%,98%), 15px -15px var(--current-color-rectange-three);
}

{
	filter: grayscale(100%)
	filter: blur(2px)
	filter: brightness(80%)
	{
		filter: contrast(150%)

		or 

		filter: contrast(1.5)

	}
	filter: hue-rotate(180deg)
	filter: hue-rotate(90deg)
	filter: hue-rotate(-90deg)
	filter: invert(80%)
	filter: opacity(50%)
	filter: saturate(150%)
	filter: sepia(100%)
}
*/