const canvasContainer = document.getElementById("sticky-bubbles-animation");
const footer = canvasContainer.querySelector("footer");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
canvas.width = canvasContainer.getBoundingClientRect().width;
canvas.height = canvasContainer.getBoundingClientRect().height;
let bubblesArray = [];

const canvasBg = document.getElementById("canvasbg");
const contextBg = canvasBg.getContext("2d");
contextBg.imageSmoothingEnabled = false;
canvasBg.width = canvasContainer.getBoundingClientRect().width;
canvasBg.height = canvasContainer.getBoundingClientRect().height;
let bgBubblesArray = [];

function addBubbles() {
    bubblesArray.push(new Bubble(
        ((Math.random() * footer.getBoundingClientRect().height)) + (footer.getBoundingClientRect().height * 0.01),
        "rgb(255, 194, 194)",
        Math.floor(footer.getBoundingClientRect().height % 6) + 2,
        context
    ));
}
function addBgBubbles() {
    bgBubblesArray.push(new Bubble(
        ((Math.random() * footer.getBoundingClientRect().height)) + (footer.getBoundingClientRect().height * 0.01),
        "rgb(255, 255, 255)",
        Math.floor(footer.getBoundingClientRect().height % 6) + 3,
        contextBg
    ));
}

class Bubble {
    constructor(radius, color, ySpeed, currentCanvas) {
        this.radius = radius;
        this.life = true;
        this.x = (Math.random() * canvasContainer.getBoundingClientRect().width);
        this.y = footer.getBoundingClientRect().top + (Math.random() * footer.getBoundingClientRect().height); // (Math.random() * this.radius) + (canvasContainer.getBoundingClientRect().height - this.radius);
        this.vy = ((Math.random() * 0.0002) + 0.001) + ySpeed;
        this.vr = 0;
        this.vx = (Math.random() * 4) - 2;
        this.color = color;
        this.currentCanvas = currentCanvas;
    }

    draw() {
        this.currentCanvas.beginPath();
        this.currentCanvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.currentCanvas.fillStyle = this.color;
        this.currentCanvas.closePath();
        this.currentCanvas.fill();
    }

    update() {
        this.vy += 0.00001;
        this.vr += 0.02;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius - this.vr <= 1) {
            this.life = false;
        }
        if (this.radius - this.vr > 1) {
            this.radius -= this.vr;
        }

        this.draw(this.currentCanvas);
    }
}

function handleBubbles() {
    let i;
    for (i = bubblesArray.length - 1; i >= 0; i--) {
        bubblesArray[i].update(context);
        if (!bubblesArray[i].life) {
            bubblesArray.splice(i, 1);
        }
    }
    for (i = bgBubblesArray.length - 1; i >= 0; i--) {
        bgBubblesArray[i].update(contextBg);
        if (!bgBubblesArray[i].life) {
            bgBubblesArray.splice(i, 1);
        }
    }
    if (bubblesArray.length < (canvas.width / 2)) {
        addBubbles();
    }
    if (bgBubblesArray.length < (canvasBg.width / 10)) {
        addBgBubbles();
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextBg.clearRect(0, 0, canvasBg.width, canvasBg.height);

    handleBubbles();

    requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", animate);
window.addEventListener("resize", () => {
    canvas.width = canvasContainer.getBoundingClientRect().width;
    canvas.height = canvasContainer.getBoundingClientRect().height;
    bubblesArray = [];
    
    canvasBg.width = canvasContainer.getBoundingClientRect().width;
    canvasBg.height = canvasContainer.getBoundingClientRect().height;
    bgBubblesArray = [];
});