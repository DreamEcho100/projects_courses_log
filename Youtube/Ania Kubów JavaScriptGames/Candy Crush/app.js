document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const scoreDisplay = document.getElementById("score");
	const width = 8;
	const squares = [];
	const firstRow = [];
	for (let i = 0; i < width; i++) {
		firstRow.push(i);
	}
	let score = 0;
	scoreDisplay.textContent = score;

	const candyColors = [
		"url(alternative-images/alternative-red.png)",
		"url(alternative-images/alternative-yellow.png)",
		"url(alternative-images/alternative-orange.png)",
		"url(alternative-images/alternative-purple.png)",
		"url(alternative-images/alternative-green.png)",
		"url(alternative-images/alternative-blue.png)",
	];

	// Create Board
	function createBoard() {
		const loopLimit = width * width;
		for (let i = 0; i < loopLimit; i++) {
			const square = document.createElement("div");
			square.classList.add("square");
			square.setAttribute("draggable", "true");
			square.setAttribute("id", i);
			let randomNum = Math.floor(Math.random() * candyColors.length);
			square.style.backgroundImage = candyColors[randomNum];
			grid.appendChild(square);
			squares.push(square);
		}
	}

	createBoard();

	// Drag the candies
	squares.forEach((square) =>
		square.addEventListener("dragstart", dragStart)
	);
	squares.forEach((square) => square.addEventListener("dragover", dragOver));
	squares.forEach((square) =>
		square.addEventListener("dragenter", dragEnter)
	);
	squares.forEach((square) =>
		square.addEventListener("dragleave", dragLeave)
	);
	squares.forEach((square) => square.addEventListener("drop", dragDrop));
	squares.forEach((square) => square.addEventListener("dragend", dragEnd));

	let colorBeingDragged,
		colorBeingReplaced,
		squareIdBeingDragged,
		squareIdBeingReplaced;
	/*replaceSquares*/

	function dragStart() {
		colorBeingDragged = this.style.backgroundImage;
		squareIdBeingDragged = parseInt(this.id);
	}

	function dragOver(e) {
		e.preventDefault();
	}

	function dragEnter(e) {
		e.preventDefault();
	}

	function dragLeave() {
		this.backgroundImage = "";
	}

	function dragDrop() {
		squareIdBeingReplaced = parseInt(this.id);
		colorBeingReplaced = this.style.backgroundImage;
		this.style.backgroundImage = colorBeingDragged;
		squares[
			squareIdBeingDragged
		].style.backgroundImage = colorBeingReplaced;
	}

	function dragEnd() {
		let validMoves = [
			squareIdBeingDragged - 1,
			squareIdBeingDragged - width,
			squareIdBeingDragged + 1,
			squareIdBeingDragged + width,
		];

		let validMove = validMoves.includes(squareIdBeingReplaced);

		if (squareIdBeingReplaced && validMove) {
			squareIdBeingReplaced = null;
		} else if (squareIdBeingReplaced && !validMove) {
			squares[
				squareIdBeingReplaced
			].style.backgroundImage = colorBeingReplaced;
			squares[
				squareIdBeingDragged
			].style.backgroundImage = colorBeingDragged;
		} else {
			squares[
				squareIdBeingDragged
			].style.backgroundImage = colorBeingDragged;
		}
	}

	// Drop candies once some have been cleared
	function moveDown() {
		for (let i = 0; i < 55; i++) {
			firstRow.forEach((idx) => {
				if (squares[idx].style.backgroundImage === "") {
					let randomNum = Math.floor(
						Math.random() * candyColors.length
					);
					squares[idx].style.backgroundImage = candyColors[randomNum];
				}
			});
			if (squares[i + width].style.backgroundImage === "") {
				squares[i + width].style.backgroundImage =
					squares[i].style.backgroundImage;
				squares[i].style.backgroundImage = "";

				const isFirstRow = firstRow.includes(i);
				if (isFirstRow && squares[i].style.backgroundImage === "") {
					let randomNum = Math.floor(
						Math.random() * candyColors.length
					);
					squares[i].style.backgroundImage = candyColors[randomNum];
				}
			}
		}
	}

	// Cheking for matches in a row of Num
	function checkRowForNum(num) {
		let notValidNumArray = [];
		for (let x = 1; x < width; x++) {
			for (let y = 0; y < num - 1; y++) {
				notValidNumArray.push(x * width - y - 1);
			}
		}
		const loopLimit = width * width - num + 1;
		for (let i = 0; i < loopLimit; i++) {
			if (notValidNumArray.includes(i)) continue;
			const rowOfNum = [];
			for (let j = 0; j < num; j++) {
				rowOfNum.push(i + j);
			}
			let decidedColor = squares[i].style.backgroundImage;
			const isBlank = squares[i].style.backgroundImage === "";

			if (
				rowOfNum.every(
					(idx) =>
						squares[idx].style.backgroundImage === decidedColor &&
						!isBlank
				)
			) {
				score += num;
				scoreDisplay.textContent = score;
				rowOfNum.forEach((idx) => {
					squares[idx].style.backgroundImage = "";
				});
			}
		}
	}

	function checkRows() {
		checkRowForNum(5);
		checkRowForNum(4);
		checkRowForNum(3);
	}

	// Cheking for matches for column of Num
	function checkColumnForNum(num) {
		const loopLimit = width * width - width * (num - 1);
		for (let i = 0; i < loopLimit; i++) {
			const columnOfNum = [];
			for (let j = 0; j < num; j++) {
				columnOfNum.push(i + width * j);
			}
			let decidedColor = squares[i].style.backgroundImage;
			const isBlank = squares[i].style.backgroundImage === "";
			let temp = columnOfNum.every(
				(idx) => squares[idx].style.backgroundImage === decidedColor
			);
			if (temp && !isBlank) {
				score += num;
				scoreDisplay.textContent = score;
				columnOfNum.forEach((idx) => {
					squares[idx].style.backgroundImage = "";
				});
			}
		}
	}

	function checkColumns() {
		checkColumnForNum(5);
		checkColumnForNum(4);
		checkColumnForNum(3);
	}

	//
	window.setInterval(() => {
		moveDown();
		checkRows();
		checkColumns();
	}, 350);
});
