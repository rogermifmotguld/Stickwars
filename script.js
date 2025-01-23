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
let bestLapTime = Infinity; 
let totalLapTime = 0; 
let currentLapTime = 0; 
let hasLeftStartLine = false; 

// Element för att visa klockorna
const currentLapTimeDisplay = document.getElementById("current-lap-time");
const bestLapTimeDisplay = document.getElementById("best-lap-time");
const totalTimeDisplay = document.getElementById("total-time");

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

function checkIfCrossingStartLine() {
    if (carY <= 120 && carY >= 100 && carX >= 380 && carX <= 420) {
        if (hasLeftStartLine) {
            totalLapTime += currentLapTime;

            if (currentLapTime < bestLapTime) {
                bestLapTime = currentLapTime;
                bestLapTimeDisplay.textContent = `Bästa Varvtid: ${bestLapTime.toFixed(2)} s`;
            }

            lapStartTime = Date.now();
        }
        hasLeftStartLine = true;
    } else if (carY > 120 || carY < 100) {
        hasLeftStartLine = false;
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
