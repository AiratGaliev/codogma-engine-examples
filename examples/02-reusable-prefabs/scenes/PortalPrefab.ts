// Содержимое Prefab описано в PortalPrefab.scene; здесь находится пользовательское поведение.

class PortalPrefab extends Phaser.GameObjects.Container {
    private portalBody!: Phaser.GameObjects.Rectangle;
    private portalTop!: Phaser.GameObjects.Rectangle;
    private portalCore!: Phaser.GameObjects.Ellipse;
    private portalCaption!: Phaser.GameObjects.Text;
    private _tone = "cyan";

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // portalBody
        this.portalBody = scene.add.rectangle(0, 0, 220, 154, 0x20334e, 1);
        this.add(this.portalBody);

        // portalTop
        this.portalTop = scene.add.rectangle(0, -72, 220, 6, 0x34d6cb, 1);
        this.add(this.portalTop);

        // portalCore
        this.portalCore = scene.add.ellipse(0, -12, 52, 52, 0x142238, 1);
        this.add(this.portalCore);

        // portalCaption
        this.portalCaption = scene.add.text(0, 45, "REUSABLE PREFAB", {
            fontFamily: "Arial",
            fontSize: "13px",
            fontStyle: "bold",
            color: "#e8efff",
            align: "center"
        });
        this.portalCaption.setOrigin(0.5, 0.5);
        this.add(this.portalCaption);

        /* START-USER-CTR-CODE */
        // Пользовательский код конструктора.
        /* END-USER-CTR-CODE */

        // custom definition props
        this.tone = "cyan";
    }

    get tone(): string {
        return this._tone;
    }

    /* START-USER-CODE */

    set tone(value: string) {
        this._tone = value;
        const colors: Record<string, number> = {
            cyan: 0x34d6cb,
            violet: 0x9d8cff,
            amber: 0xffbd69
        };
        const color = colors[value] ?? colors.cyan;
        this.portalTop.setFillStyle(color);
        this.portalCore.setFillStyle(color);
    }

    /* END-USER-CODE */
}
