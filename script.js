// Canvas-inställningar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensioner
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// Startvärden
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let food = generateFood();
let score = 0;
let isPaused = false;

// HTML-element
const scoreText = document.getElementById('scoreText');
const pauseMessage = document.getElementById('pauseMessage');

// Pauspoäng
const pausePoints = new Set([
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165,
  170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235,
  240, 245, 250
]);

// Lyssna efter tangenttryck
document.addEventListener('keydown', (event) => {
  // Om spelet är pausat, återuppta det
  if (isPaused) {
    isPaused = false;
    pauseMessage.style.display = 'none';
    gameLoop();
    return;
  }

  // Styr ormen om spelet inte är pausat
  if (event.key === 'ArrowUp' && direction.y === 0) {
    nextDirection = { x: 0, y: -boxSize };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    nextDirection = { x: 0, y: boxSize };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    nextDirection = { x: -boxSize, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    nextDirection = { x: boxSize, y: 0 };
  }
});

// Spelloopen
function gameLoop() {
  if (isPaused) return; // Pausa spelet om isPaused är true

  update();
  draw();

  setTimeout(gameLoop, 100);
}

// Uppdatera spelets logik
function update() {
  direction = nextDirection;

  // Beräkna ny position för ormens huvud
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kontrollera kollision med väggar
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Din poäng: ${score}`);
    document.location.reload();
    return;
  }

  // Kontrollera om ormen äter mat
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore(); // Uppdatera poängvisningen
    food = generateFood(); // Generera ny mat

    // Kontrollera om spelet ska pausas
    if (pausePoints.has(score)) {
      pauseGame();
      return; // Avsluta uppdateringen tills spelet återupptas
    }
  } else {
    snake.pop(); // Ta bort sista delen av ormen
  }

  // Kontrollera kollision med sig själv
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      alert(`Game Over! Din poäng: ${score}`);
      document.location.reload();
      return;
    }
  }

  // Lägg till det nya huvudet
  snake.unshift(head);
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
}

// Generera mat på slumpmässig plats
function generateFood() {
  let foodX, foodY;
  let isOnSnake;

  do {
    foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

    // Kontrollera att maten inte hamnar på ormen
    isOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
  } while (isOnSnake);

  return { x: foodX, y: foodY };
}

// Uppdatera poäng
function updateScore() {
  scoreText.textContent = `Poäng: ${score}`;
}

// Pausa spelet
function pauseGame() {
  isPaused = true;
  pauseMessage.style.display = 'block';
}

// Starta spelet
gameLoop();
