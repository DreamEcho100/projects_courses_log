const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
	  <label><strong>Search</strong></label>
	  <input class="input"/>
	  <div class="dropdown">
	    <div class="dropdown-menu">
	      <div class="dropdown-content results">
	      </div>
	    </div>
	  </div>

	`;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	const onInput = async event => {
		if (!event.target.value) {
			resultsWrapper.innerHTML = "";
			dropdown.classList.remove("is-active");
			return;
		};

		const items = await fetchData(event.target.value);
		// if (items === "Abort") return;

		if (items.length > 0) {
			dropdown.classList.add("is-active");
		} else  {
			dropdown.classList.remove("is-active");
		}

		resultsWrapper.innerHTML = "";

		for (let item of items) {
	    const option = document.createElement('a');

	    option.classList.add('dropdown-item');
	    option.innerHTML = renderOption(item);

	    option.addEventListener('click', () => {
	    	dropdown.classList.remove("is-active");
	    	input.value = inputValue(item);
	    	onOptionSelect(item);
	    });

	    resultsWrapper.appendChild(option);
	  }

	}

	input.addEventListener('input', debounce(onInput, 500));

		document.addEventListener("click", eveny => {
			if(!root.contains(event.target)) {
				dropdown.classList.remove("is-active");
			}
	});

	/*
	root.addEventListener('focusout', (event) => {
		if (!root.contains(event.explicitOriginalTarget)) {
			dropdown.classList.remove("is-active");
		}
	});
	*/
	input.addEventListener('focusin', () => {
		if (
			// input.value[0] !== " " &&
			// input.value !== "" 
			/\S/ig.test(resultsWrapper.textContent)
		) {
			dropdown.classList.add("is-active");
		}
	});
};