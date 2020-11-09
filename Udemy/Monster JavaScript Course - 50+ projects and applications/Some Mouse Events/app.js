const ul = document.getElementById("firstList");
const li = ul.querySelectorAll("li");
const button = ul.querySelectorAll("button");
const mainBTN = document.getElementById('mainBTN')

for (let i = 0; i < button.length; i++) {
	button[i].style.backgroundColor = 'black';
}

mainBTN.addEventListener('mouseenter', () => {
	for (let i = 0; i < li.length; i++) {
		setTimeout(() => {
			li[i].style.color = 'red';
			setTimeout(() => {
				li[i].style.color = 'black';
			}, 1000)
		},(i + 1) * 1000)
	}
	for (let i = 0; i < button.length; i++) {
		setTimeout(() => {
			button[i].style.backgroundColor = 'red';
			setTimeout(() => {
				button[i].style.backgroundColor = 'black';
			}, 1000)
		},(i + 1) * 1000)
	}
})

function listFunctions(elem) {
	for (let  i = 0; i < li.length; i++) {
		console.log(elem[i]);
		elem[i].addEventListener('mouseenter', () => {
			elem[i].style.color = "red";
			elem[i].style.backgroundColor = "yellow";
		})
		elem[i].addEventListener('mouseout', () => {
			elem[i].style.color = "";
			elem[i].style.backgroundColor = "";
		})
		if (elem === button) {
				elem[i].addEventListener('mouseenter', () => {
				elem[i].style.color = "red";
				elem[i].style.backgroundColor = "";
			})
			elem[i].addEventListener('mouseout', () => {
				elem[i].style.color = "";
				elem[i].style.backgroundColor = "black";
			})
		}
	}
}

listFunctions(li);
listFunctions(button);