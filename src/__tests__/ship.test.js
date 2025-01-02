const createShip = require("../factories/ship");

describe("Ship factory", () => {
  test("createShip returns an object with correct properties and methods", () => {
    const ship = createShip(3);

    expect(ship).toHaveProperty("length", 3);
    expect(ship).toHaveProperty("hits", 0);
    expect(ship).toHaveProperty("hit");
    expect(ship).toHaveProperty("isSunk");

    expect(typeof ship.hit).toBe("function");
    expect(typeof ship.isSunk).toBe("function");
  });
});
