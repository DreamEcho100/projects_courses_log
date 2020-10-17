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
                this.x + this.radius >= element.x &&
                this.x - this.radius < element.x + element.width &&
                this.y + this.radius >= element.y &&
                this.y - this.radius < element.y + (element.height * 0.35)
            )
        ) {
            if (
                this.x >= element.x + (element.width / 2) &&
                (
                    this.x + this.radius >= element.x &&
                    this.x - this.radius < element.x + element.width &&
                    this.y + this.radius >= element.y &&
                    this.y - this.radius < element.y + (element.height * 0.35)
                )
            ) {
                this.velocityDirX = -this.velocityDirX;
            }
            this.velocityDirY = -this.velocityDirY;
        } else if (this.y + this.velocityDirY > borders.bottom - this.radius) {
            setTimeout(() => lives--, 0);
            if (lives === 0) {
                window.cancelAnimationFrame(animateId);
                alert("Game Over!");
                document.location.reload();
            } else {
                paddle.x = (canvas.width - paddle.width) / 2;
                ball.x = canvas.width / 2;
                ball.y = canvas.height-30;
                ball.velocityDirX = 2;
                ball.velocityDirY = -2;
            }
        }
        if (
            this.y + this.velocityDirY < borders.top + this.radius ||
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
let score = 0;
let winScore = 0;
let lives = 3;
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

const bricksDetails = {
    rows: 5,
    columns: 6,
    width: 50,
    height: 15,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
    colors: {
        "1": "#0095DD",
        "2": "#00DD95",
        "3": "#DD0095",
        "4": "#00A51D"
    }
}

let blockDetroyed = 0;
const bricksArray = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

for (let c = 0; c < bricksDetails.columns; c++) {
    // bricksArray.push([]);
    bricksArray[c] = [];
    for (let r = 0; r < bricksDetails.rows; r++) {
        // bricksArray[c].push(
        //     {
        //         x: (c * (bricksDetails.width + bricksDetails.padding)) + bricksDetails.offsetLeft,
        //         y: (r * (bricksDetails.height + bricksDetails.padding)) + bricksDetails.offsetTop,
        //     }
        // );
        const tempScore = (c % 4 === 0 && r % 4) ? 4 : (c % 3 === 0 && r % 3) ? 3 : r % 2 === 0 ? 2 : 1;
        bricksArray[c][r] = {
            x: (c * (bricksDetails.width + bricksDetails.padding)) + bricksDetails.offsetLeft,
            y: (r * (bricksDetails.height + bricksDetails.padding)) + bricksDetails.offsetTop,
            status: tempScore
        }
        winScore += tempScore;
    }
}
function drawBricks() {
    for (let c = 0; c < bricksDetails.columns; c++) {
        for (let r = 0; r < bricksDetails.rows; r++) {
            if (bricksArray[c][r].status <= 0) continue;
            ctx.beginPath();
            ctx.rect(bricksArray[c][r].x, bricksArray[c][r].y, bricksDetails.width, bricksDetails.height);
            ctx.fillStyle = bricksDetails.colors[bricksArray[c][r].status];
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0059DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width-65, 20);
}

function collisionDetection(obj) {
    for (let c = 0; c < bricksDetails.columns; c++) {
        for (let r = 0; r < bricksDetails.rows; r++) {
            if (bricksArray[c][r].status <= 0) continue;
            const b = bricksArray[c][r];
            if (
                obj.x + obj.radius > b.x &&
                obj.x - obj.radius < b.x + bricksDetails.width &&
                obj.y + obj.radius > b.y &&
                obj.y - obj.radius < b.y + bricksDetails.height
            ) {
                obj.velocityDirY = -obj.velocityDirY;
                blockDetroyed++;
                score++;
                drawScore();
                drawLives();
                setTimeout(() => {
                    b.status--;
                    if(score === winScore) {
                        setInterval(() => {
                            window.cancelAnimationFrame(animateId);
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }, 0);
                    }
                }, 0);
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

function mouseMoveHandler(event) {
    let relativeX = event.clientX - canvas.offsetLeft;
    if (
        relativeX > 0 &&
        relativeX < canvas.width &&
        relativeX - (paddle.width / 2) > 0 &&
        relativeX + (paddle.width / 2) < canvas.width
    ) {
        paddle.x = relativeX - (paddle.width / 2);
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
    paddle.update();
    drawBricks();
    drawScore();
    drawLives();
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