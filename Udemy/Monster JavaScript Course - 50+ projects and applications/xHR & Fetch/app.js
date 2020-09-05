let xHR = new XMLHttpRequest();
console.log(xHR);
const url  = "https://api.chucknorris.io/jokes/random";
console.log(url);

xHR.onreadystatechange = function() {
    console.log(xHR.readyState);
    if (xHR.readyState === 4 && xHR.status === 200) {
        console.log(xHR.response);
        let joke = JSON.parse(xHR.response);
        console.log(joke.value);
        document.getElementById('div1').innerHTML = `${joke.value} <br> <img src="${joke.icon_url}">`;
    }
}

xHR.open('GET', url);
xHR.send();
console.log(xHR);

//

const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", getInput);

function getInput() {
	fetch(url)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		console.log(data.results);
		document.getElementById('div2').innerHTML = `${data.value} <br>`;
		//<img src="${joke.icon_url}">
	})
}

const url2 = "https://randomuser.me/api/";
const elem = document.getElementById('input');
const btn2 = document.getElementById("btn2");
const output = document.getElementById('div3');

elem.setAttribute('type', 'number');
elem.setAttribute('value', 5);

btn2.addEventListener('click', getUsers);

function getUsers() {
	//debugger;
	let temp = `${url2}?results=${Number(elem.value)}`;
	fetch(temp)
	.then(function(rep){
		return rep.json();
	})
	.then(function(data){
		console.log(data.results);
		let html = '';
		for (let i = 0; i < data.results.length; i++) {
			console.log(data.results[i]);
			html += `${data.results[i].name.first} ${data.results[i].name.last}<br>`;
		}
		output.innerHTML = html;
	})
}

//

const output2 = document.getElementById('div4');
const url3 = "https://jsonplaceholder.typicode.com/todos";

loadJSON();

function loadJSON() {
	fetch(url3)
	.then(function(res){
		return res.json();
	})
	.then(function(data){
		console.log(data);
		for (let i = 0; i < data.length; i++){
			let divx = document.createElement("div");
			divx.style.color = data[i].completed ? "green" : "red";
			divx.textContent = `${data[i].id}.${data[i].title}`; 
			output2.appendChild(divx);
		}
	})
}