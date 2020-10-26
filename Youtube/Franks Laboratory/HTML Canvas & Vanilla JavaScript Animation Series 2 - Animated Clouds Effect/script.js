const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particaleArray = [];

const colors = [
    "rgb(255, 255, 255, 0.9)",
    "rgb(255, 255, 255, 0.3)",
    "rgb(173, 216, 230, 0.8)",
    "rgb(211, 211, 211, 0.8)"
]

const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// mouse position
let mouse = {
    x: null,
    y: null
}

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particale class
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
        /*context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);*/
        context.rect(this.x, this.y, this.size, this.size);
        context.fillStyle = this.color;
        context.strokeStyle='white';
        context.stroke();
        context.fill();
        context.closePath();
    }

    update(canvas) {
        if (this.x - this.size * 2 < 0 || this.x + this.size * 2 > canvas.width) {
            this.dirextionX = -this.dirextionX;
        }
        if (this.y - this.size * 2 < 0 || this.y + this.size * 2 > canvas.height) {
            this.dirextionY = -this.dirextionY;
        }
        this.x += this.dirextionX;
        this.y += this.dirextionY;

        // Mouse interactivity
        if (
            mouse.x - this.x < mouseRadius &&
            mouse.x - this.x > -mouseRadius &&
            mouse.y - this.y < mouseRadius &&
            mouse.y - this.y > -mouseRadius
        ) {
            if (this.size < maxSize) {
                this.size += 5;
            }
        } else if (this.size > minSize) {
            this.size -= 0.2;
        }
        if (this.size < 0) {
            this.size = 0;
        }

        this.draw();
    }
}

function init(canvas) {
    particaleArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let i;
    for (i = 0; i < 1000; i++) {
        const size = 0;
        const x = Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2;
        const y = Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2;
        const dirextionX = (Math.random() * 0.4) - 0.2;
        const dirextionY = (Math.random() * 0.4) - 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particaleArray.push(new Particale(x, y, dirextionX, dirextionY, size, color))
    }
}

let animateId;
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    
    particaleArray.forEach(particale => {
        particale.update(canvas);
    });
}
init(canvas);
animate();

window.addEventListener("resize", () => init(canvas));

// Remove mouse position periodiacally
setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000)