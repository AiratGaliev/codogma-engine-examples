// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class ResultsScene extends Phaser.Scene {
    private scoreResult!: Phaser.GameObjects.Text;
    private restartButton!: Phaser.GameObjects.Rectangle;
    private finalScore = 0;

    constructor() {
        super("ResultsScene");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // resultsPanel
        const resultsPanel = this.add.rectangle(480, 320, 620, 400, 0x131f35, 1);
        // resultsAccent
        const resultsAccent = this.add.rectangle(480, 166, 620, 5, 0xffbd69, 1);
        // resultsTitle
        const resultsTitle = this.add.text(480, 234, "УРОВЕНЬ ПРОЙДЕН", { fontFamily: "Arial", fontSize: "34px", fontStyle: "bold", color: "#f4f7ff", align: "center" });
        resultsTitle.setOrigin(0.5, 0.5);
        // scoreResult
        const scoreResult = this.add.text(480, 300, "Счёт: 0", { fontFamily: "Arial", fontSize: "25px", fontStyle: "bold", color: "#ffdf91", align: "center" });
        scoreResult.setOrigin(0.5, 0.5);
        this.scoreResult = scoreResult;
        // restartButton
        this.restartButton = this.add.rectangle(480, 382, 310, 70, 0xffbd69, 1);
        // restartLabel
        const restartLabel = this.add.text(480, 382, "ВЕРНУТЬСЯ В МЕНЮ", { fontFamily: "Arial", fontSize: "18px", fontStyle: "bold", color: "#0b1020", align: "center" });
        restartLabel.setOrigin(0.5, 0.5);
        // resultsFooter
        const resultsFooter = this.add.text(480, 453, "Перезапуск создаёт новый игровой цикл", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        resultsFooter.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    init(data: { score?: number }): void {
            this.finalScore = data.score ?? 0;
        }

    create(): void {
        this.editorCreate();
        this.scoreResult.setText(`Счёт: ${this.finalScore} / 3`);
                this.restartButton.setInteractive({ useHandCursor: true });
                this.restartButton.on("pointerover", () => this.restartButton.setFillStyle(0xffd28f));
                this.restartButton.on("pointerout", () => this.restartButton.setFillStyle(0xffbd69));
                this.restartButton.on("pointerdown", () => this.scene.start("MenuScene"));
    }
}
