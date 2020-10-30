const canvas = document.getElementById('canvas1');
const generateBtn = document.getElementById('generate-btn');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
let maxLevel, branches, sides, color, angle;

function generate() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

    maxLevel = Math.floor(Math.random() * 3) + 2; // Branches of the branches of the main branch
    branches = Math.floor(Math.random() * 3) + 2; // Branches of the main branch
    sides = Math.floor(Math.random() * 10) + 3;
    color = `${Math.random().toString(16).substr(-6)}`;

    context.translate(canvas.width / 2, canvas.height / 2);

    angle = Math.PI * 2 * ((Math.random() * 0.48) + 0.51);

    generateBtn.style.background = `#${color}`;
    generateBtn.style.color = `#${color.split("").reverse().join("")}`;

    for (let i = 0; i < sides; i++) { // How many times
        drawLine(0);
        context.rotate(Math.PI * 2 / sides); // How many sides    
    }    
}

function drawLine(level) {
    if (level > maxLevel) return;

    context.strokeStyle = `#${color}`;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(200, 0); 
    context.stroke();
    
    
    for(let i = 1; i < branches + 1; i++) {
        context.save();
        context.translate(200 * i / (branches + 1), 0);
        context.scale(0.5, 0.5);
        context.save();

        context.rotate(angle);
        drawLine(level + 1);
        context.restore();
        context.save();
        
        context.rotate(-angle);
        drawLine(level + 1);
        context.restore();
        
        context.restore();
    }
    
}

generate();

generateBtn.addEventListener("click", generate);
window.addEventListener("resize", generate);