import { Ship } from '../src/ship.js';

export const ShipDirection = {
  Horizontal: 0,
  Vertical: 1,
};

export class Gameboard {
  constructor() {
    this.spaces = [];
    this.ships = [];
    this.missedHits = [];

    for (let i = 0; i <= 9; i++) {
      this.spaces.push([null, null, null, null, null, null, null, null, null]);
    }
  }

  /**
   *
   * @param {number} x Integer value for Position on gameboard
   * @param {number} y Integer value for Position on gameboard
   * @param {ShipDirection} direction Direction the ship will be positioned on gameboard
   * @param {Ship} ship The ship to place on gameboard
   */
  setShip(x, y, direction, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (direction === ShipDirection.Horizontal) {
        this.spaces[y][x + i] = ship;
      } else {
        this.spaces[y + i][x] = ship;
      }
    }

    this.ships.push(ship);
  }

  /**
   *
   * @param {number} x Integer value for Position on gameboard
   * @param {number} y Integer value for Position on gameboard
   * @param {ShipDirection} direction Direction the ship will be positioned on gameboard
   * @param {Ship} ship The ship to place on gameboard
   * @returns True if is valid placement, false if not valid
   */
  isValidShipPlacement(x, y, direction, ship) {
    const isShip = ship instanceof Ship;
    if (!isShip) return false;

    // check to see if the placement is within gameboard bounds
    if (direction === ShipDirection.Horizontal && x + ship.length > 9) {
      return false;
    } else if (direction === ShipDirection.Vertical && y + ship.length > 9) {
      return false;
    }

    // check to see if placement overlaps
    let isOverlapping = false;

    for (let i = 0; i < ship.length; i++) {
      if (direction === ShipDirection.Horizontal && this.spaces[y][x + i] !== null) {
        isOverlapping = true;
      } else if (direction === ShipDirection.Vertical && this.spaces[y + i][x] !== null) {
        isOverlapping = true;
      }
    }

    if (isOverlapping) return false;

    return true;
  }

  receiveAttack(x, y) {
    if (this.spaces[y][x] !== null) {
      this.spaces[y][x].hit();
    } else {
      this.missedHits.push({ x: x, y: y });
    }
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  clearBoard() {
    this.spaces = [];
    this.ships = [];
    this.missedHits = [];

    for (let i = 0; i <= 9; i++) {
      this.spaces.push([null, null, null, null, null, null, null, null, null]);
    }
  }
}
