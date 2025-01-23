const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Inställningar för bilens position och dimensioner
const carWidth = 20;
const carHeight = 20;
let carX = 400 - carWidth / 2;
let carY = 90;
let carSpeed = 3;
let keys = {};
let isRestarting = false;

// Klockor och tidmätning
let lapStartTime = Date.now();
let totalLapTime = 0;
let currentLapTime = 0;
let lapCounter = 0;
const maxLaps = 10;
const lapTimes = [];
let hasLeftStartLine = false;

// Element för att visa information
const currentLapTimeDisplay = document.getElementById("current-lap-time");
const totalTimeDisplay = document.getElementById("total-time");
const lapList = document.getElementById("lap-list");

document.addEventListener("keydown", (e) => {
    if (!isRestarting) keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function drawTrack() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.arc(400, 300, 200, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(400, 300, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#0F0";
    ctx.lineWidth = 20;
    ctx.moveTo(400, 100);
    ctx.lineTo(400, 200);
    ctx.stroke();
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

function updateTimers() {
    currentLapTime = (Date.now() - lapStartTime) / 1000;
    currentLapTimeDisplay.textContent = `Aktuell Varvtid: ${currentLapTime.toFixed(2)} s`;

    const totalTime = totalLapTime + currentLapTime;
    totalTimeDisplay.textContent = `Total Tid: ${totalTime.toFixed(2)} s`;
}

function isCarOnTrack(x, y) {
    const dx = x - 400;
    const dy = y - 300;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance >= 100 && distance <= 200;
}

// Funktion för att registrera ett varv
function registerLap() {
    if (lapCounter >= maxLaps) {
        alert("Du har slutfört alla 10 varv!");
        return;
    }

    const currentLap = (Date.now() - lapStartTime) / 1000;

    // Lägg till varvtiden i listan
    lapTimes.push(currentLap);
    lapCounter++;
    totalLapTime += currentLap;

    // Uppdatera varvtidslistan i displayen
    const lapItem = document.createElement("li");
    lapItem.textContent = `Varv ${lapCounter}: ${currentLap.toFixed(2)} s`;
    lapList.appendChild(lapItem);

    console.log(`Varv ${lapCounter} registrerat: ${currentLap.toFixed(2)} s`);

    // Nollställ aktuell varvtid
    lapStartTime = Date.now();
    currentLapTime = 0;
}

// Kontrollera om bilen korsar startlinjen
function checkIfCrossingStartLine() {
    console.log(`Bilens position: carX=${carX}, carY=${carY}, hasLeftStartLine=${hasLeftStartLine}`);

    if (carY <= 120 && carY >= 100 && carX >= 380 && carX <= 420) {
        console.log("Bilen korsar startlinjen.");
        if (hasLeftStartLine) {
            console.log("Registrerar ett varv...");
            registerLap(); // Registrera varvet
        }
        hasLeftStartLine = true;
    } else if (carY > 120 || carY < 100) {
        hasLeftStartLine = false; // Återställ när bilen lämnar startlinjen
    }
}

function updateCar() {
    if (isRestarting) return;

    let newCarX = carX;
    let newCarY = carY;

    if (keys["ArrowUp"]) newCarY -= carSpeed;
    if (keys["ArrowDown"]) newCarY += carSpeed;
    if (keys["ArrowLeft"]) newCarX -= carSpeed;
    if (keys["ArrowRight"]) newCarX += carSpeed;

    const carCenterX = newCarX + carWidth / 2;
    const carCenterY = newCarY + carHeight / 2;

    if (isCarOnTrack(carCenterX, carCenterY)) {
        carX = newCarX;
        carY = newCarY;

        checkIfCrossingStartLine();
    } else {
        resetCar();
    }
}

function resetCar() {
    if (isRestarting) return;

    isRestarting = true;
    alert("Du körde av banan! Startar om...");

    carX = 400 - carWidth / 2;
    carY = 90;

    keys = {};
    hasLeftStartLine = false;

    setTimeout(() => {
        isRestarting = false;
    }, 500);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrack();
    drawCar();
    updateCar();
    updateTimers();
    requestAnimationFrame(gameLoop);
}

gameLoop();
