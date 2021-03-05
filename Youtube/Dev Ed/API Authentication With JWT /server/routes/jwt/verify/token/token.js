const jsonwebtoken = require('jsonwebtoken');

module.exports = (request, response, next) => {
	try {
		const token = request.header('auth-token');
		if (!token) {
			return response.status(401).send('Access Denied');
		}

		const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
		request.user = verified;
		// console.log(request.user);
		next();
	} catch (error) {
		response.status(404).json({ message: error });
	}
};
