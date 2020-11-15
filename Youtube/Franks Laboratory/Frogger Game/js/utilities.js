function animate() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height); // 
    ctx4.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx5.clearRect(0, 0, canvas1.width, canvas1.height);

    ctx2.drawImage(background_lvl2, 0, 0, canvas2.width, canvas2.height);
    handleParticales();
    handleWaterObstacles();
    frogger.update();
    handleLandObstacles();
    handleScoreBoard();
    ctx2.drawImage(grass, 0, 0, canvas2.width, canvas2.height);

    frame++;

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("keydown", (event) => {
    keys = [];
    keys[event.keyCode] = true;
    if (keys[37] || keys[39] || keys[40]) {
        frogger.jump();
    }
});

window.addEventListener("keyup", (event) => {
    delete keys[event.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});

function scored() {
    score++;
    gameSpeed += 0.05;
    gameSpeed = parseFloat(gameSpeed.toFixed(2));
    frogger.x = (canvas1.width / 2) - (frogger.width / 2);
    frogger.y = canvas1.height - frogger.width - 40;
    
}

function handleScoreBoard() {
    ctx4.fillStyle = "black";
    ctx4.strokeStyle = "black";
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Score", 265, 15);
    ctx4.font = "60px Verdana";
    ctx4.fillText(score, 270, 65);
    ctx4.font = "15px Verdana";
    ctx4.strokeText(`Collisions: ${collisionCount}`, 10, 175);
    ctx4.strokeText(`Game Speed: ${gameSpeed}`, 10, 195);
}

// Collision detection between two rectangles
function rectsCollision(first, second) {
    return !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    );
}

function waterRectsCollision(first, second) {
    return (
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    );
}

function resetGame() {
    frogger.x = (canvas1.width / 2) - (frogger.width / 2);
    frogger.y = canvas1.height - frogger.width - 40;
    score = 0;
    collisionCount++;
    gameSpeed = 1;
}

function gameResize() {
    if (froggeyGameSection.clientWidth < gameWrapper.clientWidth + 10 || froggeyGameSection.clientHeight < gameWrapper.clientHeight + 10) {
        gameWrapper.style.width = `${gameWrapper.clientWidth * 0.75}px`;
        gameWrapper.style.height = `${gameWrapper.clientHeight * 0.75}px`;
        if (froggeyGameSection.clientWidth < gameWrapper.clientWidth + 10 || froggeyGameSection.clientHeight < gameWrapper.clientHeight + 10) gameResize();
    } else if (froggeyGameSection.clientWidth < gameWrapperOriginalWidth + 10 && froggeyGameSection.clientHeight > gameWrapper.clientHeight + 10) {
        gameWrapper.style.width = `${gameWrapperOriginalWidth}px`;
        gameWrapper.style.height = `${gameWrapperOriginalHeight}px`;
    }
}

window.addEventListener("resize", () => {
    gameResize();
});

gameResize();