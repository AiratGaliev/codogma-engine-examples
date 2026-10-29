// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class AnimationTweenLab extends Phaser.Scene {
    private orbA!: Phaser.GameObjects.Ellipse;
    private orbB!: Phaser.GameObjects.Ellipse;
    private blockC!: Phaser.GameObjects.Rectangle;

    constructor() {
        super("AnimationTweenLab");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // headerPanel
        const headerPanel = this.add.rectangle(480, 64, 912, 82, 0x131f35, 1);
        // headerAccent
        const headerAccent = this.add.rectangle(480, 106, 912, 4, 0xffbd69, 1);
        // title
        const title = this.add.text(64, 45, "ANIMATION / TWEENS", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        title.setOrigin(0, 0.5);
        // subtitle
        const subtitle = this.add.text(64, 81, "Tween lifecycle · easing · repeat/yoyo · camera feedback", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        subtitle.setOrigin(0, 0.5);
        // trackA
        const trackA = this.add.rectangle(480, 224, 760, 3, 0x263953, 1);
        // trackB
        const trackB = this.add.rectangle(480, 360, 760, 3, 0x263953, 1);
        // trackC
        const trackC = this.add.rectangle(480, 496, 760, 3, 0x263953, 1);
        // orbA
        this.orbA = this.add.ellipse(140, 224, 48, 48, 0x34d6cb, 1);
        // orbB
        this.orbB = this.add.ellipse(820, 360, 58, 58, 0x9d8cff, 1);
        // blockC
        this.blockC = this.add.rectangle(140, 496, 54, 54, 0xffbd69, 1);
        // labelA
        const labelA = this.add.text(480, 172, "Sine.inOut  ·  Repeat + Yoyo", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#9bb0cf", align: "center" });
        labelA.setOrigin(0.5, 0.5);
        // labelB
        const labelB = this.add.text(480, 308, "Back.out  ·  Scale pulse", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#9bb0cf", align: "center" });
        labelB.setOrigin(0.5, 0.5);
        // labelC
        const labelC = this.add.text(480, 444, "Linear  ·  Rotation", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#9bb0cf", align: "center" });
        labelC.setOrigin(0.5, 0.5);
        // hintPanel
        const hintPanel = this.add.rectangle(480, 568, 640, 54, 0x142238, 1);
        // hintText
        const hintText = this.add.text(480, 568, "Нажмите на любой движущийся объект для camera shake", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#d5e1f3", align: "center" });
        hintText.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    create(): void {
        this.editorCreate();
        this.tweens.add({
                    targets: this.orbA, x: 820, duration: 1800,
                    yoyo: true, repeat: -1, ease: "Sine.inOut"
                });
                this.tweens.add({
                    targets: this.orbB, scaleX: 1.65, scaleY: 1.65, duration: 900,
                    yoyo: true, repeat: -1, ease: "Back.out"
                });
                this.tweens.add({
                    targets: this.blockC, x: 820, angle: 360, duration: 2600,
                    yoyo: true, repeat: -1, ease: "Linear"
                });
                for (const object of [this.orbA, this.orbB, this.blockC]) {
                    object.setInteractive({ useHandCursor: true });
                    object.on("pointerdown", () => this.cameras.main.shake(160, 0.003));
                }
    }
}
