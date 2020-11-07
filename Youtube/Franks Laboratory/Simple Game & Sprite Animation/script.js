const gameSection = document.getElementById("simple-game-and-sprite-animation");
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

let drawing = false;

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// context.globalCompositeOperation = "lighter";

context.imageSmoothingEnabled = false;
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

const keys = {};
window.addEventListener("keydown", (event) => {
    keys[event.key || event.keyCode] = true;
});
window.addEventListener("keyup", (event) => {
    delete keys[event.key || event.keyCode];
});

const player = {
    x: canvas.width / 3,
    y:  canvas.width / 3,
    width: 40,
    height: 72,
    frameX: 0,
    frameY: 0,
    movement: {
        speed: 9,
        count: 0,
        limit: 3,
        base: 0
    },
    moving: false
};

const playerSprite = new Image();
playerSprite.src = "images/characters/chewie.png";

const background = new Image();
background.src = "images/backgrounds/background.png";
background.style.width = "100%";
background.style.height = "100%";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background, player.width * player.frameX, player.height * player.frameY, canvas.width, canvas.height);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();
    requestAnimationFrame(animate);
}
animate();

function movePlayer() {
    if ((keys["38"] || keys["ArrowUp"]) && player.y > (canvas.height / 10)) {
        player.y -= player.movement.speed;
        player.frameY = 3;
        handlePlayerFrame();
    }
    if ((keys["39"] || keys["ArrowRight"]) && player.x + player.width < canvas.width) {
        player.x += player.movement.speed;
        player.frameY = 2;
        handlePlayerFrame();
    }
    if ((keys["40"] || keys["ArrowDown"]) && (player.y + player.height) < canvas.height) {
        player.y += player.movement.speed;
        player.frameY = 0;
        handlePlayerFrame();
    }
    if ((keys["37"] || keys["ArrowLeft"]) && player.x > 0) {
        player.x -= player.movement.speed;
        player.frameY = 1;
        handlePlayerFrame();
    }
    player.movement.count++;
}

function handlePlayerFrame() {
    if (player.movement.count % player.movement.limit === 0) {
        if (player.frameX < 3) player.frameX++;
        else player.frameX = 0;
    }
}

/*
 let fps, fpsInterval, startTime, now, then, elapsed;
 
 function startAnimating(fps) {
     fpsInterval = 1000/fps;
     then = Date.now();
     startTime = then;
     animate();     
 }
 
 function animate() {
     requestAnimationFrame(animate);
     now = Date.now();
     elapsed = now - then;
     if (elapsed > fpsInterval) {
         then = now - (elapsed % fpsInterval);
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
         drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
         movePlayer();
         handlePlayerFrame();         
     }     
 }
 startAnimating(15); 
 
 









 
 if (keys[39] && player.x < canvas.width - player.width) {
         player.x += player.speed;
         player.frameY = 2;
     }     
      function 
          handlePlayerFrame() {
     if (player.frameX < 3 && player.moving) player.frameX++;
     else player.frameX = 0;     
 }
 */