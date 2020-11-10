class Npc extends Character {
    constructor(imgSrc, x, y, width, height, frame, pos, speed) {
        super(imgSrc, x, y, width, height, frame, pos, speed);
    }

    move() {
        this.y -= this.speed;
        this.handleFrame("up");
        this.pos["up"] = true;
        this.pos["left"] = false;
        this.pos["down"] = false;
        
        this.drawSprite();
    }
}

const npcsInfoHolder = [
    {
        src: "images/characters/npcs/astromechdroid.png",
        width: 27,
        height: 26,
    },
    {
        src: "images/characters/npcs/hansolo.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/npcs/jedi.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/npcs/luke.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/npcs/obiwan1.png",
        width: 32.25,
        height: 48,
    },
    {
        src: "images/characters/npcs/princessleia.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/npcs/protocoldroid1.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/npcs/protocoldroid2.png",
        width: 32,
        height: 48,
    },
    {
        src: "images/characters/npcs/yoda.png",
        width: 32,
        height: 48,
    },
];

const npcs = [];

function addNpc(limit) {
    for (let i = 0; i < limit; i++) {
        const character = npcsInfoHolder[Math.floor(Math.random() * enemeInfoHolder.length)];
        // const spriteSheetMovement = Object.assign({}, spriteSheetMovement1)/*{...spriteSheetMovement1}*/;
        npcs.push(new Npc(
            character.src,
            (Math.random() * 35) + 15 ,
            canvas.height + (Math.random() * (canvas.height / 2)),
            character.width,
            character.height,
            /*spriteSheetMovement*/JSON.parse(JSON.stringify(spriteSheetMovement1)),
            {
                "up": true,
            },
            4
        ));
    }
}

addNpc(Math.floor(Math.random() * 10) + 1);