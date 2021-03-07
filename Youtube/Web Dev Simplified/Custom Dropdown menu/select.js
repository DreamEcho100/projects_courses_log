class Select {
	constructor(element) {
		this.cc = this;
		this.element = element;
		this.options = getFormattedOptions(element.querySelectorAll('option'));
		this.customElement = document.createElement('div');
		this.labelElement = document.createElement('span');
		this.optionsCustomElement = document.createElement('ul');
		setupCustomElement(this);
		element.style.display = 'none';
		element.after(this.customElement);
	}

	get selectedOption() {
		const { options } = this;
		return options.find((option) => option.selected);
	}

	get selectedOptionIndex() {
		const { options, selectedOption } = this;
		return options.indexOf(selectedOption);
	}

	selectValue = ({ value, label }) => {
		const {
			options,
			selectedOption,
			labelElement,
			optionsCustomElement,
		} = this;
		const newSelectedOption = options.find(
			(option) => option.value === value && option.label === label
		);

		const previousSelectedOption = selectedOption;
		previousSelectedOption.selected = false;
		previousSelectedOption.element.selected = false;

		newSelectedOption.selected = true;
		newSelectedOption.element.selected = true;

		labelElement.querySelector('.text-holder').innerText =
			newSelectedOption.label;

		// selectedOption.element.classList.remove('selected');
		optionsCustomElement
			.querySelector(`[data-value=${previousSelectedOption.value}]`)
			.classList.remove('selected');
		const newCustomElement = optionsCustomElement.querySelector(
			`[data-value=${newSelectedOption.value}]`
		);
		newCustomElement.classList.add('selected');
		newCustomElement.scrollIntoView({ block: 'nearest' });
		// const previousSelectedLi = optionsCustomElement.querySelector("li.selected");
		// previousSelectedLi.classList.remove('selected');
		// optionElement.classList.add('selected');
	};
}

let searchTerm = '';
let searchTermDebounceTimeout;

function removeElementClass(element, targetedClass) {
	return element.classList.remove(targetedClass);
}

function toggleElementClass(element, targetedClass) {
	return element.classList.toggle(targetedClass);
}

function setupCustomElement(
	select /*{ cc, customElement, labelElement, optionsCustomElement, options, selectedOption, selectValue, selectedOptionIndex }*/
) {
	const {
		cc,
		customElement,
		labelElement,
		optionsCustomElement,
		options,
		selectedOption,
		selectValue,
		selectedOptionIndex,
	} = select;

	customElement.classList.add('custom-select-container');
	customElement.tabIndex = 0;

	labelElement.classList.add('custom-select-value');
	labelElement.innerHTML = `
	<div class="text-holder">${selectedOption.label}</div>
	<div class="pointer"><div class="pointerContainer"></div></div>
	`;
	customElement.append(labelElement);

	optionsCustomElement.classList.add('custom-select-options');
	options.forEach(({ selected, label, value }) => {
		// const { selected, label, value } = option;
		const optionElement = document.createElement('li');
		optionElement.classList.add('custom-select-option');
		optionElement.classList.toggle('selected', selected);
		optionElement.innerText = label;
		optionElement.dataset.value = value;
		optionElement.addEventListener('click', () => {
			selectValue(value);
			removeElementClass(optionsCustomElement, 'show');
		});
		optionsCustomElement.append(optionElement);
	});
	customElement.append(optionsCustomElement);

	labelElement.addEventListener('click', () =>
		toggleElementClass(optionsCustomElement, 'show')
	);

	customElement.addEventListener('blur', () =>
		removeElementClass(optionsCustomElement, 'show')
	);

	customElement.addEventListener('keydown', (event) => {
		if (event.key !== 'Tab') {
			event.preventDefault();
		}
		let condition, previousOption;
		switch (event.key) {
			case 'Space':
				toggleElementClass(optionsCustomElement, 'show');
				break;
			case 'ArrowUp':
				condition =
					cc.selectedOptionIndex - 1 < 0
						? options.length - 1
						: cc.selectedOptionIndex - 1;
				previousOption = options[condition];
				if (previousOption) selectValue(previousOption);
				break;
			case 'ArrowDown':
				// debugger;
				condition =
					cc.selectedOptionIndex + 1 >= options.length
						? 0
						: cc.selectedOptionIndex + 1;
				previousOption = options[condition];
				if (previousOption) selectValue(previousOption);
				break;
			case 'Tab':
			case 'Enter':
				toggleElementClass(optionsCustomElement, 'show');
				break;
			case 'Escape':
				removeElementClass(optionsCustomElement, 'show');
				break;
			default:
				searchList(event.key);
				break;
		}

		function searchList(keyword) {
			searchTerm += keyword;
			clearTimeout(searchTermDebounceTimeout);

			searchTermDebounceTimeout = setTimeout(() => {
				searchTerm = '';
			}, 1000);

			const searchFinder = options.find((option) =>
				option.label.toLowerCase().startsWith(searchTerm)
			);
			if (!searchFinder) {
				searchTerm = '';
			}
			if (searchFinder) selectValue(searchFinder);
		}
	});
}

function getFormattedOptions(optionsElements) {
	return [...optionsElements].map((optionElements) => {
		return {
			value: optionElements.value,
			label: optionElements.label,
			selected: optionElements.selected,
			element: optionElements,
		};
	});
}
