addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("#Tic-Tac-Toe-section .grid");
	const scoreDisplay = document.querySelector("#Tic-Tac-Toe-section .score");
	const playerDisplay = document.querySelector("#Tic-Tac-Toe-section .player");
	const line = document.querySelector("#Tic-Tac-Toe-section .line");
	const width = 3;
	let score = 0;
	let squares = [];

	function buildBoard() {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div");
			square.number = i;
			grid.appendChild(square);
			squares.push(square);
		}
	}

	buildBoard();

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
		let playerYCombo = [];
		squares.forEach(square => {
			if (!square.classList.contains("choosed")) return

			if (square.classList.contains("playerX")) {
				return playerXCombo.push(square.number);
			} else if (square.classList.contains("playerO")) {
				return playerYCombo.push(square.number);
			}
		});

		console.log(playerXCombo, playerYCombo);

		

		checkForHorizontalCombination(playerXCombo, "playerX");
		checkForHorizontalCombination(playerYCombo, "playerY");
		checkForVerticalCombination(playerXCombo, "playerX");
		checkForVerticalCombination(playerYCombo, "playerY");
		checkForDiagonalCombination(playerXCombo, "playerX");
		checkForDiagonalCombination(playerYCombo, "playerY");
	}

	// Check for horizontal combinations
	function checkForHorizontalCombination(player, playerName) {
		const firstCombo = [0, 1, 2];
		const secondCombo = [3, 4, 5];
		const thirdCombo = [6, 7, 8];

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
		const firstCombo = [0, 3, 6];
		const secondCombo = [1, 4, 7];
		const thirdCombo = [2, 5, 8];

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
		// body...
	}

	function diagonalLineDisplay(lineStart, playerName) {
		// body...
	}
});