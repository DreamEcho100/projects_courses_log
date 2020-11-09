class Enemy extends Character {
    constructor(imgSrc, x, y, width, height, frame, pos, speed) {
        super(imgSrc, x, y, width, height, frame, pos, speed);
    }

    drawSprite() {
        for (let pos in this.pos) {
            if (this.pos[pos]) {
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
    }

    handleEnemyFrame(pos) {
        if (this.frame[pos].x.coor < this.frame[pos].x.limit) this.frame[pos].x.coor++;
        else this.frame[pos].x.coor = this.frame[pos].x.base;
    }

    moveEnemy() {
        /*for (let pos in this.pos) {
            if (pos === "left") {
            }
        }*/
        this.x -= this.speed;
        this.handleEnemyFrame("left");
        this.pos["left"] = true;
        this.pos["up"] = false;
        this.pos["down"] = false;
        if (
                this.x - this.width  < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y > player.y - (player.height * 0.5) &&
                this.y < player.y + (player.height * 0.5) &&
                this.y - this.speed > (canvas.height / 8)
        ) {
            this.y -= this.speed;
            this.pos["up"] = true;
            this.handleEnemyFrame("up");
        }
        if (
                this.x - this.width  < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y > player.y + (player.height * 0.5) &&
                this.y < player.y + (player.height * 1.5) &&
                this.y + this.height + this.speed < canvas.height
        ) {
            this.y += this.speed;
            this.pos["down"] = true;
            this.handleEnemyFrame("down");
        }

        this.drawSprite();
    }
}



const enemeInfoHolder = [
    {
        src: "images/characters/enemies/darthmaul.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/darthsidious.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/darthvader.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/mandalorian.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/mandalorian2.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/stormtrooper.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/tuskenraider.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/enemies/yuuzhenvong.png",
        width: 32,
        height: 48,
    },
]

const enemies = [];

function addEnemy(limit) {
    for (let i = 0; i < limit; i++) {
        const character = enemeInfoHolder[Math.floor(Math.random() * enemeInfoHolder.length)];
        enemies.push(new Enemy(
            character.src,
            canvas.width + character.width + (Math.random() * canvas.width * 1.25),
            (canvas.height * 0.11) + ((Math.random() * canvas.height) * 0.7),
            character.width,
            character.height,
            spriteSheetMovement1,
            {
                "left": true,
            },
            4
        ));
    }
}

addEnemy(Math.floor(Math.random() * 10) + 1);