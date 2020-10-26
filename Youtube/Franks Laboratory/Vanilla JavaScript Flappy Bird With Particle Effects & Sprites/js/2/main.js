const canvasContainer = document.getElementById("flappy-bird-with-particle-effects-and-sprites-game");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = "images/platforms/winter1/BG.png";
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handlebackground() {
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handlebackground();
    handleObstacles();
    bird.update();
    bird.draw();
    ctx.font = "90px Georgia";
    ctx.fillStyle = gradient;
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    if (handleCollision()) return;
    handleParticales();
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;
}

animate();

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", (event) => {
    if (event.code === "Space") spacePressed = false;
    bird.frameX = 0;
});