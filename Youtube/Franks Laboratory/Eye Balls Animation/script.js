const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalesArray = [];

// Particale class
class Particale {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw(canvas) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = "white"; // this.color;
        /*context.strokeStyle='rgba(255, 255, 255, 0.9)';
        context.stroke();*/
        context.closePath();
        context.fill();
    }

    update(canvas) {
        this.draw(canvas);
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particalesArray = [];
    const numberOfParticales = Math.ceil((canvas.height * canvas.width) / 9000) * 3;// 500;
    let i;
    for (i = 0; i < numberOfParticales; i++) {
        
        particalesArray.push(new Particale(moveRadius, step, position, size, randomNumber));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.beginPath();
    context.fillStyle = "rgba(0, 0, 255, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    
    particalesArray.forEach(particale => particale.update(canvas));
}

// init(canvas);
// animate();

window.addEventListener("resize", () => {
    // init(canvas);
});