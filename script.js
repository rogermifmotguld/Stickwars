// Elementreferenser
const car = document.getElementById("car");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextLevelContainer = document.getElementById("next-level");
const nextBtn = document.getElementById("next-btn");
const gameOverContainer = document.getElementById("game-over");
const retryBtn = document.getElementById("retry-btn");
const track = document.getElementById("track");

// Frågor och svar
const questions = [
  {
    question: "Vad menas med förnuft och hur kopplas det till upplysningen?",
    options: ["Logik och frihet", "Känslor och religion", "Tradition och auktoritet"],
    answer: 0,
  },
  {
    question: "Vad innebär begreppet samhällskontrakt?",
    options: [
      "Ett avtal mellan individer och staten",
      "En lag om handel",
      "En överenskommelse mellan två länder",
    ],
    answer: 0,
  },
  {
    question: "Vem förespråkade maktfördelning?",
    options: ["Montesquieu", "Rousseau", "Voltaire"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let carPositionX = 50; // Bilens horisontella position i procent
let carPositionY = 90; // Bilens vertikala position i procent

// Rörelse för bilen – tangentbord
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && carPositionX < 90) {
    carPositionX += 5;
  }
  if (e.key === "ArrowLeft" && carPositionX > 0) {
    carPositionX -= 5;
  }
  if (e.key === "ArrowUp" && carPositionY > 0) {
    carPositionY -= 5;
  }
  if (e.key === "ArrowDown" && carPositionY < 90) {
    carPositionY += 5;
  }
  updateCarPosition();

  // Kontrollera om bilen är vid målgång (överst på banan)
  if (carPositionY <= 0) {
    showQuestion();
  }
});

// Rörelse för bilen – touch screen
let touchStartX = 0;
let touchStartY = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

track.addEventListener("touchmove", (e) => {
  const touchMoveX = e.touches[0].clientX;
  const touchMoveY = e.touches[0].clientY;

  // Beräkna rörelseriktning
  if (touchMoveX > touchStartX + 20 && carPositionX < 90) {
    carPositionX += 5;
  }
  if (touchMoveX < touchStartX - 20 && carPositionX > 0) {
    carPositionX -= 5;
  }
  if (touchMoveY < touchStartY - 20 && carPositionY > 0) {
    carPositionY -= 5;
  }
  if (touchMoveY > touchStartY + 20 && carPositionY < 90) {
    carPositionY += 5;
  }

  touchStartX = touchMoveX;
  touchStartY = touchMoveY;

  updateCarPosition();

  // Kontrollera om bilen är vid målgång (överst på banan)
  if (carPositionY <= 0) {
    showQuestion();
  }
});

// Uppdatera bilens position
function updateCarPosition() {
  car.style.left = carPositionX + "%";
  car.style.top = carPositionY + "%";
}

// Visa frågan
function showQuestion() {
  questionContainer.classList.remove("hidden");
  questionText.textContent = questions[currentQuestionIndex].question;

  // Rensa tidigare svarsalternativ
  answersContainer.innerHTML = "";

  // Skapa nya svarsalternativ
  questions[currentQuestionIndex].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    answersContainer.appendChild(button);
  });
}

// Kontrollera svar
function checkAnswer(selectedIndex) {
  if (selectedIndex === questions[currentQuestionIndex].answer) {
    // Rätt svar
    questionContainer.classList.add("hidden");
    nextLevelContainer.classList.remove("hidden");
  } else {
    // Fel svar
    questionContainer.classList.add("hidden");
    gameOverContainer.classList.remove("hidden");
  }
}

// Nästa bana
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    resetGame();
  } else {
    alert("Grattis! Du har klarat alla banor!");
  }
});

// Försök igen
retryBtn.addEventListener("click", () => {
  resetGame();
});

// Återställ spelet
function resetGame() {
  carPositionX = 50;
  carPositionY = 90;
  updateCarPosition();
  nextLevelContainer.classList.add("hidden");
  gameOverContainer.classList.add("hidden");
}
