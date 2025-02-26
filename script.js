// Hämta canvas och kontext
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Anpassa storleken till skärmen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`✅ Canvasstorlek: ${canvas.width} x ${canvas.height}`);
}
resizeCanvas();

// Konstanter
const MAX_PLAYERS = 30;
let players = []; // Lista över spelare

// Generera en slumpmässig färg som aldrig blir svart eller för mörk
function getRandomColor() {
    let hue = Math.random() * 360; // Slumpmässig färgton
    let saturation = 100; // Full färgstyrka
    let lightness = Math.random() * 50 + 40; // Aldrig för mörk (40-90%)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Skapa en ny spelpjäs (streckgubbe) med slumpmässig position och färg
function createPlayer() {
    let player = {
        x: Math.random() * (canvas.width - 50) + 25, // Slumpad X-position
        y: Math.random() * (canvas.height - 50) + 25, // Slumpad Y-position
        color: getRandomColor(), // Slumpmässig färg
    };

    console.log("✅ Ny spelare skapad:", player);
    return player;
}

// Lägg till en ny spelare om maxgränsen inte är nådd
function addPlayer() {
    if (players.length < MAX_PLAYERS) {
        let newPlayer = createPlayer();
        players.push(newPlayer);
        console.log("✅ Nuvarande spelare:", players);
    }
}

// Rita streckgubbe med längre armar
function drawPlayer(player) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 3;

    let headSize = 15;
    let bodyLength = 30;
    let armLength = 40;
    let legLength = 20;
    let x = player.x;
    let y = player.y;

    console.log("✅ Ritar spelare vid:", x, y);

    // Huvud
    ctx.beginPath();
    ctx.arc(x, y, headSize, 0, Math.PI * 2);
    ctx.stroke();

    // Kropp
    ctx.beginPath();
    ctx.moveTo(x, y + headSize);
    ctx.lineTo(x, y + headSize + bodyLength);
    ctx.stroke();

    // Armar (extra långa för att hålla vapen)
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

// Rita alla spelpjäser på canvasen
function drawPlayers() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    players.forEach(drawPlayer);
}

// **Game Loop som ritar spelet kontinuerligt**
function gameLoop() {
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

// **Starta spelet med flera spelare**
for (let i = 0; i < 5; i++) { // Testa med 5 spelare
    addPlayer();
}
gameLoop();
