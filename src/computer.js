import { ShipDirection } from './gameboard.js';
import { Ship } from './ship.js';

export class Computer {
  constructor() {
    this.positionsAttacked = [];
    this.wasLastAttackSuccess = false;
  }

  setShips(gameboard) {
    const ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];

    for (let ship of ships) {
      let hasFoundPosition = false;
      while (!hasFoundPosition) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 9);
        const direction =
          Math.floor(Math.random() * 2) == 0 ? ShipDirection.Horizontal : ShipDirection.Vertical;
        if (gameboard.isValidShipPlacement(x, y, direction, ship)) {
          hasFoundPosition = true;
          gameboard.setShip(x, y, direction, ship);
        }
      }
    }
  }

  chooseAttackPosition() {
    let attackPosition = { x: 0, y: 0 };

    if (!this.wasLastAttackSuccess) {
      let hasFoundPosition = false;

      while (!hasFoundPosition) {
        attackPosition = { x: Math.floor(Math.random() * 9), y: Math.floor(Math.random() * 9) };

        if (
          !this.positionsAttacked.some(
            (position) => position.x === attackPosition.x && position.y === attackPosition.y
          )
        ) {
          hasFoundPosition = true;
        }
      }
    } else {
      const lastAttackPostion = this.positionsAttacked[this.positionsAttacked.length - 1];
      const surroundingPositions = [
        { x: lastAttackPostion.x + 1, y: lastAttackPostion.y },
        { x: lastAttackPostion.x - 1, y: lastAttackPostion.y },
        { x: lastAttackPostion.x, y: lastAttackPostion.y + 1 },
        { x: lastAttackPostion.x, y: lastAttackPostion.y - 1 },
      ];

      const possiblePositions = surroundingPositions.filter(
        (position) =>
          !this.positionsAttacked.some(
            (allPosition) => allPosition.x === position.x && allPosition.y === position.y
          ) &&
          position.x >= 0 &&
          position.x <= 8 &&
          position.y >= 0 &&
          position.y <= 8
      );

      if (possiblePositions.length == 0) {
        this.wasLastAttackSuccess = false;
        attackPosition = this.chooseAttackPosition();
      } else {
        attackPosition = possiblePositions[0];
      }
    }

    return attackPosition;
  }
}
