const liquidParticleEffectSection = document.getElementById("liquid-particle-effect-around-any-element");
liquidParticleEffectSectionButtons = Array(...liquidParticleEffectSection.querySelectorAll("button"))
const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: null,
    y: null
}

liquidParticleEffectSection.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
liquidParticleEffectSection.addEventListener("mouseout", (event) => {
    mouse.x = null;
    mouse.y = null;
});

class Button {
    constructor(x, y, width, height, buttonElement) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = x;
        this.buttonElement = buttonElement;
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "rgba(0, 0, 0, 0.9)"; // "transparent";
        context.closePath();
        context.fill();
    }

    update() {
        let directionX = 4;
        const mouseInside = (
            mouse.x < this.x + this.width &&
            mouse.x > this.x &&
            mouse.y < this.y + this.height &&
            mouse.y > this.y
        );
        if(
            mouseInside && 
            (
                this.x > this.baseX - (this.buttonElement.offsetWidth * 0.25)
            ) &&
            (this.x - directionX > this.baseX - (this.buttonElement.offsetWidth * 0.25))
        ) {
            this.x -= directionX;
            this.width += directionX;
        } else if (
            (
                this.x < this.baseX
            ) &&
            !mouseInside
        ) {
            this.x += directionX;
            this.width -= directionX;
        }

        this.draw();
    }
}

let buttons = [];
function createButtons() {
    buttons = [];
    let buttonCoor;
    /*let i;
    for (i = 0; i < 5; i++) {
        let topMargin = 100;
        let buttonMargin = 5;
        let x = 150;
        let y = topMargin + ((50 + buttonMargin) * i);
        let height = 50;
        let width = 200;
        buttons.push(new Button(x, y, width, height));
    }*/
    liquidParticleEffectSectionButtons.forEach(button => {
        buttonCoor = button.getBoundingClientRect();
        buttons.push(new Button(buttonCoor.x + 5, buttonCoor.y + 1, buttonCoor.width + 4, buttonCoor.height, button));
    });
}

createButtons();

class Particale {
    constructor(x, y, size, weight, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = weight;
        this.color = color;
        this.flowRight = false;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color; // "rgba(128, 197, 222, 1)";
        context.fill();
        context.closePath();
    }

    update() {
        // Collision detection particale/mouse
        if (
            this.x > mouse.x - 50 &&
            this.x < mouse.x + 50 &&
            this.y > mouse.y - 5 &&
            this.y < mouse.y + 5
        ) {
            this.x -= this.weight;
            this.y += this.weight;
            this.flowRight = true;
        }

        // Collision detection particale/button
        buttons.forEach(button => {
            if (
                this.x - (this.size * 0.5) < button.x + button.width &&
                this.x + (this.size * 0.5) > button.x &&
                this.y - (this.size * 0.25) < button.y + button.height &&
                this.y + (this.size * 0.25) > button.y
            ) {
                this.weight = 0;
                if (!this.flowRight) {
                    this.x -= 4;
                } else {
                    this.x += 4;
                }
            } else {
                this.weight += 0.03
            }
        });
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = buttons[0].x + (Math.random() * (buttons[0].width * 0.65));// (Math.random() * 60) + 200;
            this.weight = (Math.random() * 0.5) + 1;
            this.flowRight = false;
        }
        this.y += this.weight;
        this.draw();
    }
}

let particaleArray = [];
const numberOfParticals = 90;
function createParticals() {
    particaleArray = [];
    let i;
    for (i = 0; i < numberOfParticals; i++) {
        particaleArray.push(new Particale(
            buttons[0].x + (Math.random() * (buttons[0].width * 0.65)),// (Math.random() * 60) + 200
            (Math.random() * canvas.height),
            (Math.random() * 20) + 5,
            (Math.random() * 0.5) + 1,
            "#ff00bf"
        ));
    }
}
createParticals();

function draw(array) {
    array.forEach(item => item.update());
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(particaleArray);
    draw(buttons);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    createParticals();
    createButtons();
});