const pexelsAuth = "563492ad6f917000010000015821205f41f14bfa8e23d5e5b3734032";
const gallery = document.querySelector(".gallery");
const searchInp = document.querySelector(".search-inp");
const form = document.querySelector(".search-form");
const moreImgsBtn = document.querySelector(".more-imgs-btn");
let searchValue;
let page = 1;
let fetchLink;
let currSearch;

searchInp.addEventListener("input", updateInp);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	currSearch = searchValue;
	searchPhotos(searchValue);
});
moreImgsBtn.addEventListener("click", loadMoreImgs);

async function fetchApi(url) {
	const dataFetch = await fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: pexelsAuth
		}
	});
	const data = await dataFetch.json();
	return data;
}

async function generatePictures(data) {
	data.photos.forEach(photo => {
		const galleryImg = document.createElement("div");
		galleryImg.classList.add("gallery-img");
		galleryImg.innerHTML = `
		<div class="gallery-info">
			<p>${photo.photographer}</p>
			<a target="_blank" href=${photo.src.original}>Dawnload</a>
		</div>
		<img src=${photo.src.large}></img>
		`;
		gallery.appendChild(galleryImg);
	});
}

async function curatedPhotos() {
	const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
	console.log(data);
	generatePictures(data);
}

async function searchPhotos(query) {
	clr();
	fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
	const data = await fetchApi(fetchLink);
	generatePictures(data);
}

function clr() {
	gallery.innerHTML = "";
	searchInp.value = "";
}

async function loadMoreImgs() {
	let temp = gallery.lastChild;
	page++;
	if (currSearch) {
		fetchLink = `https://api.pexels.com/v1/search?query=${currSearch}+query&per_page=15&page=${page}`;
	} else {
		fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
	}
	const data = await fetchApi(fetchLink);
	generatePictures(data);
	temp.focus();
}

function updateInp(e) {
	searchValue = e.target.value;
}

curatedPhotos();