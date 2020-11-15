class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomFrameLimit = Math.floor(Math.random() * 30) + 30;
        this.carType = (Math.floor(Math.random() * numberOfCars));/*((type) => {

        })(this.type)*/
    }

    draw() {
        ctx3.beginPath();
        ({
            "turtle": () => {
                if (frame % this.randomFrameLimit === 0) {
                    if (this.frameX >= 1) this.frameX = 0;
                    else this.frameX++;
                }
                ctx3.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
            },
            "log": () => {
                ctx3.drawImage(log, this.x, this.y, this.width, this.height);
            },
            "car": () => {
                ctx3.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
            }
        }[this.type])();
        ctx3.closePath();
        ctx3.fill();
    }

    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if(this.x > canvas1.width) {
                this.x = -this.width;
                this.carType = (Math.floor(Math.random() * numberOfCars));
            }
        } else {
            this.frameX = 1;
            if(this.x + this.width < 0) {
                this.x = canvas1.width;
                this.carType = (Math.floor(Math.random() * numberOfCars));
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

    waterObstacles = [...logsArray, ...turtelsArray];
}

initObstacles();

function handleLandObstacles() {
    carsArray.forEach(car => car.update());

    // Collision
    let i;
    for (i = 0; i < carsArray.length; i++) {
        if (rectsCollision(frogger, carsArray[i])) {
            ctx4.drawImage(collision, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50)
            resetGame();
        }
    }
}

function handleWaterObstacles() {
    logsArray.forEach(log => log.update());
    turtelsArray.forEach(log => log.update());

    // Collision
    if(frogger.y < 250 && frogger.y > 100){
        isSinking = true;
        let i;
        for (let i = 0; i < waterObstacles.length; i++) {
            if (rectsCollision(frogger, waterObstacles[i])) {
                frogger.x += waterObstacles[i].speed;
                isSinking = false;
                break;
            }
        }
        if(isSinking) {
            let randomNumber = Math.random().toFixed(2);
            ripplesArray.unshift(new Particale(
                `${frogger.x.toFixed(2)}${frogger.y.toFixed(2)}${i}${randomNumber}`,
                "ripple",
                frogger.x + (frogger.width / 2),
                frogger.y + (frogger.height / 2)
            ));
            ctx4.drawImage(collision, 0, 0, 100, 100, frogger.x, frogger.y, 50, 50)
            resetGame();
        }
    }
    /*
    if(
        frogger.y < 250 && frogger.y > 100 &&
        !waterObstacles.some(obstacle => rectsCollision(frogger, obstacle))
    ){
        ctx4.drawImage(collision, 0, 0, 100, 100, frogger.x, frogger.y, 50, 50)
        resetGame();
    }
    */
}