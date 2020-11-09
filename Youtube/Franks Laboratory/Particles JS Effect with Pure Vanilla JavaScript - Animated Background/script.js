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

// Get mouse position
const mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
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
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        // context.strokeStyle = 'white';
        // context.stroke();
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

        // Check particale position
        // Check mouse position
        // Move the particale
        // Draw the particale

        // Check collision detection - mouse position / particale position
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx**2 + dy**2); // فيثاغورث LOL
        if (distance < mouse.radius + this.size && mouse.x && mouse.y) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        
        // Move particale
        this.x += this.dirextionX;
        this.y += this.dirextionY;

        // Draw particale
        this.draw();
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius= (canvas.height / 80) * (canvas.width / 80);
    particalesArray = [];
    const numberOfParticales = Math.ceil((canvas.height * canvas.width) / 9000) * 2;
    let i;
    for (i = 0; i < numberOfParticales; i++) {
        const size = (Math.random() * 5) + 1;
        const x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        const dirextionX = (Math.random() * 7.5) - 2.5;
        const dirextionY = (Math.random() * 7.5) - 2.5;
        const color = "#8C5523";

        particalesArray.push(new Particale(x, y, dirextionX, dirextionY, size, color));
    }
}

function connect(particales) {
    let a, b, distance;
    for (a = 0; a < particales.length; a++) {
        for (b = 0; b < particales.length; b++) {
            distance = (
                (particales[a].x - particales[b].x) ** 2 + // فيثاغورث LOL
                (particales[a].y - particales[b].y) ** 2 // فيثاغورث LOL
            );
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                context.beginPath();
                context.strokeStyle = `rgba(140, 85, 31, ${1 - (distance / 20000)})`;
                context.lineWidth = 1;
                context.moveTo(particales[a].x, particales[a].y);
                context.lineTo(particales[b].x, particales[b].y);
                context.stroke();
                context.closePath();

            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    particalesArray.forEach(particale => particale.update(canvas));
    connect(particalesArray);
}

init(canvas);
animate();

window.addEventListener("resize", () => {
    init(canvas);
})