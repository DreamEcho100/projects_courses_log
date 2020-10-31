const liquidParticleEffectSection = document.getElementById("liquid-particle-effect-around-any-element");
const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: null,
    y: null
}

liquidParticleEffectSection.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientX;
});

class Button {
    constructor(x, y, width, height, baseX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = baseX;
    }
    update() {
        // 14:03
    }
}