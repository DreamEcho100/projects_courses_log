require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { response, request } = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', require('./routes/todos'));

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
