const express = require('express');
const cors = require('cors');
const pool = require('./db.js');
const PORT = 5000;

const app = express();

// Middlware //
app.use(cors());
app.use(express.json());

// Routes //

// register and login routes
app.use('/authentication', require('./routes/jwtAuth'));

app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, () => {
	console.log(`Listenning on localhost:${PORT}`);
});
