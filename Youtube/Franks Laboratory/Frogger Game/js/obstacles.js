class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }

    draw() {
        ctx3.beginPath();
        ctx3.fillStyle = "blue";
        ctx3.fillRect(this.x, this.y, this.width, this.height);
        ctx3.closePath();
        ctx3.fill();
    }

    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if(this.x > canvas1.width) {
                this.x = -this.width;
            }
        } else {
            if(this.x + this.width < 0) {
                this.x = canvas1.width;
            }
        }
        this.draw();
    }
}

function initObstacles() {
    // Lane 1
    for (let i = 0; i < 2; i++) {
        carsArray.push(new Obstacle(
            i * 365, // (canvas1.width - (grid * 2)) / 1.205,
            canvas1.height - (grid * 2) - 20,
            grid * 2,
            grid,
            1,
            "car"
        ));
    }
    // Lane 2
    for (let i = 0; i < 2; i++) {
        carsArray.push(new Obstacle(
            i * 365, // (canvas1.width - (grid * 2)) / 1.205,
            canvas1.height - (grid * 3) - 20,
            grid * 2,
            grid,
            -5,
            "car"
        ));
    }
    // Lane 3
    for (let i = 0; i < 2; i++) {
        carsArray.push(new Obstacle(
            i * 365, // (canvas1.width - (grid * 2)) / 1.205,
            canvas1.height - (grid * 4) - 20,
            grid * 2,
            grid,
            3,
            "car"
        ));
    }
    // Lane 4 - The Logs
    for (let i = 0; i < 2; i++) {
        logsArray.push(new Obstacle(
            i * 365, // (canvas1.width - (grid * 2)) / 1.205,
            canvas1.height - (grid * 5) - 20,
            grid * 2,
            grid,
            -2,
            "log"
        ));
    }
    // Lane 5 - The Turtles
    for (let i = 0; i < 3; i++) {
        turtelsArray.push(new Obstacle(
            i * 220, // (canvas1.width - (grid * 2)) / 0.5,
            canvas1.height - (grid * 6) - 20,
            grid,
            grid,
            1,
            "turtle"
        ));
    }
}

initObstacles();

function handleLandObstacles() {
    carsArray.forEach(car => car.update());
}

function handleWaterObstacles() {
    logsArray.forEach(log => log.update());
    turtelsArray.forEach(log => log.update());
}