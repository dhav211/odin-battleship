import { Computer } from '../src/computer';
import { Gameboard } from '../src/gameboard';

test('set ships', () => {
  const computer = new Computer();
  const gameboard = new Gameboard();

  computer.setShips(gameboard);

  expect(gameboard.ships.length).toBe(5);
});

test('choose attack position', () => {
  const computer = new Computer();

  const attackPosition = computer.chooseAttackPosition();
  const isAttackPositionValid =
    attackPosition.x >= 0 &&
    attackPosition.x <= 8 &&
    attackPosition.y >= 0 &&
    attackPosition.y <= 8;

  expect(isAttackPositionValid).toBe(true);
});

test('choose attack position with positions already taken', () => {
  const computer = new Computer();

  computer.positionsAttacked = [
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 5, y: 2 },
    { x: 7, y: 1 },
    { x: 6, y: 5 },
    { x: 4, y: 2 },
  ];

  const attackPosition = computer.chooseAttackPosition();
  const isAttackPositionValid =
    attackPosition.x >= 0 &&
    attackPosition.x <= 8 &&
    attackPosition.y >= 0 &&
    attackPosition.y <= 8;

  expect(isAttackPositionValid).toBe(true);
});

test('choose attack position after successful attack', () => {
  const computer = new Computer();

  computer.wasLastAttackSuccess = true;
  computer.positionsAttacked.push({ x: 3, y: 4 });

  const attackPosition = computer.chooseAttackPosition();
  const isAttackPositionValid =
    attackPosition.x >= 2 &&
    attackPosition.x <= 4 &&
    attackPosition.y >= 3 &&
    attackPosition.y <= 5;

  expect(isAttackPositionValid).toBe(true);
});

test('choose attack position after successful attack on side of board', () => {
  const computer = new Computer();

  computer.wasLastAttackSuccess = true;
  computer.positionsAttacked.push({ x: 8, y: 4 });

  const attackPosition = computer.chooseAttackPosition();
  const isAttackPositionValid =
    attackPosition.x >= 7 &&
    attackPosition.x <= 8 &&
    attackPosition.y >= 3 &&
    attackPosition.y <= 5;

  expect(isAttackPositionValid).toBe(true);
});
