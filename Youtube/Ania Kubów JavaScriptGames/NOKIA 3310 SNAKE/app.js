document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector('#NOKIA-3310-SNAKE-section .grid');
	const startBtn = document.querySelector('#NOKIA-3310-SNAKE-section .start');
	const scoreDisplay = document.querySelector('#NOKIA-3310-SNAKE-section .score');
	let squares = [];

	function buildBoard() {
		let snakeAndAppleCoordinates = {
			"0": "snake",
			"47": "apple",
		}
		for (let i = 0; i < 100; i++) {
			const square = document.createElement("div");
			square.className = (snakeAndAppleCoordinates[i]);
			grid.appendChild(square);
			squares.push(square)
		}
	}

	buildBoard();

	const width = 10;
	let currentIndex = 0;
	let appleIndex = 47;
	let currentSnake = [2, 1, 0] // 2 = Head, 1 = Body, 0 = Tail
	let direction = 1;
	let score = 0;
	let speed = 0.95;
	let intervalTime = 200;
	let interval = 0;

	document.addEventListener("keyup", controls);
	startBtn.addEventListener("click", startGame);

	// To start, and restart the game
	function startGame() {
		currentSnake.forEach(index => squares[index].classList.remove("snake"));
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		randomApple();
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 200;
		currentSnake = [2, 1, 0];
		currentIndex = 0;
		currentSnake.forEach(index => squares[index].classList.add("snake"));
		interval = setInterval(moveOutcomes, intervalTime);
	}

	// Function that deals with ALL the ove outcomes of the Snake
	function moveOutcomes() {
		// Deals with snake hitting border and snake hitting self
		if (
			(currentSnake[0] % width === width - 1 && direction === 1) || // If snake hits RIGHT wall
			(currentSnake[0] - width < 0 && direction === -width) || // If snake hits TOP wall
			(currentSnake[0] % width === 0 && direction === -1) || // If snake hits LEFT wall
			(currentSnake[0] + width >= (width * width) && direction === width) || // If snake hits BOTTOM wall
			squares[currentSnake[0] + direction].classList.contains("snake") // If snake goes into itself
		) {
			return clearInterval(interval)
		}

		const tail = currentSnake.pop(); // Removes last ite of the array and shows it
		squares[tail].classList.remove("snake"); // Removes class of snake from the TAIL
		currentSnake.unshift(currentSnake[0] + direction); // Gives direction to the head of the array

		// Deals with snake getting apple
		if(squares[currentSnake[0]].classList.contains("apple")) {
			squares[currentSnake[0]].classList.remove("apple");
			squares[tail].classList.add("snake");
			currentSnake.push(tail);
			randomApple();
			score++;
			scoreDisplay.innerText = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime);
		}

		squares[currentSnake[0]].classList.add("snake");

	}

	// Generate new apple once apple is eaten
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while(squares[appleIndex].classList.contains("snake"))
		squares[appleIndex].classList.add("apple");
	}

	// Assign function to keycodes
	function controls(e) {
		squares[currentIndex].classList.remove("snake");

		direction = ({ // Arrows
			"39": 1, // Right
			"38": -width, // Up
			"37": -1, // Left
			"40": width, //Down
		}[e.keyCode] || direction);
	}

});