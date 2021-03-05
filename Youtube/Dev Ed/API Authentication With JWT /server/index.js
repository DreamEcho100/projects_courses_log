require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth/auth');
const postsRoute = require('./routes/posts/posts');

const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} /*,
	() => console.log('Connected to MongoDB')*/
);

// Routes Middleware
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
