const generateRandomTreeBtn = document.getElementById('generate-tree-btn');
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
let curve, curve2, limit = 5;

function drawTree(startX, startY, length, angle, branchWidth, color1,  color2) {
    context.beginPath();
    context.save();
    context.strokeStyle = color1;
    context.fillStyle = color2;

    context.shadowBlur = 15;
    context.shadowColor = "rgba(0, 0, 0, 0.5)";
    
    
    context.lineWidth = branchWidth;
    context.translate(startX, startY);
    context.rotate((Math.PI / 180) * angle);
    context.moveTo(0, 0);
    // context.lineTo(0, -length);
    if (angle > 0) {
        context.bezierCurveTo(20, -length / 2, 20, -length, 0, -length/* * 1.12*/);
    } else {
        context.bezierCurveTo(20, -length / 2, 20, -length, 0, -length/* * 1.12*/);
    }
    
    context.stroke();
    context.closePath();
    
    if (length < limit) {
        context.beginPath();
        context.arc(0, -length, 15, 0, Math.PI / 2);
        context.fill();
        context.closePath();
        context.restore();
        return;
    }
    curve = (Math.random() * 10) + 10;

    drawTree(0, -length, length * 0.75, angle + curve, branchWidth * 0.65);
    drawTree(0, -length, length * 0.75, angle - curve, branchWidth * 0.65);

    context.restore();
}

// drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 25, "brown", "green");
setTimeout(() => generateRandomTree(), 10);

generateRandomTreeBtn.addEventListener("click", () => {
    setTimeout(() => generateRandomTree(), 10);
});

function generateRandomTree() {
    const randomNumber = Math.random() * 0.5 + 1
    canvas.width = innerWidth * randomNumber;
    canvas.height = innerHeight * randomNumber;

    context.clearRect(0, 0, canvas.width, canvas.height);
    const startX = canvas.width / 2;
    const startY = canvas.height + 20; // - parseInt(innerHeight - generateRandomTreeBtn.offsetTop - 20);
    const length = Math.floor((Math.random() * 20) + 100);
    const angle = 0;
    const branchWidth = (Math.random() * 70) + 1;
    const color1 = `#${Math.random().toString(16).substr(-6)}`;
    const color2 = `#${Math.random().toString(16).substr(-6)}`;

    generateRandomTreeBtn.style.background = color1;

    curve = (Math.random() * 10) + 10;
    curve2 = (Math.random() * 50) + 25;
    limit = (Math.random() * 10) + 5;

    drawTree(startX, startY, length, angle, branchWidth, color1,  color2);
}

window.addEventListener("resize", () => {
    setTimeout(() => generateRandomTree(), 10);
});