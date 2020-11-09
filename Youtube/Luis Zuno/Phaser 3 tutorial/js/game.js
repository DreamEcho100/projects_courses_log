document.addEventListener("DOMContentLoaded", () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            perload: preload,
            create: create,
            update: update
        },
        backgroundColor: 0x000000
    }
    const game = new Phaser.Game(config);
});

function preload() {
    
}

function create() {
    
}

function update() {
    
}