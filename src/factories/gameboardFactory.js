function createGameboard() {
  const ships = [];

  const gameboard = {
    place(ship, coords) {
      ships.push({ ship, coords });
    },
    getShips() {
      return ships.map((item) => ({ ...item }));
    },
  };

  return Object.freeze(gameboard);
}

module.exports = createGameboard;
