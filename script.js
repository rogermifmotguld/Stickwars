// Canvas och kontext
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Konfiguration av spelplanen
const tileSize = 20; // Storlek på varje ruta (20x20 pixlar)
const rows = canvas.height / tileSize; // Antal rader
const cols = canvas.width / tileSize; // Antal kolumner

// Ormens och matens data
let snake = [{ x: 10, y: 10 }]; // Startposition för ormen
let direction = { x: 0, y: 0 }; // Start: stillastående
let food = spawnFood(); // Placera ut första maten

// Spelets hastighet (ms mellan uppdateringar)
const gameSpeed = 150;

// Starta spelet
let gameLoop = setInterval(updateGame, gameSpeed);

function updateGame() {
  // Flytta ormen
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kontrollera om ormen kolliderar med väggar
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    endGame();
    return;
  }

  // Kontrollera om ormen kolliderar med sig själv
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      endGame();
      return;
    }
  }

  // Lägg till nytt huvud
  snake.unshift(head);

  // Kontrollera om ormen äter maten
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood(); // Generera ny mat
  } else {
    snake.pop(); // Om ingen mat äts, ta bort sista segmentet
  }

  // Rita spelplanen
  drawGame();
}

// Rita hela spelet
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

// Generera mat på en slumpmässig plats
function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };
}

// Hantera Game Over
function endGame() {
  clearInterval(gameLoop); // Stoppa spelet
  alert("Game Over! Tryck F5 för att spela igen."); // Visa meddelande
}

// Hantera tangenttryckningar för ormens rörelser
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
