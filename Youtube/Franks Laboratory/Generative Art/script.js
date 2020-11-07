const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

const mouseCoor = {
    x: null,
    y: null
}

let drawing = false;

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// context.globalCompositeOperation = "lighter";

context.imageSmoothingEnabled = false;

canvas.addEventListener("mousemove", (event) => {
    mouseCoor.x = event.x;
    mouseCoor.y = event.y;
});
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

const edge = 80; // The radius of the circle / limit to the particale

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    draw() {
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;
        this.x += this.speedX
        this.y += this.speedY

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX**2 + distanceY**2);
        const radius = (-distance / edge + 1) * edge / 10;
        
        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this));
            context.beginPath();
            context.arc(this.x, this.y, radius, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.fill();
            context.strokeStyle = "black";
            context.stroke();
            context.closePath();
        }
    }
}

function branchOut() {
    if (drawing) {
        const centerX = mouseCoor.x;
        const centerY = mouseCoor.y
        for (let i = 0; i < 5; i++) {
            const root = new Root(mouseCoor.x, mouseCoor.y, "red", centerX, centerY);
            root.draw();
        }
    }
}

canvas.addEventListener("mousemove", () => {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.beginPath();
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = "rgba(0, 0, 0, 0.03)";
    // context.closePath();

    
    branchOut();
});

canvas.addEventListener("mousedown", (event) => {
    if (event.which === 1) {
        drawing = true;
    }
});
canvas.addEventListener("mouseup", (event) => {
    if (event.which === 1) {
        drawing = false;
    }
});

let dbRightMouseClick = 0;
canvas.addEventListener("contextmenu", (event) => {
    if (event.which === 3 || event.button === 3) {
        dbRightMouseClick++;
        if (dbRightMouseClick === 2) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            return false;
        } else {
            setTimeout(() => dbRightMouseClick = 0, 250);
        }
    }
});