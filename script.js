// 🎮 Hämta Canvas och kontext
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🎨 Canvas storlek
canvas.width = 400;
canvas.height = 400;
const boxSize = 20;

// 🐍 Ormens startvärden
let snake = [{ x: 200, y: 200 }];
let direction = { x: boxSize, y: 0 }; // Börja röra sig höger
let nextDirection = { x: boxSize, y: 0 };
let food = generateFood();
let score = 0;
let isPaused = false;

// 📚 Frågor och svar
const pauseIntervals = [5, 10, 15, 20]; // Poäng där spelet pausar
const questions = {
  5: {
    question: "Vad var en viktig orsak till att den industriella revolutionen började i Storbritannien?",
    correctAnswer: "Tillgång till kol och järn",
    wrongAnswers: ["Stort antal slavar", "Ett varmt klimat", "Mindre befolkning"],
  },
  10: {
    question: "Vilken uppfinning förbättrade fabriker och transporter under den industriella revolutionen?",
    correctAnswer: "Ångmaskinen",
    wrongAnswers: ["Elektriciteten", "Telegrafen", "Bilen"],
  },
  15: {
    question: "Vilka arbetade ofta i fabrikerna under den industriella revolutionen?",
    correctAnswer: "Kvinnor och barn",
    wrongAnswers: ["Bara män", "Endast adeln", "Ingen, allt sköttes av maskiner"],
  },
  20: {
    question: "Vad var enclosure-rörelsen?",
    correctAnswer: "När mark inhägnades och bönder tvingades flytta till städer",
    wrongAnswers: ["När staten tog över jordbruket", "När fabriker började användas", "När bönder fick mer mark att odla på"],
  },
};

// 🏆 HTML-element
const scoreText = document.getElementById("scoreText");
const questionText = document.getElementById("questionText");
const answerSection = document.getElementById("answerSection");

// 🎮 Styrning
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

// 🔄 Spelloop
function gameLoop() {
  if (isPaused) return;
  update();
  draw();
  setTimeout(gameLoop, 100);
}

// 📌 Uppdatera spelet
function update() {
  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Poäng: ${score}`);
    document.location.reload();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = generateFood();
    if (pauseIntervals.includes(score)) {
      pauseGameWithQuestion(score);
      return;
    }
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

// 🎨 Rita spelet
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// ❓ Pausa spelet och visa fråga
function pauseGameWithQuestion(score) {
  isPaused = true;
  questionText.textContent = questions[score].question;
  questionText.style.display = "block";
  answerSection.innerHTML = "";
  
  const allAnswers = [...questions[score].wrongAnswers, questions[score].correctAnswer]
    .sort(() => Math.random() - 0.5);

  allAnswers.forEach(answer => {
    let btn = document.createElement("button");
    btn.className = "answerButton";
    btn.textContent = answer;
    btn.onclick = () => answerQuestion(answer, questions[score].correctAnswer);
    answerSection.appendChild(btn);
  });
}

// 🚀 Starta spelet
gameLoop();
