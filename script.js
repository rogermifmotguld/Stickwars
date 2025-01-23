const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let carX = 150;
let carY = 400;
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
    // Lägg till fler frågor här
];

function drawTrack() {
    // Rita bakgrunden
    ctx.fillStyle = "#555"; // Bakgrundsfärg
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rita banans område
    ctx.fillStyle = "#222"; // Banans färg
    ctx.beginPath();
    ctx.rect(100, 100, 600, 400); // Yttre rektangel
    ctx.fill();

    // Rita mållinjen
    ctx.fillStyle = "white"; // Mållinjens färg
    ctx.fillRect(300, 480, 200, 10); // Placera en vågrät mållinje
}

function drawCar() {
    ctx.fillStyle = "red"; // Bilens färg
    ctx.fillRect(carX, carY, 40, 20); // Rita bilen som en rektangel
}

function isCarOnTrack(newCarX, newCarY) {
    return (newCarX >= 100 && newCarX <= 700 && newCarY >= 100 && newCarY <= 500);
}

function updateCar() {
    let newCarX = carX;
    let newCarY = carY;

    if (keys["ArrowUp"]) newCarY -= carSpeed;
    if (keys["ArrowDown"]) newCarY += carSpeed;
    if (keys["ArrowLeft"]) newCarX -= carSpeed;
    if (keys["ArrowRight"]) newCarX += carSpeed;

    if (isCarOnTrack(newCarX, newCarY)) {
        carX = newCarX;
        carY = newCarY;
    }

    if (carX > 300 && carX < 500 && carY > 480 && carY < 490) { // Kontrollera mållinjen
        carX = 150; // Flytta tillbaka bilen till startposition
        laps++;
        score += level;
        updateDisplay();

        if (laps % 10 === 0) {
            showQuestion();
        }
    }
}

function updateDisplay() {
    document.getElementById("laps").innerText = laps;
    document.getElementById("level").innerText = level;
    document.getElementById("score").innerText = score;
}

function showQuestion() {
    const question = questions[Math.floor(Math.random() * questions.length)];
    const questionText = document.getElementById("question-text");
    const answersDiv = document.getElementById("answers");

    questionText.innerText = question.question;
    answersDiv.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.className = "answer";
        button.onclick = () => {
            if (index === question.correct) {
                alert("Rätt svar! " + question.explanation);
                level++;
                laps = 0;
                score += level * 10;
                updateDisplay();
            } else {
                alert("Fel svar! " + question.explanation);
            }
            document.getElementById("question-container").classList.add("hidden");
        };
        answersDiv.appendChild(button);
    });

    document.getElementById("question-container").classList.remove("hidden");
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvasen
    drawTrack(); // Rita banan
    drawCar(); // Rita bilen
    updateCar(); // Uppdatera bilens position
    requestAnimationFrame(gameLoop); // Fortsätt spel-loopen
}

gameLoop(); // Starta spel-loopen
console.log("gameLoop körs");
