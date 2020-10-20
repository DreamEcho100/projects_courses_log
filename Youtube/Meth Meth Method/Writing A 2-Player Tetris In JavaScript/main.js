/// document.addEventListener("DOMContentLoaded", () => {
    


    //

    /*function updateScore() {
        scoreHolder.innerText = player.score;
    }



    updateScore();*/
/// });
const playerElements = Array.from(document.querySelectorAll('.player'));

const tetri = [];

playerElements.forEach(element => {
    const canvas = element.querySelector(".tetris");
    const scoreBoard = element.querySelector(".tetris-score-board");
    const scoreHolder = scoreBoard.querySelector("span");
    const tetris = new Tetris(canvas, scoreHolder);
    
    tetri.push(tetris);

    console.log(element);
});

document.addEventListener("keydown", event => {
    [
        [65, 68, 81, 69, 83], // a, d, q, e, s
        [72, 75, 89, 73, 74] // h, k, y, i, j
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === "keydown") {
            if (event.keyCode === key[0]) {  // left a, h
                player.move(-1);
            } else if (event.keyCode === key[1]) {  // right d, k
                player.move(1);
            } else if (event.keyCode === key[2]) {  // q, y
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {  // e, i
                player.rotate(1);
            }
        }
        if (event.keyCode === key[4]) {  // down s, j
            player.drop();
        }
    });
});

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