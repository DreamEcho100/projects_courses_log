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
        ctx3.drawImage(
            froggerSprite,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x - 25,
            this.y - 25,
            this.width * 2,
            this.height * 2
        );
        ctx3.closePath();
        ctx3.fill();
    }

    jump() {
        if (this.moving === false) this.frameX = 1;
        else if (this.frameX === 1) this.frameX = 0
    }

    update() {
        if (keys[38]) { // up
            if (this.moving === false) {
                this.y -= grid;
                this.moving = true;
                this.frameX = 1;
                this.frameY = 0;
            }
        }
        if (keys[40]) { // down
            if (this.moving === false && this.y + (this.height * 2) < canvas1.height) {
                this.y += grid;
                this.moving = true;
                this.frameY = 3;
            }
        }
        if (keys[37]) { // down
            if (this.moving === false && this.x  > this.width) {
                this.x -= grid;
                this.moving = true;
                this.frameY = 2;
            }
        }
        if (keys[39]) { // down
            if (this.moving === false && this.x + (this.width * 2) < canvas1.width) {
                this.x += grid;
                this.moving = true;
                this.frameY = 1;
            }
        }
        
        if (this.y + this.height <= 0) scored();

        this.draw();
    }
}

const frogger = new Frogger();