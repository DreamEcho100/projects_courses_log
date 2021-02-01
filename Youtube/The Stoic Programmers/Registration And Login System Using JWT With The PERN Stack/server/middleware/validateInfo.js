const { response } = require("express");

module.exports = (request, response, next) => {
	const { name, email, password } = request.body;

	const validateEmail = (userEmail) => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
	};

	/*if (request.path === "/register") {
		if (![email, name, password].every(Boolean)) {
			console.log(![email, name, password].every(Boolean));
			return response.status(401).json("Missing Credentials");
		} else if (!validateEmail(email)) {
			return response.status(401).json("Invalid Email");
		}
	} else if (request.path === "/login") {
		if (![email, password].every(Boolean)) {
			return response.status(401).json("Missing Credentials");
		} else if (!validateEmail(email)) {
			return response.status(401).json("Invalid Email");
		}
	}*/

	const noSuchRoute = () => {
		return response.json("No such Route exist!");
	};
	const existingRoutes = {
		"/register": () => {
			if (![email, name, password].every(Boolean)) {
				return response.status(401).json("Missing Credentials");
			} else if (!validateEmail(email)) {
				return response.status(401).json("Invalid Email");
			}
		},
		"/login": () => {
			if (![email, password].every(Boolean)) {
				return response.status(401).json("Missing Credentials");
			} else if (!validateEmail(email)) {
				return response.status(401).json("Invalid Email");
			}
		},
	};
	(existingRoutes[request.path] || noSuchRoute)();

	next();
};
