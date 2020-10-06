const DEFAULT_PROPERTIES = {
  nickname: "unnamed",
  get birthdate() {
    return new Date();
  },
};

class Dragon {
  constructor({ birthdate, nickname } = {}) {
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
  }
}

module.exports = Dragon;
