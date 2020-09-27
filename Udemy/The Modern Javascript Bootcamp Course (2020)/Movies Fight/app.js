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
	onOptionSelect: (movie) => {
		onMovieSelect(movie);
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
	root: document.querySelector('#left-autocomplete')
});

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector('#right-autocomplete')
});

const onMovieSelect = async movie => {
const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '6876c425',
			i: movie.imdbID
		}
	});
/*,
			plot: 'full'*/

	document.querySelector('#summary').innerHTML = movieTemplate(response.data);

}

const movieTemplate = (movieDetails) => {
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
		<article class="notification is-primary">
			<p class="title">${movieDetails.Awards || "N/A"}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.BoxOffice || "N/A"}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.Metascore || "N/A"}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.imdbRating || "N/A"}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.imdbVotes || "N/A"}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
}