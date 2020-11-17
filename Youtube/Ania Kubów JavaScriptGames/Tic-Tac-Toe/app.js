document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("#Tic-Tac-Toe-section .grid");
	const scoreDisplay = document.querySelector("#Tic-Tac-Toe-section .score");
	const playerDisplay = document.querySelector("#Tic-Tac-Toe-section .player");
	const line = document.querySelector("#Tic-Tac-Toe-section .line");
	const currentPlayer = {
		state: "playing",
		size: 2,
		counter: 0,
		players: {
			0: {
				player: "playerX",
				combo: {}
			},
			1: {
				player: "playerO",
				combo: {}
			},
		},
		numberOfChoosedSquares: 0,
	};
	const width = 3;
	let squares = [];
	let horizontalCombination = [];
	let verticalCombination = [];
	let diagonalCombination = [];

	function buildBoard() {
		grid.innerHTML = "";
		playerDisplay.innerText = currentPlayer.players[currentPlayer.counter].player;
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div");
			square.number = i;
			grid.appendChild(square);
			squares.push(square);
		}
	}

	buildBoard();

	function combinationsArraysBuilder() {
		let counter1 = -1;
		for (let i = 0; i < width; i++) {
			horizontalCombination.push([]);
			for (let j = 0; j < width; j++) {
				counter1++;
				horizontalCombination[i].push(counter1);
			}
		}

		let counter2 = 0;
		for (let i = 0; i < width; i++) {
			counter2 = i;
			verticalCombination.push([]);
			for (let j = 0; j < width; j++) {
				verticalCombination[i].push(counter2);
				counter2 += 3;
			}
		}

		let counter3 = 0;
		let counter3Direction = -1;
		let counterIncrement = [4, 2];
		for (let i = 0; i < width - 1; i++) {
			diagonalCombination.push([]);
			for (let j = 0; j < width; j++) {
				diagonalCombination[i].push(counter3);
				counter3 += counterIncrement[i];
			}
			counter3 = counter3 / width - (width - 1);
		}
	}

	combinationsArraysBuilder();

	squares.forEach((square) => square.addEventListener("click", clickOutcome));

	function clickOutcome(event) {
		if (!event.target.classList.contains("choosed")) {
			event.target.classList.add(playerDisplay.innerText, "choosed");
			currentPlayer.players[currentPlayer.counter].combo[event.target.number] = true;
			currentPlayer.numberOfChoosedSquares++;
			if (currentPlayer.numberOfChoosedSquares >= 3) {
				checkForPossibleCombination(currentPlayer.players[currentPlayer.counter]);
			}

			if (currentPlayer.state === "playing") {
				currentPlayer.counter =
				currentPlayer.counter + 1 === currentPlayer.size ?
				0 :
				currentPlayer.counter + 1;
				playerDisplay.innerText = currentPlayer.players[currentPlayer.counter].player;
			}

		}
	}

	function checkForPossibleCombination(current) {
		checkForHorizontalCombination(current.player, current.combo);
		checkForVerticalCombination(current.player, current.combo);
		checkForDiagonalCombination(current.player, current.combo);
		checkForTie();
	}

	// Check for horizontal combinations
	function checkForHorizontalCombination(player, combo) {
		// horizontalCombination[0] = [0, 1, 2];
		// horizontalCombination[1] = [3, 4, 5];
		// horizontalCombination[2] = [6, 7, 8];
		const combos = {
			0: horizontalCombination[0],
			1: horizontalCombination[1],
			2: horizontalCombination[2],
		}

		for (let array in combos) {
			if (combos[array].every(item => combo[item] === true)) {
				horizontalLineDisplay(squares[combos[array][0]], player);
				return;
			}
	
		}
	}

	function horizontalLineDisplay(lineStart, playerName) {
		playerDisplay.innerText = `${playerName} Won!`;
		line.style.top = `${lineStart.offsetTop + lineStart.offsetWidth / 2}px`;
		line.style.left = `${lineStart.offsetLeft + 1.5}px`;
		line.style.width = `${lineStart.offsetWidth * 3}px`;
		line.style.padding = `${lineStart.offsetWidth / 18}px`;
		line.style.transform = `translateY(-50%)`;
		squares.forEach((square) =>
			square.removeEventListener("click", clickOutcome)
		);
		currentPlayer.state = `${playerName} Won!`;
	}

	// Check for vertical combinations
	function checkForVerticalCombination(player, combo) {
		// verticalCombination[0] = [0, 3, 6];
		// verticalCombination[1] = [1, 4, 7];
		// verticalCombination[2] = [2, 5, 8];
		const combos = {
			0: verticalCombination[0],
			1: verticalCombination[1],
			2: verticalCombination[2],
		}

		for (let array in combos) {
			if (combos[array].every(item => combo[item] === true)) {
				verticalLineDisplay(squares[combos[array][0]], player);
				return;
			}
	
		}
	}

	function verticalLineDisplay(lineStart, playerName) {
		playerDisplay.innerText = `${playerName} Won!`;
		line.style.top = `${2.5}px`;
		line.style.left = `${
			lineStart.offsetLeft + lineStart.offsetHeight / 2
		}px`;
		line.style.height = `${lineStart.offsetHeight * 3}px`;
		line.style.padding = `${lineStart.offsetHeight / 18}px`;
		line.style.transform = `translateX(-50%)`;
		squares.forEach((square) =>
			square.removeEventListener("click", clickOutcome)
		);
		currentPlayer.state = `${playerName} Won!`;
	}
	
	// Check for Diagonal combinations
	function checkForDiagonalCombination(player, combo) {
		// diagonalCombination[0] = [0, 4, 8];
		// diagonalCombination[1] = [2, 4, 6];
		let direction;
		const combos = {
			0: {combo: diagonalCombination[0], direction: 1},
			1: {combo: diagonalCombination[1], direction: -1},
		}

		for (let array in combos) {
			if (combos[array].combo.every(item => combo[item] === true)) {
				diagonalLineDisplay(squares[combos[array].combo[0]], player, combos[array].direction);
				return;
			}
	
		}
	}

	function diagonalLineDisplay(lineStart, playerName, direction) {
		playerDisplay.innerText = `${playerName} Won!`;
		line.style.top = `${lineStart.offsetTop + 1.5}px`;
		if (direction === 1) {
			line.style.transform = `translateX(${
				lineStart.offsetWidth * 1.5
			}px) rotate(${-45 * direction}deg)`;
		} else if (direction === -1) {
			line.style.transform = `translateX(${
				lineStart.offsetWidth * 1.5
			}px) rotate(${-45 * direction}deg)`;
		}
		line.style.height = `${lineStart.offsetHeight * 3}px`;
		line.style.padding = `${lineStart.offsetHeight / 18}px`;
		squares.forEach((square) =>
			square.removeEventListener("click", clickOutcome)
		);
		currentPlayer.state = `${playerName} Won!`;
	}

	// Check for a tie
	function checkForTie() {
		if (!squares.every((square) => square.classList.contains("choosed")))
			return;
		squares.forEach((square) =>
			square.removeEventListener("click", clickOutcome)
		);
		playerDisplay.innerText = `Tie between playerX&playerO!`;
		currentPlayer.state = `Tie between playerX&playerO!`;
	}
});
