// Canvas-inställningar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Spelplan och blockstorlek
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// Ormens inställningar
let snake = [{ x: 200, y: 200 }]; // Startposition för ormen
let direction = { x: 0, y: 0 }; // Ingen rörelse i början
let nextDirection = { x: 0, y: 0 }; // För att undvika direktkollisioner
let food = generateFood(); // Första matposition
let score = 0;
let gameRunning = true; // För att hantera spelstatus

// Spelloopen
function gameLoop() {
  if (gameRunning) {
    update();
    draw();
  }
}

// Uppdatera spelets logik
function update() {
  // Vänta på första tangenttryckning
  if (nextDirection.x === 0 && nextDirection.y === 0) {
    return;
  }

  // Uppdatera riktning
  direction = nextDirection;

  // Beräkna ny huvudposition
  const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };

  // Kontrollera kollision med väggar
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    endGame();
    return;
  }

  // Kontrollera kollision med sig själv
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      endGame();
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

// Generera mat på slumpmässig position
function generateFood() {
  let foodX, foodY;
  let isOnSnake;

  do {
    foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

    // Kontrollera om maten landar på ormen
    isOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
  } while (isOnSnake);

  return { x: foodX, y: foodY };
}

// Hantera tangenttryckningar för att styra ormen
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction.y === 0) {
    nextDirection = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    nextDirection = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    nextDirection = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    nextDirection = { x: 1, y: 0 };
  }
});

// Slut på spelet
function endGame() {
  gameRunning = false;
  alert(`Game Over! Your score: ${score}`);
  resetGame();
}

// Återställ spelet
function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  nextDirection = { x: 0, y: 0 };
  score = 0;
  food = generateFood();
  gameRunning = true;
}

// Starta spelloopen
setInterval(gameLoop, 100);
