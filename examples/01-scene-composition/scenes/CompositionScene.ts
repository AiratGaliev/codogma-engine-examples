// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class CompositionScene extends Phaser.Scene {
    private mainOrb!: Phaser.GameObjects.Ellipse;
    private smallCard!: Phaser.GameObjects.Rectangle;


    constructor() {
        super("CompositionScene");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // headerPanel
        const headerPanel = this.add.rectangle(480, 62, 912, 76, 0x131f35, 1);
        // headerAccent
        const headerAccent = this.add.rectangle(480, 103, 912, 4, 0x34d6cb, 1);
        // brand
        const brand = this.add.text(74, 51, "CODOGMA  /  SCENE COMPOSITION", { fontFamily: "Arial", fontSize: "27px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        brand.setOrigin(0, 0.5);
        // subtitle
        const subtitle = this.add.text(74, 78, "Редактируемая композиция · Hierarchy · Inspector", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        subtitle.setOrigin(0, 0.5);
        // leftPanel
        const leftPanel = this.add.rectangle(254, 342, 344, 404, 0x111d32, 1);
        // rightPanel
        const rightPanel = this.add.rectangle(672, 342, 424, 404, 0x111d32, 1);
        // panelTitle
        const panelTitle = this.add.text(108, 190, "ОБЪЕКТЫ СЦЕНЫ", { fontFamily: "Arial", fontSize: "17px", fontStyle: "bold", color: "#e8efff", align: "left" });
        panelTitle.setOrigin(0, 0.5);
        // mainOrb
        this.mainOrb = this.add.ellipse(235, 278, 128, 128, 0x34d6cb, 1);
        // orbCore
        const orbCore = this.add.ellipse(235, 278, 54, 54, 0x0b1020, 1);
        // smallCard
        this.smallCard = this.add.rectangle(382, 260, 72, 72, 0x8b7cff, 1);
        // wideCard
        const wideCard = this.add.rectangle(354, 362, 128, 24, 0xffbd69, 1);
        // smallOrbA
        const smallOrbA = this.add.ellipse(153, 438, 24, 24, 0xffbd69, 1);
        // smallOrbB
        const smallOrbB = this.add.ellipse(196, 438, 24, 24, 0x8b7cff, 1);
        // smallOrbC
        const smallOrbC = this.add.ellipse(239, 438, 24, 24, 0x34d6cb, 1);
        // leftCaption
        const leftCaption = this.add.text(108, 504, "Drag · Resize · Inspect", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        leftCaption.setOrigin(0, 0.5);
        // rightTitle
        const rightTitle = this.add.text(474, 190, "СЛОИ И ТИПОГРАФИКА", { fontFamily: "Arial", fontSize: "17px", fontStyle: "bold", color: "#e8efff", align: "left" });
        rightTitle.setOrigin(0, 0.5);
        // layerCardBack
        const layerCardBack = this.add.rectangle(673, 278, 292, 140, 0x22324b, 1);
        // layerCardFront
        const layerCardFront = this.add.rectangle(704, 303, 228, 92, 0x1b2a42, 1);
        // layerAccent
        const layerAccent = this.add.rectangle(704, 265, 228, 5, 0x34d6cb, 1);
        // layerTitle
        const layerTitle = this.add.text(704, 295, "Scene layer", { fontFamily: "Arial", fontSize: "20px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        layerTitle.setOrigin(0, 0.5);
        // layerDescription
        const layerDescription = this.add.text(704, 325, "Объекты остаются в .scene", { fontFamily: "Arial", fontSize: "14px", fontStyle: "normal", color: "#a8bad4", align: "left" });
        layerDescription.setOrigin(0, 0.5);
        // footerNote
        const footerNote = this.add.text(704, 431, "Без внешних изображений и шрифтов", { fontFamily: "Arial", fontSize: "13px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        footerNote.setOrigin(0, 0.5);
        // statusLabel
        const statusLabel = this.add.text(480, 574, "Оригинальная сцена · Phaser 4.2.1", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        statusLabel.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    create(): void {
        this.editorCreate();
        this.mainOrb.setInteractive({ useHandCursor: true });
                this.mainOrb.on("pointerdown", () => {
                    this.mainOrb.setFillStyle(this.mainOrb.fillColor === 0x34d6cb ? 0xffbd69 : 0x34d6cb);
                    this.cameras.main.flash(90, 20, 38, 62, false);
                });
                this.smallCard.setInteractive({ useHandCursor: true });
                this.smallCard.on("pointerdown", () => {
                    this.smallCard.setAngle(this.smallCard.angle + 45);
                });
    }
}
