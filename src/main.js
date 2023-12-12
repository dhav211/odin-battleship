import { AttackComputerBoard } from './attack-computer-board.js';
import { PlacementBoard } from './placement-board.js';
import { AttackPlayerBoard } from './attack-player-board.js';

showPlacementBoard();

function showPlacementBoard() {
  const placementBoard = new PlacementBoard();
  const mainContent = document.querySelector('main');

  mainContent.appendChild(placementBoard.element);

  placementBoard.startButton.onclick = () => {
    mainContent.removeChild(placementBoard.element);
    gameplay(placementBoard.gameboard);
  };
}

function gameplay(playersGameboard) {
  const gameplayArea = document.createElement('div');
  const mainContent = document.querySelector('main');

  gameplayArea.id = 'gameplay-area';
  mainContent.appendChild(gameplayArea);

  const playerBoard = new AttackPlayerBoard(playersGameboard);
  const computerBoard = new AttackComputerBoard();
  computerBoard.setEnemyAttackMethod(() => playerBoard.attackPlayer());

  let currentPlayerScore = 0;
  let currentEnemyScore = 0;
  const scoreArea = document.createElement('div');
  scoreArea.id = 'score-area';
  const playerScoreTitle = document.createElement('p');
  playerScoreTitle.textContent = 'Player';
  const playerScore = document.createElement('p');
  playerScore.textContent = '0';
  const enemyScoreTitle = document.createElement('p');
  enemyScoreTitle.textContent = 'CPU';
  const enemyScore = document.createElement('p');
  enemyScore.textContent = '0';
  scoreArea.replaceChildren(playerScoreTitle, playerScore, enemyScoreTitle, enemyScore);

  const triggerVictoryMessage = (msg) => {
    const victoryContainer = document.createElement('div');
    victoryContainer.id = 'victory-container';

    const message = document.createElement('h2');
    message.textContent = msg;

    const restartButton = document.createElement('button');
    restartButton.classList.add('big-button');
    restartButton.textContent = 'Restart';
    restartButton.onclick = () => {
      mainContent.removeChild(gameplayArea);
      mainContent.removeChild(victoryContainer);
      showPlacementBoard();
    };
    victoryContainer.replaceChildren(message, restartButton);
    mainContent.appendChild(document.createElement('br'));
    mainContent.appendChild(victoryContainer);
  };

  playerBoard.setVictoryMessage(triggerVictoryMessage);
  computerBoard.setVictoryMessage(triggerVictoryMessage);

  playerBoard.setIncreaseEnemyScore(() => {
    currentEnemyScore++;
    enemyScore.textContent = `${currentEnemyScore}`;
  });

  computerBoard.setIncreasePlayerScore(() => {
    currentPlayerScore++;
    playerScore.textContent = `${currentPlayerScore}`;
  });

  gameplayArea.appendChild(computerBoard.element);
  gameplayArea.appendChild(scoreArea);
  gameplayArea.appendChild(playerBoard.element);
}
