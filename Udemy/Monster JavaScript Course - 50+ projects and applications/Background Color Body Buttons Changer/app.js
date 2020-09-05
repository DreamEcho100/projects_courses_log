let btn = document.querySelectorAll('button');
let body = document.querySelector('body');

let btns = document.querySelectorAll('button');
for (let i = 0; i < btns.length; i++) {
    console.log(btns[i])
    btns[i].addEventListener('click', (e) => {
	    body.style.backgroundColor = `rgb(${randomNum(255)}, ${randomNum(255)}, ${randomNum(255)})`;
	    console.log(e.target)
	    }
	)
}
function randomNum(number) {
    return Math.floor(Math.random() * (number + 1) )
};