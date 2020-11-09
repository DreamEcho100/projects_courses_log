const express = require("express");
const GenerationEngine = require("./generation/engine");
const dragonRouter = require("./api/dragon");

const app = express();
const engine = new GenerationEngine();

engine.start();

app.locals.engine = engine;

app.use("/dragon", dragonRouter);

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
