const obstaclesArray = [];

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height / 3) + 20;
        this.bottom = (Math.random() * canvas.height / 3) +20;
        this.x = canvas.width;
        this.width = 20;
        this.color = `hsla(${hue}, 100%, 50%)`;
        this.counted = false;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.bottom, this.width, this.bottom);
        ctx.rect(this.x, 0, this.width, this.top);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        /*ctx.beginPath();
        ctx.rect(this.x, 0, this.width, this.top);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();*/
    }

    update(player) {
        this.x -= gameSpeed;
        if (!this.counted && this.x < player.x) {
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(player) {
    if (frame % 50 === 0) {
        obstaclesArray.unshift(new Obstacle);
    }
    let i;
    for (i = 0; i < obstaclesArray.length; i++) {
        if (obstaclesArray[i].x + obstaclesArray[i].width < 0) {
            // obstaclesArray.splice(i, 1);
            obstaclesArray.pop();
        } else {
            obstaclesArray[i].update(player);
        }
    }
    /*if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }*/
}

const bang = new Image();
bang.src = "images/collisions/bang1.png";
function handleCollision(player) {
    let i;
    for (i = 0; i < obstaclesArray.length; i++) {
        if (
            player.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            player.x + player.width * 1.3 > obstaclesArray[i].x &&
            (
                (player.y < 0 + obstaclesArray[i].top &&
                    player.y + player.height > 0) ||
                (player.y + player.height > canvas.height - obstaclesArray[i].bottom &&
                    player.y + player.height < canvas.height)

            )
        ) {
            ctx.drawImage(bang, player.x, player.y, 50, 50);
            ctx.font = "25px Georgia";
            ctx.fillStyle = "white";
            ctx.fillText(`Game Over, your score is ${score}`, canvas.width / 4, canvas.height / 2 - 10);
            /*
            ctx.beginPath();
            ctx.fill();
            ctx.closePath();
            */
            return true;            
        }
    }
}