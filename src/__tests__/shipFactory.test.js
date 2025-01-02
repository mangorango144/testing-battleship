const createShip = require("../factories/shipFactory");

describe("Ship Factory", () => {
  test("Ship should start with 0 hits", () => {
    const ship = createShip(3);
    expect(ship.isSunk()).toBe(false);
  });

  test("hit() should increase the hit count", () => {
    const ship = createShip(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Ship should be sunk when hits equal length", () => {
    const ship = createShip(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Ship should not be sunk with fewer hits than length", () => {
    const ship = createShip(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
