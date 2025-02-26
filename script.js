// Hämta canvas och sätt storlek
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Anpassa storleken till skärmen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// **TEST 1: Ser vi en vit fyrkant?**
ctx.fillStyle = "white";
ctx.fillRect(50, 50, 100, 100);
console.log("Vit fyrkant ritad. Ser du den?");

// Konstanter
const MAX_PLAYERS = 30;
let players = []; // Lista över spelare

// **TEST 2: Skapa en spelare direkt**
function createPlayer() {
    let player = {
        x: canvas.width / 2, // Placera i mitten för test
        y: canvas.height / 2,
        color: "red" // Förenklar för testning
    };
    console.log("Ny spelare skapad:", player);
    return player;
}

// Lägg till en spelare
function addPlayer() {
    if (players.length < MAX_PLAYERS) {
        let newPlayer = createPlayer();
        players.push(newPlayer);
        console.log("Nuvarande spelare:", players);
    }
}

// **TEST 3: Enklare rita streckgubbe (fast position)**
function drawPlayer(player) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 3;

    let headSize = 15;
    let bodyLength = 30;
    let armLength = 40;
    let legLength = 20;
    let x = player.x;
    let y = player.y;

    console.log("Ritar spelare vid:", x, y);

    // Huvud
    ctx.beginPath();
    ctx.arc(x, y, headSize, 0, Math.PI * 2);
    ctx.stroke();

    // Kropp
    ctx.beginPath();
    ctx.moveTo(x, y + headSize);
    ctx.lineTo(x, y + headSize + bodyLength);
    ctx.stroke();

    // Armar
    ctx.beginPath();
    ctx.moveTo(x - armLength, y + headSize + 10);
    ctx.lineTo(x + armLength, y + headSize + 10);
    ctx.stroke();

    // Ben
    ctx.beginPath();
    ctx.moveTo(x, y + headSize + bodyLength);
    ctx.lineTo(x - legLength, y + headSize + bodyLength + 20);
    ctx.moveTo(x, y + headSize + bodyLength);
    ctx.lineTo(x + legLength, y + headSize + bodyLength + 20);
    ctx.stroke();
}

// **TEST 4: Enklare drawPlayers()**
function drawPlayers() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Bakgrund ritad");

    players.forEach(drawPlayer);
}

// **TEST 5: Kör gameLoop() och logga varje frame**
function gameLoop() {
    console.log("Frame ritas...");
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

// Starta spelet
addPlayer();
gameLoop();
