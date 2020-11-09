let counter = 0;
let limit = 3;
function animate() {
    if(counter % limit === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.drawImage(background, player.width * player.frameX, player.height * player.frameY, canvas.width, canvas.height);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        player.drawSprite();
        player.movePlayer();
        
        if (enemies.length > 15) setTimeout(() => enemies.pop(), 0);
        setTimeout(() =>player.moving = false, 0);
        enemies.forEach((enemy, index) => {
            if (
                enemy.x < player.x + player.width &&
                enemy.x > player.x &&
                enemy.y < player.y + player.height &&
                enemy.y > player.y
            ) {
                setTimeout(() => enemies.splice(index, 1), 0);
                addEnemy(1);
            }
            if(enemy.x < -enemy.width) {
                setTimeout(() => enemies.splice(index, 1), 0);
                addEnemy(Math.floor(Math.random() * 2) + 1);
            } else {
                enemy.moveEnemy();
            }
        });
    }
    counter++;
    
    requestAnimationFrame(animate);
}
animate();