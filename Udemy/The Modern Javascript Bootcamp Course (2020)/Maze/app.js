const { Engine, Render, Runner, World, Bodies, Body, Events, Mouse, MouseConstraint } = Matter;
const width = document.body.clientWidth - (document.body.clientWidth * 0.02);
const height = document.body.clientHeight - (document.body.clientHeight * 0.02);
// const cells = 6;
const cellsHorizontal = 15;
const cellsVertical = 20;

// const unitLength = width / cells;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Enabling mouse drag movement for none static bodies
World.add(world, MouseConstraint.create(engine, {
	mouse: Mouse.create(render.canvas)
}));

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

const grid = arrayBuilder(cellsVertical, cellsHorizontal, false);
const verticals = arrayBuilder(cellsVertical, (cellsHorizontal - 1), false);
const horizontals = arrayBuilder((cellsVertical - 1), cellsHorizontal, false);

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const shuffleArray = (array) => {
	const newArray = array.slice();
	let counter = newArray.length;

	while (counter > 0) {
		const randomIndex = Math.floor(Math.random() * counter);

		counter--;

		[ newArray[counter], newArray[randomIndex] ] = [ newArray[randomIndex], newArray[counter] ];
    // const temp = newArray[counter];
    // newArray[counter] = newArray[randomIndex];
    // newArray[randomIndex] = temp;
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
			nextRow >= cellsVertical ||
			nextColumn < 0 ||
			nextColumn >= cellsHorizontal
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
			(columnIndex * unitLengthX) + (unitLengthX / 2),
			(rowIndex * unitLengthY) + unitLengthY,
			unitLengthX,
			wallWidth,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: "orange"
				}
			}
		);
		World.add(world, walls);
	})
});

verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) return;

		const walls = Bodies.rectangle(
			(columnIndex * unitLengthX) + unitLengthX,
			(rowIndex * unitLengthY) + (unitLengthY / 2),
			wallWidth,
			unitLengthY,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: "orange"
				}
			}
		);
		World.add(world, walls);
	})
});

const goal = Bodies.rectangle(
	width - (unitLengthX / 2),
	height - (unitLengthY / 2),
	unitLengthX * 0.7,
	unitLengthY * 0.7,
	{
		label: 'goal',
		isStatic: true,
		render: {
			fillStyle: "lightgreen"
		}
	}
);
World.add(world, goal);

const ball = Bodies.circle(
	unitLengthX / 2,
	unitLengthY / 2,
	Math.min(unitLengthX, unitLengthY) / 3,
	{
		label: 'ball',
		isStatic: false,
		render: {
			fillStyle: "lightblue"
		}
	}
);
World.add(world, ball);

const ballSpeed = 3;

function returnUndefined() {
	return undefined;
}

document.addEventListener("keydown", (event) => {
	const { x, y } = ball.velocity;
	// if (event.keyCode === 87) { // w
	// 	Body.setVelocity(ball, { x, y: y - ballSpeed });
	// } else if (event.keyCode === 68) { // d
	// 	Body.setVelocity(ball, { x: x + ballSpeed, y });
	// } else if (event.keyCode === 83) { // s
	// 	Body.setVelocity(ball, { x, y: y + ballSpeed });		
	// } else if (event.keyCode === 65) { // a
	// 	Body.setVelocity(ball, { x: x - ballSpeed, y });		
	// }
	({
		87: () => Body.setVelocity(ball, { x, y: y - ballSpeed }),
		38: () => Body.setVelocity(ball, { x, y: y - ballSpeed }),
		68: () => Body.setVelocity(ball, { x: x + ballSpeed, y }),
		39: () => Body.setVelocity(ball, { x: x + ballSpeed, y }),
		83: () => Body.setVelocity(ball, { x, y: y + ballSpeed }),
		40: () => Body.setVelocity(ball, { x, y: y + ballSpeed }),
		65: () => Body.setVelocity(ball, { x: x - ballSpeed, y }),
		37: () => Body.setVelocity(ball, { x: x - ballSpeed, y })
	}[event.keyCode] || returnUndefined)();
});

// Win Condation
Events.on(engine, 'collisionStart', event => {
	event.pairs.forEach(collision => {
		const labels = ['ball', 'goal'];

		if (
			labels.includes(collision.bodyA.label) &&
			labels.includes(collision.bodyB.label)
		) {
			console.log('User Won!');
			setTimeout(() => {
				document.querySelector('.winner').classList.remove('hidden');
			}, 3000);
			world.gravity.y = (Math.random() > 0.5) ? 0 : 1;
			world.bodies.forEach(body => {
				if (body.label === 'wall') Body.setStatic(body, false);
			})
		}
	});
});

// console.table({
// 	"lol": "bruh",
// 	startRow,
// 	startColumn,
// 	grid ,
// 	verticals ,
// 	horizontals
// });