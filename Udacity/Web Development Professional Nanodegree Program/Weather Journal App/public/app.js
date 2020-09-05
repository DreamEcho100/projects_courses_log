/* Global Variables */
const generateBtn = document.getElementById("generate");
const dateOutput = document.getElementById("date");
const tempOutput = document.getElementById("temp");
const contentOutput = document.getElementById("content");

const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=a957f14e3c54881472646d30636a4a83&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();

// req -> request
// res -> response
// temp -> temperature

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", performAction);

// Function called by event listener
function performAction(e) {
	const newZip = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;
	getWeather(baseUrl, newZip, apiKey)
		.then((data) => {
			console.log(data);
			// Add data to post request
			postData("/add", {
				date: d,
				temp: data.list[0].main.temp,
				feelings: feelings,
			});
		})
		.then(() => updateUI());
}

const getWeather = async (baseUrl, zip, key) => {
	const res = await fetch(`${baseUrl}${zip}${key}`);
	try {
		const data = await res.json();
		return data;
	} catch (err) {
		console.error("Error", err);
	}
};

// Function to post data to the server
const postData = async (url = "", data = {}) => {
	console.log(data);
	const res = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		// body data type must match "Content-Type" header
		body: JSON.stringify(data),
	});

	try {
		const newData = await res.json();
		console.log(newData);
		return newData;
	} catch (err) {
		console.error("Error", err);
	}
};

// Function to GET project data and update the UI

const updateUI = async () => {
	const req = await fetch("/all");
	try {
		const allData = await req.json();
		dateOutput.innerHTML = `Date: ${allData.date}`;
		tempOutput.innerHTML = `Temperature: ${allData.temp}`;
		contentOutput.innerHTML = `Feelings: ${allData.feelings}`;
	} catch (err) {
		console.error("Error", err);
	}
};
