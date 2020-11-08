class Enemy extends Character {
    constructor(imgSrc, x, y, width, height, frame, pos, speed) {
        super(imgSrc, x, y, width, height, frame, pos, speed);
    }

    drawSprite() {
        for (let pos in this.pos) {
            console.log(pos)
            context.drawImage(
                this.img, // img
                this.width * this.frame[pos].x.coor, // sX
                this.height * this.frame[pos].y.coor, // sY
                this.width, // sW
                this.height, // sH
                this.x, // dX
                this.y, // dY
                this.width, // dW
                this.height, // dH
            );
        }
    }

    handleEnemyFrame(pos) {
        if (this.frame[pos].x.coor < this.frame[pos].x.limit) this.frame[pos].x.coor++;
        else this.frame[pos].x.coor = this.frame[pos].x.base;
    }

    moveEnemy() {
        for (let pos in this.pos) {
            ({
                "left": () => {
                    this.x -= this.speed;
                    this.handleEnemyFrame(pos);
                },
            }[pos])();
        }
    }
}

const enemy = new Enemy(
    "images/characters/enemies/darthmaul.png",
    canvas.width + 32,
    (canvas.height * 0.1) + ((Math.random() * canvas.height) * 0.9),
    32,
    48,
    spriteSheetMovement1,
    {
        "left": true,
    },
    4
);