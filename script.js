// Canvas-inställningar
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spelplan och blockstorlek
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// Ormens inställningar
let snake = [{ x: 200, y: 200 }]; // Startposition för ormen
let direction = { x: 0, y: 0 }; // Ingen rörelse i början
let nextDirection = { x: 0, y: 0 }; // För att hantera riktning säkert
let food = generateFood(); // Första matpositionen
let score = 0;
let gameRunning = true; // För att hantera spelstatus
let doublePoints = false; // Om rätt svar ges, fördubblas poängen

// Frågemodalen
const questionModal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");

// Lista med historiska frågor och svar
const historyQuestions = [
  {
    question: "Vad menas med förnuft och hur kopplas det till upplysningen?",
    options: [
      "Logiskt tänkande och rationell analys.",
      "Att följa traditioner och religiösa dogmer.",
      "Att förlita sig på känslor och intuition.",
    ],
    correctAnswer: 1,
  },
  {
    question: "När började andra världskriget?",
    options: ["1939", "1945", "1914"],
    correctAnswer: 1,
  },
  {
    question: "Vem var den första presidenten i USA?",
    options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"],
    correctAnswer: 2,
  },
];

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

  // Beräkna huvudets nya position
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
    score += doublePoints ? 2 : 1; // Dubbel poäng om rätt svar ges
    food = generateFood(); // Generera ny mat

    // Visa en fråga var femte matbit
    if (score % 5 === 0) {
      askHistoryQuestion();
    }
  } else {
    // Ta bort svansen om ormen inte äter
    snake.pop();
  }
}

// Rita spelet
function draw() {
  // Rensa canvas
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

  // Rita poäng
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Generera mat på slumpmässig plats
function generateFood() {
  let foodX, foodY;
  let isOnSnake;

  do {
    foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

    // Kontrollera om maten hamnar på ormen
    isOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
  } while (isOnSnake);

  return { x: foodX, y: foodY };
}

// Visa en historisk fråga
function askHistoryQuestion() {
  // Pausa spelet
  gameRunning = false;

  // Hämta en slumpmässig fråga
  const randomIndex = Math.floor(Math.random() * historyQuestions.length);
  const question = historyQuestions[randomIndex];

  // Visa frågetext och svarsalternativ
  questionText.innerHTML = `${question.question}<br><br>
    1. ${question.options[0]}<br>
    2. ${question.options[1]}<br>
    3. ${question.options[2]}`;
  questionModal.classList.remove("hidden");

  // Spara korr
