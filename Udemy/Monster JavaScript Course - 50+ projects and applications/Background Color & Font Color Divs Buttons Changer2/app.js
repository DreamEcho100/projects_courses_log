const inp = document.querySelector('input');
const btn = document.querySelector('button');
inp.addEventListener("keypress", (e) => {
    console.log(e);
    console.log(e.value);
    console.dir(e);
    console.dir(e.value);
    document.querySelector('h1').textContent = inp.value;
    (inp.value.length > 5) ? inp.style.backgroundColor = 'red': inp.style.backgroundColor = 'white';
    if (e.keyCode === 13 && inp.value.length > 1) {
        changeBackground();
    }
})

btn.addEventListener("click", changeBackground);

function changeBackground() {
    document.querySelector('h1').style.backgroundColor = `rgb(${randomNum(255)}, ${randomNum(255)}, ${randomNum(255)})`;
}

function randomNum(number) {
    return Math.floor(Math.random() * (number + 1))
};