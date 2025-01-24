// Hämtar element från DOM
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const elapsedTimeDisplay = document.getElementById("elapsed-time");
const lapCounterDisplay = document.getElementById("lap-counter");

// Variabler för tid och varv
let elapsedTime = 0; // Total tid i sekunder
let lapCount = 0;    // Antal varv

// Bilen
const car = {
    x: 400,
    y: 500,
    width: 20,
    height: 20,
    speed: 3,
    color: "red"
};

// Mållinje
const finishLine = {
    x: 390,
    y: 100,
    width: 60,
    height: 10,
    color: "green"
};

// Tidshantering
let lastTime = performance.now();
function updateTime(deltaTime) {
    elapsedTime += deltaTime / 1000; // Lägg till tid i sekunder
    elapsedTimeDisplay.textContent = `Tid: ${elapsedTime.toFixed(2)} s`;
}

// Spel-loop
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime; // Tid mellan uppdateringar
    lastTime = timestamp;

    // Uppdaterar tid
    updateTime(deltaTime);

    // Ritar spelet
    updateGame();

    requestAnimationFrame(gameLoop); // Nästa uppdatering
}

// Uppdaterar spelet
function updateGame() {
    // Rensa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ritar mållinjen
    ctx.fillStyle = finishLine.color;
    ctx.fillRect(finishLine.x, finishLine.y, finishLine.width, finishLine.height);

    // Ritar bilen
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Flytta bilen
    car.y -= car.speed; // Bilen rör sig uppåt

    // Kontrollera om bilen passerar mållinjen
    if (car.y < finishLine.y + finishLine.height) {
        lapCount++; // Öka varvräknaren
        lapCounterDisplay.textContent = `Varv: ${lapCount}`;

        // Flytta bilen tillbaka till startposition
        car.y = 500;
    }
}

// Starta spelet
requestAnimationFrame(gameLoop);
