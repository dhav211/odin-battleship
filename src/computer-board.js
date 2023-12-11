import { Computer } from './computer.js';
import { Gameboard } from './gameboard.js';

export class ComputerBoard {
  constructor() {
    this.gameboard = new Gameboard();
    this.spaces = this.createEmptySpaces();
    this.element = this.createElement();

    const computer = new Computer();
    computer.setShips(this.gameboard);
  }

  setEnemyAttackMethod(func) {
    this.enemyChooseAttack = func;
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('gameboard');

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        element.appendChild(this.spaces[y][x].element);
      }
    }

    return element;
  }

  createEmptySpaces() {
    const spaces = [];

    for (let y = 0; y < 9; y++) {
      spaces.push([]);
      for (let x = 0; x < 9; x++) {
        const gameboardSpace = {
          element: document.createElement('div'),
          isAttacked: false,
          x: x,
          y: y,
        };

        gameboardSpace.element.classList.add('gameboard-cell');
        gameboardSpace.element.addEventListener('click', () => this.onMouseClickSpace(x, y));

        spaces[y].push(gameboardSpace);
      }
    }

    return spaces;
  }

  onMouseClickSpace(x, y) {
    // check to see if space is attacked
    if (!this.spaces[y][x].isAttacked) {
      if (this.gameboard.receiveAttack(x, y)) {
        this.spaces[y][x].element.style.backgroundColor = 'red';
      } else {
        this.spaces[y][x].element.style.backgroundColor = 'black';
      }
      this.enemyChooseAttack();
    }
  }
}
