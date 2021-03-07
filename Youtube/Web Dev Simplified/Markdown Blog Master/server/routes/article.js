const router = require('express').Router();

router.get('/new', (request, response) => {
	response.render('articles/new');
});

module.exports = router;
