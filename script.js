// Elementreferenser
const car = document.getElementById("car");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextLevelContainer = document.getElementById("next-level");
const nextBtn = document.getElementById("next-btn");
const gameOverContainer = document.getElementById("game-over");
const retryBtn = document.getElementById("retry-btn");

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

// Rörelse för bilen
document.addEventListener("keydown", (e) => {
  const carPosition = car.offsetLeft;
  if (e.key === "ArrowRight" && carPosition < 360) {
    car.style.left = carPosition + 20 + "px";
  }
  if (e.key === "ArrowLeft" && carPosition > 0) {
    car.style.left = carPosition - 20 + "px";
  }

  // Målgång (framme vid toppen av banan)
  if (car.offsetTop <= 10) {
    showQuestion();
  }
});

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
  car.style.top = "250px";
  car.style.left = "50%";
  nextLevelContainer.classList.add("hidden");
  gameOverContainer.classList.add("hidden");
}
