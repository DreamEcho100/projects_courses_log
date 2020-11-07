const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

let drawing = false;

canvas.width = innerWidth;
canvas.height = innerHeight;
//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// context.globalCompositeOperation = "lighter";

context.imageSmoothingEnabled = false;
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});