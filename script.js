// Hämtar element från DOM
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const timeDisplay = document.getElementById("time-display");
const lapCounterDisplay = document.getElementById("lap-counter");

// Variabler för tid och varv
let elapsedTime = 0; // Total tid i sekunder
let lapCount = 0;    // Antal varv

// Variabler för bilens position
const car = {
    x: 400, // Startposition (centrum av banan)
    y: 220,
    width: 20,
    height: 10,
    angle: 0, // För att bilen ska kunna röra sig i en cirkel
    speed: 2,
    color: "red"
};

// Mållinje
const finishLine = {
    x: 390,
    y: 200,
    width: 40,
    height: 5,
    color: "green"
};

// Tidshantering
let lastTime = performance.now();

// Funktion för att uppdatera tiden
function updateTime(deltaTime) {
    elapsedTime += deltaTime / 1000; // Uppdatera tiden i sekunder
    timeDisplay.textContent = `Tid: ${elapsedTime.toFixed(2)} s`;
}

// Funktion för att rita banan
function drawTrack() {
    ctx.fillStyle = "white";

    // Rita oval bana
    ctx.beginPath();
    ctx.ellipse(400, 300, 300, 200, 0, 0, 2 * Math.PI); // Oval i mitten av canvas
    ctx.fill();

    // Rita innerbanans "hål"
    ctx.fillStyle = "#222"; // Samma färg som bakgrunden
    ctx.beginPath();
    ctx.ellipse(400, 300, 250, 150, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Rita mållinjen
    ctx.fillStyle = finishLine.color;
    ctx.fillRect(finishLine.x, finishLine.y, finishLine.width, finishLine.height);
}

// Funktion för att rita bilen
function drawCar() {
    ctx.save();
    ctx.translate(car.x, car.y); // Flytta till bilens position
    ctx.rotate(car.angle); // Rotera bilen
    ctx.fillStyle = car.color;
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore();
}

// Funktion för att uppdatera spelet
function updateGame(deltaTime) {
    // Flytta bilen runt banan
    car.angle += (car.speed / 200); // Ändra vinkeln för cirkulär rörelse
    car.x = 400 + Math.cos(car.angle) * 270; // Bilens x-position
    car.y = 300 + Math.sin(car.angle) * 180; // Bilens y-position

    // Kontrollera om bilen passerar mållinjen (startpunkten)
    if (
        car.angle >= 2 * Math.PI // Ett komplett varv (360 grader)
    ) {
        car.angle = 0; // Nollställ vinkeln för nästa varv
        lapCount++; // Öka varvräknaren
        lapCounterDisplay.textContent = `Varv: ${lapCount}`;
    }

    // Rita allt på canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvas
    drawTrack(); // Rita banan
    drawCar(); // Rita bilen
}

// Spel-loop
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime; // Tid mellan uppdateringar
    lastTime = timestamp;

    updateTime(deltaTime); // Uppdatera tiden
    updateGame(deltaTime); // Uppdatera spelet

    requestAnimationFrame(gameLoop); // Nästa uppdatering
}

// Starta spelet
requestAnimationFrame(gameLoop);
