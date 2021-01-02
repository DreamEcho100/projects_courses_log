const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// const clarifai = require('clarifai');
const databasePassword = require('./databasePassword');
const registerHandler = require('./controllers/register').register;
const signinHandler = require('./controllers/signin').signin;
const imageFacesPositionData = require('./controllers/imageClarifai').FacesPositionData;
const imageEntries = require('./controllers/imageClarifai').Entries;
const profileId = require('./controllers/profile').id;
const PORT = process.env.PORT;

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: databasePassword,
		database: 'smartbrain'
	}
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.post("/signin", (request, response) => signinHandler(db, bcrypt)(request, response));

app.post("/register", (request, response) => registerHandler(db, bcrypt)(request, response));

app.get('/profile/:id', profileId);

app.post("/imageUrl", (request, response) => imageFacesPositionData(request, response));

app.put("/image", (request, response) => imageEntries(db)(request, response));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));