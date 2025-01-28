// Canvas-inställningar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensioner
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// Startvärden
let snake = [{ x: 200, y: 200 }]; // Ormens startposition
let direction = { x: 0, y: 0 };   // Ormens rörelseriktning
let nextDirection = { x: 0, y: 0 }; // Nästa riktning för att hantera samtidiga tangenttryck
let food = generateFood();        // Generera mat
let score = 0;                    // Startpoäng
let isPaused = false;             // Kontroll för om spelet är pausat

// HTML-referenser
const scoreText = document.getElementById('scoreText'); // Poängtexten
const pauseMessage = document.getElementById('pauseMessage'); // Pausmeddelande

// Lyssna efter tangenttryck
document.addEventListener('keydown', (event) => {
  // Om spelet är pausat, återuppta det
  if (isPaused) {
    isPaused = false;
    pauseMessage.style.display = 'none'; // Dölj pausmeddelandet
    gameLoop(); // Starta om spelloopen
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
  if (isPaused) return; // Om spelet är pausat, avbryt loopen

  update(); // Uppdatera spelets logik
  draw();   // Rita spelet

  setTimeout(gameLoop, 100); // Uppdatera loopen var 100:e millisekund
}

// Uppdatera spelets logik
function update() {
  direction = nextDirection;

  // Beräkna ormens nya huvudposition
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kontrollera kollision med väggar
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Poäng: ${score}`);
    document.location.reload(); // Starta om spelet
    return;
  }

  // Kontrollera om ormen äter mat
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore(); // Uppdatera poängvisningen
    food = generateFood(); // Generera ny mat

    // Pausa spelet vid 5 poäng
    if (score === 5) {
      pauseGame();
    }
  } else {
    snake.pop(); // Ta bort sista delen av ormen om den inte äter
  }

  // Kontrollera kollision med sig själv
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      alert(`Game Over! Poäng: ${score}`);
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

// Generera mat på en slumpmässig plats
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
  pauseMessage.style.display = 'block'; // Visa pausmeddelandet
}

// Starta spelet
gameLoop();
