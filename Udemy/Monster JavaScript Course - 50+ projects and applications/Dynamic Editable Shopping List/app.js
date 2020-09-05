let myList = ["bananas", "milk", "apples", "eggs", "cake"];
const AddBtn = document.querySelector("#addNew");
const output = document.querySelector(".output");
const newItem = document.querySelector("#addItem");

window.onload = build;

AddBtn.addEventListener("click", function () {
	if (newItem.value) {
		myList.push(newItem.value);
		build();
		newItem.value = "";
	}
})

function build() {
	output.innerHTML ="<h2>My List</h2>";
	const tbl = document.createElement("table");

	for (let i = 0; i < myList.length; i++) {
		const row = document.createElement("tr");
		row.idx = i;
		const cell1 = document.createElement("td");
		cell1.innerHTML = myList[i];
		row.appendChild(cell1);
		const cell2 = document.createElement("td");
		const span1 = document.createElement("span");
		span1.innerHTML = "Delete";
		span1.addEventListener("click", function () {
			console.log(myList[i]);
			let itemout = myList.splice(i, 1);
			build();
		})
		cell2.appendChild(span1);
		const span2 = document.createElement("span");
		span2.innerText = "Edit";
		span2.addEventListener("click", function () {
			row.style.backgroundColor = "Yellow";
			let templeElem = row.firstElementChild;
			const newInput = document.createElement("input");
			newInput.value = templeElem.innerText;
			newInput.focus();
			templeElem.innerHTML = "";
			templeElem.appendChild(newInput);
			newInput.addEventListener("blur", function () {
				templeElem.innerHTML = newInput.value;
				row.style.backgroundColor = "White";
				myList[i] = newInput.value;
			})
		})
		cell2.appendChild(span2);
		row.appendChild(cell2);
		tbl.appendChild(row);
	}
	output.appendChild(tbl);
}