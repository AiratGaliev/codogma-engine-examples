// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class MenuScene extends Phaser.Scene {
    private startButton!: Phaser.GameObjects.Rectangle;
    private startButton!: Phaser.GameObjects.Rectangle;

    constructor() {
        super("MenuScene");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // menuPanel
        const menuPanel = this.add.rectangle(480, 320, 620, 400, 0x131f35, 1);
        // menuAccent
        const menuAccent = this.add.rectangle(480, 166, 620, 5, 0x34d6cb, 1);
        // gameTitle
        const gameTitle = this.add.text(480, 232, "TINY QUEST", { fontFamily: "Arial", fontSize: "42px", fontStyle: "bold", color: "#f4f7ff", align: "center" });
        gameTitle.setOrigin(0.5, 0.5);
        // gameSubtitle
        const gameSubtitle = this.add.text(480, 278, "Демонстрация переходов между сценами", { fontFamily: "Arial", fontSize: "17px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        gameSubtitle.setOrigin(0.5, 0.5);
        // startButton
        this.startButton = this.add.rectangle(480, 372, 270, 72, 0x34d6cb, 1);
        // startButtonLabel
        const startButtonLabel = this.add.text(480, 372, "НАЧАТЬ ИГРУ", { fontFamily: "Arial", fontSize: "20px", fontStyle: "bold", color: "#0b1020", align: "center" });
        startButtonLabel.setOrigin(0.5, 0.5);
        // menuFooter
        const menuFooter = this.add.text(480, 456, "Menu  →  Level  →  Results", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        menuFooter.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    create(): void {
        this.editorCreate();
        this.startButton.setInteractive({ useHandCursor: true });
                this.startButton.on("pointerover", () => this.startButton.setFillStyle(0x68eee3));
                this.startButton.on("pointerout", () => this.startButton.setFillStyle(0x34d6cb));
                this.startButton.on("pointerdown", () => this.scene.start("LevelScene"));
    }
}
