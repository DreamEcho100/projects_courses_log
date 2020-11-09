const todoInp = document.querySelector(".todo-inp");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", () => {
	todoInp.focus();
	getTodos()
})
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(e) {

	e.preventDefault();
	const inpTxt = todoInp.value.replace(/\s+/g, " ").trim();

	if (todoInp.value === "") return;

	buldingTodosItem(inpTxt, false);
	saveLocalTodos(inpTxt, false);

	todoInp.value = "";
	todoInp.focus();
	console.log(localStorage.getItem("todos"));

}

function deleteAndCheck(e) {
	const item = e.target;

	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement.parentElement
		todo.classList.add("inpFall");
		setTimeout( () => removeLocalTodos(todo), 500)
		todo.addEventListener("transitionend", () => todo.remove(item));
	}

	if (item.classList[0] === "completed-btn") {
		let items = document.querySelectorAll(".todo");
		item.parentElement.parentElement.classList.toggle('completed');
		items.forEach( (elem, idx) => {
			if (elem === item.parentElement.parentElement) {
				let tempTodos = checkLocalStorage("todos");
				tempTodos[idx].done = true;
				localStorage.setItem("todos", JSON.stringify(tempTodos));

			}
		} )
	}

}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach( (todo) => {
		switch(e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	} );
}

function saveLocalTodos(todo, done) {
	let todos = checkLocalStorage("todos");
	todos.push({txt: todo, done: done});
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
	let todos = checkLocalStorage("todos");
	todos.forEach( (todo) => {
		buldingTodosItem(todo.txt, todo.done);
	} );
}

function removeLocalTodos(todo) {
	let temp = String(todo.children[0].innerText)
	let todos = checkLocalStorage("todos");
	let idx;
	todos.forEach( (items, index) => (String(items.txt) === temp)  ? idx = index : null );
	todos.splice(idx, 1);
	localStorage.setItem("todos", JSON.stringify(todos));
	console.log(todos);

}

function buldingTodosItem(txt, done) {
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.innerText = txt;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	let todosBtns = document.createElement("div");
	todosBtns.classList.add("todos-btns");

	const completedBtn = document.createElement("button");
	completedBtn.innerHTML = '<i class="fas fa-check"></i>';
	completedBtn.classList.add("completed-btn");
	todosBtns.appendChild(completedBtn);

	const trashBtn = document.createElement("button");
	trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
	trashBtn.classList.add("trash-btn");
	todosBtns.append(trashBtn);

	todoDiv.append(todosBtns);

	if (done) todoDiv.classList.toggle("completed")

	todoList.appendChild(todoDiv);
}

function checkLocalStorage(itemName) {
	if (localStorage.getItem(itemName) === null) {
		return [];
	} else {
		return JSON.parse(localStorage.getItem(itemName));
	}
}