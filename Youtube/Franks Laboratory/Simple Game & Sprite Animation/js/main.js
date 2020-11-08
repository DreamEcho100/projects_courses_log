let counter = 0;
let limit = 3;
function animate() {
    if(counter % limit === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.drawImage(background, player.width * player.frameX, player.height * player.frameY, canvas.width, canvas.height);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        player.drawSprite();
        player.movePlayer();
        
        enemy.moveEnemy();
        enemy.drawSprite();
    }
    counter++;
    
    requestAnimationFrame(animate);
}
animate();

const keys = {};
window.addEventListener("keydown", (event) => {
    keys[event.key || event.keyCode] = true;
    player.moving = true;
});
window.addEventListener("keyup", (event) => {
    delete keys[event.key || event.keyCode];
    player.moving = false;
});