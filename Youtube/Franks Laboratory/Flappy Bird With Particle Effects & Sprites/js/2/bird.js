const dragonSprite = new Image();
dragonSprite.src = "images/sprites/flappy dragon sprite/dragon-spritesheet.png"

class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.velocity = 0;
        this.originalWidth = 941;
        this.originalHeight = 680;
        this.width = this.originalWidth / 20;
        this.height = this.originalHeight / 20;
        this.weight = 1;
        this.frameX = 0;
    }

    update() {
        let curve = Math.sin(angle) * 20;
        if (this.y > canvas.height - (this.height * 3) + curve) {
            this.y = canvas.height - (this.height * 3) + curve;
            this.velocity = 0;
        } else {
            this.velocity += this.weight;
            this.velocity *= 0.9;
            this.y += this.velocity;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.velocity = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }

    draw() {
        /*ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();*/
        ctx.drawImage(dragonSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x - 20, this.y - 12, this.width * 1.7, this.height * 1.7);
    }

    flap() {
        this.velocity -= 2;
        if (this.frameX >= 3) this.frameX = 0;
        else if (frame % 3 === 0) this.frameX++;
    }
}

const bird = new Bird();