class Tetris {
    constructor(element) {
        this.element = element;
        this.canvas = this.element.querySelector(".tetris");
        this.scoreBoard = this.element.querySelector(".tetris-score-board");
        this.scoreHolder = this.scoreBoard.querySelector("span");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(20, 20);

        this.arena = new Arena(12, 20);
        this.player = new Player(this);

        this.colors = [
            null,
            "#FF0D72",
            "#0DC2FF",
            "#0DFF72",
            "#F538FF",
            "#FF8E0D",
            "#FFE138",
            "#3877FF"
        ]

        let lastTime = 0;
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;
    
            this.player.update(deltaTime);
    
            this.draw();
            requestAnimationFrame(update);
        }
        
        this.updateScore(this.player.score);
        update();
    }

    draw() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.ctx.fillStyle = this.colors[value];
                    this.ctx.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    );
                }
            });
        });
    }
    
    updateScore(score) {
        this.scoreHolder.innerText = score;
    }
}