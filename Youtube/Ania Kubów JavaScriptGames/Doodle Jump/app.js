document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const doodler = document.createElement("div");
    const platformProto = document.getElementById("platform-proto");
    const HTMLFONTSIZE = 10;
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 250;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodlerLeftSpace = platforms[0].left;
        console.log(platforms[0].left, doodlerLeftSpace);
        // No need to  (- / HTMLFONTSIZE) since it is already because it's = platforms[0].left which is already (- / HTMLFONTSIZE)
        doodler.style.left = `${doodlerLeftSpace}rem`;
        doodler.style.bottom = `${doodlerBottomSpace / HTMLFONTSIZE}rem`;
    }

    class Platform {
        constructor(gridCor, platformProtoCor, newPlatBottom) {
            this.gridCor = gridCor;
            this.platformProtoCor = platformProtoCor;
            this.bottom = (newPlatBottom) / HTMLFONTSIZE;
            this.left = (Math.random() * (gridCor.width - platformProtoCor.width)) / HTMLFONTSIZE;
            this.visual = document.createElement("div");
        }

        appendTo(element) {
            const {visual, left, bottom} =  this;
            visual.classList.add("platform");
            visual.style.left = `${left}rem`;
            visual.style.bottom = `${bottom}rem`;
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
                platform.bottom -= 0.1;
                let visual = platform.visual;
                visual.style.bottom = `${platform.bottom}rem`;
            });
        }
        window.requestAnimationFrame(movePlatforms);
    }

    function jump() {
        clearInterval(downTimerId);
        upTimerId = setInterval(() => {
            doodlerBottomSpace +=20;
            doodler.style.bottom = `${doodlerBottomSpace}px`;
            if (doodlerBottomSpace > 350) {
                fall();
            }
        } ,30);
    }

    function fall() {
        clearInterval(upTimerId);
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = `${doodlerBottomSpace}px`;
            if (doodlerBottomSpace < 0) {
                gameOver();
            }
        }, 30)
    }

    function gameOver() {
        console.log("Game Over");
        isGameOver = true;
        clearInterval(downTimerId);
        clearInterval(upTimerId);
    }

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            movePlatforms();
            jump();
        }
    }
    start();

});