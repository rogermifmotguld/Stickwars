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
  if (isPaused) return; // Avbryt tangenttryck om spelet är pausat

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

// Spelloopen
function gameLoop() {
  if (isPaused) return; // Stoppa loopen om spelet är pausat

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

    // Pausa spelet om aktuell poäng finns i pausintervaller
    if (pauseIntervals.includes(score)) {
      pauseGameWithQuestion(score); // Pausa spelet och visa fråga för aktuell poäng
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
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rita ormen
  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  }

  // Rita maten
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Generera mat
function generateFood() {
  let foodX, foodY;
  let isOnSnake;

  do {
    foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

    isOnSnake = snake.some((segment) => segment.x === foodX && segment.y === foodY);
  } while (isOnSnake);

  return { x: foodX, y: foodY };
}

// Uppdatera poäng
function updateScore() {
  scoreText.textContent = `Poäng: ${score}`;
}

// Pausa spelet och visa fråga
function pauseGameWithQuestion(score) {
  isPaused = true;

  // Hämta fråga och svar för aktuell poäng
  const currentQuestion = questions[score];
  if (!currentQuestion) return; // Säkerställ att det finns en fråga

  questionText.textContent = currentQuestion.question;
  questionText.style.display = "block";
  answerSection.innerHTML = ""; // Töm tidigare svar

  // Generera svarsknappar
  const allAnswers = [
    currentQuestion.correctAnswer,
    ...currentQuestion.wrongAnswers,
  ].sort(() => Math.random() - 0.5); // Blanda svaren slumpmässigt

  allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answerButton";
    button.textContent = answer;
    button.onclick = () => answerQuestion(answer, currentQuestion.correctAnswer);
    answerSection.appendChild(button);
  });

  answerSection.style.display = "block";
}

// Hantera svar och återuppta spelet
function answerQuestion(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Rätt svar! Spelet fortsätter.");
    questionText.style.display = "none";
    answerSection.style.display = "none";
    isPaused = false;
    gameLoop();
  } else {
    alert("Fel svar! Försök igen.");
  }
}

// Starta spelet
gameLoop();
