import { Gameboard, ShipDirection } from './gameboard';
import { Ship } from './ship';

export class Computer {
  constructor() {
    this.gameboard = new Gameboard();
    this.positionsAttacked = [];
    this.wasLastAttackSuccess = false;
  }

  setShips() {
    const ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];

    for (let ship of ships) {
      let hasFoundPosition = false;
      while (!hasFoundPosition) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 9);
        const direction =
          Math.floor(Math.random() * 2) == 0 ? ShipDirection.Horizontal : ShipDirection.Vertical;
        if (this.gameboard.isValidShipPlacement(x, y, direction, ship)) {
          hasFoundPosition = true;
          this.gameboard.setShip(x, y, direction, ship);
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

        if (!this.positionsAttacked.includes(attackPosition)) hasFoundPosition = true;
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
          !this.positionsAttacked.includes(attackPosition) &&
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
