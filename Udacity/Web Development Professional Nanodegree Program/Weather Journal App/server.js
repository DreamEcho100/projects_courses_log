// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Setup Server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// // Initialize the main project folder
// app.use(express.static('website'));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));


const server = app.listen(PORT, listening);

function listening() {
	console.log(`Server running on localhost:${PORT}`);
}

// get function
app.get("/all", sendData);

// req -> request
// res -> response
function sendData(req, res) {
	res.send(projectData);
	projectData = {};
}

// post function
app.post("/add", addData);

// req -> request
// res -> response
function addData(req, res) {
	let data = req.body;

	console.log(`Server side data `, projectData);

	// data
	// temp -> temperature
	// feelings -> user's input
	projectData.date = data.date;
	projectData.temp = data.temp;
	projectData.feelings = data.feelings;

	console.log(`Server side data `, projectData);
}