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
let hue = 0;
let hue2 = 12;

class Particale {
    constructor() {
    }

};

function init() {
    for (let i = 0; i < numberOfParticales; i++) {
        particalesArray.push(new Particale);
    }
}

function animate() {
    /// context.clearRect(0, 0, canvas.width, canvas.height);
    /// context.fillStyle = "rgba(255, 255, 255, 0.005)";
    /// context.fillRect(0, 0, canvas.width, canvas.height);

    particalesArray.forEach(particale => particale.update());

    requestAnimationFrame(animate);
}

/// init();
/// animate();