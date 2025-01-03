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

  test("Should hit the correct ship when attacked at valid coordinates", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    gameboard.receiveAttack("a1");

    // Verify the ship is hit
    expect(ship.isSunk()).toBe(false); // Ship is not sunk after 1 hit
  });

  test("Should record a miss if attacked at invalid coordinates", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    // Simulate an attack on invalid coordinates
    gameboard.receiveAttack("d4");

    // Verify the attack did not hit the ship
    expect(ship.isSunk()).toBe(false); // Ship is still not sunk
  });

  test("Should correctly handle multiple attacks", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    // Simulate attacks on different coordinates
    gameboard.receiveAttack("a1"); // Hit
    gameboard.receiveAttack("b1"); // Hit
    gameboard.receiveAttack("c1"); // Hit

    // Check if the ship is sunk
    expect(ship.isSunk()).toBe(true); // Ship should be sunk after 3 hits
  });

  test("Should not hit a ship when attacked at the same coordinates more than once", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    // Simulate multiple attacks on the same coordinates
    gameboard.receiveAttack("a1");
    gameboard.receiveAttack("a1"); // Repeat attack

    // Verify that the ship is still not sunk
    expect(ship.isSunk()).toBe(false);
  });

  test("Should record missed attacks", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    // Simulate attacks on invalid coordinates
    gameboard.receiveAttack("d4");
    gameboard.receiveAttack("e5");

    // Check if missed attacks are recorded
    const missedAttacks = gameboard.getMissedAttacks();
    expect(missedAttacks).toContain("d4");
    expect(missedAttacks).toContain("e5");
  });

  test("Should not add duplicate missed attacks", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    // Simulate repeated misses on the same coordinates
    gameboard.receiveAttack("d4");
    gameboard.receiveAttack("d4");

    // Check if the missed attack is only recorded once
    const missedAttacks = gameboard.getMissedAttacks();
    expect(missedAttacks).toEqual(["d4"]); // Only one miss recorded
  });

  test("Should not record missed attacks if valid attack hits a ship", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.place(ship, "a1-b1-c1");

    // Simulate a valid attack on the ship
    gameboard.receiveAttack("a1");

    // Simulate a miss on invalid coordinates
    gameboard.receiveAttack("d4");

    // Check if the missed attack is recorded
    const missedAttacks = gameboard.getMissedAttacks();
    expect(missedAttacks).toContain("d4");
    expect(missedAttacks).not.toContain("a1"); // No miss for valid attack
  });
});
