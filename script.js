const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spelkonfiguration
const tileSize = 20; // Storlek på varje "block" på spelplanen
const rows = canvas.height / tileSize; // Antal rader
const cols = canvas.width / tileSize; // Antal kolumner

// Ormens data
let snake = [{ x: 10, y: 10 }]; // Ormen startar i mitten av spelplanen
let direction = { x: 0, y: 0 }; // Start: stillastående
let food = spawnFood(); // Placera första maten
let gameSpeed = 200; // Hur snabbt spelet går (lägre värde = snabbare)
let gameInterval;

// Starta spelet
function startGame() {
  gameInterval = setInterval(updateGame, gameSpeed);
}

// Uppdatera spelet
function updateGame() {
  // Flytta ormen i aktuell riktning
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kontrollera kollision med väggarna
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    gameOver();
    return;
  }

  // Kontrollera kollision med sig själv
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      gameOver();
      return;
    }
  }

  // Lägg till nytt huvud
  snake.unshift(head);

  // Kontrollera om ormen äter maten
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood(); // Placera ny mat
  } else {
    snake.pop(); // Om ingen mat äts, ta bort sista segmentet
  }

  // Rita spelet
  drawGame();
}

// Rita spelet
function drawGame() {
  // Rensa canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rita maten
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Rita ormen
  ctx.fillStyle = "green";
  for (let segment of snake) {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  }
}

// Placera maten på en slumpmässig plats
function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };
}

// Game Over
function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Tryck F5 för att spela igen.");
}

// Styrning av ormen
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (e.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (e.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (e.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

// Starta spelet
startGame();
