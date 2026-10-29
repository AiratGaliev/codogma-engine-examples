// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class LevelScene extends Phaser.Scene {
    private targetA!: Phaser.GameObjects.Ellipse;
    private targetB!: Phaser.GameObjects.Ellipse;
    private targetC!: Phaser.GameObjects.Ellipse;
    private scoreText!: Phaser.GameObjects.Text;
    private targetA!: Phaser.GameObjects.Ellipse;
    private targetB!: Phaser.GameObjects.Ellipse;
    private targetC!: Phaser.GameObjects.Ellipse;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super("LevelScene");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // topPanel
        const topPanel = this.add.rectangle(480, 62, 912, 72, 0x131f35, 1);
        // levelTitle
        const levelTitle = this.add.text(44, 62, "TINY QUEST / УРОВЕНЬ", { fontFamily: "Arial", fontSize: "22px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        levelTitle.setOrigin(0, 0.5);
        // levelHint
        const levelHint = this.add.text(480, 148, "Нажмите на три цели, чтобы завершить уровень", { fontFamily: "Arial", fontSize: "17px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        levelHint.setOrigin(0.5, 0.5);
        // targetA
        this.targetA = this.add.ellipse(255, 306, 100, 100, 0x34d6cb, 1);
        // targetB
        this.targetB = this.add.ellipse(480, 306, 100, 100, 0x9d8cff, 1);
        // targetC
        this.targetC = this.add.ellipse(705, 306, 100, 100, 0xffbd69, 1);
        // targetAInner
        const targetAInner = this.add.ellipse(255, 306, 38, 38, 0x0b1020, 1);
        // targetBInner
        const targetBInner = this.add.ellipse(480, 306, 38, 38, 0x0b1020, 1);
        // targetCInner
        const targetCInner = this.add.ellipse(705, 306, 38, 38, 0x0b1020, 1);
        // scoreText
        const scoreText = this.add.text(480, 452, "Цели: 0 / 3", { fontFamily: "Arial", fontSize: "22px", fontStyle: "bold", color: "#f4f7ff", align: "center" });
        scoreText.setOrigin(0.5, 0.5);
        this.scoreText = scoreText;
        // levelFooter
        const levelFooter = this.add.text(480, 510, "Данные счёта передаются в ResultsScene", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        levelFooter.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    create(): void {
        this.editorCreate();
        const targets = [this.targetA, this.targetB, this.targetC];
                let score = 0;
                targets.forEach((target) => {
                    target.setInteractive({ useHandCursor: true });
                    target.on("pointerdown", () => {
                        if (!target.active) return;
                        target.disableInteractive();
                        target.setScale(0.72);
                        target.setAlpha(0.45);
                        score += 1;
                        this.scoreText.setText(`Цели: ${score} / 3`);
                        if (score === targets.length) this.scene.start("ResultsScene", { score });
                    });
                });
    }
}
