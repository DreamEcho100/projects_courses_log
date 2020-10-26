const particalesArray = [];

class Particale {
    constructor() {
        this.x = bird.x;
        this.y = bird.y;
        this.size = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
    }

    update() {
        this.x -= gameSpeed;
        this.y += this.speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function handleParticales() {
    particalesArray.unshift(new Particale);
    let i;
    for (i = 0; i < particalesArray.length; i++) {
        if (particalesArray[i].x + particalesArray[i].size < 0) {
            // particalesArray.splice(i, 1);
            particalesArray.pop();
        } else {
            particalesArray[i].update();
            particalesArray[i].draw();
        }
    }

    if (particalesArray.length > 200) {
        let i;
        for (i = 0; i < 20; i++) {
            particalesArray.pop(particalesArray[i]);
        }
    }
}