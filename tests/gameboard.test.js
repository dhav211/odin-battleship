import { Gameboard, ShipDirection } from '../src/gameboard';
import { Ship } from '../src/ship';

test('set ship', () => {
  const gameboard = new Gameboard();
  const testShip = new Ship(3);
  gameboard.setShip(0, 0, ShipDirection.Horizontal, testShip);

  const occupiedSpaces = [gameboard.spaces[0][0], gameboard.spaces[0][1], gameboard.spaces[0][2]];

  expect(occupiedSpaces).toStrictEqual([testShip, testShip, testShip]);
});

test('set ship out of bounds', () => {
  const gameboard = new Gameboard();
  const testShip = new Ship(3);

  expect(gameboard.isValidShipPlacement(8, 8, ShipDirection.Horizontal, testShip)).toBe(false);
});

test('set ship overlapping another ship', () => {
  const gameboard = new Gameboard();
  const testShip1 = new Ship(3);
  const testShip2 = new Ship(4);

  gameboard.setShip(0, 3, ShipDirection.Horizontal, testShip1);
  expect(gameboard.isValidShipPlacement(1, 0, ShipDirection.Vertical, testShip2)).toBe(false);
});

test('place all ships', () => {
  const gameboard = new Gameboard();

  const testShip1 = new Ship(5);
  const testShip2 = new Ship(4);
  const testShip3 = new Ship(3);
  const testShip4 = new Ship(3);
  const testShip5 = new Ship(2);

  gameboard.setShip(2, 3, ShipDirection.Horizontal, testShip1);
  gameboard.setShip(0, 1, ShipDirection.Vertical, testShip2);
  gameboard.setShip(7, 5, ShipDirection.Vertical, testShip3);
  gameboard.setShip(3, 5, ShipDirection.Horizontal, testShip4);
  expect(gameboard.isValidShipPlacement(1, 6, ShipDirection.Vertical, testShip5)).toBe(true);
});

test('place invalid ship', () => {
  const gameboard = new Gameboard();

  const testShip = "it's a ship";

  expect(gameboard.isValidShipPlacement(1, 6, ShipDirection.Vertical, testShip)).toBe(false);
});

test('are ships in list', () => {
  const gameboard = new Gameboard();

  const testShip1 = new Ship(5);
  const testShip2 = new Ship(4);
  const testShip3 = new Ship(3);
  const testShip4 = new Ship(3);
  const testShip5 = new Ship(2);

  gameboard.setShip(2, 3, ShipDirection.Horizontal, testShip1);
  gameboard.setShip(0, 1, ShipDirection.Vertical, testShip2);
  gameboard.setShip(7, 5, ShipDirection.Vertical, testShip3);
  gameboard.setShip(3, 5, ShipDirection.Horizontal, testShip4);
  gameboard.setShip(1, 6, ShipDirection.Vertical, testShip5);

  expect(gameboard.ships).toStrictEqual([testShip1, testShip2, testShip3, testShip4, testShip5]);
});

test('hit ship', () => {
  const gameboard = new Gameboard();
  const testShip = new Ship(5);
  gameboard.setShip(2, 3, ShipDirection.Horizontal, testShip);

  gameboard.receiveAttack(2, 3);

  expect(gameboard.missedHits.length).toBe(0);
});

test('miss ship', () => {
  const gameboard = new Gameboard();
  const testShip = new Ship(5);
  gameboard.setShip(2, 3, ShipDirection.Horizontal, testShip);

  gameboard.receiveAttack(5, 6);

  expect(gameboard.missedHits.length).toBe(1);
});

test('all ships are not sunk', () => {
  const gameboard = new Gameboard();
  const testShip1 = new Ship(2);
  const testShip2 = new Ship(2);
  gameboard.setShip(2, 3, ShipDirection.Horizontal, testShip1);
  gameboard.setShip(5, 2, ShipDirection.Horizontal, testShip2);

  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(3, 3);
  gameboard.receiveAttack(5, 2);

  expect(gameboard.areAllShipsSunk()).toBe(false);
});

test('all ships are sunk', () => {
  const gameboard = new Gameboard();
  const testShip1 = new Ship(2);
  const testShip2 = new Ship(2);
  gameboard.setShip(2, 3, ShipDirection.Horizontal, testShip1);
  gameboard.setShip(5, 2, ShipDirection.Horizontal, testShip2);

  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(3, 3);
  gameboard.receiveAttack(5, 2);
  gameboard.receiveAttack(6, 2);

  expect(gameboard.areAllShipsSunk()).toBe(true);
});
