const Pool = require('pg').Pool;
const dbPassword = require('./dbPassword.js');

const pool = new Pool({
	user: 'postgres',
	password: dbPassword,
	host: 'localhost',
	port: 5432,
	database: 'jwttutorial',
});

module.exports = pool;
