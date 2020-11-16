const particalesTextCanvasAnimationSection = document.getElementById("particales-text-canvas-animation");
particalesTextCanvasAnimationButtonsSection = Array(...particalesTextCanvasAnimationSection.querySelectorAll("button"))
const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", (event) => {
    init();
});

let particalesArray = [];

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX / scale.x;
    mouse.y = event.clientY / scale.y;
});
canvas.addEventListener("mouseout", (event) => {
    mouse.x = null;
    mouse.y = null;
});

class Particale {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = ball.size;
        this.color = "rgba(255, 255, 255, 1)";
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseSize = ball.size;
        this.density = parseFloat(((Math.random() * 40 ) + 5).toFixed(2));
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx**2 + dy**2); // Math.hypot(dx, dx);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / distance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        if (mouse.x && mouse.y && distance < mouse.radius && this.size < ball.maxSize) {
            if (!(this.size + 0.5 >= ball.maxSize)) {
                this.size += 0.5;
            }
            this.x -= directionX;
            this.y -= directionY;
            this.color = "rgba(255, 0, 255, 1)";
        } else {
            if (this.size !== this.baseSize) {
                this.size -= 0.5;
                if (this.size - 0.5 <= this.baseSize) {
                    this.color = "rgba(255, 255, 255, 1)";
                }
            }
            if (this.x !== this.baseX) {
                this.x -= (this.x - this.baseX) / 10;
            }
            if (this.y !== this.baseY) {
                this.y -= (this.y - this.baseY) / 10;
            }
        }
        this.draw();
    }
}

const mouse = {
    x: null,
    y: null,
    radius: 50
}

const scale = {
    x: 1,
    y: 1
}

const content = {
    letters: "Mazen",
    size: 18,
    scaleX: 10,
    scaleY: 10,
    adjustX: 1,
    adjustY: 1,
}

const ball = {
    size: 3,
    maxSize: 10
}

function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.font = `${content.size}px Verdana`;
    context.fillText(content.letters, 0, 30);
    // context.strokeStyle = 'red';
    // context.strokeRect(0, 0, content.letters.split("").length * content.size, 100);
    
    const textCoordinate = context.getImageData(0, 0, content.letters.split("").length * content.size, 125);

    particalesArray = [];
    let y, y2, x, x2, postionX, postionY;
    for (y = 0, y2 = textCoordinate.height; y < y2; y++) {
        for (x = 0, x2 = textCoordinate.width; x < x2; x++) {
            if (
                textCoordinate.data[
                    (y * 4 * textCoordinate.width) +
                    (x * 4 + 3)
                ] > 128
            ) {
                postionX = x + content.adjustX;
                postionY = y + content.adjustY;
                particalesArray.push(new Particale(
                    postionX * content.scaleX,
                    postionY * content.scaleY,
                ));
            }
        }
        /*particalesArray.push(new Particale(
            parseFloat((Math.random() * canvas.width ).toFixed(2)),
            parseFloat((Math.random() * canvas.height ).toFixed(2))
        ));*/
    }
    context.scale(scale.x, scale.y);
}

init();

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particalesArray.forEach(particale => particale.update());
    connect();

    requestAnimationFrame(animate);
}

animate();

function connect() {
    let a, b, dx, dy, distance, opacityValue;
    for (a = 0; a < particalesArray.length; a++) {
        for (b = a; b < particalesArray.length; b++) {
            dx = particalesArray[a].x - particalesArray[b].x;
            dy = particalesArray[a].y - particalesArray[b].y;
            distance = Math.sqrt(dx**2, dy**2);

            if(distance < 25) {
                opacityValue = 1 - (distance / 25);
                context.beginPath();
                context.strokeStyle = particalesArray[a].color.replace("1", opacityValue);// `rgba(255, 255, 255, ${opacityValue})`;
                context.lineWidth = 0.1;
                context.moveTo(particalesArray[a].x, particalesArray[a].y);
                context.lineTo(particalesArray[b].x, particalesArray[b].y);
                context.stroke();
                context.closePath();
            }
        }
    }
}