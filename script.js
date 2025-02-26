// Hämta canvas och sätt storlek
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Se till att canvas har rätt storlek
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Konstanter
const MAX_PLAYERS = 30;
let players = []; // Lista över spelare

// **Felsökning: Logga att spelet startar**
console.log("Spelet startar...");

// Generera en slumpmässig färg som aldrig blir svart eller för mörk
function getRandomColor() {
    let hue = Math.random() * 360; // Slumpmässig färgton
    let saturation = 100; // Full färgstyrka
    let lightness = Math.random() * 50 + 40; // Aldrig för mörk (40-90%)
    let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // **Felsökning: Logga vilken färg som skapas**
    console.log("Genererad färg:", color);
    
    return color;
}

// Skapa en ny spelpjäs (streckgubbe)
function createPlayer() {
    let player = {
        x: Math.random() * (canvas.width - 50) + 25, // Håller spelaren inom skärmen
        y: Math.random() * (canvas.height - 50) + 25,
        color: getRandomColor(), // Slumpmässig färg som alltid syns
    };

    // **Felsökning: Logga spelaren som skapades**
    console.log("Ny spelare skapad:", player);

    return player;
}

// Lägg till en ny spelare om maxgränsen inte är nådd
function addPlayer() {
    if (players.length < MAX_PLAYERS) {
        let newPlayer = createPlayer();
        players.push(newPlayer);
        drawPlayers(); // Rita direkt så att vi ser att det funkar
    }
}

// Rita streckgubbe med längre armar
function drawPlayer(player) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 3;

    // Kroppsdelar
    let headSize = 15;
    let bodyLength = 30;
    let armLength = 50; // Ännu längre armar för vapen
    let legLength = 20;
    let x = player.x;
    let y = player.y;

    // **Felsökning: Logga att vi ritar spelaren**
    console.log(`Ritar spelare vid (${x}, ${y})`);

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

// Rita alla spelpjäser på canvasen
function drawPlayers() {
    // **Felsökning: Logga att vi ritar bakgrunden**
    console.log("Ritar bakgrund och spelare...");

    ctx.fillStyle = "black"; // Måla bakgrunden först
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rita alla spelare
    players.forEach(drawPlayer);
}

// **Game Loop som ritar spelet kontinuerligt**
function gameLoop() {
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

// **VIKTIG FIX**: Se till att minst en spelare skapas
addPlayer();
gameLoop();
