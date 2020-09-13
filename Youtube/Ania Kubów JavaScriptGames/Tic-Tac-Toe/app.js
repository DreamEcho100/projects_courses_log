addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("#Tic-Tac-Toe-section .grid");
	const scoreDisplay = document.querySelector("#Tic-Tac-Toe-section .score");
	const width = 3;
	let score = 0;
	let squares = [];

	function buildBoard() {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div");
			grid.appendChild(square);
			squares.push(square);
		}
	}

	buildBoard();

});