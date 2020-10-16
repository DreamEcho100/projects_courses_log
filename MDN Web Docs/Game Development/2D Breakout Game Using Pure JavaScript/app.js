const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Player {
    constructor(x, y, width, height, color, velocityDirX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityDirX = velocityDirX;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
        if (playerControls.right && playerControls.left) return;
        if (playerControls.right && (this.x + this.width + this.velocityDirX) < canvas.width) {
            this.x += this.velocityDirX;
        } else if (playerControls.left && this.x - this.velocityDirX > 0) {
            this.x -= this.velocityDirX;
        }
    }
}

class Ball {
    constructor(x, y, radius, startAngle, endAngle, antiClockwise, color, velocityDirX, velocityDirY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.antiClockwise = antiClockwise;
        this.color = color;
        this.velocityDirX = velocityDirX;
        this.velocityDirY = velocityDirY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.antiClockwise);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(element, borders, blocks) {
        this.draw();
        if (
            this.y + this.velocityDirY < borders.top + this.radius ||
            (
                this.x > element.x &&
                this.x < element.x + element.width &&
                this.y + this.radius >= element.y &&
                this.y + this.radius < element.y + (element.height * 0.25)
            )
        ) {
            this.velocityDirY = -this.velocityDirY;
        } else if (this.y + this.velocityDirY > borders.bottom - this.radius) {
            window.cancelAnimationFrame(animateId);
            alert("Game Over!");
            document.location.reload();
        }
        if (
            this.x + this.velocityDirX < borders.left + this.radius ||
            this.x + this.velocityDirX > borders.right - this.radius
        ) {
            this.velocityDirX = -this.velocityDirX;
        }
    
        this.x += this.velocityDirX;
        this.y += this.velocityDirY;
    }
}

class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

/***********************************
/***********************************
/***********************************/

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const playerControls = {
    "right": false,
    "left": false
}

const paddleWidth = 75;
const paddleHeight = 10;
const paddle = new Player(
    (canvas.width - paddleWidth) / 2,
    canvas.height - (paddleHeight * 1.5),
    paddleWidth,
    paddleHeight,
    randomColor(),
    7
);

const ball = new Ball(
    canvas.width / 2,
    canvas.height - 30,
    10,
    0,
    Math.PI * 2,
    false,
    randomColor(),
    2,
    -2
);

const bricksDetail = {
    rows: 5,
    columns: 6,
    width: 50,
    height: 15,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
}

let blockDetroyed = 0;

const bricksArray = [];
for (let c = 0; c < bricksDetail.columns; c++) {
    // bricksArray.push([]);
    bricksArray[c] = [];
    for (let r = 0; r < bricksDetail.rows; r++) {
        // bricksArray[c].push(
        //     {
        //         x: (c * (bricksDetail.width + bricksDetail.padding)) + bricksDetail.offsetLeft,
        //         y: (r * (bricksDetail.height + bricksDetail.padding)) + bricksDetail.offsetTop,
        //     }
        // );
        bricksArray[c][r] = {
            x: (c * (bricksDetail.width + bricksDetail.padding)) + bricksDetail.offsetLeft,
            y: (r * (bricksDetail.height + bricksDetail.padding)) + bricksDetail.offsetTop,
            status: 1
        }
        
    }
}
function drawBricks() {
    for (let c = 0; c < bricksDetail.columns; c++) {
        for (let r = 0; r < bricksDetail.rows; r++) {
            if (bricksArray[c][r].status !== 1) continue;
            ctx.beginPath();
            ctx.rect(bricksArray[c][r].x, bricksArray[c][r].y, bricksDetail.width, bricksDetail.height);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
/*
const brickRowCount = 5;
const brickColumnCount = 6;
const brickWidth = 50;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
*/
function collisionDetection(obj) {
    for (let c = 0; c < bricksDetail.columns; c++) {
        for (let r = 0; r < bricksDetail.rows; r++) {
            if (bricksArray[c][r].status !== 1) continue;
            const b = bricksArray[c][r];
            if (
                obj.x + obj.radius > b.x &&
                obj.x - obj.radius < b.x + bricksDetail.width &&
                obj.y + obj.radius > b.y &&
                obj.y - obj.radius < b.y + bricksDetail.height
            ) {
                obj.velocityDirY = -obj.velocityDirY;
                b.status = 0;
                blockDetroyed++;
            }
        }
    }
}

function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        playerControls.right = true;
    }
    if (event.key === "Left" || event.key === "ArrowLeft") {
        playerControls.left = true;
    }
}

function keyUpHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        playerControls.right = false;
    }
    if (event.key === "Left" || event.key === "ArrowLeft") {
        playerControls.left = false;
    }
}

function randomColor() {
    return `hsl(${Math.random() * 360}, 50%, 50%)`;
}

let animateId;
const animate = () => {
    animateId = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    drawBricks();
    paddle.update();
    ball.update(
        paddle,
        {
            top: 0,
            bottom: canvas.height,
            left: 0,
            right: canvas.width
        },
        true,
    );
    collisionDetection(ball);
}

animate();

/*
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#f00";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
*/