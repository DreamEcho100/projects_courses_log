const fetchData = async (searchterm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '6876c425',
			s: searchterm
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
	if (!event.target.value) return;

	const movies = await fetchData(event.target.value);
	
	if (movies.length > 0) dropdown.classList.add("is-active");
	else dropdown.classList.remove("is-active");

	resultsWrapper.innerHTML = "";

	for (let movie of movies) {
    const option = document.createElement('a');

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${movie.Poster}" />
      <p>${movie.Title}</p>
    `;

    resultsWrapper.appendChild(option);
  }

}

input.addEventListener('input', debounce(onInput, 500));