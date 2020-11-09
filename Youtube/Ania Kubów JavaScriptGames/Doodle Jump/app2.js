document.addEventListener("DOMContentLoaded", () => {
    const HTMLFONTSIZE = 10;

    const grid = document.querySelector(".grid");
    const platformProto = document.getElementById("platform-proto");
    const scorePlate = document.querySelector(".score-plate");
    
    const doodler = document.createElement("div");
    
    let score = 0;
    let isGameOver = false;

    let platforms = [];
    let platformCount = 5;

    const gridCoordination = () => {
        return grid.getBoundingClientRect()
    }
    const platformProtoCoordination = () => {
        return platformProto.getBoundingClientRect()
    }
    const doodlerCoordination = () => {
        return doodler.getBoundingClientRect()
    }
    
    let doodlerLeftSpace = 50;
    let startPoint = 250;
    let doodlerBottomSpace = startPoint;
    

    // Platforms
    class Platform {
        constructor(newPlatBottom) {
            this.gridCoor = gridCoordination;
            this.platformCoor = platformProtoCoordination;
            this.bottom = (newPlatBottom);
            this.left = (Math.random() * (this.gridCoor().width - this.platformCoor().width));
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
            const gridCoor = gridCoordination();
            const platformProto = platformProtoCoordination();
            let platGap = gridCoor.height / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform(newPlatBottom);
            newPlatform.appendTo(grid);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if(doodlerBottomSpace > (gridCoordination().height / 4 )) {
            platforms.forEach(platform => {
                platform.bottom -= 2;
                let visual = platform.visual;
                visual.style.bottom = `${platform.bottom  / HTMLFONTSIZE}rem`;

                if ((platform.bottom + platformProtoCoordination().height) / HTMLFONTSIZE <= 0) {
                    score++;
                    let firstPlatform = platforms.shift();
                    firstPlatform.bottom = gridCoordination().height
                    firstPlatform.visual.style.bottom = `${firstPlatform.bottom / HTMLFONTSIZE}rem`;
                    firstPlatform.left = (Math.random() * (gridCoordination().width - platformProtoCoordination().width));
                    firstPlatform.visual.style.left = `${firstPlatform.left / HTMLFONTSIZE}rem`;
                    platforms.push(firstPlatform);
                }
            });
            
        }
    }

    // Doodler
    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = `${doodlerLeftSpace / HTMLFONTSIZE}rem`;
        doodler.style.bottom = `${doodlerBottomSpace / HTMLFONTSIZE}rem`;
    }

    let isDoodlerJumping = false;
    let isDoodlerFalling = true;

    let isDoolderMovingLeft = false;
    let isDoolderMovingRight = false;
    function moves() {
        if(isDoodlerJumping) jump();
        else if (isDoodlerFalling) fall();
        
        if (isDoolderMovingRight) moveRight();
        else if (isDoolderMovingLeft) moveLeft();
    }


    const fall = () => {
        doodlerBottomSpace -= 3;
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
                isDoodlerJumping = true;
                isDoodlerFalling = false;
                startPoint = doodlerBottomSpace;
                score++;
            }
        })
        
    }

    const jump = () => {
        doodlerBottomSpace += 7;
        doodler.style.bottom = `${doodlerBottomSpace}px`;
        if (doodlerBottomSpace > startPoint + 200) {
            isDoodlerJumping = false;
            isDoodlerFalling = true;
            fall();
        }
    }

    const moveRight = () => {
        if (doodlerLeftSpace <= gridCoordination().width - doodlerCoordination().width) {
            doodlerLeftSpace += 3;
            doodler.style.left = `${doodlerLeftSpace / HTMLFONTSIZE}rem`;
        } else {
            moveToTheLeft();
        }
    }

    const moveLeft = () => {
        if (doodlerLeftSpace >= gridCoordination().left) {
            doodlerLeftSpace -= 3;
            doodler.style.left = `${doodlerLeftSpace / HTMLFONTSIZE}rem`;
        } else {
            moveToTheRight();
        }
    }

    function controls(event) {
        if (event.key === "ArrowRight") {
            moveToTheRight();
        } else if (event.key === "ArrowLeft") {
            moveToTheLeft();
        } else if (event.key === "ArrowUp") {
            moveStraight();
        }
    }

    const moveToTheRight = () => {
        isDoolderMovingLeft = false;
        isDoolderMovingRight = true;
    }
    const moveToTheLeft = () => {
        isDoolderMovingLeft = true;
        isDoolderMovingRight = false;
    }
    const moveStraight = () => {
        isDoolderMovingLeft = false;
        isDoolderMovingRight = false;
    }


    const gameOver = () => {
        isGameOver = true;
        document.removeEventListener("keydown", controls);
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        scorePlate.classList.remove("isHidden");
        scorePlate.querySelector("span").innerHTML = score;
    }

    function start() {
        if (!isGameOver) {
            movePlatforms();
            moves();
            window.requestAnimationFrame(start);
        }
    }

    function init() {
        isGameOver = false;
        grid.innerHTML = "";
        createPlatforms();
        createDoodler();
        document.addEventListener("keydown", controls);
        start();
    }
    init();

});