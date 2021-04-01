const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidV4 } = require('uuid');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/node_modules/'));

app.get('/', (request, response) => {
	response.redirect(`/${uuidV4()}`);
});

app.get('/:room', (request, response) => {
	response.render('room', { roomId: request.params.room });
});

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
	cors: {
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		// origin: '*', // ['https://example.com', 'https://dev.example.com'],
		// methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		// allowedHeaders: ['my-custom-header'],
		// credentials: true
	},
});

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId) => {
		// console.log(roomId, userId);
		socket.join(roomId);
		socket.broadcast.to(roomId).emit('user-connected', userId);

		socket.on('disconnect', () => {
			socket.broadcast.to(roomId).emit('user-disconnected', userId);
		});
	});
});

httpServer.listen(PORT, () => console.log(`App is listening on PORT ${PORT}!`));
