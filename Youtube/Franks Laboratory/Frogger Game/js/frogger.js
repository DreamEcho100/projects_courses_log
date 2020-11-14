class Frogger {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = (canvas1.width / 2) - (this.width / 2);
        this.y = canvas1.height - this.width - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }

    draw() {
        ctx3.beginPath();
        ctx3.fillStyle = "green";
        ctx3.fillRect(this.x, this.y, this.width, this.height);
        ctx3.closePath();
        ctx3.fill();
    }

    jump() {
        console.log("jump");
    }

    update() {
        if (keys[38]) { // up
            if (this.moving === false) {
                this.y -= grid;
                this.moving = true;
            }
        }
        if (keys[40]) { // down
            if (this.moving === false && this.y + (this.height * 2) < canvas1.height) {
                this.y += grid;
                this.moving = true;
            }
        }
        if (keys[37]) { // down
            if (this.moving === false && this.x  > this.width) {
                this.x -= grid;
                this.moving = true;
            }
        }
        if (keys[39]) { // down
            if (this.moving === false && this.x + (this.width * 2) < canvas1.width) {
                this.x += grid;
                this.moving = true;
            }
        }
        
        if (this.y + this.height <= 0) scored();

        this.draw();
    }
}

const frogger = new Frogger();