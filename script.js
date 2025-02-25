let score = 0;
const scoreDisplay = document.getElementById("score");

// A-knappen ger 1 poäng
document.getElementById("buttonA").addEventListener("touchstart", () => {
    score++;
    scoreDisplay.textContent = "Poäng: " + score;
});

// B-knappen ger 2 poäng
document.getElementById("buttonB").addEventListener("touchstart", () => {
    score += 2;
    scoreDisplay.textContent = "Poäng: " + score;
});
