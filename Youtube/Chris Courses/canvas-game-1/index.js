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
const player = new Player(x, y, 30, "blue");

const projectiles = [];
const enemies = [];

const spawnEnemies = () => {
    setInterval(() => {
        let x, y;
        const radius = (Math.random() * (30 - 10)) + 10;
        const color = `#${Math.random().toString(16).substr(-6)}`;
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
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
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

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

    projectiles.forEach(projectile => {
        projectile.update();
    });
    enemies.forEach(enemie => {
        enemie.update();
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", (event) => {
    const angle = Math.atan2(
        event.clientY - (canvas.height / 2),
        event.clientX - (canvas.width / 2),
    )
    const radius = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(
            player.x,
            player.y,
            5,
            "red",
            radius
        )
    );
});

animate();
spawnEnemies();