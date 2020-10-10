document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const doodler = document.createElement("div");
    const platformProto = document.getElementById("platform-proto");
    const HTMLFONTSIZE = 10;
    let doodlerLeftSpace = 50;
    let startPoint = 150
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isDoodlerJumping = true;
    let isDoodlerGoingLeft = false;
    let isDoodlerGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodlerLeftSpace = platforms[0].left;
        console.log(platforms[0].left, doodlerLeftSpace);
        doodler.style.left = `${doodlerLeftSpace / HTMLFONTSIZE}rem`;
        doodler.style.bottom = `${doodlerBottomSpace / HTMLFONTSIZE}rem`;
    }

    class Platform {
        constructor(gridCor, platformProtoCor, newPlatBottom) {
            this.gridCor = gridCor;
            this.platformProtoCor = platformProtoCor;
            this.bottom = (newPlatBottom);
            this.left = (Math.random() * (gridCor.width - platformProtoCor.width));
            this.visual = document.createElement("div");
        }

        appendTo(element) {
            const {visual, left, bottom} =  this;
            visual.classList.add("platform");
            visual.style.left = `${left / HTMLFONTSIZE}rem`;
            visual.style.bottom = `${bottom / HTMLFONTSIZE}rem`;
            element.appendChild(visual);
        }
    }

    function createPlatforms() {
        for(let i = 0; i < platformCount; i++) {
            const gridCor = grid.getBoundingClientRect();
            const platformProtoCor = platformProto.getBoundingClientRect();
            let platGap = gridCor.height / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform(gridCor, platformProtoCor, newPlatBottom);
            newPlatform.appendTo(grid);
            platforms.push(newPlatform);
        }
        console.log(platforms);
    }

    function movePlatforms() {
        if(doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 1;
                let visual = platform.visual;
                visual.style.bottom = `${platform.bottom  / HTMLFONTSIZE}rem`;

                if ((platform.bottom + platformProto.getBoundingClientRect().height) / HTMLFONTSIZE <= 0) {
                    score++;
                    let firstPlatform = platforms.shift();
                    firstPlatform.bottom = grid.getBoundingClientRect().height
                    firstPlatform.visual.style.bottom = `${grid.getBoundingClientRect().height / HTMLFONTSIZE}rem`;
                    platforms.push(firstPlatform);
                }
            });
            
        }
        window.requestAnimationFrame(movePlatforms);
    }

    function jump() {
        clearInterval(downTimerId);
        isDoodlerJumping = true;
        upTimerId = setInterval(() => {
            doodlerBottomSpace +=20;
            doodler.style.bottom = `${doodlerBottomSpace}px`;
            if (doodlerBottomSpace > startPoint + 200) {
                fall();
            }
        } ,30);
    }

    function fall() {
        clearInterval(upTimerId);
        isDoodlerJumping = false;
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = `${doodlerBottomSpace}px`;
            if (doodlerBottomSpace < 0) {
                gameOver();
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + platformProto.getBoundingClientRect().height) &&
                    ((doodlerLeftSpace + doodler.getBoundingClientRect().width) >=  platform.left) &&
                    (doodlerLeftSpace <= (platform.left + platformProto.getBoundingClientRect().width)) &&
                    !isDoodlerJumping
                ) {
                    console.log('landed');
                    startPoint = doodlerBottomSpace;
                    score++;
                    jump();
                }
            });
        }, 30);
    }

    function gameOver() {
        console.log("Game Over");
        isGameOver = true;
        document.removeEventListener("keyup", controls);
        clearInterval(downTimerId);
        clearInterval(upTimerId);
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
        leftTimerId = false;
        rightTimerId = false;

        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML = score;
    }

    function controls(event) {
        if (event.key === "ArrowLeft") {
            moveLeft();
        } else if (event.key === "ArrowRight") {
            moveRight();
        } else if (event.key === "ArrowUp") {
            moveStraightUp();
        }
    }

    function moveLeft() {
        if (isDoodlerGoingRight) {
            clearInterval(rightTimerId);
            isDoodlerGoingRight = false;
        }
        isDoodlerGoingLeft = true;
        leftTimerId = setInterval(() => {
            if (doodlerLeftSpace >= grid.getBoundingClientRect().left) {
                doodlerLeftSpace -= 5;
                doodler.style.left = `${doodlerLeftSpace / HTMLFONTSIZE}rem`;
            } else moveRight();
        }, 30);
    }

    function moveRight() {
        if (isDoodlerGoingLeft) {
            clearInterval(leftTimerId);
            isDoodlerGoingLeft = false;
        }
        isDoodlerGoingRight = true;
        rightTimerId = setInterval(() => {
            if (doodlerLeftSpace <= grid.getBoundingClientRect().width - doodler.getBoundingClientRect().width) {
                doodlerLeftSpace += 5;
                doodler.style.left = `${doodlerLeftSpace / HTMLFONTSIZE}rem`;
            } else moveLeft();
        }, 30);
    }

    function moveStraightUp() {
        clearInterval(downTimerId);
        clearInterval(upTimerId);
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            movePlatforms();
            jump();
            document.addEventListener("keyup", controls);
        }
    }
    start();

});