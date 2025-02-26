// Hämta canvas och sätt storlek
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Anpassa storleken till skärmen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Konstanter
const MAX_PLAYERS = 30;
let players = []; // Lista över spelare

// Generera en slumpmässig färg som aldrig blir svart
function getRandomColor() {
    let hue = Math.random() * 360; // Slumpmässig färgton
    let saturation = 100; // Full färgstyrka
    let lightness = Math.random() * 50 + 30; // Aldrig för mörk (30-80%)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Skapa en ny spelpjäs (streckgubbe)
function createPlayer() {
    return {
        x: Math.random() * canvas.width, // Slumpad startposition
        y: Math.random() * canvas.height,
        color: getRandomColor(), // Slumpmässig färg som alltid syns
    };
}

// Lägg till en ny spelare om maxgränsen inte är nådd
function addPlayer() {
    if (players.length < MAX_PLAYERS) {
        let newPlayer = createPlayer();
        players.push(newPlayer);
    }
}

// Rita alla spelpjäser på canvasen
function drawPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvasen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Svart bakgrund

    players.forEach(drawPlayer); // Rita varje spelare
}

// Rita streckgubbe med längre armar
function drawPlayer(player) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 3;

    // Kroppsdelar
    let headSize = 15;
    let bodyLength = 30;
    let armLength = 40; // Förlängda armar för att kunna hålla vapen
    let legLength = 20;
    let x = player.x;
    let y = player.y;

    // Huvud
    ctx.beginPath();
    ctx.arc(x, y, headSize, 0, Math.PI * 2);
    ctx.stroke();

    // Kropp
    ctx.beginPath();
    ctx.moveTo(x, y + headSize);
    ctx.lineTo(x, y + headSize + bodyLength);
    ctx.stroke();

    // Armar (längre nu)
    ctx.beginPath();
    ctx.moveTo(x - armLength, y + headSize + 10); // Vänster arm
    ctx.lineTo(x + armLength, y + headSize + 10); // Höger arm
    ctx.stroke();

    // Ben
    ctx.beginPath();
    ctx.moveTo(x, y + headSize + bodyLength);
    ctx.lineTo(x - legLength, y + headSize + bodyLength + 20);
    ctx.moveTo(x, y + headSize + bodyLength);
    ctx.lineTo(x + legLength, y + headSize + bodyLength + 20);
    ctx.stroke();
}

// **VIKTIG FIX**: Se till att spelet ritar om sig kontinuerligt
function gameLoop() {
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

// Lägg till en spelare när någon går in i spelet
addPlayer();
gameLoop();
