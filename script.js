const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Inställningar för bilens position och dimensioner
const carWidth = 20; // Bilens bredd
const carHeight = 20; // Bilens höjd
let carX = 400 - carWidth / 2; // Startposition X (centrerad på linjen)
let carY = 90; // Startposition Y (precis ovanför linjen)
let carSpeed = 3; // Bilens hastighet
let keys = {}; // För tangenttryckningar
let isRestarting = false; // Indikator för om spelet är i omstartsfas

// Registrera tangenttryckningar
document.addEventListener("keydown", (e) => {
    if (!isRestarting) keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Rita banan och den gröna startlinjen
function drawTrack() {
    // Rita svart bakgrund
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rita vit yttre cirkel (banan)
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.arc(400, 300, 200, 0, Math.PI * 2);
    ctx.fill();

    // Rita svart inre cirkel
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(400, 300, 100, 0, Math.PI * 2);
    ctx.fill();

    // Rita grön startlinje (endast på övre delen av banan)
    ctx.beginPath();
    ctx.strokeStyle = "#0F0"; // Grön färg
    ctx.lineWidth = 20; // Linjens tjocklek
    ctx.moveTo(400, 100); // Börja vid yttre cirkelns radie (toppen)
    ctx.lineTo(400, 120); // Sluta precis ovanför bilens startposition
    ctx.stroke();
}

// Rita bilen
function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Kontrollera om bilen är på banan
function isCarOnTrack(x, y) {
    const dx = x - 400; // Avstånd från banans centrum i X-led
    const dy = y - 300; // Avstånd från banans centrum i Y-led
    const distance = Math.sqrt(dx * dx + dy * dy); // Avstånd från centrum

    // Kontrollera om avståndet är inom banans radie
    return distance >= 100 && distance <= 200;
}

// Uppdatera bilens position
function updateCar() {
    if (isRestarting) return;

    let newCarX = carX;
    let newCarY = carY;

    // Hantera tangenttryckningar
    if (keys["ArrowUp"]) newCarY -= carSpeed;
    if (keys["ArrowDown"]) newCarY += carSpeed;
    if (keys["ArrowLeft"]) newCarX -= carSpeed;
    if (keys["ArrowRight"]) newCarX += carSpeed;

    // Kontrollera att bilens mittpunkt är på banan
    const carCenterX = newCarX + carWidth / 2;
    const carCenterY = newCarY + carHeight / 2;

    if (isCarOnTrack(carCenterX, carCenterY)) {
        carX = newCarX;
        carY = newCarY;
    } else {
        resetCar();
    }
}

// Starta om bilen
function resetCar() {
    if (isRestarting) return;

    isRestarting = true;
    alert("Du körde av banan! Startar om...");

    // Placera bilen ovanför startlinjen
    carX = 400 - carWidth / 2;
    carY = 90; // Precis ovanför linjen

    // Nollställ tangenttryckningar
    keys = {};

    // Vänta innan spelaren kan styra igen
    setTimeout(() => {
        isRestarting = false;
    }, 500);
}

// Spelloopen
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvasen
    drawTrack(); // Rita banan och startlinjen
    drawCar(); // Rita bilen
    updateCar(); // Uppdatera bilens position
    requestAnimationFrame(gameLoop); // Kör nästa iteration
}

// Starta spelloopen
gameLoop();
