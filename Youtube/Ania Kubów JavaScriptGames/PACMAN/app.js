addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const scoreDisplay = document.getElementById("score");
	const width = 28; // 28 x 28 = 784 squares

	// Layout of grid and what is in the squares
	const layout = [
	  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
	  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
	  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
	  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
	  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
	  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
	  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
	  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
	  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
	  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
	  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
	  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
	  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
	  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
	  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
	  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
	  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
	  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
	  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
	];
	// 0 - pac-dot
	// 1 - wall
	// 2 - ghost-lair
	// 3 - power-pellet
	// 4 - empty

	const squares = [];

	// Create your board
	function createBoard() {
		for (let i = 0; i < layout.length; i++) {
			const square = document.createElement("div");
			grid.appendChild(square);
			squares.push(square);

			// Add layout to the board
			squares[i].classList.add(
				{
					0: "pac-dot",
					1: "wall",
					2: "ghost-lair",
					3: "power-pellet",
				}[layout[i]]
			);
		}
	}

	createBoard();

	//create Characters
	//draw pacman onto the board
	let pacmanCurrentIndex = 490;
	squares[pacmanCurrentIndex].classList.add("pac-man");
	//get the coordinates of pacman on the grid with X and Y axis
	// function getCoordinates(index) {
	//   return [index % width, Math.floor(index / width)]
	// }
	// console.log(getCoordinates(width * width));

	// Move pac-man
	function movePacMan(e) {
		squares[pacmanCurrentIndex].classList.remove("pac-man");

		switch (e.keyCode) {
			case 37:
				if (
					pacmanCurrentIndex % width !== 0 &&
					!squares[pacmanCurrentIndex - 1].classList.contains(
						"wall"
					) &&
					!squares[pacmanCurrentIndex - 1].classList.contains(
						"ghost-lair"
					)
				)
					pacmanCurrentIndex -= 1;
				break;
			case 38:
				if (
					pacmanCurrentIndex - width >= 0 &&
					!squares[pacmanCurrentIndex - width].classList.contains(
						"wall"
					) &&
					!squares[pacmanCurrentIndex - width].classList.contains(
						"ghost-lair"
					)
				)
					pacmanCurrentIndex -= width;
				break;
			case 39:
				if (
					pacmanCurrentIndex % width < width - 1 &&
					!squares[pacmanCurrentIndex + 1].classList.contains(
						"wall"
					) &&
					!squares[pacmanCurrentIndex + 1].classList.contains(
						"ghost-lair"
					)
				)
					pacmanCurrentIndex += 1;
				break;
			case 40:
				if (
					pacmanCurrentIndex + width < width * width &&
					!squares[pacmanCurrentIndex + width].classList.contains(
						"wall"
					) &&
					!squares[pacmanCurrentIndex + width].classList.contains(
						"ghost-lair"
					)
				)
					pacmanCurrentIndex += width;
				break;
		}

		squares[pacmanCurrentIndex].classList.add("pac-man");
	}

	document.addEventListener("keyup", movePacMan);
});
