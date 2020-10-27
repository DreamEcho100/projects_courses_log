const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
/*context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.msImageSmoothingEnabled = false;
context.oImageSmoothingEnabled = false;*/

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalesArray = [];

// Particale class
class Particale {
    constructor(x, y, dirextionX, dirextionY, size, color) {
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(canvas) {
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particalesArray = [];
    const numberOfParticales = 0;
    let i;
    for (i = 0; i < numberOfParticales; i++) {

        particalesArray.push(new Particale());
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    particalesArray.forEach(particale => particale.update(canvas));
}

// init(canvas);
// animate();

window.addEventListener("resize", () => {
    // init(canvas);
})