let playerPosition = 0;
let diceValue = 0;
let diamondPosition = 0;

window.onload = function () {
  createBoard();
  placeDiamond();
  highlightPlayer();
};

function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = "cell-" + i;
    cell.innerText = "🟦";
    board.appendChild(cell);
  }
}

function placeDiamond() {
  // Placera diamanten på en slumpmässig position (ej 0)
  do {
    diamondPosition = Math.floor(Math.random() * 25);
  } while (diamondPosition === 0);

  document.getElementById("cell-" + diamondPosition).innerText = "💎";
}

function rollDice() {
  diceValue = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").innerText = "Resultat: " + diceValue;
}

function movePlayer() {
  playerPosition += diceValue;
  if (playerPosition > 24) playerPosition = 24;

  document.getElementById("player-position").innerText = playerPosition;

  highlightPlayer();

  if (playerPosition === diamondPosition) {
    alert("🎉 Du hittade diamanten! Bra jobbat!");
  }
}

function highlightPlayer() {
  for (let i = 0; i < 25; i++) {
    document.getElementById("cell-" + i).style.backgroundColor = "white";
  }
  const current = document.getElementById("cell-" + playerPosition);
  current.style.backgroundColor = "#ffff8d";
}
