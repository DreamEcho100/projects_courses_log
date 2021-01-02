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


/*
// -Face Detection model we will be using:
// https://www.clarifai.com/models/face-detection
// -How we will use the API with JS (don't worry I will show you the easy way to do this):
// https://docs.clarifai.com/api-guide/predict/images
// -Finally, this is the list of all the models you can use with this API if you want to customize your project:
// https://www.clarifai.com/model-gallery
app.models
  .predict(
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
    // so you would change from:
    // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // to:
    // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
  */