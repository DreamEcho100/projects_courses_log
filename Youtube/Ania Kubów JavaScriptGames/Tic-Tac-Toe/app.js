addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("#Tic-Tac-Toe-section .grid");
	const scoreDisplay = document.querySelector("#Tic-Tac-Toe-section .score");
	const playerDisplay = document.querySelector("#Tic-Tac-Toe-section .player");
	const line = document.querySelector("#Tic-Tac-Toe-section .line");
	const width = 3;
	let score = 0;
	let squares = [];
	let horizontalCombination = [];
	let verticalCombination = [];
	let diagonalCombination = [];

	function buildBoard() {
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

		let	counter2 = 0;
		for (let i = 0; i < width; i++) {
			counter2 = i;
			verticalCombination.push([]);
			for (let j = 0; j < width; j++) {
				verticalCombination[i].push(counter2);
				counter2 += 3;
			}
		}

		let	counter3 = 0;
		let	counter3Direction = -1;
		let counterIncrement = [4, 2]
		for (let i = 0; i < width - 1; i++) {
			diagonalCombination.push([]);
			for (let j = 0; j < width; j++) {
				diagonalCombination[i].push(counter3);
				counter3 += counterIncrement[i];
			}
			counter3 = (counter3 / width) - (width - 1);
		}

		console.log(horizontalCombination, verticalCombination, diagonalCombination);
	}

	combinationsArraysBuilder();

	squares.forEach(square => square.addEventListener("click", clickOutcome));

	function clickOutcome(e) {
		//const squaresArray = Array.from(squares);
		const index = squares.indexOf(e.target);
		if (e.target.classList.contains("choosed")) return;
		currentPlayer = ({
			"playerX": "playerO",
			"playerO": "playerX"
		}[playerDisplay.innerText]);
		playerDisplay.innerText = currentPlayer;
		squares[index].classList.add(currentPlayer, "choosed");

		checkForPossibleCombination();
	}

	function checkForPossibleCombination() {
		let playerXCombo = [];
		let playerOCombo = [];
		squares.forEach(square => {
			if (!square.classList.contains("choosed")) return

			if (square.classList.contains("playerX")) {
				return playerXCombo.push(square.number);
			} else if (square.classList.contains("playerO")) {
				return playerOCombo.push(square.number);
			}
		});

		console.log(playerXCombo, playerOCombo);

		

		checkForHorizontalCombination(playerXCombo, "playerX");
		checkForHorizontalCombination(playerOCombo, "playerO");
		checkForVerticalCombination(playerXCombo, "playerX");
		checkForVerticalCombination(playerOCombo, "playerO");
		checkForDiagonalCombination(playerXCombo, "playerX");
		checkForDiagonalCombination(playerOCombo, "playerO");
	}

	// Check for horizontal combinations
	function checkForHorizontalCombination(player, playerName) {
		// const firstCombo = [0, 1, 2];
		// const secondCombo = [3, 4, 5];
		// const thirdCombo = [6, 7, 8];
		const firstCombo = horizontalCombination[0];
		const secondCombo = horizontalCombination[1];
		const thirdCombo = horizontalCombination[2];

		firstCombo.forEach(item => {
			if (!firstCombo.every(i => player.indexOf(i) !== -1)) return;
			horizontalLineDisplay(squares[firstCombo[0]], playerName);
		});

		secondCombo.forEach(item => {
			if (!secondCombo.every(i => player.indexOf(i) !== -1)) return;
			horizontalLineDisplay(squares[secondCombo[0]], playerName);
		});

		thirdCombo.forEach(item => {
			if (!thirdCombo.every(i => player.indexOf(i) !== -1)) return;
			horizontalLineDisplay(squares[thirdCombo[0]], playerName);
		});
	}

	function horizontalLineDisplay(lineStart, playerName) {
		playerDisplay.innerText = `${playerName} Won!`;
		line.style.top = `${lineStart.offsetTop + (lineStart.offsetWidth / 2)}px`;
		line.style.left = `${lineStart.offsetLeft + 1.5}px`;
		line.style.width = `${lineStart.offsetWidth * 3}px`;
		line.style.padding = `${lineStart.offsetWidth / 18}px`;
		line.style.transform = `translateY(-50%)`;
		squares.forEach(square => square.removeEventListener("click", clickOutcome));
	}

	// Check for vertical combinations
	function checkForVerticalCombination(player, playerName) {
		// const firstCombo = [0, 3, 6];
		// const secondCombo = [1, 4, 7];
		// const thirdCombo = [2, 5, 8];
		const firstCombo = verticalCombination[0];
		const secondCombo = verticalCombination[1];
		const thirdCombo = verticalCombination[2];

		firstCombo.forEach(item => {
			if (!firstCombo.every(i => player.indexOf(i) !== -1)) return;
			verticalLineDisplay(squares[firstCombo[0]], playerName);
		});

		secondCombo.forEach(item => {
			if (!secondCombo.every(i => player.indexOf(i) !== -1)) return;
			verticalLineDisplay(squares[secondCombo[0]], playerName);
		});

		thirdCombo.forEach(item => {
			if (!thirdCombo.every(i => player.indexOf(i) !== -1)) return;
			verticalLineDisplay(squares[thirdCombo[0]], playerName);
		});
	}

	function verticalLineDisplay(lineStart, playerName) {
		playerDisplay.innerText = `${playerName} Won!`;
		line.style.top = `${2.5}px`;
		line.style.left = `${lineStart.offsetLeft + (lineStart.offsetHeight / 2)}px`;
		line.style.height = `${lineStart.offsetHeight * 3}px`;
		line.style.padding = `${lineStart.offsetHeight / 18}px`;
		line.style.transform = `translateX(-50%)`;
		squares.forEach(square => square.removeEventListener("click", clickOutcome));
	}

	// Check for Diagonal combinations
	function checkForDiagonalCombination(player, playerName) {
		// const firstCombo = [0, 4, 8];
		// const secondCombo = [2, 4, 6];
		const firstCombo = diagonalCombination[0];
		const secondCombo = diagonalCombination[1];
	}

	function diagonalLineDisplay(lineStart, playerName) {
		// body...
	}

});