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

    update() {
        this.x -= gameSpeed;
        if (!this.counted && this.x < bird.x) {
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles() {
    if (frame % 50 === 0) {
        obstaclesArray.unshift(new Obstacle);
    }
    let i;
    for (i = 0; i < obstaclesArray.length; i++) {
        if (obstaclesArray[i].x + obstaclesArray[i].width < 0) {
            // obstaclesArray.splice(i, 1);
            obstaclesArray.pop();
        } else {
            obstaclesArray[i].update();
        }
    }
    /*if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }*/
}

const bang = new Image();
bang.src = "images/collisions/bang1.png";
function handleCollision() {
    let i;
    for (i = 0; i < obstaclesArray.length; i++) {
        if (
            bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            (
                (bird.y < 0 + obstaclesArray[i].top &&
                    bird.y + bird.height > 0) ||
                (bird.y > canvas.height - obstaclesArray[i].bottom &&
                    bird.y + bird.height < canvas.height)

            )
        ) {
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            ctx.font = "25px Georgia";
            ctx.fillStyle = "black";
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