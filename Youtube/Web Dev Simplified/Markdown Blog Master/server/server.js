require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const articleRouter = require('./routes/article');

const PORT = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL2, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Routes Middleware
app.get('/', (req, res) => {
	const articles = [
		{
			id: 1,
			createdAt: new Date(),
			slug: '',
			title: 'Test description 1',
			description: 'Test description 1',
		},
		{
			id: 2,
			createdAt: new Date(),
			slug: '',
			title: 'Test description 2',
			description: 'Test description 2',
		},
	];
	res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
