// Hämta canvas och sätt storlek
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Anpassa storleken till skärmen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lista med slumpmässiga former
let shapes = [];

// Skapa en slumpmässig form
function createRandomShape() {
    return {
        x: Math.random() * canvas.width, // Slumpmässig X-position
        y: Math.random() * canvas.height, // Slumpmässig Y-position
        size: Math.random() * 80 + 20, // Storlek mellan 20 och 100 px
        type: Math.random() > 0.5 ? "circle" : "square", // Antingen en cirkel eller fyrkant
        color: "white"
    };
}

// Skapa flera slumpmässiga former
function generateShapes() {
    shapes = [];
    for (let i = 0; i < 5; i++) { // Skapa 5 former
        shapes.push(cre
