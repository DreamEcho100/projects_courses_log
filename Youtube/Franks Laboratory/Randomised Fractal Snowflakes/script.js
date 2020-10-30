const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;

const maxLevel = Math.floor(Math.random() * 2) + 2; // Branches of the branches of the main branch
const branches = Math.floor(Math.random() * 2) + 2; // Branches of the main branch
let sides = Math.floor(Math.random() * 10) + 3;

context.translate(canvas.width / 2, canvas.height / 2);

const angle = Math.PI * 2 * ((Math.random() * 0.48) + 0.51);

function drawLine(level) {
    if (level > maxLevel) return;

    context.strokeStyle = `#${Math.random().toString(16).substr(-6)}`;
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

for (let i = 0; i < sides; i++) { // How many times
    drawLine(0);
    context.rotate(Math.PI * 2 / sides); // How many sides    
}
