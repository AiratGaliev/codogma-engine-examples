window.addEventListener("load", () => {
    new Phaser.Game({
        type: Phaser.AUTO,
        parent: "game-root",
        width: 960,
        height: 640,
        backgroundColor: "#091322",
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        physics: { default: "arcade", arcade: { gravity: { x: 0, y: 920 }, debug: false } },
        scene: [PlatformerLevel]
    });
});
