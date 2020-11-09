class Arena {
    constructor(width, height) {
        this.createMatrix(width, height);
    }

    clear() {
        this.matrix.forEach(row => row.fill(0));
    }
    
    createMatrix(width, height) {
        const matrix = [];
        while (height--) {
            matrix.push(new Array(width).fill(0));
        }
        this.matrix =  matrix;
    }

    collide(player) {
        const [pMatrix, pOffset] = [player.matrix, player.pos];
        for (let y = 0; y < pMatrix.length; ++y) {
            for (let x = 0; x < pMatrix[y].length; ++x) {
                if (
                    (
                        pMatrix[y][x] !== 0 &&
                        this.matrix[y + pOffset.y] === undefined
                    ) ||
                    (
                        pMatrix[y][x] !== 0 &&
                        this.matrix[y + pOffset.y] &&
                        this.matrix[y + pOffset.y][x + pOffset.x] !== 0
                    )/*&&
                    arena[y + pOffset.y][x + pOffset.x] !== 0*/
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    merge(player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    sweep() {
        let rowCount = 1;
        outer: for (let y = this.matrix.length - 1; y > 0; --y) {
            for (let x = 0; x < this.matrix[y].length; ++x) {
                if (this.matrix[y][x] === 0) {
                    continue outer;
                }
            }
            const row = this.matrix.splice(y, 1)[0].fill(0);;
            this.matrix.unshift(row);
            ++y;

            player.score += rowCount * 10;
            rowCount *= 2;
        }
    }
}