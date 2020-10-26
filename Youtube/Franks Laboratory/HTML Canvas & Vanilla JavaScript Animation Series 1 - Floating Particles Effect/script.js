const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');

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
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dirextionY = -this.dirextionY;
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
    particalesNumber = Math.floor(Math.random() * 200) + 20;
    for (i = 0; i < particalesNumber; i++) {
        const size = (Math.random() * 20) + 5;
        let x;
        do {
            x = Math.random() * (canvas.width - size * 2);
        } while(x + (size * 2) > canvas.width && x - (size * 2) < 0)
        let y;
        do {
            y = Math.random() * (canvas.height - size * 2);
        } while(y + (size * 2) > canvas.height && y - (size * 2) < 0)
        const dirextionX = (Math.random() * 0.8) - 0.1;
        const dirextionY = (Math.random() * 0.8) - 0.1;
        const color = "black";

        particaleArray.push(new Particale(x, y, dirextionX, dirextionY, size, color))
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