const ul = document.querySelector('ul');
const inp = document.querySelector('input')
const ulList = ul.querySelectorAll('li');


inp.addEventListener('keydown', (e) => {
	console.log(e);
    let li = document.createElement('li');
    let temp = `${e.key}(${e.keyCode})`
    let liText = document.createTextNode(temp);
    li.appendChild(liText);
    ul.appendChild(li); 
    for (let  i = 0; i < ulList.length; i++) {
	console.log(ulList[i]);
	ulList[i].addEventListener('mouseenter', () => {
		ulList[i].style.color = "red";
		ulList[i].style.backgroundColor = "yellow";
	})
	ulList[i].addEventListener('mouseout', () => {
		ulList[i].style.color = "";
		ulList[i].style.backgroundColor = "";
	})
}   
})
/*

*/