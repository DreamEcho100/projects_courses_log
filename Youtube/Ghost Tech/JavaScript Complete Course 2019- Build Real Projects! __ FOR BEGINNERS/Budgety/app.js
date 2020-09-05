// BUDGET CONTROLLER
let budgetController = (function() {
	
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calPercentage = function(totalIncome) {
		if (totalIncome) {
			this.percentage = parseFloat( (this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	}

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	}
	
	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let calculateTotal = function(type) {
		let sum = 0;
		data.allItems[type].forEach(function(cur) {
			sum += cur.value;
		})

		data.totals[type] = sum;

	}

	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	}

	return {
		addItem: function (type, des, val) {
			let newItem, ID;

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1
			} else {
				ID = 0;
			}

			// Create new Item based on "inc" or "exp" type
			if (type === "exp") {
				newItem = new Expense(ID, des, val);
			} else if (type === "inc") {
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},

		deleteItem: function (type, id) {
			let ids, index;

			ids = data.allItems[type].map(function(current) {
				return current.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}

		},

		CalculateBudget: function() {

			// Calculate total income and expenses			
			calculateTotal("inc");
			calculateTotal("exp");

			// Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// Calculate the percentage of income that we spent
			if (data.totals.inc > 0) {
				data.percentage = ((data.totals.exp / data.totals.inc)  * 100);
			} else {
				data.percentage = -1;
			}

		},

		calculatePercentages: function () {
			data.allItems.exp.forEach(function(current) {
				current.calPercentage(data.totals.inc);
			});
		},

		getPercentageS: function() {
			let allPerc = data.allItems.exp.map(function(current) {
				return current.getPercentage();
			});
			return allPerc;
		},

		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		}/*,

		testing: function () {
			console.log(data);
		}
		*/
	}

})();

// UI CONTROLLER
let UIController = (function() {
	
	let DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn", 
		incomeContainer: ".income__list",
		expensesContainer: ".expenses__list",
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expensesLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage",
		container: ".container", 
		expensesPercLabel: ".item__percentage",
		dataLabel: ".budget__title--month"
	}

	let formatNumber = function(num, type) {
		let numSplited, int, dec;
		
		num = Math.abs(num);
		num = num.toFixed(2);

		numSplited = num.split(".");

		[int, dec] = numSplited;

		//int = numSplited[0];
		if (int.length > 3) {
			int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
		}
		if (int.length > 7) {
			int = `${int.substr(0, int.length - 7)},${int.substr(int.length - 7, 7)}`;
		}
		if (int.length > 11) {
			int = `${int.substr(0, int.length - 11)},${int.substr(int.length - 11, 11)}`;
		}
		if (int.length > 15) {
			int = `${int.substr(0, int.length - 15)},${int.substr(int.length - 15, 15)}`;
		}

		//dec = numSplited[1];

		return `${type === 'exp' ? "-" : "+"} ${int}.${dec}`;

	}

	let nodeListForEach = function(list, callback) {
		for (let i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	}

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
			};
		},

		addListItem: function(obj, type) {
			let html, element;
			// Create HTML string with placeholder text
			if (type === "inc") {
				element = DOMstrings.incomeContainer;
				html = `<div class="item clearfix" id="inc-${obj.id}">
	                <div class="item__description">${obj.description}</div>
	            	<div class="right clearfix">
	                    <div class="item__value">${formatNumber(obj.value, type)}</div>
	                    <div class="item__delete">
	                        <button class="item__delete--btn">
	                            <i class="ion-ios-close-outline"></i>
	                        </button>
	                    </div>
	                </div>
	            </div>`;
			} else if (type === "exp") {
				element = DOMstrings.expensesContainer;
				html = `<div class="item clearfix" id="exp-${obj.id}">
	                <div class="item__description">${obj.description}</div>
	                <div class="right clearfix">
	                    <div class="item__value">${formatNumber(obj.value, type)}</div>
	                    <div class="item__percentage">21%</div>
	                    <div class="item__delete">
	                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
	                    </div>
	                </div>
	            </div>`;
			}

			// Replace the placeholder text with some actual data
			// I put the string in `` instead of using newhtml = html.replace("%value%", obj.value);newhtml = html.replace("%id%", obj.id);newhtml = html.replace("%description%", obj.description);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML("beforeend", html);
		},

		deleteListItem: function(selectorID) {

			let el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);

		},

		clearFields: function() {

			let fields, fieldsArr;

			fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			})

			fieldsArr[0].focus();

		},

		displayBudget: function(obj) {
			let type;
			obj.budget > 0 ? type = "inc" : "exp";
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
			document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");
			if (obj.percentage > 0) {
				 document.querySelector(DOMstrings.percentageLabel).textContent = `${obj.percentage.toFixed(2)}%`;
			} else {
				 document.querySelector(DOMstrings.percentageLabel).textContent = "---";
			}
		},

		displayPercentage: function(percentages) {
			
			let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

			nodeListForEach(fields, function(current, index) {
				
				if (percentages[index] > 0) {
					current.textContent = `${percentages[index].toFixed(2)}%`;
				} else {
					current.textContent = "---";
				}
			})

		},

		displayMonth: function() {
			let now, month, months, year;

			now = new Date();

			months = ["January", "Fabruary", "March", "April", "May", "June", "July", "Augest", "September", "October", "Novamber", "December"];

			year = now.getFullYear();
			month = now.getMonth();

			document.querySelector(DOMstrings.dataLabel).textContent = `${months[month]} ${year}`;
		},

		changedType: function (argument) {
			let fields = document.querySelectorAll(`
				${DOMstrings.inputType},
				${DOMstrings.inputDescription},
				${DOMstrings.inputValue}
				`);
			nodeListForEach(fields, function (current) {
				current.classList.toggle("red-focus");
			});

			document.querySelector(DOMstrings.inputBtn).classList.toggle("red")

		},

		getDOMString: function () {
			return DOMstrings;
		}
	}
	
})();

// GLOBAL CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {

	let setupEventListeners = function () {
		let DOM = UICtrl.getDOMString();

		document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

		document.addEventListener("keypress", function function_name(event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);

		document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changedType);


	}

	let updateBudget = function() {

		// 1. Calculate the budget
		budgetCtrl.CalculateBudget();

		// 2. Return the budget
		let budget = budgetCtrl.getBudget();

		// 3. Display the budget on the UI
		UICtrl.displayBudget(budget);

	}

	let updatePercentage = function() {
		
		// 1. Calculate percentage
		budgetCtrl.calculatePercentages();

		// 2. Read percentages from the budget controller
		let percentages = budgetCtrl.getPercentageS();

		// 3. Update th UI with the new percentages
		UICtrl.displayPercentage(percentages);
	}

	let ctrlAddItem = function() {

		let input, newItem;
		// 1. Get the field input data
		input = UICtrl.getInput();

		if (input.description !== "" && !(isNaN(input.value)) && input.value > 0) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			// 4. Clear the fields
			UICtrl.clearFields();

			// 5. Calculate and update budget
			updateBudget();

			// 6. Calculate and update percentages
			updatePercentage();
		}

	}

	let ctrlDeleteItem = function(event) {
		let itemID, splitID, type, id;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {

			//
			splitID = itemID.split('-');
			//type = splitID[0];
			//id = parseInt(splitID[1]);
			[type, id] = splitID;
			id = Number(id);

			// 1. Delete the item from the data structure
			budgetCtrl.deleteItem(type, id);

			// 2. Delete the item from the UI
			UICtrl.deleteListItem(`${type}-${id}`);

			// 3. Update and show the new budget
			updateBudget();

			// 4. Calculate and update percentages
			updatePercentage();

		}
	}
	
	return {
		init: function () {
			console.log("Application has started.");
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListeners();
		}
	}

})(budgetController, UIController);

controller.init();