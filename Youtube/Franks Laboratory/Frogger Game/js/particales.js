class Particale {
    constructor(id, type, x, y) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;
    }
    
    drawDust() {
        ctx3.beginPath();
        ctx3.fillStyle = `rgba(150, 150, 150, ${this.opacity}`;
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx3.closePath();
        ctx3.fill();
    }
    
    drawRipple() {
        ctx3.beginPath();
        // ctx3.fillStyle = "transparent"; // `rgba(255, 255, 255, ${this.opacity})`;
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx3.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx3.stroke();
        ctx3.closePath();
        // ctx3.fill();
    }

    update() {
        ({
            "dust": () => {
                this.x += this.directionX;
                this.y += this.directionY;
        
                if (this.opacity - 0.007 > 0) {
                    this.opacity -= 0.007;
                }
                if (this.radius - 0.15 > 0) {
                    this.radius -= 0.15;
                } else {
                    setTimeout(() => delete particalesArray[this.id], 50);
                }

                this.drawDust();
            },
            "ripple": () => {
                if (this.opacity - 0.05 > 0) {
                    this.opacity -= 0.05;
                }
                if (this.radius < 50) {
                    this.radius += 0.5;
                } else {
                    setTimeout(() => delete particalesArray[this.id], 50);
                }

                this.drawRipple();
            }
        }[this.type])();
    }
}

function handleParticales() {
    for (let index in particalesArray) {

        particalesArray[index].update();
    }

    if (keys[37] || keys[38] || keys[39] || keys[40]) {
        if (frogger.y > 250 || frogger.y < 100) {
            for (let i = 0; i < 5; i++) {
                let randomNumber = Math.random().toFixed(2);
                particalesArray[`${frogger.x.toFixed(2)}${frogger.y.toFixed(2)}${i}${randomNumber}`] = new Particale(
                    `${frogger.x.toFixed(2)}${frogger.y.toFixed(2)}${i}${randomNumber}`,
                    "dust",
                    frogger.x + (frogger.width / 2),
                    frogger.y + (frogger.height / 2)
                );
            }
        } else if (frogger.y < 250 && frogger.y > 100) {
            for (let i = 0; i < 5; i++) {
                let randomNumber = Math.random().toFixed(2);
                particalesArray[`${frogger.x.toFixed(2)}${frogger.y.toFixed(2)}${i}${randomNumber}`] = new Particale(
                    `${frogger.x.toFixed(2)}${frogger.y.toFixed(2)}${i}${randomNumber}`,
                    "ripple",
                    frogger.x + (frogger.width / 2),
                    frogger.y + (frogger.height / 2)
                );
            }
        }
    }

}