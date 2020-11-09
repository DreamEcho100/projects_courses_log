const gameSection = document.getElementById("simple-game-and-sprite-animation");
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// context.globalCompositeOperation = "lighter";

context.imageSmoothingEnabled = false;
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    enemiesLimit = Math.ceil((canvas.height * canvas.width) / 9000 * .35);
});

const background = new Image();
background.src = "images/backgrounds/background.png";
background.style.width = "100%";
background.style.height = "100%";

class Character {
    constructor(imgSrc, x, y, width, height, frame, pos, speed) {
        this.imgSrc = imgSrc;
        this.imgHandler(imgSrc);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frame = frame;
        this.pos = pos;
        this.speed = speed;
    }

    imgHandler(imgSrc) {
        this.img = new Image();
        this.img.src = imgSrc;
    }
}

const spriteSheetMovement1 = {
    up: {
        x: {
            coor: 0,
            limit: 3,
            base: 0
        },
        y: {
            coor: 3,
            limit: 3,
            base: 0
        },
    },
    right: {
        x: {
            coor: 0,
            limit: 3,
            base: 0
        },
        y: {
            coor: 2,
            limit: 3,
            base: 0
        },
    },
    down: {
        x: {
            coor: 0,
            limit: 3,
            base: 0
        },
        y: {
            coor: 0,
            limit: 3,
            base: 0
        },
    },
    left: {
        x: {
            coor: 0,
            limit: 3,
            base: 0
        },
        y: {
            coor: 1,
            limit: 3,
            base: 0
        },
    },
};

const keys = {};
window.addEventListener("keydown", (event) => {
    keys[event.key || event.keyCode] = true;
});
window.addEventListener("keyup", (event) => {
    delete keys[event.key || event.keyCode];
    player.moving = false;
});