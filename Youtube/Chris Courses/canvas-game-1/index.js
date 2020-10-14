const canvas = document.querySelector("canvas");
canvas.width = innerWidth;/*document.body.getBoundingClientRect().width;*/
canvas.height = innerHeight;/*document.body.getBoundingClientRect().height;*/

const ctx = canvas.getContext("2d");

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        const { x, y, radius, color } = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
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
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color, velocity);
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 10, "white");

const projectiles = [];
const enemies = [];

const spawnEnemies = () => {
    setInterval(() => {
        let x, y;
        const radius = (Math.random() * (30 - 10)) + 10;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;// `#${Math.random().toString(16).substr(-6)}`;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const angle = Math.atan2(
            /*(canvas.height / 2)*/player.y - y,
            /*(canvas.width / 2)*/player.x - x,
        )
        /*
        const velocity = {
            x: Math.cos(angle) * (Math.floor(Math.random() * 3) + 1),
            y: Math.sin(angle) * (Math.floor(Math.random() * 3) + 1)
        }
        */
       
        const randomNum = Math.floor(Math.random() * 3) + 1;
        const velocity = {
            x: Math.cos(angle) * randomNum,
            y: Math.sin(angle) * randomNum
        }
        enemies.push(
            new Enemy(
                x,
                y,
                radius,
                color,
                velocity
            )
        );
    }, 1000);
}

let animationId;

const animate = () => {
    animationId = requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();

    if (projectiles.length !== 0) {
        projectiles.forEach((projectile, index) => {
            projectile.update();
            if(
                projectile.x - projectile.radius < 0 ||
                projectile.x - projectile.radius > canvas.width ||
                projectile.y - projectile.radius < 0 ||
                projectile.y - projectile.radius > canvas.height
            ) {
                // To prevent enemies from flashing when been hit by waiting for the next frame to remove it
                setTimeout(() => {
                    projectiles.splice(index, 1);
                    // ctx.fillStyle = "rgba(0, 0, 0)";
                }, 0);            
            }
        });
    }
    enemies.forEach((enemy, index) => {
        enemy.update();
        const dist = Math.hypot(
            player.x - enemy.x,
            player.y - enemy.y
        );
        
        if(dist - enemy.radius - player.radius < 0) {
            cancelAnimationFrame(animationId);
        }
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
            );
            // When projectile touches an enemy
            if (dist - enemy.radius - projectile.radius <= 0) {
                // To prevent enemies from flashing when been hit by waiting for the next frame to remove it
                if (enemy.radius - 10 > 10) {
                    enemy.radius -= 10;
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                } else {
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                }
            }
        });
    });
}

canvas.addEventListener("click", (event) => {
    const angle = Math.atan2(
        event.clientY - (canvas.height / 2),
        event.clientX - (canvas.width / 2),
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
});

animate();
spawnEnemies();