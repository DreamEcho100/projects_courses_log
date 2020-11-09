const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;
const width = 800;
const height = 600;

const engine = Engine.create();
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
	Bodies.rectangle(400, 0, 800, 40, { isStatic: true }), // Right wall
	Bodies.rectangle(400, 600, 800, 40, { isStatic: true }), // Left wall
	Bodies.rectangle(0, 300, 40, 600, { isStatic: true }), // Top wall
	Bodies.rectangle(800, 300, 40, 600, { isStatic: true }), // Bottom wall
];
World.add(world, walls);


for (let i = 0; i < 50; i++) {
	randomShapeHandler(Math.random(), 25, 25);
}

function randomShapeHandler(randomNumber, w, h) {
	if (isNaN(randomNumber)) return;

	if (randomNumber > 0.5) {
		World.add(
			world, Bodies.rectangle(Math.random() * width, Math.random() * height, Math.floor(Math.random() * w) + 25, Math.floor(Math.random() * h) + 25)
		);
	}
	else {
		World.add(
			world, Bodies.circle(Math.random() * width, Math.random() * height, Math.floor(Math.random() * w) + 25, {
				render: {
					fillStyle: `#${Math.random().toString(16).substr(-6)}`
				}
			})
		);
	}
}