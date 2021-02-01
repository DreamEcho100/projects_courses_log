const router = require("express").Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validateInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");

// register  route
router.post("/register", validateInfo, async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);
		if (user.rows.length !== 0) {
			return response.status(401).send("User already exist");
		}

		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);
		const bcryptPassword = await bcrypt.hash(password, salt);

		const newUser = await pool.query(
			"INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, bcryptPassword]
		);

		const token = jwtGenerator(newUser.rows[0].user_id);

		response.json({ token });
	} catch (error) {
		console.error(`Error, ${error}`);
		response.status(500).send("Server Error");
	}
});

// login route
router.post("/login", validateInfo, async (request, response) => {
	try {
		const { email, password } = request.body;

		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);
		if (user.rows.length === 0) {
			return response.status(401).send("User doesn't exist!");
		}

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);
		if (!validPassword) {
			return response.status(401).send("The password is wrong!");
		}

		const token = jwtGenerator(user.rows[0].user_id);

		response.json({ token });
	} catch (error) {
		console.error(`Error, ${error}`);
		response.status(500).send("Server Error");
	}
});

router.get("/is-verify", authorization, async (request, response) => {
	try {
		console.log(request.header("token"));
		response.json(true);
	} catch (error) {
		console.error(`Error, ${error}`);
		response.status(500).send("Server Error");
	}
});

module.exports = router;
