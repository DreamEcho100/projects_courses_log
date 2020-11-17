const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
//'context.globalCompositeOperation | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
context.globalCompositeOperation = Math.random() >= 0.5 ? "destination-over" : "source-over";

context.imageSmoothingEnabled = false;

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    context.globalCompositeOperation = Math.random() >= 0.5 ? "destination-over" : "source-over";
    context.clearRect(0, 0, canvas.width, canvas.height);
    number = 0;
    angleMultiplay = Math.random() >= 0.5 ? Math.random() * 15 : Math.random();
    arcSize = Math.floor(Math.random() * 30) + 1;
    animate();
});

let number = 0;
let scale = 10;
let angleMultiplay = Math.random() >= 0.5 ? Math.random() * 15 : Math.random();
let arcSize = Math.floor(Math.random() * 30) + 1;

function drawFlower() {
    let angle = number * angleMultiplay;
    // let size = 0;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width / 2;
    let positionY = radius * Math.cos(angle) + canvas.height / 2;
    // 30:05
    context.beginPath();
    context.fillStyle = 'gray'; // 'orangered';
    context.strokeStyle = 'black'; // 'pink';
    context.lineWidth = 4;
    context.arc(positionX, positionY, arcSize, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.stroke();

    number++;
}

function animate() {
    // context.clearRect(0, 0, canvas.width, canvas.height);

    drawFlower();

    if (number > 600) return;

    requestAnimationFrame(animate);
}

animate();