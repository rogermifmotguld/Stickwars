let playerPosition = 0;
let diamondPosition = 0;
let diceValue = 0;

window.onload = () => {
  createBoard();
  placeDiamond();
  updateBoard();
};

function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = "cell-" + i;
    cell.innerText = "🟦";

    cell.addEventListener("click", () => tryMoveTo(i));
    board.appendChild(cell);
  }
}

function placeDiamond() {
  do {
    diamondPosition = Math.floor(Math.random() * 25);
  } while (diamondPosition === playerPosition);

  const diamondCell = document.getElementById("cell-" + diamondPosition);
  diamondCell.innerText = "💎";
  diamondCell.classList.add("diamond");
}

function rollDice() {
  diceValue = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").innerText = "Resultat: " + diceValue;
  highlightAllowedMoves();
}

function highlightAllowedMoves() {
  clearHighlights();
  for (let i = 0; i < 25; i++) {
    if (Math.abs(i - playerPosition) === diceValue) {
      document.getElementById("cell-" + i).classList.add("allowed");
    }
  }
}

function clearHighlights() {
  for (let i = 0; i < 25; i++) {
    const cell = document.getElementById("cell-" + i);
    cell.classList.remove("allowed");
  }
}

function tryMoveTo(index) {
  if (Math.abs(index - playerPosition) === diceValue) {
    playerPosition = index;
    diceValue = 0;
    document.getElementById("dice-result").innerText = "Resultat: -";
    updateBoard();
    checkWin();
  }
}

function updateBoard() {
  for (let i = 0; i < 25; i++) {
    const cell = document.getElementById("cell-" + i);
    cell.classList.remove("player");
  }
  const currentCell = document.getElementById("cell-" + playerPosition);
  currentCell.classList.add("player");

  document.getElementById("player-position").innerText = playerPosition;
  clearHighlights();
}

function checkWin() {
  if (playerPosition === diamondPosition) {
    alert("🎉 Du hittade diamanten!");
  }
}
