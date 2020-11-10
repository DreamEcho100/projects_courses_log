let counter = 0;
let limit = 3;
let enemiesLimit = Math.ceil((canvas.height * canvas.width) / 9000 * .25);
let npcsLimit = Math.ceil((canvas.height * canvas.width) / 9000 * .3);

function arrayLimitChecker(array, limit, instance, instanceLimit) {
    /*if (array.length > limit) setTimeout(() => {
        for(let i = array.length - 1; i > 0; i++) {
            if(enemies[i] > biggerThan) {
                array.splice(i, 1);
                break;
            }
        }
    }, 0);*/
    if (array.length > limit) setTimeout(() => {
        array.splice(
            array.findIndex(item => (item[instance] > instanceLimit)),
            1
        );
    }, 0);
}
function animate() {
    if(counter % limit === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.drawImage(background, player.width * player.frameX, player.height * player.frameY, canvas.width, canvas.height);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        player.drawSprite();
        player.movePlayer();
        
        arrayLimitChecker(enemies, enemiesLimit, "x", canvas.width);
        enemies.forEach((enemy, index) => {
            if (
                enemy.x < player.x + player.width &&
                enemy.x > player.x &&
                enemy.y < player.y + player.height - (player.height * 0.2) &&
                enemy.y > player.y -  (player.height * 0.3)
            ) {
                setTimeout(() => enemies.splice(index, 1), 0);
                addEnemy(Math.floor(Math.random() * 2) + 1);
            }
            if (enemy.x < (canvas.width / 5)) {
                npcs.forEach((npc, index) => {
                    if (
                        enemy.x < npc.x + npc.width &&
                        enemy.x > npc.x &&
                        enemy.y < npc.y + npc.height - (npc.height * 0.2) &&
                        enemy.y > npc.y -  (npc.height * 0.3)
                    ) {
                        setTimeout(() => npcs.splice(index, 1), 0);
                        addNpc(Math.floor(Math.random() * 2) + 1);
                    }
                });
            } 
            if(enemy.x < -enemy.width) {
                setTimeout(() => enemies.splice(index, 1), 0);
                addEnemy(Math.floor(Math.random() * 2) + 1);
            } else {
                enemy.move();
            }
        });

        arrayLimitChecker(npcs, npcsLimit, "y", canvas.height);
        npcs.forEach((npc, index) => {
            if(npc.y < canvas.height * 0.25) {
                setTimeout(() => npcs.splice(index, 1), 0);
                addNpc(Math.floor(Math.random() * 2) + 1);
            }
            npc.move();
        });
    }
    counter++;
    
    requestAnimationFrame(animate);
}
animate();