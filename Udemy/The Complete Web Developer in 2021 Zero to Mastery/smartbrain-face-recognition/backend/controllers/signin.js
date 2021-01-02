const signin = (db, bcrypt) => (request, response) => {
	const { email, password } = request.body;
	if (
    (!email || email.length < 0) ||
    (!password || password.length < 8 || password.length > 64)
  ) return response.status(400).json("wrong credentials...");
		
	db
		.select("email", 'hash')
		.from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				return db
					.select('*')
					.from('users')
					.where('email', '=', email)
					.then(user => {
						response.json(user[0]);
					})
					.catch(error => response.status(400).json("unable to get user..."));
			} else {
				response.status(400).json("wrong credentials...");
			}
		})
		.catch(error => response.status(400).json("wrong credentials..."));
}

module.exports = {
	signin
};