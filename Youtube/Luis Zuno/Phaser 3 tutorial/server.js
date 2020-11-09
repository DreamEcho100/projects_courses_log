/*
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Start up an instance of app
const app = express();
// Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Setup Server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Set static folder
// Initialize the main project folder
app.use(express.static(path.join(__dirname, "public", "index.html")));



const server = app.listen(PORT, listening);

function listening() {
	console.log(`Server running on localhost:${PORT}`);
}
*/


const http = require("http");
const path = require("path");
const fs = require("fs");


const server = http.createServer((req, res) => {

	let filePath = path.join(
		__dirname,
		'public',
		req.url === "/" ? 'index.html' : req.url
	);

	// Extension of file
	let extName = path.extname(filePath);

	// Check ext&set content type
	let contentType = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.png':  'image/png',
		'.jpg':  'image/jpg',
		'.svg': 'image/svg+xml'
	}[extName];

	// Read File
	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code === 'ENOENT') {
				// Page not found
				/*fs.readFile(
					path.join(__dirname,
						'public',
						'pageNotFound.html'), 
					(err, content) => {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(content, 'utf8');
				});*/
			} else {
				// Some server error
				res.writeHead(5000);
				res.end(`Server Error: ${ee.code}`);
			}
		} else {
			// Success
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf8');
		}
	});

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));