class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.velocity = 0;
        this.width = 20;
        this.height = 20;
        this.weight = 1;
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
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    flap() {
        this.velocity -= 2;
    }
}

const bird = new Bird();