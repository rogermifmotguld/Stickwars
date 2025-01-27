const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spelets storlek och blockstorlek
const tileSize = 20;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

// Orm och matens position
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };

// Hastighet och riktning
let dx = 1; // Horisontell riktning
let dy = 0; // Vertikal riktning

// Spelets loop
let gameLoop = setInterval(updateGame, 100);

function updateGame() {
  // Uppdatera spelets tillstånd
  updateSnake();
  checkCollision();
  drawGame();
}

function updateSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Kontrollera om ormen äter maten
  if (head.x === food.x && head.y === food.y) {
    spawnFood(); // Placera ut ny mat
  } else {
    snake.pop(); // Ta bort sista segmentet om ingen mat äts
  }

  snake.unshift(head); // Lägg till nytt huvud i ormens riktning
}

function checkCollision() {
  const head = snake[0];

  // Kollision med väggarna
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    endGame();
  }

  // Kollision med sig själv
  for (let segment of snake.slice(1)) {
    if (segment.x === head.x && segment.y === head.y) {
      endGame();
    }
  }
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };
}

function drawGame() {
  // Rensa canvas
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rita maten
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Rita ormen
  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  }
}

function endGame() {
  clearInterval(gameLoop);
  alert("Game Over! Ladda om sidan för att spela igen.");
}

// Styr ormen med piltangenter
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
});
