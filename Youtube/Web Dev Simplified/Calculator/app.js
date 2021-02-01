class Calculator {
	constructor(previousOperandTextElemnt, currentOperandTextElemnt) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.fractionsLimit = 7;
		this.clear();
	}

	clear = () => {
		this.previousOperand = "0";
		this.currentOperand = "0";
		this.operation = undefined;
		this.updateDisplay();
	};

	removeLastNumber = () => {
		if (this.currentOperand === "0" && this.previousOperand === "0") return;
		if (this.currentOperand.length === 1) {
			if (this.currentOperand === "0") {
				this.currentOperand = this.previousOperand.toString();
				this.previousOperand = "0";
				this.operation = undefined;
			} else {
				this.currentOperand = "0";
			}
		} else {
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
			if (this.currentOperand === "-") {
				this.currentOperand = "0";
			}
		}
		calculator.updateDisplay();
	};

	appendNumber = (number) => {
		if (
			!number === "." ||
			(this.previousOperand !== "0" &&
				this.currentOperand === "0" &&
				!this.operation)
		) {
			return;
		} else if (number === ".") {
			if (this.currentOperand.includes(".") && this.currentOperand !== "0")
				return;
			else {
				this.currentOperand = this.currentOperand.toString() + ".";
			}
		} else if (this.currentOperand === "0") {
			this.currentOperand = this.decorateNumber(
				"limitFractions",
				number.toString()
			);
		} else {
			this.currentOperand = this.decorateNumber(
				"limitFractions",
				this.currentOperand.toString() + number.toString()
			);
		}
		calculator.updateDisplay();
	};

	chooseOperation = (operation) => {
		if (this.currentOperand === "0" && this.previousOperand === "0") return;
		if (!this.operation) {
			this.operation = operation;
			if (this.previousOperand === "0") {
				this.previousOperand = this.currentOperand;
				this.currentOperand = "0";
			} else if (this.currentOperand === "0") {
			}
		} else {
			if (
				this.currentOperand !== "0" &&
				this.previousOperand !== "0" &&
				this.operation
			) {
				this.compute();
			}
			this.operation = operation;
		}
		this.updateDisplay();
	};

	negativePosativeToggle = () => {
		if (this.currentOperand === "0") return;
		if (this.currentOperand.includes("-")) {
			if (this.currentOperand.includes(".")) {
				this.currentOperand = Math.abs(
					parseInt(this.currentOperand)
				).toString();
			} else {
				this.currentOperand = Math.abs(
					parseInt(this.currentOperand)
				).toString();
			}
		} else {
			this.currentOperand = "-" + this.currentOperand;
		}
		this.updateDisplay();
	};

	compute = () => {
		if (this.currentOperand === "0" && !this.operation) return;
		const defaultcompute = () => {
			if (
				this.currentOperand !== "0" &&
				this.previousOperand === "0" &&
				!this.operation
			) {
				this.previousOperand = this.currentOperand.toString();
				this.currentOperand = "0";
				this.operation = undefined;
			}
		};
		((
			{
				"/": () => {
					const currentOperand = this.currentOperand.includes(".")
						? parseFloat(this.currentOperand)
						: parseInt(this.currentOperand);
					const previousOperand = this.previousOperand.includes(".")
						? parseFloat(this.previousOperand)
						: parseInt(this.previousOperand);

					const result = previousOperand / currentOperand;

					this.previousOperand = this.decorateNumber("limitFractions", result);
					this.currentOperand = "0";
					this.operation = undefined;
				},
				"*": () => {
					const currentOperand = this.currentOperand.includes(".")
						? parseFloat(this.currentOperand)
						: parseInt(this.currentOperand);
					const previousOperand = this.previousOperand.includes(".")
						? parseFloat(this.previousOperand)
						: parseInt(this.previousOperand);

					const result = previousOperand * currentOperand;

					this.previousOperand = this.decorateNumber("limitFractions", result);
					this.currentOperand = "0";
					this.operation = undefined;
				},
				"+": () => {
					const currentOperand = this.currentOperand.includes(".")
						? parseFloat(this.currentOperand)
						: parseInt(this.currentOperand);
					const previousOperand = this.previousOperand.includes(".")
						? parseFloat(this.previousOperand)
						: parseInt(this.previousOperand);

					const result = previousOperand + currentOperand;

					this.previousOperand = this.decorateNumber("limitFractions", result);
					this.currentOperand = "0";
					this.operation = undefined;
				},
				"-": () => {
					const currentOperand = this.currentOperand.includes(".")
						? parseFloat(this.currentOperand)
						: parseInt(this.currentOperand);
					const previousOperand = this.previousOperand.includes(".")
						? parseFloat(this.previousOperand)
						: parseInt(this.previousOperand);

					const result = previousOperand - currentOperand;

					this.previousOperand = this.decorateNumber("limitFractions", result);
					this.currentOperand = "0";
					this.operation = undefined;
				},
			}[this.operation] || defaultcompute
		)());
	};

	decorateNumber = (type, number) => {
		let numberString, tempArray;
		/*({
			["displayWithComas"]: () => {
				numberString = number.toString();
				if (numberString.includes(".")) {
					tempArray = numberString.split(".");

					return `${parseInt(tempArray[0])}.${
						tempArray[1].length > this.fractionsLimit
							? tempArray[1].slice(0, this.fractionsLimit)
							: tempArray[1]
					}`;
				} else {
					return `${parseInt(numberString)}`;
				}
			},
			["limitFractions"]: () => {
				numberString = number.toString();
				if (numberString.includes(".")) {
					tempArray = numberString.split(".");

					return `${parseInt(tempArray[0])}.${
						tempArray[1].length > this.fractionsLimit
							? tempArray[1].slice(0, this.fractionsLimit)
							: tempArray[1]
					}`;
				} else {
					return `${parseInt(numberString)}`;
				}
			},
		}[type]());*/
		switch (type) {
			case "displayWithComas":
				numberString = number.toString();
				if (numberString.includes(".")) {
					tempArray = numberString.split(".");

					return `${parseInt(tempArray[0]).toLocaleString("en")}.${
						tempArray[1].length > this.fractionsLimit
							? tempArray[1].slice(0, this.fractionsLimit)
							: tempArray[1]
					}`;
				} else {
					return `${parseInt(numberString).toLocaleString("en")}`;
				}
				break;
			case "limitFractions":
				numberString = number.toString();
				if (numberString.includes(".")) {
					tempArray = numberString.split(".");

					return `${parseInt(tempArray[0])}.${
						tempArray[1].length > this.fractionsLimit
							? tempArray[1].slice(0, this.fractionsLimit)
							: tempArray[1]
					}`;
				} else {
					return `${parseInt(numberString)}`;
				}
				break;
			default:
				break;
		}
	};

	updateDisplay = () => {
		this.currentOperandTextElement.innerText = this.decorateNumber(
			"displayWithComas",
			this.currentOperand
		);
		this.previousOperandTextElement.innerText = this.operation
			? `${this.decorateNumber("displayWithComas", this.previousOperand)} ${
					this.operation
			  }`
			: this.decorateNumber("displayWithComas", this.previousOperand);
	};
}

const calculatorGrid = document.querySelector(".calculator-grid");
const numberButtons = calculatorGrid.querySelectorAll("[data-number]");
const operationButtons = calculatorGrid.querySelectorAll("[data-operation]");
const negativePosativeToggleButton = calculatorGrid.querySelector(
	"[data-negative-posative-toggle]"
);
const equalsButton = calculatorGrid.querySelector("[data-equals]");
const removeLastNumberButton = calculatorGrid.querySelector(
	"[data-remove-last-number]"
);
const allClearButton = calculatorGrid.querySelector("[data-all-clear]");
const previousOperandTextElement = calculatorGrid.querySelector(
	"[data-previous-operand]"
);
const currentOperandTextElement = calculatorGrid.querySelector(
	"[data-current-operand]"
);

const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () =>
		calculator.appendNumber(button.innerText)
	);
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () =>
		calculator.chooseOperation(button.innerText)
	);
});

allClearButton.addEventListener("click", calculator.clear);

removeLastNumberButton.addEventListener("click", calculator.removeLastNumber);

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});

negativePosativeToggleButton.addEventListener(
	"click",
	calculator.negativePosativeToggle
);
