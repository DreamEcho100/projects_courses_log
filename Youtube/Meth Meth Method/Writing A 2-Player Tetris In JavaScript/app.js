/// document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("tetris");
    const scoreBoard = document.getElementById("tetris-score-board");
    const scoreHolder = scoreBoard.querySelector("span");
    const ctx = canvas.getContext("2d");

    ctx.scale(20, 20);

    function arenaSweep() {
        let rowCount = 1;
        outer: for (let y = arena.length - 1; y > 0; --y) {
            for (let x = 0; x < arena[y].length; ++x) {
                if (arena[y][x] === 0) {
                    continue outer;
                }
            }
            const row = arena.splice(y, 1)[0].fill(0);;
            arena.unshift(row);
            ++y;

            player.score += rowCount * 10;
            rowCount *= 2;
        }
    }

    function collide(arena, player) {
        const [pMatrix, pOffset] = [player.matrix, player.pos];
        for (let y = 0; y < pMatrix.length; ++y) {
            for (let x = 0; x < pMatrix[y].length; ++x) {
                if (
                    (
                        pMatrix[y][x] !== 0 &&
                        arena[y + pOffset.y] === undefined
                    ) ||
                    (
                        pMatrix[y][x] !== 0 &&
                        arena[y + pOffset.y] &&
                        arena[y + pOffset.y][x + pOffset.x] !== 0
                    )/*&&
                    arena[y + pOffset.y][x + pOffset.x] !== 0*/
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    function drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = colors[value];
                    ctx.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    );
                }
            });
        });
    }

    const arena = createMatrix(12, 20);
    const player = new Player;


    function createMatrix(width, height) {
        const matrix = [];
        while (height--) {
            matrix.push(new Array(width).fill(0));
        }
        return matrix;
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    function createPiece(type) {
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

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawMatrix(arena, {x: 0, y: 0});
        drawMatrix(player.matrix, player.pos);
    }

    let lastTime = 0;
    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;

        player.update(deltaTime);

        draw();
        requestAnimationFrame(update);
    }

    function updateScore() {
        scoreHolder.innerText = player.score;
    }

    const colors = [
        null,
        "#FF0D72",
        "#0DC2FF",
        "#0DFF72",
        "#F538FF",
        "#FF8E0D",
        "#FFE138",
        "#3877FF"
    ]

    document.addEventListener("keydown", event => {
        if (event.keyCode === 37) {  // arrowleft
            player.move(-1);
        } else if (event.keyCode === 39) {  // arrowright
            player.move(1);
        } else if (event.keyCode === 40) {  // arrowdown
            player.drop();
        } else if (event.keyCode === 81) {  // q
            player.rotate(-1);
        } else if (event.keyCode === 87 || event.keyCode === 38) {  // w || updown
            player.rotate(1);
        }
    });

    player.reset();
    updateScore();
    update();
/// });