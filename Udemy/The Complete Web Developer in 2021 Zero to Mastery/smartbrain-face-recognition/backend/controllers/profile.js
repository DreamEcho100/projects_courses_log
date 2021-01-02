const id = (request, response) => {
	const { id } = request.params;
	db.select('*')
		.from('users')
		.where({ id })
		.then(user => {
			if(user.length > 0) response.json(user[0]);
			else response.status(404).json("user not found");
		});
}

module.exports = {
	id
};