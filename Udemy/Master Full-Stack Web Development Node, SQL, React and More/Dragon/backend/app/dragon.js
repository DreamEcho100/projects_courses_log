const TRAITS = require("../data/traits.json");

const DEFAULT_PROPERTIES = {
  nickname: "unnamed",
  get birthdate() {
    return new Date();
  },
  get randomTraits() {
    const traits = [];

    TRAITS.forEach((TRAIT) => {
      const [traitType, traitValues] = [TRAIT.type, TRAIT.values];

      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];

      traits.push({ traitType, traitValue });
    });

    return traits;
  },
};

class Dragon {
  constructor({ birthdate, nickname, traits } = {}) {
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
  }
}

module.exports = Dragon;
