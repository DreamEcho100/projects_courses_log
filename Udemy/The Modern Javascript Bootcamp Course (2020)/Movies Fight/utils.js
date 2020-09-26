const debounce = (callBack, delay = 1000) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			callBack.apply(null, args);
		}, delay);
	}
}