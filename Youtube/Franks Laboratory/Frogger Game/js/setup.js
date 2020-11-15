// [...froggeyGameSection.querySelectorAll(".wrapper canvas")]
// Array.prototype.slice.call(froggeyGameSection.querySelectorAll(".wrapper canvas"))

//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// ctx.globalCompositeOperation = "lighter";

const froggeyGameSection = document.getElementById("froggey-game");
const gameWrapper = froggeyGameSection.querySelector(".wrapper");
const gameWrapperOriginalWidth = gameWrapper.clientWidth;
const gameWrapperOriginalHeight = gameWrapper.clientHeight;

const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");

const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas5.getContext("2d");

const canvases = [canvas1, canvas2, canvas3, canvas4, canvas5];
const ctxs = [ctx1, ctx2, ctx3, ctx4, ctx5];

canvases.forEach(canvas => {
    canvas.imageSmoothingEnabled = false;
    canvas.width = 600;
    canvas.height = 600;
});

/*const canvases = Array.from(froggeyGameSection.querySelectorAll(".wrapper canvas"));
const ctxs = canvases.map(canvas => {
    canvas.imageSmoothingEnabled = false;
    canvas.width = 600;
    canvas.height = 600;
    return canvas.getContext("2d");
});*/

// 
const grid = 80;
let keys = [];
let score = 0;
let collisionCount = 0;
let frame = 0;
let gameSpeed = 1;

const particalesArray = {};
const maxParticales = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];
const turtelsArray = [];
let waterObstacles;
let isSinking = false;

// Images
const background_lvl2 = new Image();
background_lvl2.src = "images/background_lvl2.png";

const grass = new Image();
grass.src = "images/grass.png";

const collision = new Image();
collision.src = "images/collisions.png";

const turtle = new Image();
turtle.src = "images/turtles.png";

const log = new Image();
log.src = "images/log.png";

const car = new Image();
car.src = "images/cars.png";
let numberOfCars = 3;

const froggerSprite = new Image();
froggerSprite.src = "images/frog_spritesheet.png";