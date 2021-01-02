const Clarifai = require('clarifai');
const apikey = require('./clarifaiApikey');

const app = new Clarifai.App({
  apiKey: apikey
});

const FacesPositionData = (request, response) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, (request.body.input))
	.then(data => response.json(data))
	.catch(error => response.status(404).json("unable to work with the API"));
}

const Entries = (db) => (request, response) => {
	const { id } = request.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => response.json(entries[0]))
		.catch(error => response.status(404).json("unable to get entries"));
}

module.exports = {
	FacesPositionData,
	Entries
};