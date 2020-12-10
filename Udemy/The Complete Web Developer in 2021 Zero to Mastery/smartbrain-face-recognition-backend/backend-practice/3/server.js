const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const PORT = 3000;

const app = express();

const database = {
	users: [
		{
			id: "123",
			name: "John",
			email: "john@gmail.com",
			password: "cookies",
			entries: 0,
			joined: new Date()
		},
		{
			id: "124",
			name: "Sally",
			email: "sally@gmail.com",
			password: "bananas",
			entries: 0,
			joined: new Date()
		},
	]
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (request, response) => {
	response.send(database.users);
});

app.post("/signin", (request, response) => {
	const tempString = "$2a$10$zD60OX4NLzCWgGuhMU3SCO/Z7v3.FGNY9QsW0XSUEWZV4H/XbtSXe";
	bcrypt.compare("apples", tempString, (error, resualt) => {
		console.log("First guess", resualt);
	});
	bcrypt.compare("veggies", tempString, (error, resualt) => {
		console.log("First guess", resualt);
	});
	if(
		request.body.email === database.users[0].email &&
		request.body.password === database.users[0].password
	) {
		response.json("succes");
	} else {
		response.status(400).json("error logging in");
	}
	// {
 //    "id": "",
 //    "name": "",
 //    "email": "",
 //  }
});

app.post("/register", (request, response) => {
	const { name, email, password } = request.body;
	bcrypt.hash(password, null, null, (error, hash) => {
		console.log(hash);
	});
	const newUser = {
		id: "125",
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	}
	database.users.push(newUser);
	response.send(database.users[database.users.length - 1]);

// {
//   "name": "Ann",
//   "email": "ann@gmail.com",
//   "password": "apples"
// }

});

app.put("/image", (request, response) => {
	// {
	//   "id": 124
	// }
	const { id } = request.body;
	const user = database.users.find(user => {
		if (Number(user.id) === Number(id)) return user;
	});
  if (user) {
  	user.entries++;
  	response.json(user);
  } else {
  	response.status(404).json("no such user");
  }
});

app.listen(3000);