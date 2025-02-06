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
const pauseIntervals = [5, 10]; // Poäng där spelet pausar
const questions = {
  5: {
    question: "Vad menas med förnuft och hur kopplas det till upplysningen?",
    correctAnswer: "Logiskt tänkande och kritisk analys",
    wrongAnswers: ["Blind tro på auktoriteter", "Kungens makt är absolut"],
  },
  10: {
    question: "Vad innebär begreppet samhällskontrakt?",
    correctAnswer: "Människor bildar samhällen genom att överlämna vissa rättigheter till en regering i utbyte mot skydd och ordning.",
    wrongAnswers: ["Alla medborgare har samma rättigheter utan en regering.", "Samhället styrs helt utan några regler."],
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

  // Väggkollision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    alert(`Game Over! Poäng: ${score}`);
    document.location.reload();
    return;
  }

  // Äta mat
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

  // Kollision med sig själv
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert(`Game Over! Poäng: ${score}`);
    document.location.reload();
    return;
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

// 🍎 Slumpa ny matposition
function generateFood() {
  let foodX, foodY;
  do {
    foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
  } while (snake.some(segment => segment.x === foodX && segment.y === foodY));
  return { x: foodX, y: foodY };
}

// 🏆 Uppdatera poäng
function updateScore() {
  scoreText.textContent = `Poäng: ${score}`;
}

// ❓ Hantera frågor
function pauseGameWithQuestion(score) {
  isPaused = true;
  questionText.textContent = questions[score].question;
  questionText.style.display = "block";
  answerSection.innerHTML = "";
  [...questions[score].wrongAnswers, questions[score].correctAnswer]
    .sort(() => Math.random() - 0.5)
    .forEach(answer => {
      let btn = document.createElement("button");
      btn.className = "answerButton";
      btn.textContent = answer;
      btn.onclick = () => answerQuestion(answer, questions[score].correctAnswer);
      answerSection.appendChild(btn);
    });
}

// 🚀 Starta spelet
gameLoop();
