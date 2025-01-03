const createGameboard = require("../factories/gameboardFactory");
const createShip = require("../factories/shipFactory");

describe("Gameboard Factory", () => {
  test("Should place a ship at given coordinates", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");
    const ships = gameboard.getShips();

    expect(ships).toContainEqual({ ship, coords: "a1-b1-c1" });
  });

  test("Should correctly store multiple ships on the gameboard", () => {
    const gameboard = createGameboard();
    const ship1 = createShip(3);
    const ship2 = createShip(4);

    gameboard.place(ship1, "a1-b1-c1");
    gameboard.place(ship2, "d1-d2-d3");
    const ships = gameboard.getShips();

    expect(ships).toContainEqual({ ship: ship1, coords: "a1-b1-c1" });
    expect(ships).toContainEqual({ ship: ship2, coords: "d1-d2-d3" });
  });

  test("Should not place a ship at invalid coordinates", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);

    expect(() => gameboard.place(ship, "invalid")).toThrow();
  });
});
