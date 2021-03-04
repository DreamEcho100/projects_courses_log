require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const app = express();

//
mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log('Connected to MongoDB')
);

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected!');
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', (request, response, next) => {
	console.log('This is a middleware running');
	next();
});

// Routes
app.use('/posts', require('./routes/posts/posts'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
