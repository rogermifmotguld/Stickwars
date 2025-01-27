// Canvas-inställningar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Storlek på spelplan och block
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// Ormens inställningar
let snake = [{ x: 200, y: 200 }]; // Startposition för ormen
let direction = { x: 0, y: 0 }; // Ingen rörelse i början
let food = generateFood(); // Generera första matpositionen
let score = 0;

// Spelloopen
function gameLoop() {
  update();
  draw();
}

// Uppdatera spelstatus
function update() {
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
    food = generateFood(); // Generera ny mat
  } else {
    // Ta bort svansen om ormen inte äter
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

// Generera mat på en slumpmässig plats
function generateFood() {
  const foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
  const foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
  return { x: foodX, y: foodY };
}

// Hantera tangenttryckningar för att styra ormen
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

// Om spelet tar slut
function gameOver() {
  alert(`Game Over! Your score: ${score}`);
  // Återställ spelets startläge
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  food = generateFood();
}

// Starta spelet
setInterval(gameLoop, 100);
