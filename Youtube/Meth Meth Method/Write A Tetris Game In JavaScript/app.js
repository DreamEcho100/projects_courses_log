/// document.addEventListener("DOMContentLoaded", () => {
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

ctx.scale(20, 20);

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
const player = {
    pos: {x: 5, y: 5},
    matrix: createPiece("T")
}

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

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
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
        playerMove(-1);
    } else if (event.keyCode === 39) {  // arrowright
        playerMove(1);
    } else if (event.keyCode === 40) {  // arrowdown
        playerDrop();
    } else if (event.keyCode === 81) {  // q
        playerRotate(-1);
    } else if (event.keyCode === 87 || event.keyCode === 38) {  // w || updown
        playerRotate(1);
    }
});

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;        
    }
}

function playerReset() {
    const pieces = "TOLJISZ";
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        // If it rotates on the left wall offset < 0
        offset = -(offset + (offset > 0 ? 1 : -1));
        // If it rotates on the right wall offset > (canvas.width || player.matrix[0].length)
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            return;
        }

    }
}

function rotate(matrix, dir) {
    // Transpose + Reverse = Rotate
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            // Transpose = Turning rows to columns
            // 1 2 3       | 1   2   3                                     
            // 4 5 6       |    *  /      1 4 7     5   6           ------ 1 4 7        
            // 7 8 9       | 4    *    => 2       +   /    => 5 8   ------ 2 5 8                         
            //             |    /         3         8   9     6 9          3 6 9
            //             | 5                                   
            //             |                                    
            // Think of y = 1 and x = 0 and try to apply the logic
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ]
        }
    }
    // Reverse
    if (dir > 0) {
        // 1 4 7       | 7 4 1                        
        // 2 5 8       | 8 5 2                        
        // 3 6 9       | 9 6 3                              
        matrix.forEach(row => row.reverse());
    } else {
        // 1 4 7       | 1 2 3                      
        // 2 5 8       | 4 5 6                      
        // 3 6 9       | 7 8 9                          
        matrix.reverse();
    }
}

function playerDrop() {
    player.pos.y++;
    if(collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
    }
    dropCounter = 0;
}

update();
/// });