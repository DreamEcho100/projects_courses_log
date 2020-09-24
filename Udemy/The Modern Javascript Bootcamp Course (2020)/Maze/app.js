const { Engine, Render, Runner, World, Bodies } = Matter;
const width = 600;
const height = 600;
const cells = 3;

const engine = Engine.create();
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
	Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }), // Right wall
	Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }), // Left wall
	Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }), // Top wall
	Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }), // Bottom wall
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

const stepThroughCells = (row, column) => {
	// If I have the cell at [row, column], then return
	if (grid[row][column] === true) return;

	// Mark this cell as being visited
	grid[row][column] = true;

	// Assemble randomly-ordered list of neighbors

	// For each neighbor...

	// See if that neighbor is out of bounds

	// If we have visited that neighbor, continue to the next neighbor

	// Remove a wall from either horizontals or verticals

	// Visit that next cell

}

stepThroughCells(startRow, startColumn);

console.table({
	"lol": "bruh",
	startRow,
	startColumn,
	grid ,
	verticals ,
	horizontals
});