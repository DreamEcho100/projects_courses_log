const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (request, response, next) => {
	try {
		const jwtToken = request.header("token");

		if (!jwtToken) {
			return response.status(403).send("Not Authorize");
		}

		const payload = jwt.verify(jwtToken, process.env.jwtSecret);

		request.user = payload.user;
	} catch (error) {
		console.error(`Error, ${error}, ${error.message}`);
		response.status(403).send("Not Authorize");
	}

	next();
};
