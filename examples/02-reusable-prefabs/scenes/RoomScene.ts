// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

/* START OF COMPILED CODE */

class RoomScene extends Phaser.Scene {


    constructor() {
        super("RoomScene");

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // headerPanel
        const headerPanel = this.add.rectangle(480, 65, 912, 82, 0x131f35, 1);
        // headerAccent
        const headerAccent = this.add.rectangle(480, 108, 912, 4, 0x9d8cff, 1);
        // title
        const title = this.add.text(65, 48, "REUSABLE PREFABS", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        title.setOrigin(0, 0.5);
        // subtitle
        const subtitle = this.add.text(65, 80, "Одна структура · три экземпляра · собственное свойство Tone", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        subtitle.setOrigin(0, 0.5);
        // portalA
        const portalA = new PortalPrefab(this, 180, 296);
        portalA.tone = "cyan";
        this.add.existing(portalA);
        this.portalA = portalA;
        // portalB
        const portalB = new PortalPrefab(this, 480, 296);
        portalB.tone = "violet";
        this.add.existing(portalB);
        this.portalB = portalB;
        // portalC
        const portalC = new PortalPrefab(this, 780, 296);
        portalC.tone = "amber";
        this.add.existing(portalC);
        this.portalC = portalC;
        // portalALabel
        const portalALabel = this.add.text(180, 379, "CYAN  /  INSTANCE 01", { fontFamily: "Arial", fontSize: "15px", fontStyle: "bold", color: "#e8efff", align: "center" });
        portalALabel.setOrigin(0.5, 0.5);
        // portalBLabel
        const portalBLabel = this.add.text(480, 379, "VIOLET  /  INSTANCE 02", { fontFamily: "Arial", fontSize: "15px", fontStyle: "bold", color: "#e8efff", align: "center" });
        portalBLabel.setOrigin(0.5, 0.5);
        // portalCLabel
        const portalCLabel = this.add.text(780, 379, "AMBER  /  INSTANCE 03", { fontFamily: "Arial", fontSize: "15px", fontStyle: "bold", color: "#e8efff", align: "center" });
        portalCLabel.setOrigin(0.5, 0.5);
        // statusPanel
        const statusPanel = this.add.rectangle(480, 496, 640, 58, 0x142238, 1);
        // statusText
        const statusText = this.statusText = this.add.text(480, 496, "Нажмите на портал, чтобы изменить его состояние", { fontFamily: "Arial", fontSize: "16px", fontStyle: "normal", color: "#91a4c2", align: "center" });
        statusText.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    private portalA!: PortalPrefab;
    private portalB!: PortalPrefab;
    private portalC!: PortalPrefab;
    private statusText!: Phaser.GameObjects.Text;

    /* START-USER-CODE */

    create(): void {
        this.editorCreate();
        const portals = [this.portalA, this.portalB, this.portalC];
                const nextTone: Record<string, string> = { cyan: "violet", violet: "amber", amber: "cyan" };
                portals.forEach((portal, index) => {
                    // У Container задаём размер, чтобы hit area не был нулевым.
                    portal.setSize(220, 154);
                    portal.setInteractive(
                        new Phaser.Geom.Rectangle(-110, -77, 220, 154),
                        Phaser.Geom.Rectangle.Contains,
                        { useHandCursor: true }
                    );
                    portal.on("pointerdown", () => {
                        portal.tone = nextTone[portal.tone] ?? "cyan";
                        this.statusText.setText(`Портал ${index + 1}: ${portal.tone}`);
                    });
                });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
