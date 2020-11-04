const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load Images
const images = {};
images.player = new Image();
images.player.src = "./images/characters/PC Computer - Cuphead Dont Deal With the Devil - Cuphead Overworld.png";

const playerWidth = "103.0625";
const playerHeight = "113.125";

// From the sprite sheet
const playerFrameX = 3;
const playerFrameY = 3;

// On the canvas
const playerX = 0;
const playerY = 0;

const playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(
        images.player,
        playerWidth * playerFrameX,
        playerHeight * playerFrameY,
        playerWidth,
        playerHeight,
        playerX,
        playerY,
        playerWidth,
        playerHeight
    );
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});