const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let carX = 100; 
let carY = 300;
let carSpeed = 5;
let laps = 0;
let level = 1;
let score = 0;

let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

const questions = [
    {
        question: "Vad menas med förnuft och hur kopplas det till upplysningen?",
        answers: [
            "Att använda känsla för att förstå världen.",
            "Att använda logiskt tänkande och kritisk analys.",
            "Att acceptera auktoritet utan ifrågasättande."
        ],
        correct: 1,
        explanation: "Förnuft innebär logik och kritiskt tänkande, centralt för upplysningen."
    },
    {
        question: "Vad innebär begreppet samhällskontrakt?",
        answers: [
            "En överenskommelse mellan folket och staten.",
            "Ett avtal som avskaffar friheter.",
            "En filosofi som förbjuder jämlikhet."
        ],
        correct: 0,
        explanation: "Samhällskontraktet innebär att människor ger upp vissa friheter för skydd och ordning."
    }
];

function updateDisplay() {
    document.getElementById("score").textContent = `Poäng: ${score}`;
    document.getElementById("level").textContent = `Nivå: ${level}`;
    document.getElementById("laps").textContent = `Varv: ${laps}`;
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(carX, carY, 40, 20);
}

function updateCar() {
    if (keys["ArrowUp"]) carY -= carSpeed;
    if (keys["ArrowDown"]) carY += carSpeed;
    if (keys["ArrowLeft"]) carX -= carSpeed;
    if (keys["ArrowRight"]) carX += carSpeed;

    if (carX < 0) carX = 0;
    if (carX > canvas.width - 40) carX = canvas.width - 40;
    if (carY < 0) carY = 0;
    if (carY > canvas.height - 20) carY = canvas.height - 20;

    if (carX > 750) {
        carX = 100;
        laps++;
        score += level;
        updateDisplay();

        if (laps % 10 === 0) {
            showQuestion();
        }
    }
}

function showQuestion() {
    const questionIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[questionIndex];

    document.getElementById("question-text").textContent = currentQuestion.question;

    const answerButtons = document.querySelectorAll(".answer");
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => {
            if (index === currentQuestion.correct) {
                level++;
                score += level * 10;
                laps = 0;
            } else {
                alert(`Fel svar! ${currentQuestion.explanation}`);
            }
            document.getElementById("question-container").classList.add("hidden");
            updateDisplay();
        };
    });

    document.getElementById("question-container").classList.remove("hidden");
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    updateCar();
    requestAnimationFrame(gameLoop);
}

updateDisplay();
gameLoop();