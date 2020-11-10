class Enemy extends Character {
    constructor(imgSrc, x, y, width, height, frame, pos, speed) {
        super(imgSrc, x, y, width, height, frame, pos, speed);
    }

    move() {
        this.x -= this.speed;
        this.handleFrame("left");
        this.pos["left"] = true;
        this.pos["up"] = false;
        this.pos["down"] = false;
        if (
                this.x - this.width  < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y > player.y - (player.height * 0.5) &&
                this.y < player.y + (player.height * 0.5) &&
                this.y - this.speed > (canvas.height * 0.25)
        ) {
            this.y -= this.speed;
            this.pos["up"] = true;
            this.handleFrame("up");
        } else if (
                this.x - this.width  < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y > player.y + (player.height * 0.5) &&
                this.y < player.y + (player.height * 1.5) &&
                this.y + this.height + this.speed < canvas.height
        ) {
            this.y += this.speed;
            this.pos["down"] = true;
            this.handleFrame("down");
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
        // const spriteSheetMovement = Object.assign({}, spriteSheetMovement1)/*{...spriteSheetMovement1}*/;
        enemies.push(new Enemy(
            character.src,
            canvas.width + character.width + (Math.random() * canvas.width * 0.75),
            (canvas.height * 0.25) + ((Math.random() * canvas.height) * 0.5),
            character.width,
            character.height,
            /*spriteSheetMovement*/JSON.parse(JSON.stringify(spriteSheetMovement1)),
            {
                "left": true,
            },
            5
        ));
    }
}

addEnemy(Math.floor(Math.random() * 10) + 1);