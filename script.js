// Canvas-inställningar
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

// Pausintervaller och frågor/svar
const pauseIntervals = [5, 10]; // Poäng där spelet ska pausa
const questions = {
  5: {
    question: "Vad menas med förnuft och hur kopplas det till upplysningen?",
    correctAnswer: "Logiskt tänkande och kritisk analys",
    wrongAnswers: ["Blind tro på auktoriteter", "Kungens makt är absolut"],
  },
  10: {
    question: "Vad innebär begreppet samhällskontrakt?",
    correctAnswer:
      "Människor bildar samhällen genom att överlämna vissa rättigheter till en regering i utbyte mot skydd och ordning.",
    wrongAnswers: [
      "Alla medborgare har samma rättigheter utan en regering.",
      "Samhället styrs helt utan några regler.",
    ],
  },
};

// HTML-element
const scoreText = document.getElementById("scoreText");
const questionText = document.getElementById("questionText");
const answerSection = document.getElementById("answerSection");

// Lyssna efter tangenttryck för att styra ormen
document.addEventListener("keydown", (event) => {
  if (isPaused) return;

  if (event.key === "ArrowUp" && direction.y === 0) {
    nextDirection = { x: 0, y: -boxSize };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    nextDirection = { x: 0, y: boxSize };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    nextDirection = { x: -boxSize, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    nextDirection = { x: boxSize, y: 0 };
  }
});

// Touch-input variabler
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Lyssna på touch-start
canvas.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

// Lyssna på touch-end och bestäm svepriktning
canvas.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;

  handleSwipe();
});

// Funktion för att bestämma svepriktning
function handleSwipe() {
  let dx = touchEndX - touchStartX;
  let dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && direction.x === 0) {
      nextDirection = { x: boxSize, y: 0 };
    } else if (dx < 0 && direction.x === 0) {
      nextDirection = { x: -boxSize, y: 0 };
    }
  } else {
    if (dy > 0 && direction.y === 0) {
      nextDirection = { x: 0, y: boxSize };
    } else if (dy < 0 && direction.y === 0) {
      nextDirection = { x: 0, y: -boxSize };
    }
  }
}

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
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Din poäng: ${score}`);
    document.location.reload();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = generateFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

// Rita spelet
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Starta spelet
gameLoop();
