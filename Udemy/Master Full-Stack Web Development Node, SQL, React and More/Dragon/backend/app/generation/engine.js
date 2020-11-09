const Generation = require(".");

class GenerationEngine {
  constructor() {
    this.generation = null;
    this.timer = null;
  }

  start = () => {
    this.buildingNewGeneration();
  };

  stop = () => {
    clearTimeout(this.timer);
  };

  buildingNewGeneration = () => {
    this.generation = new Generation();

    console.log(this.generation);

    this.timer = setTimeout(
      () => this.buildingNewGeneration(),
      this.generation.expiration.getTime() - Date.now()
    );
  };
}

module.exports = GenerationEngine;
