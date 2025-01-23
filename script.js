const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bilens startposition på den vita körbanan
let carX = 400; // Körbanans centrum (X)
let carY = 100; // Längst upp på banan (centrum - yttre radie)
let carSpeed = 3; // Bilens hastighet
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Funktion som ritar den cirkulära banan
function drawTrack() {
    // Rita svart bakgrund
    ctx.fillStyle = "#000"; // Svart bakgrund
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rita vit yttre cirkel (banan)
    ctx.beginPath();
    ctx.fillStyle = "#FFF"; // Vit färg för banan
    ctx.arc(400, 300, 200, 0, Math.PI * 2); // Yttre cirkel (radie = 200)
    ctx.fill();

    // Rita svart inre cirkel (hålet i banan)
    ctx.beginPath();
    ctx.fillStyle = "#000"; // Svart färg inuti
    ctx.arc(400, 300, 100, 0, Math.PI * 2); // Inre cirkel (radie = 100)
    ctx.fill();
}

// Rita bilen som en rektangel
function drawCar() {
    ctx.fillStyle = "red"; // Bilens färg
    ctx.fillRect(carX, carY, 20, 20); // Rita bilen som en liten kvadrat
}

// Kontrollera om bilen är på banan
function isCarOnTrack(x, y) {
    // Avstånd från bilens mittpunkt till banans centrum
    const dx = x - 400;
    const dy = y - 300;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Kontrollera om bilen är mellan den inre och yttre cirkeln
    return distance >= 100 && distance <= 200;
}

// Uppdatera bilens position och kontrollera kollisioner
function updateCar() {
    let newCarX = carX;
    let newCarY = carY;

    // Flytta bilen baserat på tangenttryckningar
    if (keys["ArrowUp"]) newCarY -= carSpeed;
    if (keys["ArrowDown"]) newCarY += carSpeed;
    if (keys["ArrowLeft"]) newCarX -= carSpeed;
    if (keys["ArrowRight"]) newCarX += carSpeed;

    // Kontrollera om bilen är på banan
    if (isCarOnTrack(newCarX + 10, newCarY + 10)) { // Kontrollera bilens mittpunkt
        carX = newCarX;
        carY = newCarY;
    } else {
        // Om bilen är utanför banan, starta om
        alert("Du körde av banan! Startar om...");
        resetCar();
    }
}

// Starta om bilen från början (på banan)
function resetCar() {
    carX = 400; // Körbanans centrum (X)
    carY = 100; // Längst upp på banan (centrum - yttre radie)
}

// Spelloopen
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvasen
    drawTrack(); // Rita banan
    drawCar(); // Rita bilen
    updateCar(); // Uppdatera bilens position
    requestAnimationFrame(gameLoop); // Fortsätt spel-loopen
}

// Starta spelloopen
gameLoop();
