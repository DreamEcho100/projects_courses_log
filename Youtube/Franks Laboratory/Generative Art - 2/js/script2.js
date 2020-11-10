const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

const mouseCoor = {
    x: null,
    y: null
}

let drawing = false;

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// context.globalCompositeOperation = "lighter";

context.imageSmoothingEnabled = false;

canvas.addEventListener("mousemove", (event) => {
    mouseCoor.x = event.x;
    mouseCoor.y = event.y;
});
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

const numberOfParticales = 150;
const particalesArray = [];
/*let hue = 0;
let hue2 = 12;*/

class Particale {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = (Math.random() * 10) + 2;
        this.speedX = Math.random() >= 0.5 ? (Math.random() * 3) + 1.5 : -(Math.random() * 3) + 1.5;
        this.speedY = Math.random() >= 0.5 ? (Math.random() * 3) + 1.5 : -(Math.random() * 3) + 1.5;
        // this.shrink = true;
    }

    drawCuerent() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "blue";
        context.closePath();
        context.fill();
        context.stroke();
        context.strokeStyle = "black";
    }

    drawPrevuios() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "black";
        context.closePath();
        context.fill();
        context.stroke();
        context.strokeStyle = "black";
    }

    update() {
        this.drawPrevuios();
        if (
            this.x + this.speedX < 0 ||
            this.x + this.speedX > canvas.width
        ) {
            this.speedX = -this.speedX;
        }
        if (
            this.y + this.speedY < 0 ||
            this.y + this.speedY > canvas.height
        ) {
            this.speedY = -this.speedY;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        /*if(this.shrink) {
            if (this.radius - 0.1 < 5) this.shrink = false;
            else this.radius -= 0.1;
        } else {
            if (this.radius + 0.01 > 15) this.shrink = true;
            else this.radius += 0.01;
        }*/

        this.drawCuerent();

    }

};

function init() {
    for (let i = 0; i < numberOfParticales; i++) {
        particalesArray.push(new Particale);
    }
}

function animate() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(255, 255, 255, 0.01)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    particalesArray.forEach(particale => particale.update());

    /*hue++;
    hue2++;*/

    requestAnimationFrame(animate);
}

init();
animate();