let btn = document.querySelectorAll('button');
let body = document.querySelector('body');
let divs = document.querySelectorAll('div');

for (let i = 0; i < divs.length; i++) {
    divs[i].textContent = `div${i + 1} = ${divs[i]}`;
    divs[i].classList.toggle('div');
    divs[i].style.margin = '5px';
    divs[i].style.padding = '5px';
    divs[i].style.height = '25%';
    divs[i].addEventListener('click', (e) => {
	    divs[i].style.backgroundColor = `rgb(${randomNum(255)}, ${randomNum(255)}, ${randomNum(255)})`;
	    divs[i].style.color = `rgb(${randomNum(255)}, ${randomNum(255)}, ${randomNum(255)})`;
	    console.log(e.target)
	    }
	)
}

function randomNum(number) {
    return Math.floor(Math.random() * (number + 1) )
};