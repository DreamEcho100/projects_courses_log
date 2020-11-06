const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load Images
const enemy1 = {};
enemy1.character = new Image();
enemy1.character.src = "./images/characters/PC Computer - Cuphead Dont Deal With the Devil - Cuphead Overworld.png";

/*
const playerWidth = 103.0625;
const playerHeight = 113.125;

// From the sprite sheet
let playerFrameX = 3;
let playerFrameY = 3;

// On the canvas
let playerX = 0;
let playerY = 0;

let playerSpeed = 6; // HOW MUCH TO MOVE PER TIME
let counterLimit = 1.5; // WHEN TO MOVE
let playerCounter = 0;
let playerCounterAdd = 0.5;
*/
// const characterAction = ["up", "top right", "right", "down right", "down", "jump"];

const characterAction = ["up", "right", "jump", "down right"];
const characters = [];
const numberOfCharacters = 10;
class Characters {
    constructor(type, image, width, height, frameX, frameY, x, y, movement) {
        this.type = type;
        this.image = image;
        this.width = width;
        this.height = height;
        this.frameX = frameX;
        this.x = x;
        this.y = y;
        this.movement = movement;
        this.frameXLimit = null;
        this.frameXBase = null;
        if (this.movement.action === "up") {
            this.frameY = 0;
            this.frameXLimit = 15;
            this.frameXBase = 4;
        } else if (this.movement.action === "right") {
            this.frameY = 3;
            this.frameXLimit = 13;
            this.frameXBase = 3;
        } else if (this.movement.action === "jump") {
            this.frameY = 7;
            this.frameXLimit = 9;
            this.frameXBase = 0;
        } else if (this.movement.action === "down right") {
            this.frameY = 4;
            this.frameXLimit = 15;
            this.frameXBase = 4;
        }
    }

    draw() {
        drawSprite(
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        
        if (this.movement.counter % this.movement.limitToMove === 0) this.update();
        this.movement.counter += this.movement.counterAdd;
    }

    update() {
        // Animate sprite
        // if (this.movement.action !== "up") {
            if (this.frameX < this.frameXLimit) this.frameX++;
            else  this.frameX = this.frameXBase;
        // }

        if (this.movement.action === "right") {
            // Move character
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            }
            else this.x += this.movement.speedPerTime;
        } else if (this.movement.action === "up") {
            if (this.y < (0 - this.height)) {
                this.y = canvas.height + this.height;
                this.x = Math.random() * (canvas.width - this.width);
            } else {
                this.y -= this.movement.speedPerTime;
            }
        } else if (this.movement.action === "down right") {
            if (
                this.y > canvas.height + this.height &&
                this.x > this.width + canvas.width
            ) {
                this.y = -this.width;
                this.x = Math.random() * (canvas.width - this.width);
            } else {
                this.y += this.movement.speedPerTime;
                this.x += this.movement.speedPerTime;
            }
        }
    }
}

for (let i = 0; i < numberOfCharacters; i++) {
    characters.push(new Characters(
        "enemy",
        enemy1.character,
        103.0625,
        113.125,
        3,
        3,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        {
            action: characterAction[Math.floor(Math.random() * characterAction.length)],
            speedPerTime: 6,
            limitToMove: 1.5,
            counter: 0,
            counterAdd: 0.5
        }
    ));
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    characters.forEach(character => {
        character.draw();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});