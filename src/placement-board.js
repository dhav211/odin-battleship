import { Gameboard, ShipDirection } from './gameboard.js';
import { Ship } from './ship.js';

export class PlacementBoard {
  #currentPlacementShip = new Ship(5);
  #currentPlacementDirection = ShipDirection.Horizontal;
  #ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
  #currentNumberOfShips = 0;
  #hasChosenAllShips = false;

  #SpaceState = {
    Empty: 0,
    Filled: 1,
    Checking: 2,
  };

  constructor() {
    this.gameboard = new Gameboard();
    this.startButton = document.createElement('button');
    this.spaces = this.createEmptySpaces();
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');

    const buttonContainer = document.createElement('div');
    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate';
    rotateButton.addEventListener(
      'click',
      () =>
        (this.#currentPlacementDirection =
          this.#currentPlacementDirection === ShipDirection.Horizontal
            ? ShipDirection.Vertical
            : ShipDirection.Horizontal)
    );
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', () => this.clearBoard());
    buttonContainer.appendChild(rotateButton);
    buttonContainer.appendChild(clearButton);

    const board = document.createElement('div');
    board.classList.add('gameboard');

    this.startButton.textContent = 'Start';
    this.startButton.disabled = true;

    element.appendChild(buttonContainer);
    element.appendChild(board);
    element.appendChild(this.startButton);

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        board.appendChild(this.spaces[y][x].element);
      }
    }

    return element;
  }

  clearBoard() {
    this.gameboard.clearBoard();
    this.#currentNumberOfShips = 0;
    this.#currentPlacementShip = this.#ships[0];
    this.#hasChosenAllShips = false;
    this.startButton.disabled = true;

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        this.spaces[y][x].state = this.#SpaceState.Empty;
        this.spaces[y][x].element.style.background = 'gainsboro';
      }
    }
  }

  createEmptySpaces() {
    const spaces = [];

    for (let y = 0; y < 9; y++) {
      spaces.push([]);
      for (let x = 0; x < 9; x++) {
        const gameboardSpace = {
          element: document.createElement('div'),
          state: this.#SpaceState.Empty,
          x: x,
          y: y,
        };

        gameboardSpace.element.classList.add('gameboard-cell');
        gameboardSpace.element.addEventListener('pointerenter', () => this.onMouseEnterSpace(x, y));
        gameboardSpace.element.addEventListener('pointerleave', () => this.onMouseExitSpace());
        gameboardSpace.element.addEventListener('click', () => this.onMouseClickSpace(x, y));

        spaces[y].push(gameboardSpace);
      }
    }

    return spaces;
  }

  onMouseEnterSpace(x, y) {
    if (this.#hasChosenAllShips) return;

    let isValid = this.gameboard.isValidShipPlacement(
      x,
      y,
      this.#currentPlacementDirection,
      this.#currentPlacementShip
    );

    let numberOfSpacesToFill = isValid
      ? this.#currentPlacementShip.length
      : this.#currentPlacementDirection === ShipDirection.Horizontal
      ? 9 - x
      : 9 - y;

    if (numberOfSpacesToFill > this.#currentPlacementShip.length)
      numberOfSpacesToFill = this.#currentPlacementShip.length;

    for (let i = 0; i < numberOfSpacesToFill; i++) {
      const xIncrease = this.#currentPlacementDirection === ShipDirection.Horizontal ? i : 0;
      const yIncrease = this.#currentPlacementDirection === ShipDirection.Vertical ? i : 0;

      if (this.spaces[y + yIncrease][x + xIncrease].state === this.#SpaceState.Empty) {
        this.spaces[y + yIncrease][x + xIncrease].element.style.background = isValid
          ? 'green'
          : 'red';

        this.spaces[y + yIncrease][x + xIncrease].state = this.#SpaceState.Checking;
      }
    }
  }

  onMouseExitSpace() {
    if (this.#hasChosenAllShips) return;

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (this.spaces[y][x].state === this.#SpaceState.Checking) {
          this.spaces[y][x].state = this.#SpaceState.Empty;
          this.spaces[y][x].element.style.background = 'gainsboro';
        }
      }
    }
  }

  onMouseClickSpace(x, y) {
    if (this.#hasChosenAllShips) return;

    if (
      this.gameboard.isValidShipPlacement(
        x,
        y,
        this.#currentPlacementDirection,
        this.#currentPlacementShip
      )
    ) {
      this.gameboard.setShip(x, y, this.#currentPlacementDirection, this.#currentPlacementShip);
      // Set the spaces to blue and change state so other ships cant be placed in these spaces
      for (let i = 0; i < this.#currentPlacementShip.length; i++) {
        const xIncrease = this.#currentPlacementDirection === ShipDirection.Horizontal ? i : 0;
        const yIncrease = this.#currentPlacementDirection === ShipDirection.Vertical ? i : 0;

        this.spaces[y + yIncrease][x + xIncrease].element.style.background = 'blue';

        this.spaces[y + yIncrease][x + xIncrease].state = this.#SpaceState.Filled;
      }

      this.#currentNumberOfShips++;
      this.#currentPlacementShip =
        this.#currentNumberOfShips < 5 ? this.#ships[this.#currentNumberOfShips] : null;

      if (this.#currentNumberOfShips >= 5) {
        this.startButton.disabled = false;
        this.#hasChosenAllShips = true;
      }
    }
  }
}
