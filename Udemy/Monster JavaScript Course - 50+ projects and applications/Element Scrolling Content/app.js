const inp = document.querySelector("input");
const btn = document.querySelector("button");
const output = document.querySelector(".output");
const cElement = document.getElementById("cElement");
const sElement = document.getElementById("sElement");
let scroller = true;

const content = "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p><p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p><p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.</p><p>Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p><p>Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>";

window.onload = setupScroll;
cElement.addEventListener("mouseenter", scrollSpeed);
cElement.addEventListener("mouseleave", scrollSpeed);

function scrollSpeed(e) {
	scroller = e.type === "mouseenter" ? false : true;
	output.innerHTML = "Mouse stopper";
}

function setupScroll() {
	sElement.innerHTML = content;
	let temp = sElement.getBoundingClientRect();
	console.log(temp);
	cElement.style.height = `${temp.height / 2}px`;
	sElement.style.top = `${cElement.clientHeight}px`//`${temp.height}px`;
	scrollInt = setInterval(scrollingElem,50);
}

inp.addEventListener("change", function(){
	parseInt(inp.value) !== 0 ? scroller = true : false;
})

btn.addEventListener("click", function(){
	scroller ^= true;
	btn.innerHTML = !scroller ? "Srart" : "Click";
})

function scrollingElem() {
	let scrollSpeed = parseInt(inp.value);
    let posY = parseInt(sElement.style.top);
	if (scroller) {
		if( posY + sElement.clientHeight > 0 ){
			sElement.style.top = `${posY - scrollSpeed}px`;
		} else if (scrollSpeed > 0){
			sElement.style.top = `${cElement.clientHeight}px`; 
		}
		if (scrollSpeed < 0 && parseInt(sElement.style.top) > cElement.clientHeight) {
			sElement.style.top = `-${sElement.clientHeight - 1}px`; 
		}
		output.innerHTML =`scrollSpeed ${scrollSpeed} Y position ${posY}\n
							cElement.clientHeight ${cElement.clientHeight}\n
							sElement.clientHeight ${sElement.clientHeight}\n
							`;
	}
}

