// Hämta canvas och sätt storlek
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Anpassa storleken till skärmen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Spelkaraktär (gubbe)
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 30,
    color: "red"
};

// Rita spelkaraktären på canvasen
function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvasen
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

// Uppdatera spelarens position baserat på touch
canvas.addEventListener("touchstart", (event) => {
    let touch = event.touches[0]; // Ta första touchpunkten
    player.x = touch.clientX;
    player.y = touch.clientY;
    drawPlayer();
});

// Rita första gången
drawPlayer();
