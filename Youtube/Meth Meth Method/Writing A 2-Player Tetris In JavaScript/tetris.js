class Tetris {
    constructor(element) {
        this.canvas = element.querySelector(".tetris");
        this.scoreBoard = element.querySelector(".tetris-score-board");
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

    createPiece(type) {
        if (type === "T") {
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        } else if (type === "O") {        
            return [
                [2, 2],
                [2, 2],
            ];
        } else if (type === "L") {        
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3]
            ];
        } else if (type === "J") {        
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0]
            ];
        } else if (type === "I") {        
            return [
                [0, 0, 5, 0, 0],
                [0, 0, 5, 0, 0],
                [0, 0, 5, 0, 0],
                [0, 0, 5, 0, 0],
                [0, 0, 5, 0, 0]
            ];
        } else if (type === "S") {        
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0]
            ];
        } else if (type === "Z") {        
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0]
            ];
        }
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