addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const scoreDisplay = document.getElementById("score");
	const width = 28; // 28 x 28 = 784 squares
	let score = 0;

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

				if ((pacmanCurrentIndex - 1) === 363) {
					pacmanCurrentIndex = 391;
				}
				
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
				
				if ((pacmanCurrentIndex + 1) === 392) {
					pacmanCurrentIndex = 364;
				}
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

		pacDotEaten();
		powerPelletEaten();
		checkGameOver();
		checkForWin();
	}
	document.addEventListener("keyup", movePacMan);

	function pacDotEaten() {
		if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
			score++;
			scoreDisplay.innerText = score;
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
		}
	}

	function powerPelletEaten() {
		if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
			score += 10;
			ghosts.forEach(ghost =>  ghost.isScared = true);
			setTimeout(unScarreGhosts, 10000);;
			squares[pacmanCurrentIndex].classList.remove("power-pellet");
		}
	}

	// Make the ghost stop being scared
	function unScarreGhosts() {
		ghosts.forEach(ghost => ghost.isScared = false);
	}


	// Create our Ghost template
	class Ghost {
		constructor(className, startIndex, speed) {
			this.className = className;
			this.startIndex = startIndex;
			this.speed = speed;
			this.currentIndex = startIndex;
			this.timerId = NaN;
			this.isScared = false;
		}
	}

	ghosts = [
	  new Ghost("blinky", 348, 250),
	  new Ghost("pinky", 376, 400),
	  new Ghost("inky", 351, 300),
	  new Ghost("clyde", 379, 500)
	];

	// Draw the ghosts onto the grid
	ghosts.forEach(ghost => {
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add("ghost");
	});

	// Move the ghost randomly
	ghosts.forEach( ghost => moveGhost(ghost));

	// Write the function to move the ghosts
	function moveGhost(ghost) {
		const directions = [-1, +1, width, -width];
		let direction = directions[Math.floor(Math.random() * directions.length)];

		ghost.timerId = setInterval(() => {
			// If the next squre your ghost is going to go to does not have a ghost and does not have a wall
			if (
				!squares[ghost.currentIndex + direction].classList.contains("ghost") &&
				!squares[ghost.currentIndex + direction].classList.contains("wall")
				) {
				// Remove the ghosts classes
			squares[ghost.currentIndex].classList.remove(ghost.className);
			squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
			// Move into that space
			ghost.currentIndex += direction;
			squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
			}
			// Else find a new random direction ot go in
			else direction = directions[Math.floor(Math.random() * directions.length)];

			//if the ghost is currently scared
			if (ghost.isScared) {
				squares[ghost.currentIndex].classList.add("scared-ghost");
			}

			// If the ghost is currently scared and pacman is on it
			if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
				squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
				ghost.currentIndex = ghost.startIndex;
				score += 100;
				squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
			}

			checkGameOver();
		}, ghost.speed);
	}

	// Check for a game over
	function checkGameOver() {
		if (
			squares[pacmanCurrentIndex].classList.contains("ghost") &&
			!squares[pacmanCurrentIndex].classList.contains("scared-ghost")
		) {
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keyup", movePacMan);
			scoreDisplay.innerText = "GAME OVER!";
		}
	}

	function checkForWin() {
		if (score === 200) {
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keyup", movePacMan);
			scoreDisplay.innerText = "You Win";
		}
	}



});
