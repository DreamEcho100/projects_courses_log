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
    ctx2.drawImage(grass, 0, 0, canvas2.width, canvas2.height);

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
});

function scored() {
    score++;
    gameSpeed += 0.025;
    frogger.x = (canvas1.width / 2) - (frogger.width / 2);
    frogger.y = canvas1.height - frogger.width - 40;
    
}