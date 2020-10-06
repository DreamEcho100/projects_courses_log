const Generation = require("./generation");

const generation = new Generation();

console.table({
  generation,
});

const gooby = generation.newDragon();

console.table({
  gooby,
});
