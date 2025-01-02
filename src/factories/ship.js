function createShip(length) {
  return {
    length: length,
    hits: 0,
    hit() {},
    isSunk() {},
  };
}

module.exports = createShip;
