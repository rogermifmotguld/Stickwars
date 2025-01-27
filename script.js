// Elementreferenser
const car = document.getElementById("car");
const track = document.getElementById("track");
const gameOverContainer = document.getElementById("game-over");
const retryBtn = document.getElementById("retry-btn");

// Bilens position
let carPositionX = 135; // Startposition X
let carPositionY = 135; // Startposition Y
const carSize = 30; // Bilens storlek (bredd och höjd)

// Banans dimensioner
const trackWidth = 300;
const trackHeight = 300;
const trackBorderWidth = 5; // Svarta kantens bredd

// Rörelsehastighet
const moveSpeed = 5; // Hur mycket bilen rör sig per knapptryck

// Rörelse för bilen – tangentbord
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    carPositionX += moveSpeed;
  } else if (e.key === "ArrowLeft") {
    carPositionX -= moveSpeed;
  } else if (e.key === "ArrowUp") {
    carPositionY -= moveSpeed;
  } else if (e.key === "ArrowDown") {
    carPositionY += moveSpeed;
  }

  // Uppdatera bilens position
  updateCarPosition();

  // Kontrollera om bilen nuddar kanten
  checkCollision();
});

// Uppdatera bilens position
function updateCarPosition() {
  car.style.left = carPositionX + "px";
  car.style.top = carPositionY + "px";
}

// Kontrollera om bilen nuddar kanten
function checkCollision() {
  // Kontrollera om bilen nuddar någon kant
  if (
    carPositionX < trackBorderWidth || // Vänster kant
    carPositionX + carSize > trackWidth - trackBorderWidth || // Höger kant
    carPositionY < trackBorderWidth || // Övre kant
    carPositionY + carSize > trackHeight - trackBorderWidth // Nedre kant
  ) {
    gameOver();
  }
}

// Visa "game over" och starta om
function gameOver() {
  // Göm bilen och visa "Game Over"-meddelande
  car.style.display = "none";
  gameOverContainer.classList.remove("hidden");
}

// Återställ spelet
retryBtn.addEventListener("click", () => {
  // Återställ bilens position
  carPositionX = 135;
  carPositionY = 135;
  updateCarPosition();

  // Visa bilen och göm "Game Over"-meddelande
  car.style.display = "block";
  gameOverContainer.classList.add("hidden");
});
