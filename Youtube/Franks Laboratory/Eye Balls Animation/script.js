const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let eyes = [];
let theta;

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener("mouseover", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

// Particale class
class Eye {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(mouse) {
        // Draw eye
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = "red"; // this.color;
        context.fill();
        context.closePath();
        // Draw mouse
        context.beginPath();
        context.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, false);
        context.fillStyle = "gold"; // this.color;
        context.fill();
        context.closePath();
    }

    update(canvas) {
        this.draw(mouse);
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    eyes = [];

    let overlapping = false;
    const numberOfEyes = Math.ceil((canvas.height * canvas.width) / 9000) * 1.1;// 500;
    const protection = 10000;
    let counter = 0;
    /*eyes.push(new Eye(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.floor(Math.random() * 100) + 5
    ));*/
    let eye, i, previousEye, directionX, directionY, distance;
    while (eyes.length < numberOfEyes && counter < protection) {
        eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 5
        }
        overlapping = false;
        for (i = 0; i < numberOfEyes; i++) {
            previousEye = eyes[i];
            if(previousEye) {
                directionX = eye.x - previousEye.x;
                directionY = eye.y - previousEye.y;
            } else {
                directionX = eye.x;
                directionY = eye.y;
                previousEye = {
                    x: 0,
                    y: 0,
                    radius: 0
                };
            }
            distance = Math.sqrt(directionX**2 + directionY**2);
            if (distance < (eye.radius + previousEye.radius)) {
                overlapping = true;
            }
        }
        if (!overlapping) {
            eyes.push(new Eye(eye.x, eye.y, eye.radius));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.beginPath();
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    
    eyes.forEach(eye => eye.draw(canvas));
}

init(canvas);
animate();

window.addEventListener("resize", () => {
    init(canvas);
});