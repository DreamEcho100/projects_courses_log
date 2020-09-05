const h1 = document.getElementById('dateh1');
/*
let currentDateh1 = new Date();
let dateh1 = document.createTextNode(currentDateh1);
h1.appendChild(dateh1);
*/
const h2 = document.getElementById('dateh2');
/*
let currentDateh2 = new Date().toDateString();
let dateh2 = document.createTextNode(currentDateh2);
h2.appendChild(dateh2);
*/
const birthday = new Date(/*1980, 8, 4*/2020, 4, 12);
console.log(birthday.getTime())
setInterval(() => {
    h2.innerText = new Date();
    h1.innerText = new Date().toDateString();
}, 1000)
1