const { Engine, Render, Runner, World, Bodies, Body } = Matter;
const width = 600;
const height = 600;
const cells = 15;

const unitLength = width / cells;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: true,
		width,
		height
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls

const walls = [
	// Bodies.rectangle(x, y, w, h { isStatic: true }),
	Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }), // Right wall
	Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }), // Left wall
	Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }), // Top wall
	Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }), // Bottom wall
];
World.add(world, walls);

// Maze initilization
function arrayBuilder(size, innerSize, fillWith) {
	if (isNaN(size)) return console.error("Type Error,\nArgments type must be a number!");
	return Array(size).fill(null).map(() => Array(innerSize).fill(fillWith));
}

const grid = arrayBuilder(cells, cells, false);
const verticals = arrayBuilder(cells, (cells - 1), false);
const horizontals = arrayBuilder((cells - 1), cells, false);

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const shuffleArray = (array) => {
	const newArray = array.slice();
	let counter = newArray.length;

	while (counter > 0) {
		const randomIndex = Math.floor(Math.random() * counter);

		counter--;

		// [ newArray[counter], newArray[randomIndex] ] = [ newArray[randomIndex], newArray[counter] ];
    const temp = newArray[counter];
    newArray[counter] = newArray[randomIndex];
    newArray[randomIndex] = temp;
	}

	return newArray;
}

const stepThroughCells = (row, column) => {

	// If I have the cell at [row, column], then return
	if (grid[row][column]) return;

	// Mark this cell as being visited
	grid[row][column] = true;

	// Assemble randomly-ordered list of neighbors
	const neighbors = shuffleArray([
			[row - 1, column, 'up'], 
			[row, column + 1, 'right'], 
			[row + 1, column, 'down'], 
			[row, column - 1, 'left'] 
		]);

	// For each neighbor...
	for (let neighbor of neighbors) {
		const [nextRow, nextColumn, direction] =  neighbor;

		// See if that neighbor is out of bounds
		if (
			nextRow < 0 ||
			nextRow >= cells ||
			nextColumn < 0 ||
			nextColumn >= cells
		) {
			continue;
		}

		// If we have visited that neighbor, continue to the next neighbor
		if (grid[nextRow][nextColumn]) {
			continue;
		}

		// Remove a wall from either horizontals or verticals
		if (direction === 'left') {
			verticals[row][column - 1] = true;
		} else if (direction === 'right') {
			verticals[row][column] = true;
		} else if (direction === 'up') {
			horizontals[row - 1][column] = true;
		} else if (direction === 'down') {
			horizontals[row][column] = true;
		}

		stepThroughCells(nextRow, nextColumn);
	}

	// Visit that next cell

}

stepThroughCells(startRow, startColumn);

const wallWidth = 10;

horizontals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) return;

		const walls = Bodies.rectangle(
			(columnIndex * unitLength) + (unitLength / 2),
			(rowIndex * unitLength) + unitLength,
			unitLength,
			wallWidth,
			{
				isStatic: true
			}
		);
		World.add(world, walls);
	})
});

verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) return;

		const walls = Bodies.rectangle(
			(columnIndex * unitLength) + unitLength,
			(rowIndex * unitLength) + (unitLength / 2),
			wallWidth,
			unitLength,
			{
				isStatic: true
			}
		);
		World.add(world, walls);
	})
});

const goal = Bodies.rectangle(
	width - (unitLength / 2),
	height - (unitLength / 2),
	unitLength * 0.7,
	unitLength * 0.7,
	{
		isStatic: true
	}
);
World.add(world, goal);

const ball = Bodies.circle(
	unitLength / 2,
	unitLength / 2,
	unitLength / 4,
	{
		isStatic: false
	}
);
World.add(world, ball);

const ballSpeed = 3;

document.addEventListener("keydown", (event) => {
	const { x, y } = ball.velocity;
	if (event.keyCode === 87) { // w
		Body.setVelocity(ball, { x, y: y - ballSpeed });
	} else if (event.keyCode === 68) { // d
		Body.setVelocity(ball, { x: x + ballSpeed, y });
	} else if (event.keyCode === 83) { // s
		Body.setVelocity(ball, { x, y: y + ballSpeed });		
	} else if (event.keyCode === 65) { // a
		Body.setVelocity(ball, { x: x - ballSpeed, y });		
	}
});

// Win Condation


// console.table({
// 	"lol": "bruh",
// 	startRow,
// 	startColumn,
// 	grid ,
// 	verticals ,
// 	horizontals
// });