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
        context.fillStyle = "blue";
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

function drawButtons() {
    buttons.forEach(button => button.update());
}

class Particale {
    constructor(x, y, size, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = weight;
    }

    draw() {

    }

    update() {
        // 22:30
        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawButtons();
}

animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    createButtons();
});