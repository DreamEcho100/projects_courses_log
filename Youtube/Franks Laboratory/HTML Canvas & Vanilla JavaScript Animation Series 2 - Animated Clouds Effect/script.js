const canvas = document.getElementById("canvas1");
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particaleArray = [];

const colors = [
    "rgb(255, 255, 255)",
    "rgb(255, 255, 255, 0.3)",
    "rgb(173, 216, 230, 0.8)",
    "rgb(211, 211, 211, 0.8)"
]

const maxSize = 40;
const minSize = 0;

// mouse position
let mouse = {
    x: null,
    y: null
}

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});











window.addEventListener("resize", () => {
    particaleArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //init();
})