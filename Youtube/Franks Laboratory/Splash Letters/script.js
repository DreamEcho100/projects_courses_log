const splashLettersSection = document.getElementById("splash-letters");
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// context.globalCompositeOperation = "lighter";

context.imageSmoothingEnabled = false;
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    particalesArray = []
    numberOfParticales = (canvas.width * canvas.height) / 10000;
});

context.textBaseline = 'middle';
let lettersArray = "LOADING".split(""); // ["L", "A", "B", "O", "R", "A", "T", "O", "R", "Y"];
let lettersIndex = 0;
let hue = 0;
let particalesArray = [];
let numberOfParticales = (canvas.width * canvas.height) / 10000;

const mouse = {
    x: 0,
    y: 0,
    radius: 60,
    autopilotAngle: 0,
    mouseMoving: false,
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.mouseMoving = true;
});

window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
    mouse.mouseMoving = false;
});

class Particale {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = `hsl(${hue}, 100%, 50%)`;
        // this.text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.closePath();
        context.fill();

        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 1.5, true);
        context.fillStyle = "white";
        
        context.font = `${this.radius}px Verdana`;
        this.lettersIndex = this.lettersIndex ? this.lettersIndex : lettersIndex % lettersArray.length
        this.text = lettersArray[this.lettersIndex];
        lettersIndex++;
        context.fillText(this.text, this.x - this.radius / 2.7, this.y);
        context.closePath();
        context.fill();
    }

    update() {
        if (mouse.x === undefined && mouse.y === undefined) {
            let newX = mouse.radius * canvas.width /200 * Math.sin(mouse.autopilotAngle * (Math.PI / 170));
            let newY = mouse.radius * canvas.height /200 * Math.cos(mouse.autopilotAngle * (Math.PI / 180));
            mouse.x = newX + canvas.width /2;
            mouse.y = newY + canvas.height /2;
            mouse.autopilotAngle += 15;
        }
        this.draw();
    }
}

function handleOverlap() {
    let overlaping = false;
    let protection = 500;
    let counter = 0;

    while (particalesArray.length < numberOfParticales && counter < protection) {
        let randomAngle = Math.random() * 2 * Math.PI;
        let randomRadius = mouse.radius * Math.sqrt(Math.random());
        let particale = {
            x: mouse.x + randomRadius * Math.cos(randomAngle),
            y: mouse.y + randomAngle * Math.sin(randomAngle),
            radius: Math.floor(Math.random() * 30) + 10,
        }
        overlaping = false;
        for (let i = 0; i < particalesArray.length; i++) {
            let previousParticale = particalesArray[i];
            let dx = particale.x - previousParticale.x;
            let dy = particale.y - previousParticale.y;
            let distance = Math.sqrt(dx**2 + dy**2);
            if (distance < (particale.radius + previousParticale.radius)) {
                overlaping = true;
                break;
            }
        }
        if (!overlaping) {
            hue += 1;
            particalesArray.unshift(new Particale(particale.x, particale.y, particale.radius));
        }
        counter++;
    }
}

let oldMouseCoor = {
    x: undefined,
    y: undefined,
}
function animate() {
    if (mouse.x === oldMouseCoor.x && mouse.y === oldMouseCoor.y && mouse.mouseMoving) {
        mouse.x = undefined;
        mouse.y = undefined;
        mouse.mouseMoving = false;
    } else {
        [oldMouseCoor.x, oldMouseCoor.y] = [mouse.x, mouse.y];
        mouse.mouseMoving = true;
    };
    context.clearRect(0, 0, canvas.width, canvas.height);

    particalesArray.forEach(particale => particale.update());

    if (particalesArray.length >= numberOfParticales) {
        for (let i = 0; i < 5; i++) {;
            setTimeout(() => particalesArray.pop(), 0);
        }
    }

    handleOverlap();
    requestAnimationFrame(animate);
}

handleOverlap();
animate();