const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particaleArray = [];

// Create constructor function
/*function Particale(x, y, dirextionX, dirextionY, size, color) {
    this.x = x;
    this.y = y;
    this.dirextionX = dirextionX;
    this.dirextionY = dirextionY;
    this.size = size;
    this.color = color;
}

// Add draw method to particale prototype
Particale.prototype.draw = function() {
    context.beginPath();
    // console.log(this);
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
}*/
class Particale {
    constructor(x, y, dirextionX, dirextionY, size, color) {
        this.x = x;
        this.y = y;
        this.dirextionX = dirextionX;
        this.dirextionY = dirextionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dirextionX = -this.dirextionX;
            if (Math.random() <= 0.5) {
                this.dirextionY = -this.dirextionY
            }
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dirextionY = -this.dirextionY;
            if (Math.random() <= 0.5) {
                this.dirextionX = -this.dirextionX
            }
        }
        this.x += this.dirextionX;
        this.y += this.dirextionY;

        this.draw();
    }
}
let particalesNumber;
function init() {
    particaleArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let i;
    particalesNumber = Math.floor(Math.random() * 100) + 100;
    for (i = 0; i < particalesNumber; i++) {
        const size = (Math.random() * 20) + 5;
        const x = Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2;
        const y = Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2;
        const dirextionX = Math.sin(Math.random()) * 10;// (Math.random() * 0.8) - 0.1;
        const dirextionY = 10;// (Math.random() * 0.8) - 0.1;
        const color = "black";

        particaleArray.push(new Particale(x, y, dirextionX, dirextionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    
    particaleArray.forEach(particale => particale.update());

}
init();
animate();

window.addEventListener("resize", () => {
    init();
})