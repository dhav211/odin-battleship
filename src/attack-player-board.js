import { Computer } from './computer.js';

export class AttackPlayerBoard {
  constructor(gameboard) {
    this.gameboard = gameboard;
    this.spaces = this.createEmptySpaces();
    this.element = this.createElement();
    this.computer = new Computer();
  }

  setEnemyAttackMethod(func) {
    this.enemyChooseAttack = func;
  }

  setIncreaseEnemyScore(func) {
    this.increaseEnemyScore = func;
  }

  setVictoryMessage(func) {
    this.victoryMessage = func;
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('gameboard');

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        element.appendChild(this.spaces[y][x]);
      }
    }

    return element;
  }

  createEmptySpaces() {
    const spaces = [];

    for (let y = 0; y < 9; y++) {
      spaces.push([]);
      for (let x = 0; x < 9; x++) {
        const gameboardSpace = document.createElement('div');

        gameboardSpace.classList.add('gameboard-cell');

        spaces[y].push(gameboardSpace);
      }
    }

    return spaces;
  }

  attackPlayer() {
    const attackPosition = this.computer.chooseAttackPosition();
    const isSuccess = this.gameboard.receiveAttack(attackPosition.x, attackPosition.y);
    this.spaces[attackPosition.y][attackPosition.x].style.backgroundColor = isSuccess
      ? 'red'
      : 'black';

    this.computer.wasLastAttackSuccess = isSuccess ? true : false;
    this.computer.positionsAttacked.push(attackPosition);

    if (isSuccess && this.gameboard.spaces[attackPosition.y][attackPosition.x].isSunk()) {
      this.increaseEnemyScore();
      if (this.gameboard.areAllShipsSunk()) {
        this.victoryMessage('You lost!!');
      }
    }
  }
}
