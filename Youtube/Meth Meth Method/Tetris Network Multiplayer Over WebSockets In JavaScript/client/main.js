const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
const connectionManager = new ConnectionManager();
connectionManager.connect("ws://localhost:9000");

const keyListeners = (event) => {
    [
        [65, 68, 81, 69, 83], // a, d, q, e, s
        [72, 75, 89, 73, 74] // h, k, y, i, j
    ].forEach((key, index) => {
        const player = localTetris.player;
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
            if (event.type === "keydown") {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                } else {
                    player.dropInterval = player.DROP_SLOW;
                }
            }
        }
    });
}

document.addEventListener("keydown", keyListeners);