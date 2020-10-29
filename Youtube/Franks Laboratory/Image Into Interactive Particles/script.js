const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalesArray = [];

const mouse = {
    x: 0,
    y: 0,
    radius: 100
};

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x + (canvas.clientLeft / 2);
    mouse.y = event.y + (canvas.clientTop / 2);
});

canvas.addEventListener("mouseleave", (event) => {
    mouse.x = 0;
    mouse.y = 0;
});

function drawImage() {
    const imageWidth = png.width;
    const imageHeight = png.height;
    const data = context.getImageData(0, 0, imageWidth, imageHeight);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    
    // Particale class
    class Particale {
        constructor(requiredObj, x, y, color, size) {
            this.requiredObj = requiredObj;
            this.x = x + this.requiredObj.canvas.width / 2 - png.width * 2;
            this.y = y + this.requiredObj.canvas.height / 2 - png.height * 2;
            this.color = color;
            this.size = 2;
            this.baseX = /*this.x;*/x + this.requiredObj.canvas.width / 2 - png.width * 2;
            this.baseY = /*this.y;*/y + this.requiredObj.canvas.height / 2 - png.height * 2;
            this.density = (Math.random() * 10) + 2
        }

        draw() {
            // Draw eye
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();

        }

        update() {
            context.fillStyle = this.color;

            // Collision detection
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx**2 + dy**2);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;

            // Max distance, past that the force will be 0
            const maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            //if (force < 0) force = 0;

            const directionX = (forceDirectionX * force * this.density * 0.6);
            const directionY = (forceDirectionY * force * this.density * 0.6);

            if (distance < mouse.radius + this.size) {
                this.x -= directionX * 1.5;
                this.y -= directionY * 1.5;
            } else {
                if (this.x !== this.baseX) {
                    this.x -= (this.x - this.baseX) / 20
                }
                if (this.y !== this.baseY) {
                    this.y -= (this.y - this.baseY) / 20
                }
            }

            this.draw();
        }
    }

    function init(canvas) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        particalesArray = [];

        // let y, y2, x, x2, positionX, positionY, color;
        const L1C = {
            y: undefined,
            y2: undefined,
            x: undefined,
            x2: undefined,
            positionX: undefined,
            positionY: undefined,
            color: undefined,
        }

        for (L1C.y = 0, L1C.y2 = data.height; L1C.y < L1C.y2; L1C.y++) {
            for (L1C.x = 0, L1C.x2 = data.width; L1C.x < L1C.x2; L1C.x++) {
                if (data.data[(L1C.y *4 * data.width) + (L1C.x * 4) + 3] > 128) {
                    L1C.positionX = L1C.x + 0;
                    L1C.positionY = L1C.y + 0;
                    L1C.color = `
                        rgb(
                            ${data.data[(L1C.y * 4 * data.width) + (L1C.x * 4)]},
                            ${data.data[(L1C.y * 4 * data.width) + (L1C.x * 4) + 1]},
                            ${data.data[(L1C.y * 4 * data.width) + (L1C.x * 4) + 2]}
                        )
                    `;
                    particalesArray.push(new Particale({ canvas },L1C.positionX * 4, L1C.positionY * 4, L1C.color));
                }
            }
        }

    }

    function animate() {
        requestAnimationFrame(animate);
        context.beginPath();
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.closePath();
        
        particalesArray.forEach(particale => particale.update());
    }

    init(canvas);
    animate();

    window.addEventListener("resize", () => {
        init(canvas);
    });
}

const randompngImagesBase64 = pngImagesBase64[Math.floor(Math.random() * pngImagesBase64.size)];
const png = new Image();
png.src = randompngImagesBase64.base64;
png.alt = randompngImagesBase64.name;


window.addEventListener("load", (event) => {
    console.log("Page has loaded");
    context.drawImage(png, 0, 0);
    drawImage();
    
});