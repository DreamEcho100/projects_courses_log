class Player  {
    constructor() {

        this.dropCounter = 0;
        this.dropInterval = 1000;

        this.pos = {x: 0, y: 0},
        this.matrix = null,
        this.score = 0
    }

    drop() {
        this.pos.y++;
        if(collide(arena, this)) {
            this.pos.y--;
            merge(arena, this);
            this.reset();
            arenaSweep();
            updateScore();
        }
        this.dropCounter = 0;
    }

    move(dir) {
        this.pos.x += dir;
        if (collide(arena, this)) {
            this.pos.x -= dir;        
        }
    }

    reset() {
        const pieces = "TOLJISZ";
        this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (arena[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);
        if (collide(arena, this)) {
            arena.forEach(row => row.fill(0));
            this.score = 0;
            updateScore();
        }
    }

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        this._RotateMatrix(this.matrix, dir);
        while (collide(arena, this)) {
            this.pos.x += offset;
            // If it rotates on the left wall offset < 0
            offset = -(offset + (offset > 0 ? 1 : -1));
            // If it rotates on the right wall offset > (canvas.width || this.matrix[0].length)
            if (offset > this.matrix[0].length) {
                this._RotateMatrix(this.matrix, -dir);
                return;
            }

        }
    }

    _RotateMatrix(matrix, dir) {
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

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }
}