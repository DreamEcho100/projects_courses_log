///document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const scorePoint = document.querySelectorAll(".score-points");
    const statsBoard = document.querySelector(".stats-board");
    const startBtn = document.getElementById("start-btn");
    const resumeBtn = document.getElementById("resume-btn");
    const restartBtn = document.getElementById("restart-btn");
    const pauseOrGameOverState = statsBoard.querySelector(".current-stat")

    const ctx = canvas.getContext("2d");

    class Player {
        constructor(x, y, radius, color, speed) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.speed = speed;
        }

        draw() {
            const { x, y, radius, color } = this;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.fill();
        }

        update() {
            this.draw();
            if (
                (playerControls.arrowup || playerControls.w) &&
                player.y > (0 + player.radius)
            ) {
                player.y -= player.speed;
            }
            if (
                (playerControls.arrowdown || playerControls.s) &&
                player.y < (canvas.height - player.radius)
            ) {
                player.y += player.speed;
            }
            if (
                (playerControls.arrowleft || playerControls.a) &&
                player.x > (0 + player.radius)
            ) {
                player.x -= player.speed;
            }
            if (
                (playerControls.arrowright || playerControls.d) &&
                player.x < (canvas.width - player.radius)
            ) {
                player.x += player.speed;
            }
        }
    }

    class Projectile extends Player {
        constructor(x, y, radius, color, velocity) {
            super(x, y, radius, color);
            this.velocity = velocity;
        }

        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }

    class Enemy extends Projectile {
        constructor(x, y, radius, color, velocity, increaseVelocity) {
            super(x, y, radius, color, velocity);
            this.increaseVelocity = increaseVelocity || 1;
        }

        update() {
            this.draw();
            this.x = this.x + this.velocity.x * this.increaseVelocity;
            this.y = this.y + this.velocity.y * this.increaseVelocity;
        }
    }

    const FRICTION = 0.99;
    class Particale extends Enemy {
        constructor(x, y, radius, color, velocity) {
            super(x, y, radius, color, velocity);
            this.baseX = x;
            this.baseY = y;
            this.alpha = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            const { x, y, radius, color } = this;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        }

        smallExplosion = () => {
            return this.baseX < canvas.width / 0.25 &&
            this.baseX > (canvas.width * 0.75) &&
            this.baseY < canvas.height / 0.25 &&
            this.baseY > (canvas.height * 0.75)
        }

        update() {
            this.draw();
            this.velocity.x *= FRICTION;
            this.velocity.y *= FRICTION;
            this.x = this.x + this.velocity.x * 1.1;
            this.y = this.y + this.velocity.y * 1.1;
            /*if (
                this.baseX < canvas.width / 0.25 ||
                this.baseX > (canvas.width * 0.75) ||
                this.baseY < canvas.height / 0.25 ||
                this.baseY > (canvas.height * 0.75)
            ) {
                this.alpha -= 0.02;
            } else {
                this.alpha -= 0.01;
            }*/
            this.alpha -= ({
                true: 0.02,
                false: 0.01
            }[this.smallExplosion()]);
        }
    }

    const playerControls = {
        "arrowup": false,
        "w": false,
        "arrowright": false,
        "d": false,
        "arrowdown": false,
        "s": false,
        "arrowleft": false,
        "a": false,
    }

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const player = new Player(x, y, 10, "white", 5);
    const ENEMYSIZELIMIT = 5;

    let projectiles = [];
    let enemies = [];
    let particales = [];

    let enemiesMoving;
    const spawnEnemies = () => {
        enemiesMoving = setInterval(() => {
            if (enemies.length > 10) {
                enemies.forEach((enemy, index) => {
                    if (outOfTheCanvasByNumber(enemy, 0)) {
                        enemies.splice(index, 1)
                    }
                });
                return;
            }
            let x, y;
            let radius = (Math.random() * (30 - (ENEMYSIZELIMIT))) + (ENEMYSIZELIMIT * 2);

            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;// `#${Math.random().toString(16).substr(-6)}`;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
                y = Math.random() * canvas.height;
            } else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
            }
            const angle = Math.atan2(
                player.y - y,
                player.x - x,
            )
        
            let randomNumber = Math.random();
            let velocity;
            if (randomNumber < 0.40) {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                }
            } else if (randomNumber >= 0.40 && randomNumber < 0.6) {
                velocity = {
                    x: Math.cos(angle) + (Math.random() * 2),
                    y: Math.sin(angle)
                }
            } else if (randomNumber >= 0.6 && randomNumber < 0.8) {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle) + (Math.random() * 2)
                }
            } else if (randomNumber > 0.8) {
                velocity = {
                    x: Math.cos(angle) + (Math.random() * 2),
                    y: Math.sin(angle) + (Math.random() * 2)
                }
            }
                    
            enemies.push(
                new Enemy(
                    x,
                    y,
                    radius,
                    color,
                    velocity,
                    (Math.random() * 2) + 1
                )
            );
        }, 500);
    }

    let animationId;
    let score = 0;

    /*
    let backgroundCorrection = false;
    setInterval(() => {
        backgroundCorrection = true
        setTimeout(() => backgroundCorrection = false, 50);
    }, 60000);

        ctx.fillStyle = ({
            true: "rgba(0, 0, 0)",
            false: "rgba(0, 0, 0, 0.1)"
        }[backgroundCorrection]);
    */
    let backgroundsCorrectionList = [
        {
            color: () => "rgba(0, 0, 0)",
            duration: 1000,
        },
        {
            color: `rgba(0, 0, 0, ${Math.random()})`,
            duration: 10000,
        },
        {
            color: () => "rgba(0, 0, 0, 0.5)",
            duration: 30000,
        },
        {
            color: () => "rgba(0, 0, 0, 0.1)",
            duration: 15000,
        },
        {
            color: `rgba(0, 0, 0, 0.0${Math.floor(Math.random() * 10) + 1})`,
            duration: 10000,
        },
        {
            color: () => "rgba(0, 0, 0, 0.05)",
            duration: 10000,
        },
        {
            color: () => "rgba(0, 0, 0, 0.01)",
            duration: 10000,
        },
        {
            color: `rgba(0, 0, 0, 0.00${Math.floor(Math.random() * 10) + 1})`,
            duration: 10000,
        },
        {
            color: () => "rgba(0, 0, 0, 0.005)",
            duration: 5000,
        },
        {
            color: () => "rgba(0, 0, 0, 0.001)",
            duration: 5000,
        },
    ]

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";//;`rgba(0, 0, 0, ${Math.random()})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        player.update();

        if (projectiles.length !== 0) {
            projectiles.forEach((projectile, index) => {
                projectile.update()
                if(outOfTheCanvasByNumber(projectile, 0)) {
                    // To prevent enemies from flashing when been hit by waiting for the next frame to remove it
                    setTimeout(() => {
                        projectiles.splice(index, 1);
                    }, 0);            
                }
            });
        }

        if (particales.length !== 0) {
            particales.forEach((particale, index) => {
                particale.update();
                if (particale.alpha <= 0) {
                    particales.splice(index, 1);
                }
            })
        }
        
        enemies.forEach((enemy, index) => {
            if (outOfTheCanvasByNumber(enemy, enemy.radius * 2)) {
                setTimeout(() => {
                    enemies.splice(index, 1);                
                }, 0);
                return;
            }
            if (enemy.radius - ENEMYSIZELIMIT * 2 < ENEMYSIZELIMIT) {
                setTimeout(() => {
                    enemies.splice(index, 1);

                    // Increase score
                    scoreIncrease(25); 
                }, 0);           
            }
            
            enemy.update();
            const dist = Math.hypot(
                player.x - enemy.x,
                player.y - enemy.y
            );
            
            if(dist - enemy.radius - player.radius < 0) {
                gameOver();
            }
            projectiles.forEach((projectile, projectileIndex) => {
                const dist = Math.hypot(
                    projectile.x - enemy.x,
                    projectile.y - enemy.y
                );
                // When projectile touches an enemy
                if (dist - enemy.radius - projectile.radius <= 0) {
                    // To prevent enemies from flashing when been hit 
                    // by waiting for the next frame to remove it 
                    // use sitTimeout(() => {}, 0);

                    // Increase score
                    scoreIncrease(100);

                    // Create explosions
                    
                    particalesExplosion(enemy.radius * 1.5, projectile.x, projectile.y, enemy.color);

                    if (enemy.radius - ENEMYSIZELIMIT * 2 < ENEMYSIZELIMIT) {
                        setTimeout(() => {
                            enemies.splice(index, 1);
                            projectiles.splice(projectileIndex, 1);

                            particalesExplosion(enemy.radius * 1.5, enemy.x, enemy.y, enemy.color);
                            // Increase score
                            scoreIncrease(250);
                        }, 0);
                        return;
                    } else {
                        gsap.to(enemy, {
                            radius: enemy.radius - ((Math.random() * 10) + 5)
                        })
                        setTimeout(() => {
                            projectiles.splice(projectileIndex, 1);

                            // Increase score
                            scoreIncrease(50);
                        }, 0);
                        return;
                    }
                }
            });
        });
    }

    const particalesExplosion = (iterateNumber, x, y, color) => {
        for (let i = 0; i < iterateNumber; i++) {
            particales.push(
                new Particale(
                    x,
                    y,
                    Math.random() * 2,
                    color,
                    {
                        x: (Math.random() - 0.5) * (Math.random() * 6),
                        y: (Math.random() - 0.5) * (Math.random() * 6),
                    }
                )
            );
        }

    }

    const outOfTheCanvasByNumber = (obj, number) => {
        return (
            obj.x - obj.radius < 0 - number ||
            obj.x - obj.radius > canvas.width + number ||
            obj.y - obj.radius < 0 - number ||
            obj.y - obj.radius > canvas.height + number
        )
    }

    const scoreIncrease = (number) => {
        score += number;
        scorePoint.forEach(scorePallete => scorePallete.innerText = score);
    }

    canvas.addEventListener("click", playerShootFire);

    function playerShootFire(event) {
        const angle = Math.atan2(
            event.clientY - (player.y),
            event.clientX - (player.x),
        )
        const radius = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        projectiles.push(
            new Projectile(
                player.x,
                player.y,
                5,
                "white",
                radius
            )
        );
    }

    document.addEventListener("keydown", pressOn);
    document.addEventListener("keyup", pressOff);

    function pressOn(event) {
        // event.preventDefault();
        if (event.key.toLowerCase() === "p") {
            pauseGame();            
        }
        playerControls[event.key.toLowerCase()] = true;
    }

    function pressOff(event) {
        // event.preventDefault();
        playerControls[event.key.toLowerCase()] = false;
    }

    restartBtn.addEventListener("click", () => {
        reset();
        animate();
        spawnEnemies();
    });
    resumeBtn.addEventListener("click", () => {
        statsBoard.classList.add("isHidden");
        startBtn.classList.add("isHidden");
        animate();
        spawnEnemies();
    });
    startBtn.addEventListener("click", () => {
        reset();
        animate();
        spawnEnemies();
        statsBoard.classList.add("isHidden");
        startBtn.classList.add("isHidden");
        resumeBtn.classList.remove("isHidden");
        restartBtn.classList.remove("isHidden");
    });

    const gameOver = () => {
        reset();
        pauseOrGameOverState.innerText = "Game Over :(. || ReStArT :-`)";
        statsBoard.classList.remove("isHidden");
        startBtn.classList.add("isHidden");
        resumeBtn.classList.add("isHidden");
        restartBtn.classList.remove("isHidden");
    }

    const reset = () => {
        pauseOrGameOverState.innerText = "";
        clearInterval(enemiesMoving);
        cancelAnimationFrame(animationId);
        projectiles = [];
        enemies = [];
        particales = [];
        ctx.fillStyle = "rgb(0, 0, 0)";
        player.x = canvas.width / 2;
        player.x = canvas.height / 2;
        statsBoard.classList.add("isHidden");
    }

    const pauseGame = () => {
        pauseOrGameOverState.innerText = "Paused :/";
        statsBoard.classList.remove("isHidden");
        startBtn.classList.add("isHidden");
        resumeBtn.classList.remove("isHidden");
        restartBtn.classList.remove("isHidden");
        clearInterval(enemiesMoving);
        cancelAnimationFrame(animationId);
    }
///});