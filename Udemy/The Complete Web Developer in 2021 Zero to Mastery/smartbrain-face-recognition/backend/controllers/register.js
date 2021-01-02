const register = (db, bcrypt) => (request, response) => {
	const { name, email, password } = request.body;
	if (
    (!name || name.length < 8 || name.length > 64) ||
    (!email || email.length < 0) ||
    (!password || password.length < 8 || password.length > 64)
  ) return response.status(400).json("wrong credentials...");
		
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			db('users')
				.returning('*')
				.insert({
					name: name,
					email: loginEmail[0],
					joined: new Date()
				})
				.then(user => response.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(error => response.status(400).json("unable to register..."));
}

module.exports = {
	register
}