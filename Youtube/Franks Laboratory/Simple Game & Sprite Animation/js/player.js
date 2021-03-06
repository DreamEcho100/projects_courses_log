class Player extends Character {
    constructor(imgSrc, x, y, width, height, frame, pos, speed, moving) {
        super(imgSrc, x, y, width, height, frame, pos, speed);
        this.moving = moving;
    }

    drawSprite() {
        context.drawImage(
            this.img, // img
            this.width * this.frame[this.pos].x.coor, // sX
            this.height * this.frame[this.pos].y.coor, // sY
            this.width, // sW
            this.height, // sH
            this.x, // dX
            this.y, // dY
            this.width, // dW
            this.height, // dH
        );
    }

    handlePlayerFrame() {
        if (!this.moving) return;
        if (this.frame[this.pos].x.coor < this.frame[this.pos].x.limit) this.frame[this.pos].x.coor++;
        else this.frame[this.pos].x.coor = this.frame[this.pos].x.base;
    }

    movePlayer() {
        if ((keys["38"] || keys["ArrowUp"]) && this.y > (canvas.height / 10)) {
            this.moving = true;
            this.y -= this.speed;
            this.pos = "up";
        }
        if ((keys["40"] || keys["ArrowDown"]) && (this.y + this.height) < canvas.height) {
            this.moving = true;
            this.y += this.speed;
            this.pos = "down";
        }
        if ((keys["39"] || keys["ArrowRight"]) && this.x + this.width < canvas.width) {
            this.moving = true;
            this.x += this.speed;
            this.pos = "right";
        }
        if ((keys["37"] || keys["ArrowLeft"]) && this.x > 0) {
            this.moving = true;
            this.x -= this.speed;
            this.pos = "left";
        }
        this.handlePlayerFrame();
    }
}

const player = new Player(
    "images/characters/player/chewie.png",
    canvas.width / 3,
    canvas.width / 3,
    40,
    72,
    /*Object.assign({}, spriteSheetMovement1)*/JSON.parse(JSON.stringify(spriteSheetMovement1))/*{...spriteSheetMovement1}*/,
    "down",
    9,
    false,
);