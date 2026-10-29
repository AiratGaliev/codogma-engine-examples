// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class InteractionLab extends Phaser.Scene {
    private slotA!: Phaser.GameObjects.Rectangle;
    private slotB!: Phaser.GameObjects.Rectangle;
    private slotC!: Phaser.GameObjects.Rectangle;
    private cardAmber!: Phaser.GameObjects.Rectangle;
    private cardViolet!: Phaser.GameObjects.Rectangle;
    private cardCyan!: Phaser.GameObjects.Rectangle;
    private cardAmberLabel!: Phaser.GameObjects.Text;
    private cardVioletLabel!: Phaser.GameObjects.Text;
    private cardCyanLabel!: Phaser.GameObjects.Text;
    private statusText!: Phaser.GameObjects.Text;

    constructor() {
        super("InteractionLab");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x0b1020, 1);
        // headerPanel
        const headerPanel = this.add.rectangle(480, 64, 912, 82, 0x131f35, 1);
        // headerAccent
        const headerAccent = this.add.rectangle(480, 106, 912, 4, 0x34d6cb, 1);
        // title
        const title = this.add.text(64, 45, "INPUT / INTERACTION LAB", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        title.setOrigin(0, 0.5);
        // subtitle
        const subtitle = this.add.text(64, 81, "Drag-and-drop · targets · snap · возврат при промахе", { fontFamily: "Arial", fontSize: "15px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        subtitle.setOrigin(0, 0.5);
        // slotA
        this.slotA = this.add.rectangle(250, 268, 180, 114, 0x142238, 1);
        // slotB
        this.slotB = this.add.rectangle(480, 268, 180, 114, 0x142238, 1);
        // slotC
        this.slotC = this.add.rectangle(710, 268, 180, 114, 0x142238, 1);
        // slotALabel
        const slotALabel = this.add.text(250, 268, "SLOT A", { fontFamily: "Arial", fontSize: "16px", fontStyle: "bold", color: "#91a4c2", align: "center" });
        slotALabel.setOrigin(0.5, 0.5);
        // slotBLabel
        const slotBLabel = this.add.text(480, 268, "SLOT B", { fontFamily: "Arial", fontSize: "16px", fontStyle: "bold", color: "#91a4c2", align: "center" });
        slotBLabel.setOrigin(0.5, 0.5);
        // slotCLabel
        const slotCLabel = this.add.text(710, 268, "SLOT C", { fontFamily: "Arial", fontSize: "16px", fontStyle: "bold", color: "#91a4c2", align: "center" });
        slotCLabel.setOrigin(0.5, 0.5);
        // cardAmber
        this.cardAmber = this.add.rectangle(250, 472, 144, 86, 0xffbd69, 1);
        // cardViolet
        this.cardViolet = this.add.rectangle(480, 472, 144, 86, 0x9d8cff, 1);
        // cardCyan
        this.cardCyan = this.add.rectangle(710, 472, 144, 86, 0x34d6cb, 1);
        // cardAmberLabel
        const cardAmberLabel = this.add.text(250, 472, "AMBER", { fontFamily: "Arial", fontSize: "15px", fontStyle: "bold", color: "#0b1020", align: "center" });
        cardAmberLabel.setOrigin(0.5, 0.5);
        this.cardAmberLabel = cardAmberLabel;
        // cardVioletLabel
        const cardVioletLabel = this.add.text(480, 472, "VIOLET", { fontFamily: "Arial", fontSize: "15px", fontStyle: "bold", color: "#0b1020", align: "center" });
        cardVioletLabel.setOrigin(0.5, 0.5);
        this.cardVioletLabel = cardVioletLabel;
        // cardCyanLabel
        const cardCyanLabel = this.add.text(710, 472, "CYAN", { fontFamily: "Arial", fontSize: "15px", fontStyle: "bold", color: "#0b1020", align: "center" });
        cardCyanLabel.setOrigin(0.5, 0.5);
        this.cardCyanLabel = cardCyanLabel;
        // statusText
        const statusText = this.statusText = this.add.text(480, 582, "Перетащите карточку к целевому слоту", { fontFamily: "Arial", fontSize: "16px", fontStyle: "normal", color: "#d5e1f3", align: "center" });
        statusText.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    create(): void {
        this.editorCreate();
        const cards = [
                    { card: this.cardAmber, label: this.cardAmberLabel },
                    { card: this.cardViolet, label: this.cardVioletLabel },
                    { card: this.cardCyan, label: this.cardCyanLabel }
                ];
                const slots = [this.slotA, this.slotB, this.slotC];
                for (const { card, label } of cards) {
                    card.setData("homeX", card.x);
                    card.setData("homeY", card.y);
                    card.setData("caption", label);
                    card.setInteractive({ useHandCursor: true });
                    this.input.setDraggable(card);
                }
                this.input.on("dragstart", (_pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.GameObject) => {
                    object.setDepth(10);
                });
                this.input.on("drag", (_pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
                    const card = object as Phaser.GameObjects.Rectangle;
                    card.setPosition(dragX, dragY);
                    const caption = card.getData("caption") as Phaser.GameObjects.Text;
                    caption.setPosition(dragX, dragY);
                });
                this.input.on("dragend", (_pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.GameObject) => {
                    const card = object as Phaser.GameObjects.Rectangle;
                    const caption = card.getData("caption") as Phaser.GameObjects.Text;
                    const closest = slots.reduce((best, slot) =>
                        Phaser.Math.Distance.Between(card.x, card.y, slot.x, slot.y) <
                        Phaser.Math.Distance.Between(card.x, card.y, best.x, best.y) ? slot : best, slots[0]);
                    const distance = Phaser.Math.Distance.Between(card.x, card.y, closest.x, closest.y);
                    if (distance <= 100) {
                        card.setPosition(closest.x, closest.y);
                        caption.setPosition(closest.x, closest.y);
                        closest.setFillStyle(0x1b3b4b);
                        this.statusText.setText("Карточка закреплена в слоте. Попробуйте другую.");
                    } else {
                        card.setPosition(card.getData("homeX") as number, card.getData("homeY") as number);
                        caption.setPosition(card.x, card.y);
                        this.statusText.setText("Промах: карточка возвращена на исходную позицию.");
                    }
                    card.setDepth(0);
                });
    }
}
