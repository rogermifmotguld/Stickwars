// Hämta canvas och kontext
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Anpassa storleken till skärmen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Konstanter
const MAX_OBSTACLES = 5; // Max 5 hinder samtidigt
const OBSTACLE_LIFETIME = 60000; // 60 sekunder
const PLAYER_SPEED = 5;
const GRAVITY = 0.5;
let obstacles = []; // Lista över hinder

// Spelarens data (endast en spelare)
let player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 30,
    height: 50,
    targetX: canvas.width / 2,
    targetY: canvas.height - 100,
    velocityY: 0,
    color: "red", 
    onGround: false
};

// Generera ett slumpmässigt hinder (en form med ett vitt streck inuti)
function createRandomObstacle() {
    return {
        x: Math.random() * (canvas.width - 100), // Slumpmässig position
        y: Math.random() * (canvas.height - 150) + 100,
        width: Math.random() * 100 + 50,
        height: Math.random() * 50 + 20,
        createdAt: Date.now() // Tidpunkt då hindret skapades
    };
}

// Uppdatera hindren: Ta bort gamla och skapa nya
function updateObstacles() {
    const now = Date.now();
    // Behåll bara hinder som är yngre än 60 sekunder
    obstacles = obstacles.filter(obstacle => now - obstacle.createdAt < OBSTACLE_LIFETIME);

    // Skapa nya hinder om det finns plats
    while (obstacles.length < MAX_OBSTACLES) {
        let newObstacle = createRandomObstacle();
        obstacles.push(newObstacle);
        console.log("✅ Nytt hinder skapat:", newObstacle);
    }
}

// Rita hindren (vita geometriska former med ett vitt streck inuti)
function drawObstacles() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    obstacles.forEach(obstacle => {
        // Rita geometrisk form (rektangel)
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Rita vitt streck inuti formen
        ctx.beginPath();
        ctx.moveTo(obstacle.x + 5, obstacle.y + obstacle.height / 2);
        ctx.lineTo(obstacle.x + obstacle.width - 5, obstacle.y + obstacle.height / 2);
        ctx.stroke();
    });
}

// Kolla kollision med hinder (för klättring)
function checkCollision(player, obstacle) {
    return (
        player.x + player.width > obstacle.x &&
        player.x < obstacle.x + obstacle.width &&
        player.y + player.height > obstacle.y &&
        player.y < obstacle.y + obstacle.height
    );
}

// Uppdatera spelaren (rörelse och gravitation)
function updatePlayer() {
    let dx = player.targetX - player.x;
    let dy = player.targetY - player.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Flytta horisontellt
    if (distance > PLAYER_SPEED) {
        player.x += (dx / distance) * PLAYER_SPEED;
    } else {
        player.x = player.targetX;
    }

    // Gravitation
    player.velocityY += GRAVITY;
    player.y += player.velocityY;

    // Kolla om spelaren landar på ett hinder
    player.onGround = false;
    obstacles.forEach(obstacle => {
        if (checkCollision(player, obstacle)) {
            player.velocityY = 0;
            player.y = obstacle.y - player.height; // Ställ spelaren ovanpå hindret
            player.onGround = true;
        }
    });

    // Håll spelaren inom skärmen
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
}

// Rita spelaren
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Uppdatera och rita spelet
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawObstacles();
    drawPlayer();
}

// Spelets huvudloop
function gameLoop() {
    updateObstacles(); // Hantera hinder (ta bort gamla, skapa nya)
    updatePlayer(); // Hantera spelarens rörelser
    drawGame(); // Rita om spelet
    requestAnimationFrame(gameLoop);
}

// Lyssna efter touch för att flytta spelaren
canvas.addEventListener("touchstart", (event) => {
    let touch = event.touches[0];
    player.targetX = touch.clientX;
    if (player.onGround) {
        player.velocityY = -10; // Hoppa om spelaren står på marken
    }
});

// **Starta spelet och generera hinder EN GÅNG**
updateObstacles();
gameLoop();
