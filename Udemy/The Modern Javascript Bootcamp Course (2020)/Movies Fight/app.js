const autoCompleteConfig = {
	
	renderOption(movie) {
		const imgSrc =  movie.Poster === "N/A" ? "" : movie.Poster;
		const imgAlt =  movie.Poster === "N/A" ? "No poster provided" : `${movie.Title} Poster`;
		return `
	      <img src="${imgSrc}" alt="${imgAlt}" />
	      <div class="movie-info">
		      <p>${movie.Title}</p>
		      <p>${movie.Type}</p>
		      <p>${movie.Year}</p>
		    </div>
	    `;
	},
	inputValue: (movie) => {
		return movie.Title;
	},
	async fetchData(searchterm) {

		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: '6876c425',
				s: searchterm.replace(/\s+/g, " ").trim()
			}
		});

		if (response.data.Error) {
			return [];
		}

		return response.data.Search;
	}
}

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector('#left-autocomplete'),
	onOptionSelect: (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), "left");
	}
});

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect: (movie) => {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), "right");
	}
});

let leftMovie, rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '6876c425',
			i: movie.imdbID
		}
	});
/*,
			plot: 'full'*/

	if (side === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	summaryElement.innerHTML = movieTemplate(response.data);

	if (leftMovie && rightMovie) {
		runComparison();
	}

}

function runComparison() {
	const leftSideStats = document.querySelectorAll('#left-summary .notification');
	const rightSideStats = document.querySelectorAll('#right-summary .notification');

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index];

		const leftSideValue = parseFloat(leftStat.dataset.value);
		const rightSideValue = parseFloat(rightStat.dataset.value);

		if (isNaN(leftSideValue) || leftSideValue === 0) {
			leftStat.classList.remove("is-primary", "is-warning");
			if (!isNaN(rightSideValue)) {
				rightStat.classList.add("is-primary");
				rightStat.classList.remove("is-warning");
			}
		}
		if (isNaN(rightSideValue) || rightSideValue === 0) {
			rightStat.classList.remove("is-primary", "is-warning");
			if (!isNaN(leftSideValue)) {
				leftStat.classList.add("is-primary");
				leftStat.classList.remove("is-warning");
			}
		}

		if (leftSideValue > rightSideValue) {
			leftStat.classList.remove("is-warning");
			leftStat.classList.add("is-primary");
			rightStat.classList.remove("is-primary");
			rightStat.classList.add("is-warning");
		} else if (rightSideValue > leftSideValue) {
			rightStat.classList.remove("is-warning");
			rightStat.classList.add("is-primary");
			leftStat.classList.remove("is-primary");
			leftStat.classList.add("is-warning");
		}
	});

}

const fromStringToNumber = (string, exceptions, alternative) => {
	if (typeof string === "number" && !exceptions.includes(string)) throw console.error("The first argument in fromStringToNumber function is already a number!!!\n" + string);
	if (typeof string !== "string" && !exceptions.includes(string)) throw console.error("In fromStringToNumber function,\nThe first argument must be a string, N/A or undefined!\n" + string);
	return exceptions.includes(string) ? alternative : parseFloat(string.replace(/[^\d.]/g, ""));
	//return exceptions.includes(string) ? alternativ : parseFloat(string.replace(/[\$,]/g, ""));
}

const movieTemplate = (movieDetails) => {
	const dollars = fromStringToNumber(movieDetails.BoxOffice, ["N/A", undefined], "N/A") // movieDetails.BoxOffice === "N/A" ? "N/A" : parseFloat(movieDetails.BoxOffice.replace(/[^\d.]/g, ""));
	// const dollars = movieDetails.BoxOffice === "N/A" ? "N/A" : parseFloat(movieDetails.BoxOffice.replace(/[\$,]/g, ""));
	const metaScore = fromStringToNumber(movieDetails.Metascore, ["N/A", undefined], "N/A") // movieDetails.Metascore === "N/A" ? "N/A" : parseFloat(movieDetails.Metascore);
	const imdbRating = fromStringToNumber(movieDetails.imdbRating, ["N/A", undefined], "N/A") // movieDetails.imdbRating === "N/A" ? "N/A" : parseFloat(movieDetails.imdbRating);
	const imdbVotes = fromStringToNumber(movieDetails.imdbVotes, ["N/A", undefined], "N/A") // movieDetails.imdbVotes === "N/A" ? "N/A" : parseFloat(movieDetails.imdbVotes.replace(/[^\d.]/g, ""));
	const awards = movieDetails.Awards.split(" ").reduce((previousWord, nextWord) => {
		const value = parseInt(nextWord);
		if(isNaN(value)) {
			return previousWord;
		} else {
			return previousWord + value;
		}
	}, 0);
/*
	const test ="Nominated for 1 Oscar. Another 38 wins & 79 nominations."
	const oscarWins = test[test.indexOf(" Oscar") - 1];
	const anotherWins = test[test.indexOf(" win") - 1];
	const nominations = test[test.indexOf(" nomination") - 1];

	// console.table({
	//     oscarWins,
	//     anotherWins,
	//     nominations
	// });

	function findNumber(string, text) {
		let lastIndex = string.indexOf(text);
		if (lastIndex === -1) return "No Occurance :(";
		let number = "";
		let cheker;
		do {
			number = string[lastIndex] + number
			lastIndex--;
			cheker = !isNaN(parseInt(string[lastIndex]))
			console.log(cheker);
		} while(cheker);
		return number
	}
	console.log(`OscarWins: ${findNumber(test, oscarWins)}`);
	console.log(`AnotherWins: ${findNumber(test, anotherWins)}`);
	console.log(`Nominations: ${findNumber(test, nominations)}`);
*/
	

	// console.table({
	// 		dollars,
	// 		metaScore,
	// 		imdbRating,
	// 		imdbVotes
	// 	});
	return `
		<article class="media">
			<figure class="media-left">
				<p class="image">
					<img src="${movieDetails.Poster}"/>
				</p>
			</figure>
			<div class="media-content">
				<div class="content">
					<h2>${movieDetails.Title}</h2>
					<h1>${movieDetails.Genre}</h1>
					<p>${movieDetails.Plot}</p>
				</div>
			</div>
		</article>
		<article data-value="${awards}" class="notification is-primary">
			<p class="title">${movieDetails.Awards === undefined ? "N/A" : movieDetails.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article data-value="${dollars}" class="notification is-primary">
			<p class="title">${movieDetails.BoxOffice === undefined ? "N/A" : movieDetails.BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article data-value="${metaScore}" class="notification is-primary">
			<p class="title">${movieDetails.Metascore === undefined ? "N/A" : movieDetails.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article data-value="${imdbRating}" class="notification is-primary">
			<p class="title">${movieDetails.imdbRating === undefined ? "N/A" : movieDetails.imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article data-value="${imdbVotes}" class="notification is-primary">
			<p class="title">${movieDetails.imdbVotes === undefined ? "N/A" : movieDetails.imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
}