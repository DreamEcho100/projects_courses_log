const GenerationEngine = require("./engine");

const engine = new GenerationEngine();

engine.start();

setTimeout(() => {
  engine.stop();
}, 20000);
/*
const Generation = require("./generation");

const generation = new Generation();

console.table({
  generation,
});

const gooby = generation.newDragon();

console.table({
  gooby,
});
*/
