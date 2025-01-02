function createShip(length) {
  let hits = 0;

  const ship = {
    hit() {
      hits += 1;
    },
    isSunk() {
      return hits >= length;
    },
  };

  return Object.freeze(ship);
}

module.exports = createShip;
