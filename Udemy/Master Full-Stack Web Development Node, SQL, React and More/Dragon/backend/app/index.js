const express = require("express");
const GenerationEngine = require("./generation/engine");

const app = express();
const engine = new GenerationEngine();

engine.start();

app.get("/dragon/new", (request, response) => {
  response.json({ dragon: engine.generation.newDragon() });
});

module.exports = app;
/*setTimeout(() => {
  engine.stop();
}, 20000);*/
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
