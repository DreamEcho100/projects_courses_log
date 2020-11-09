const inp = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');
let ulList  = ul.querySelectorAll('li');

//
for (var i = 0; i < ulList.length; i++) {
    let current = ulList[i];
    current.addEventListener('click', myList);
}
//
btn.addEventListener('click', () => {
	makeNew();
})
inp.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		makeNew();
	}
})
//
function myList() {
    let temp1 = this.classList.toggle('checked');
    //
    if (temp1) {
        let span = document.createElement("span");
        span.textContent = " X ";
        let temp2 = span.classList.toggle("red");
        span.addEventListener('click', () => {
            span.parentElement.remove();
        })
        this.appendChild(span);
    } else {
        this.getElementsByTagName('span')[0].remove();
    }

}
//
function makeNew() {
    let newLi = document.createElement('li');
    let temp = inp.value;
    let inpText = document.createTextNode(temp);
    newLi.appendChild(inpText);
    ul.appendChild(newLi);
    newLi.addEventListener('click', myList);
}






























/*
for (var i = 0; i < ulList.length; i++) {
    let current = ulList[i];
    current.addEventListener('click', () => {
        let temp1 = current.classList.toggle('checked');
        //
        if (temp1) {
	        let span = document.createElement("span");
	        span.textContent = " X ";
	        let temp2 = span.classList.toggle("red");
	        span.addEventListener('click', () => {
	            span.parentElement.remove()
	        })
	        current.appendChild(span);
        } else {
            current.getElementsByTagName('span')[0].remove();
        }
    })
}
//
btn.addEventListener('click', () => {
    let newLi = document.createElement('li');
    let temp = inp.value;
    let inpText = document.createTextNode(temp);
    newLi.appendChild(inpText);
    ul.appendChild(newLi);
})
*/