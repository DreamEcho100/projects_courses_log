const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
context.globalCompositeOperation = "destination-over";

context.imageSmoothingEnabled = false;

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

let number = 0;
let scale = 10;
let angleMultiplay = Math.random();

function drawFlower() {
    let angle = number * angleMultiplay;
    // let size = 0;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width / 2;
    let positionY = radius * Math.cos(angle) + canvas.height / 2;

    context.beginPath();
    context.fillStyle = 'orangered';
    context.strokeStyle = 'pink';
    context.lineWidth = 4;
    context.arc(positionX, positionY, 20, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.stroke();

    number++;
}

function animate() {
    // context.clearRect(0, 0, canvas.width, canvas.height);

    drawFlower();

    if (number > 300) return;

    requestAnimationFrame(animate);
}

animate();