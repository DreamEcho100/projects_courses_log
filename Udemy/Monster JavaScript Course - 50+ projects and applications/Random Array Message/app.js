const myArray = ['Hello', 'Welcome', 'Greetings'];
const temp = randomItem(myArray);
const h1 = document.getElementById('Greet');
const message = document.createTextNode(temp);

h1.appendChild(message);

function randomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}