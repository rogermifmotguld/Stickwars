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
function drawTrack() {
    // Rita bakgrunden
    ctx.fillStyle = "#555"; // Bakgrundsfärg
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rita banans område
    ctx.fillStyle = "#222"; // Banans färg
    ctx.beginPath();
    ctx.rect(100, 100, 600, 400); // Yttre rektangel
    ctx.fill();

    // Rita gränser (inre område)
    ctx.fillStyle = "#555"; // Inre område
    ctx.beginPath();
    ctx.rect(200, 200, 400, 200); // Inre rektangel
    ctx.fill();

    // Rita mållinjen
    ctx.fillStyle = "white"; // Mållinje
    ctx.fillRect(650, 300, 10, 100); // Placera mållinjen
}

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
function isCarOnTrack(x, y) {
    // Kontrollera om bilen är utanför banans område
    if (
        x < 100 || x + 40 > 700 || // Yttre gränser
        (x > 200 && x + 40 < 600 && y > 200 && y + 20 < 400) // Inre område
    ) {
        return false; // Bilen är utanför banan
    }
    return true; // Bilen är på banan
}
function updateCar() {
    let newCarX = carX;
    let newCarY = carY;

    // Uppdatera bilens position baserat på tangenttryckningar
    if (keys["ArrowUp"]) newCarY -= carSpeed;
    if (keys["ArrowDown"]) newCarY += carSpeed;
    if (keys["ArrowLeft"]) newCarX -= carSpeed;
    if (keys["ArrowRight"]) newCarX += carSpeed;

    // Kontrollera om bilen är på banan
    if (isCarOnTrack(newCarX, newCarY)) {
        carX = newCarX;
        carY = newCarY;
    }

    // Kontrollera om bilen passerar mållinjen
    if (carX > 650 && carX < 660 && carY > 300 && carY < 400) {
        carX = 150; // Flytta tillbaka till start
        laps++; // Öka antal varv
        score += level; // Lägg till poäng
        updateDisplay(); // Uppdatera poängvisningen

        // Visa fråga vid varje 10:e varv
        if (laps % 10 === 0) {
            showQuestion();
        }
    }
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

updateDisplay();
gameLoop();
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvasen
    drawTrack(); // Rita banan
    drawCar(); // Rita bilen
    updateCar(); // Uppdatera bilens position
    requestAnimationFrame(gameLoop); // Fortsätt spel-loopen
}
