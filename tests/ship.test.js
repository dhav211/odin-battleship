const Ship = require('../src/ship');

test('hit once', () => {
  const testShip = new Ship(3);
  testShip.hit();

  expect(testShip.hits).toBe(1);
});

test('hit three times', () => {
  const testShip = new Ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();

  expect(testShip.hits).toBe(3);
});

test('is sunk', () => {
  const testShip = new Ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBe(true);
});

test('is not sunk', () => {
  const testShip = new Ship(3);
  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBe(false);
});
