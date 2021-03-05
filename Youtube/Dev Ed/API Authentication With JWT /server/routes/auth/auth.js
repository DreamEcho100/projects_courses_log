const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../../models/User/User');
const validateUserRegister = require('../../validate/user/register/register');
const validateUserLogin = require('../../validate/user/login/login');

router.post('/register', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const { error } = validateUserRegister({ name, email, password });
		if (error) return response.status(404).json(error.details[0].message);

		const emailExit = await User.findOne({ email });
		if (emailExit) {
			return response.status(404).json('Email already exists!');
		}

		// Hash passwords
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user
		const user = new User({
			name,
			email,
			password: hashedPassword,
		});

		const savedUser = await user.save();
		response.json({ id: savedUser._id });
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

router.post('/login', async (request, response) => {
	try {
		const { email, password } = request.body;

		const { error } = validateUserLogin({ email, password });
		if (error) return response.status(404).json(error.details[0].message);

		const user = await User.findOne({ email });
		if (!user) {
			return response.status(404).json('Email is not found!');
		}
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return response.status(404).json('Invalid Password!');
		}

		// Create and assign a token
		const token = jsonwebtoken.sign({ id: user._id }, process.env.TOKEN_SECRET);
		response.header('auth-token', token).json(token);
	} catch (error) {
		response.status(404).json({ message: error });
	}
});

module.exports = router;
