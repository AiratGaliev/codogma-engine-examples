// Пользовательский Prefab: визуальная форма описана в PortalPrefab.scene.
class PortalPrefab extends Phaser.GameObjects.Container {
    private _tone = "cyan";
    private portalTop!: Phaser.GameObjects.Rectangle;
    private portalBody!: Phaser.GameObjects.Rectangle;
    private portalCore!: Phaser.GameObjects.Ellipse;
    private portalCaption!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x = 0, y = 0) {
        super(scene, x, y);
        this.portalBody = scene.add.rectangle(0, 0, 220, 154, 0x20334e, 1);
        this.portalTop = scene.add.rectangle(0, -72, 220, 6, 0x34d6cb, 1);
        this.portalCore = scene.add.ellipse(0, -12, 52, 52, 0x142238, 1);
        this.portalCaption = scene.add.text(0, 45, "REUSABLE PREFAB", {
            fontFamily: "Arial", fontSize: "13px", fontStyle: "bold",
            color: "#e8efff", align: "center"
        }).setOrigin(0.5, 0.5);
        this.add([this.portalBody, this.portalTop, this.portalCore, this.portalCaption]);
        this.tone = "cyan";
    }

    get tone(): string {
        return this._tone;
    }

    set tone(value: string) {
        this._tone = value;
        const colors: Record<string, number> = {
            cyan: 0x34d6cb,
            violet: 0x9d8cff,
            amber: 0xffbd69
        };
        this.portalTop.setFillStyle(colors[value] ?? colors.cyan);
        this.portalCore.setFillStyle(colors[value] ?? colors.cyan);
    }
}
