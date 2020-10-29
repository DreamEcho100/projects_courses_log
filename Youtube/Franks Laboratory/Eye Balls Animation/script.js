const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let eyes = [];
let theta;

const mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener("mousemove", (event) => {
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

        // Get angle
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        theta = Math.atan2(dy, dx);


        // Draw Iris
        const iris_x = this.x + Math.cos(theta) * this.radius / 10;
        const iris_y = this.y + Math.sin(theta) * this.radius / 10;
        const iris_radius = this.radius / 1.2;
        context.beginPath();
        context.arc(iris_x, iris_y, iris_radius, 0, Math.PI * 2, true);
        context.fillStyle = "white"; // this.color;
        context.fill();
        context.closePath();

        // Draw Pupil
        const pupil_x = this.x + Math.cos(theta) * this.radius / 1.9;
        const pupil_y = this.y + Math.sin(theta) * this.radius / 1.9;
        const pupil_radius = this.radius / 2.5;
        context.beginPath();
        context.arc(pupil_x, pupil_y, pupil_radius, 0, Math.PI * 2, true);
        context.fillStyle = "black"; // this.color;
        context.fill();
        context.closePath();

        // Draw pupil refliction
        context.beginPath();
        context.arc(pupil_x - pupil_radius / 3, pupil_y - pupil_radius / 3, pupil_radius / 2, 0, Math.PI * 2, true);
        context.fillStyle = "rgba(255, 255, 255, 0.1)"; // this.color;
        context.fill();
        context.closePath();
        
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    eyes = [];

    let overlapping = false;
    const numberOfEyes = Math.ceil((canvas.height * canvas.width) / 9000) * 1.5;;
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
            if (distance < (eye.radius + previousEye.radius + 1)) {
                overlapping = true;
            }
        }
        if (!overlapping) {
            eyes.push(new Eye(eye.x, eye.y, eye.radius));
        }
        counter++;
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.beginPath();
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    
    eyes.forEach(eye => eye.draw(mouse));
    
    // Draw mouse
    context.beginPath();
    context.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, false);
    context.fillStyle = "gold";
    context.fill();
    context.closePath();
}

init(canvas);
animate();

window.addEventListener("resize", () => {
    init(canvas);
});