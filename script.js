// Canvas-inställningar
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensioner
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// Startvärden
let snake = [{ x: 200, y: 200 }]; // Startposition för ormen
let direction = { x: 0, y: 0 };   // Ormens riktning
let nextDirection = { x: 0, y: 0 }; // Nästa riktning (hanterar samtidiga tangenttryck)
let food = generateFood();        // Generera mat på en slumpmässig plats
let score = 0;                    // Poängräkning
let isPaused = false;             // Kontroll för om spelet är pausat

// Referens till pausmeddelande
const pauseMessage = document.getElementById('pauseMessage');

// Lyssna efter tangenttryck för att styra ormen eller återuppta spelet
document.addEventListener('keydown', (event) => {
  // Återuppta spelet om det är pausat
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
  if (isPaused) return; // Avsluta loopen om spelet är pausat

  update();
  draw();

  setTimeout(gameLoop, 100); // Uppdatera spelet varje 100ms
}

// Uppdatera spelets logik
function update() {
  direction = nextDirection;

  // Skapa en ny position för ormens huvud
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kontrollera kollision med väggar
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Poäng: ${score}`);
    document.location.reload(); // Starta om spelet
  }

  // Kontrollera om ormen äter mat
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(); // Generera ny mat

    // Pausa spelet vid 5 poäng
    if (score === 5) {
      pauseGame();
    }
  } else {
    snake.pop(); // Ta bort ormens sista del om den inte äter
  }

  // Kontrollera kollision med sig själv
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      alert(`Game Over! Poäng: ${score}`);
      document.location.reload();
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

// Pausa spelet
function pauseGame() {
  isPaused = true;
  pauseMessage.style.display = 'block'; // Visa meddelandet att spelet är pausat
}

// Starta spelet
gameLoop();
