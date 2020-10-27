const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
/*context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.msImageSmoothingEnabled = false;
context.oImageSmoothingEnabled = false;*/

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalesArray = [];
let wobble = 1;

// Particale class
class Particale {
    constructor(moveRadius, step, position, size, randomNumber) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
        this.randomNumber = randomNumber;
    }

    draw(canvas) {
        wobble += 0.00005;
        let x = this.randomNumber < 0.6 && this.randomNumber > 0.3 ? ((Math.cos(this.position) + Math.cos(wobble)) * this.moveRadius) + (canvas.width / 2) : (Math.cos(this.position) * this.moveRadius) + (canvas.width / 2);
        let y = this.randomNumber < 0.6 && this.randomNumber > 0.3 ? ((Math.sin(this.position) + Math.sin(wobble)) * this.moveRadius) + (canvas.height / 2) : (Math.sin(this.position) * this.moveRadius) + (canvas.height / 2);
        
        if (this.randomNumber < 0.5) {
            drawStar(x, y, 7, this.size, this.size / 2 + 2);
            context.fillStyle = "#ffd700";
            context.strokeStyle='#ff000033';
            context.stroke();
        } else {
            context.beginPath();
            context.arc(x, y, this.moveRadius / 15, 0, Math.PI * 2, false);
            context.fillStyle = "#ffd700"; // this.color;
            context.strokeStyle='rgba(255, 255, 255, 0.9)';
            context.stroke();
            context.closePath();
        }
        
        context.fill();
    }

    update(canvas) {
        this.position += this.step;
        this.draw(canvas);
    }
}

function init(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particalesArray = [];
    const numberOfParticales = Math.ceil((canvas.height * canvas.width) / 9000) * 3;// 500;
    let i;
    for (i = 0; i < numberOfParticales; i++) {
        const randomNumber = Math.random();
        const moveRadius = Math.random() * canvas.width;
        const step = (Math.random() * 0.002) + 0.002;
        const position = Math.random() * (Math.PI * 2);
        const size = randomNumber < 0.5 ? (Math.random() * 25) + 15 : (Math.random() * 25) + 5;
        
        particalesArray.push(new Particale(moveRadius, step, position, size, randomNumber));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.beginPath();
    context.fillStyle = "rgba(0, 0, 255, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    
    particalesArray.forEach(particale => particale.update(canvas));
}

init(canvas);
animate();

window.addEventListener("resize", () => {
    init(canvas);
});

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius) {
    let rotation = Math.PI / 2 * 3;
    let x = positionX;
    let y = positionY;
    let step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(positionX, positionY - outerRadius);
    let i;
    for (i = 0; i < spikes; i++) {
        x = positionX + Math.cos(rotation) * outerRadius;
        y = positionY + Math.sin(rotation) * outerRadius;
        context.lineTo(x, y);
        rotation += step;

        x = positionX + Math.cos(rotation) * innerRadius;
        y = positionY + Math.sin(rotation) * innerRadius;
        context.lineTo(x, y);
        rotation += step;        
    }
    context.lineTo(positionX, positionY - outerRadius);    
    context.closePath();
}