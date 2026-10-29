window.addEventListener("load", () => {
    new Phaser.Game({
        type: Phaser.AUTO,
        parent: "game-root",
        width: 960,
        height: 640,
        backgroundColor: "#0b1020",
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        scene: [MenuScene, LevelScene, ResultsScene]
    });
});
