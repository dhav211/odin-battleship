import { PlacementBoard } from './placement-board.js';

showPlacementBoard();

function showPlacementBoard() {
  const placementBoard = new PlacementBoard();

  document.body.appendChild(placementBoard.element);

  placementBoard.startButton.onclick = () => {
    document.body.removeChild(placementBoard.element);
    showPlayingBoard();
  };
}

function showPlayingBoard() {}

function showFinishScreen() {}
