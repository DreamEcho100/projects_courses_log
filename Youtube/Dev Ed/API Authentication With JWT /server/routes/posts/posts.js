const { request } = require('express');

const router = require('express').Router();
const verifyJWTToken = require('../jwt/verify/token/token');

router.get('/', verifyJWTToken, (request, response) => {
	response.json({
		posts: {
			title: 'My second updated post.',
			description: 'This is the description of my second updated post!',
		},
	});
});

module.exports = router;
