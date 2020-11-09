const canvas = document.getElementById('canvas1');
const bouncingParticleEffectsSection = document.getElementById('bouncing-particle-effects');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouseCoor = {
    x: null,
    y: null
}

let particalesArray = [];
let numberOfParticales = 150;

bouncingParticleEffectsSection.addEventListener("mouseover", (event) => {
    if (particalesArray.some(particale => particale.size > 0)) return;
    
    particalesArray.forEach(particale => {
        if (!mouseCoor.x && !mouseCoor.y) {
            particale.x = Math.random() * canvas.width;
            particale.y =  event.y + (canvas.width * 0.25) >= canvas.height && (event.y - (canvas.width * 0.25) > 0) ?
            event.y - (Math.random() * (canvas.width * 0.25)) :
            event.y - (canvas.width * 0.25) < 0 ?
            event.y + (Math.random() * (canvas.width * 0.25)) :
            event.y - (Math.random() * (canvas.width * 0.25));
            particale.size = (Math.random() * 5) + 5;
            particale.weight = 1;
        } else {
            return;
        }
    });
});
bouncingParticleEffectsSection.addEventListener("mousemove", (event) => {
    mouseCoor.x = event.x;
    mouseCoor.y = event.y;
});
bouncingParticleEffectsSection.addEventListener("mouseout", (event) => {
    mouseCoor.x = null;
    mouseCoor.y = null;
});
window.addEventListener("resize", () => {
    init();
});

class Particale {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.closePath();
        context.fill();
    }

    update() {
        this.size -= 0.1;
        if (this.size < 0 ) {
            if (mouseCoor.x && mouseCoor.y) {
                this.x = (mouseCoor.x + ((Math.random() * 20) - 10));
                this.y = (mouseCoor.y + ((Math.random() * 20) - 10));
                this.size = (Math.random() * 5) + 5;
                this.weight = (Math.random() * 2) - 0.5;
            } else {
                this.size = 0;
            }
        }
        this.y += this.weight;
        this.weight += 0.2;

        if (this.y > canvas.height - this.size) {
            this.weight *= -0.5;
        }

        // this.draw();
    }
}

function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    particalesArray = [];
    let i;
    for (i = 0; i < numberOfParticales; i++) {
        particalesArray.push(new Particale(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            (Math.random() * 5) + 5,
            "pink",
            1
        ));
    }
}

function animate() {
    // context.beginPath();
    // context.fillStyle = "rgba(0, 0, 0, 0.08)";
    // context.fillRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ///context.fillStyle = bouncingParticleEffectsSection;
    // context.closePath();
    
    particalesArray.forEach(particale => particale.update());
    connect()
    requestAnimationFrame(animate);
}

init();
animate();

function connect() {
    let opacityValue = 1, a, b, distance;
    for (a = 0; a < particalesArray.length; a++) {
        for (b = a; b < particalesArray.length; b++) {
            distance = ((particalesArray[a].x - particalesArray[b].x)**2)
            +
            ((particalesArray[a].y - particalesArray[b].y)**2);
            if (distance < 1800 && distance > 100) {
                opacityValue = 1 - (distance / 10000);
                context.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                context.beginPath();
                context.lineWidth = 1;
                context.moveTo(particalesArray[a].x, particalesArray[a].y);
                context.lineTo(particalesArray[b].x, particalesArray[b].y);
                context.stroke();
                context.closePath();
            }
        }
    }

}