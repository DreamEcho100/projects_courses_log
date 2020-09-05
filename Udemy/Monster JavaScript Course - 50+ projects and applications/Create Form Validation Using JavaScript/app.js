const myForm = document.querySelector("form");
const inputs = document.querySelectorAll(".Checks");
const errors = document.querySelectorAll(".error");

const required = ["email", "password", "userName"];

myForm.addEventListener("submit", validation);

function validation(e) {
	let data = {};
	e.preventDefault();
	errors.forEach(item => item.classList.add("hide"));
	let error = false;
	inputs.forEach(elem => {
		let tempName = elem.getAttribute("name");
		if (tempName) {
			elem.style.borderColor = "#ddd";
			console.log(false);
			if (required.includes(tempName) && elem.value.length === 0) {
				addError(elem, "required field", tempName);
				error = true;
			}
			if (tempName === "userName") {
				if (!(elem.value.length > 3 && elem.value.length < 31)) {
					addError(elem, "Needs to be between 4-30 characters", tempName);
					error = true;
				}
			}
			if (tempName === "email") {
				let exp = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+)\w+/;
				let result = exp.test(elem.value);
				if (!result) {
					addError(elem, "Invalid Email", tempName);
					error = true;
				}
			}
			if (tempName === "password") {
				let exp = /[A-Za-z0-9]+$/;
				let result = exp.test(elem.value);
				if (!result) {
					addError(elem, "only numbers and letters", tempName);
					error = true;
				}
				if (!(elem.value.length > 3 && elem.value.length < 9)) {
					addError(elem, "Needs to be between 4-8 characters", tempName);
					error = true;
				}
			}
			data[tempName] = el.value;
		}

	})
    if (!error) {
        myForm.submit();
    }
}

function addError(el, mes, fieldName) {
	let temp = el.nextElementSibling;
	temp.classList.remove("hide");
	temp.textContent = `${fieldName.toUpperCase()} ${mes}`;
	el.style.borderColor = "red";
	el.focus();
}