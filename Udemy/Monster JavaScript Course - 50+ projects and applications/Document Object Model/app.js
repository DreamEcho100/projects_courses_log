const rep = document.querySelectorAll(".copyMe");
const garbage = document.querySelector("#garbage")
console.log(rep);
let holder = {};

rep.forEach(function(elem, idx) {
	console.log(elem);
	console.log(idx);
	elem.style.left = `${idx * 100}px`;
	elem.addEventListener("click", function(e) {
		console.log(e);
		holder.obj = elem.cloneNode(true);
		holder.obj.style.cursor = "move";
        holder.obj.innerHTML = `<a href="http://thecatapi.com"><img src="http://thecatapi.com/api/images/get?format=src&type=gif"></a>`;
		holder.obj.classList.add("newb");
	    holder.obj.style.backgroundColor = ranColor();
	    holder.obj.style.color = ranColor();
	    holder.obj.style.left = elem.offsetLeft  + "px";
	    holder.obj.style.top = elem.offsetTop + 200 + "px";

	    holder.obj.startX = elem.offsetLeft;
	    holder.obj.startY = elem.offsetTop;
	    holder.obj.moves = Math.floor(Math.random() * 25) + 10;
	    holder.obj.int = setInterval(mover, 25);

	    function mover() {
	    	if (holder.obj.moves <= 0) {
	    		clearInterval(holder.obj.int);
	    	} else {
	    		holder.obj.moves--;
	    		holder.obj.startY += 10;
	    		holder.obj.startX += 1;
	    		holder.obj.style.top = `${holder.obj.startY}px`;
	    		holder.obj.style.left = `${holder.obj.startX}px`;
	    	}
	    	crashingPossibility(holder.obj, garbage);
	    }

	    document.body.appendChild(holder.obj);
	    drager(holder.obj);
	    console.log(holder.obj);
	})
})

let zIdx = 0;
function drager(el) {
	let pos = {};
	el.onmousedown = dragMouse;
	function dragMouse(e) {
		pos.nx = e.clientX;
		pos.ny = e.clientY;
		el.style.zIndex = zIdx;
		console.log(pos.nx, pos.ny);
		document.onmouseup = function () {
			zIdx++;
			document.onmouseup = null;
			document.onmousemove = null;
		}
		document.onmousemove = function (e) {
			pos.ox = pos.nx - e.clientX;
			pos.oy = pos.ny - e.clientY;
			pos.nx = e.clientX;
			pos.ny = e.clientY;

			crashingPossibility(el, garbage);

			el.style.top = `${el.offsetTop - pos.oy}px`;
			el.style.left = `${el.offsetLeft - pos.ox}px`;
		}
	}
}

function crashingPossibility(a, b) {
	if (!(isCoolide(a, b))) {
				a.onmousedown = null;
				a.parentElement.removeChild(a);
			}
}

function isCoolide(a, b) {
	let aRect = a.getBoundingClientRect();
	let bRect = b.getBoundingClientRect();

	return ((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function ranColor() {
	function c(num) {
		let hex = Math.floor(Math.random() * num).toString(16).substr(-2);
		return (hex.length === 2) ? hex : c(num);

	}
	
	return `#${c(256)}${c(256)}${c(256)}`
}

/*
<div class="container">
  <h1>Welcome To Random Cat Pictures</h1>
   <img id="photo" src="https://thecatapi.com/api/images/get?format=src&type=gif" alt="">
  <button id="btn">Get Random Cat!</button>
</div>

var btn = document.querySelector("#btn");
var img = document.querySelector("#photo");

btn.addEventListener("click", function() {
  var XHR = new XMLHttpRequest();
  
  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      img.src = JSON.parse(XHR.responseText).file;  
    }
  }
  XHR.open("GET", "https://aws.random.cat/meow");
  XHR.send();
});
*/