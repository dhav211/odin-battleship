import { ComputerBoard } from './computer-board.js';
import { PlacementBoard } from './placement-board.js';

showPlacementBoard();

function showPlacementBoard() {
  const placementBoard = new PlacementBoard();

  document.body.appendChild(placementBoard.element);

  placementBoard.startButton.onclick = () => {
    document.body.removeChild(placementBoard.element);
    gameplay();
  };
}

function gameplay() {
  const onPlayerSpotChosen = () => {
    console.log('enemy will choose a space now');
  };
  const computerBoard = new ComputerBoard();
  computerBoard.setEnemyAttackMethod(onPlayerSpotChosen);
  document.body.appendChild(computerBoard.element);
}

function showFinishScreen() {}
