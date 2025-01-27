const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const retryBtn = document.getElementById("retry-btn");
const gameOverContainer = document.getElementById("game-over");
const scoreDisplay = document.getElementById("score");

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

// Spelets status
let score = 0;
let gameLoop;

function draw() {
  // Rensa canvasen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Rita maten
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Rita ormen
  ctx.fillStyle = "green";
  for (let segment of snake) {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  }
}

function update() {
  // Uppdatera ormens position
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Kontrollera om ormen äter maten
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop(); // Ta bort sista segmentet om ingen mat äts
  }

  // Lägg till ett nytt huvud
  snake.unshift(head);

  // Kontrollera kollision
  if (checkCollision(head)) {
    endGame();
  }
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };

  // Säkerställ att maten inte placeras ovanpå ormen
  for (let segment of snake) {
    if (segment.x === food.x && segment.y === food.y) {
      spawnFood();
      break;
    }
  }
}

function checkCollision(head) {
  // Kollision med väggar
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    return true;
  }

  // Kollision med sig själv
  for (let segment of snake.slice(1)) {
    if (segment.x === head.x && segment.y === head.y) {
      return true;
    }
  }

  return false;
}

function endGame() {
  clearInterval(gameLoop);
  scoreDisplay.textContent = score;
  gameOverContainer.classList.remove("hidden");
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  spawnFood();
  gameOverContainer.classList.add("hidden");
  startGame();
}

function startGame() {
  gameLoop = setInterval(() => {
    update();
    draw();
  }, 100);
}

// Hantera tangenttryckningar för ormens riktning
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

// Återställ spelet vid klick på "Försök igen"-knappen
retryBtn.addEventListener("click", resetGame);

// Starta spelet
startGame();
