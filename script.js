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
function update() 
