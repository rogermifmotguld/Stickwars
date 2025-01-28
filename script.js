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
const questionText = document.getElementById('questionText');
const answerSection = document.getElementById('answerSection');

// Lyssna efter tangenttryck för att styra ormen
document.addEventListener('keydown', (event) => {
  // Om spelet är pausat, avbryt tangenttryck
  if (isPaused) return;

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
  if (isPaused) return;

  update();
  draw();

  setTimeout(gameLoop, 100);
}

// Uppdatera spelets logik
function update() {
  direction = nextDirection;

  // Ny huvudposition
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Kontrollera väggkollision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Din poäng: ${score}`);
    document.location.reload();
    return;
  }

  // Kontrollera om ormen äter mat
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = generateFood();

    // Pausa spelet vid poäng 5 och visa fråga
    if (score === 5) {
      pauseGameWithQuestion();
      return;
    }
  } else {
    snake.pop();
  }

  // Kontrollera kollision med sig själv
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      alert(`Game Over! Din poäng: ${score}`);
      document.location.reload();
      return;
    }
  }

  // Lägg till huvud
  snake.unshift(head);
}

// Rita spelet
function draw() {
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

// Generera mat
function generateFood() {
  let foodX, foodY;
  let isOnSnake;

  do {
    foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

    isOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
  } while (isOnSnake);

  return { x: foodX, y: foodY };
}

// Uppdatera poäng
function updateScore() {
  scoreText.textContent = `Poäng: ${score}`;
}

// Pausa spelet och visa fråga
function pauseGameWithQuestion() {
  isPaused = true;
  questionText.style.display = 'block';
  answerSection.style.display = 'block';
}

// Hantera svar och återuppta spelet
function answerQuestion(answer) {
  if (answer === 1) {
    alert("Rätt svar! Spelet fortsätter.");
    questionText.style.display = 'none';
    answerSection.style.display = 'none';
    isPaused = false;
    gameLoop();
  } else {
    alert("Fel svar! Försök igen.");
  }
}

// Starta spelet
gameLoop();
