const Pool = require('pg').Pool;
const dbPassword = require('./dbPassword.js')

const pool = new Pool({
	user: 'postgres',
	password: dbPassword,
	database: 'todo_databse',
	host: 'localhost',
	port: 5432
});

module.exports = pool;