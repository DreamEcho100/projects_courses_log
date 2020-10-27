const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
//context.imageSmoothingEnabled = false;
/*context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.msImageSmoothingEnabled = false;
context.oImageSmoothingEnabled = false;*/

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalesArray = [];

// Particale class
class Particale {
    constructor(moveRadius, step, position, size) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
    }

    draw(canvas) {
        context.beginPath();
        context.arc(
            (Math.cos(this.position) * this.moveRadius) + (canvas.width / 2),
            (Math.sin(this.position) * this.moveRadius) + (canvas.height / 2),
            this.size,
            0,
            Math.PI * 2,
            false
        );
        context.fillStyle = "white"; // this.color;
        context.closePath();
        context.fill();
    }

    update(canvas) {
        this.position += this.step;
        this.draw(canvas);
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particalesArray = [];
    const numberOfParticales = Math.ceil((canvas.height * canvas.width) / 9000) * 4// 500;
    let i;
    for (i = 0; i < numberOfParticales; i++) {
        const moveRadius = Math.random() * canvas.width;
        const step = (Math.random() * 0.002) + 0.002;
        const position = Math.random() * (Math.PI * 2);
        const size = (Math.random() * 8) + 0.5;
        
        particalesArray.push(new Particale(moveRadius, step, position, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.beginPath();
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    
    particalesArray.forEach(particale => particale.update(canvas));
}

init(canvas);
animate();

window.addEventListener("resize", () => {
    init(canvas);
})