const fetchData = async (searchterm) => {

	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '6876c425',
			s: searchterm.replace(/\s+/g, " ").trim();
		}
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><strong>Search For a Movie</strong></label>
  <input class="input"/>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
    </div>
  </div>

`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
	if (!event.target.value) {
		resultsWrapper.innerHTML = "";
		dropdown.classList.remove("is-active");
		return;
	};

	const movies = await fetchData(event.target.value);
	// if (movies === "Abort") return;

	if (movies.length > 0) {
		dropdown.classList.add("is-active");
	} else  {
		dropdown.classList.remove("is-active");
	}

	resultsWrapper.innerHTML = "";

	for (let movie of movies) {
    const option = document.createElement('a');
    const imgSrc = 

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${movie.Poster === "N/A" ? "" : movie.Poster}" alt="${movie.Poster === "N/A" ? "No poster provided" : `${movie.Title} Poster`}" />
      <p>${movie.Title}</p>
    `;

    option.addEventListener('click', () => {
    	dropdown.classList.remove("is-active");
    	input.value = movie.Title;
    	onMovieSelect(movie);
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
			<p class="title">${movieDetails.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetails.imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
}