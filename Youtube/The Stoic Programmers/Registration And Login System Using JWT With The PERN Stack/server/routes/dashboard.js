const router = require('express').Router();
const { request, response } = require('express');
const pool = require('../db.js');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (request, response) => {
	try {
		// request.user has the payload
		const user = await pool.query(
			'SELECT user_name FROM users WHERE user_id = $1',
			[request.user]
		);

		response.json(user.rows[0]);
	} catch (error) {
		console.error(`Error, ${error}`);
		response.status(500).send('Server Error');
	}
});

module.exports = router;
