//const  let document querySelector querySelectorAll addEventListener keyCode textContent innerText innerHTML getElementById style backgroundColor length color 
const btn1 = document.querySelector(".button1");
const output1 = document.querySelector(".output1");
btn1.addEventListener("click", () => {
	const inp = document.getElementById("input1");
	let name = inp.value;
	if (name !== "") {
		output1.innerHTML = `<h1>Hello and welcome to our Homepage, ${name}.</h1>`;
	}
})

//
const btn2 = document.querySelector(".button2");
const output2 = document.querySelector(".output2");

btn2. addEventListener("click", () =>{
	const cost = document.querySelector(".input2");
	let tip = (cost.value * 0.15).toFixed(2);
	output2.innerHTML = `<h1>You should tip $${tip} on $${cost.value}.</h1>`;
})