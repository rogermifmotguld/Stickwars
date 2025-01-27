// Canvas-inställningar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

// Storlek på spelbrädet
const boxSize = 20;

// Ormens inställningar
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;

// Spelloopen
function gameLoop() {
  update();
  draw();
}

// Uppdatera spelets logik
function update() {
  // Flytta ormen
  const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };

  // Kontrollera kollision med väggar
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
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
    score++;
    food = generateFood();
  } else {
    // Ta bort svansen om maten inte äts
    snake.pop();
  }
}

// Rita spelet
function draw() {
  // Rensa canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rita ormen
  ctx.fillStyle = 'lime';
  for (let segment of snake) {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  }

  // Rita maten
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Rita poäng
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Generera mat på en slumpmässig position
function generateFood() {
  const foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
  const foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
  return { x: foodX, y: foodY };
}

// Hantera tangenttryckningar
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Spela om vid kollision
function gameOver() {
  alert(`Game Over! Your score: ${score}`);
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  food = generateFood();
}

// Starta spelet
setInterval(gameLoop, 100);
