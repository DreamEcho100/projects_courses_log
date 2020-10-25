const canvasContainer = document.getElementById("flappy-bird-with-particle-effects-and-sprites-game");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let playerJump = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(10, 10, 50, 50);
    requestAnimationFrame(animate);
}

animate();