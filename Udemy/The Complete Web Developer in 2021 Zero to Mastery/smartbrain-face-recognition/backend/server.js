const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const databasePassword = require('./databasePassword');
const PORT = 5000;

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

app.post("/signin", (request, response) => {
	const { email, password } = request.body;
	db
		.select("email", 'hash')
		.from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				return db
					.select('*')
					.from('users')
					.where('email', '=', email)
					.then(user => {
						response.json(user[0]);
					})
					.catch(error => response.status(400).json("unable to get user..."));
			} else {
				response.status(400).json("wrong credentials...");
			}
		})
		.catch(error => response.status(400).json("wrong credentials..."));
});

app.post("/register", (request, response) => {
	const { name, email, password } = request.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			db('users')
				.returning('*')
				.insert({
					name: name,
					email: loginEmail[0],
					joined: new Date()
				})
				.then(user => response.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(error => response.status(400).json("unable to register..."));
});

app.get('/profile/:id', (request, response) => {
	const { id } = request.params;
	db.select('*')
		.from('users')
		.where({ id })
		.then(user => {
			if(user.length > 0) response.json(user[0]);
			else response.status(404).json("user not found");
		});
});

app.put("/image", (request, response) => {
	const { id } = request.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			response.json(entries[0]);
		})
		.catch(error => response.status(404).json("no such user"));
});

app.listen(PORT);