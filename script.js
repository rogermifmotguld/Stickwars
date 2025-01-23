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

// Klockor och tidmätning
let startTime = Date.now(); // När spelet börjar
let lapStartTime = Date.now(); // När ett varv börjar
let bestLapTime = Infinity; // Bästa varvtiden
let totalLapTime = 0; // Total tid för alla varv
let currentLapTime = 0; // Tid för aktuellt varv

// Element för att visa klockorna
const currentLapTimeDisplay = document.getElementById("current-lap-time");
const bestLapTimeDisplay = document.getElementById("best-lap-time");
const totalTimeDisplay = document.getElementById("total-time");

// Registrera tangenttryckningar
document.addEventListener("keydown", (e)
