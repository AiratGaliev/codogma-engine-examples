// Сцена хранит композицию в .scene; поведение остаётся в пользовательском коде.

class PlatformerLevel extends Phaser.Scene {
    private ground!: Phaser.GameObjects.Rectangle;
    private platformA!: Phaser.GameObjects.Rectangle;
    private platformB!: Phaser.GameObjects.Rectangle;
    private platformC!: Phaser.GameObjects.Rectangle;
    private player!: Phaser.GameObjects.Rectangle;
    private coinA!: Phaser.GameObjects.Ellipse;
    private coinB!: Phaser.GameObjects.Ellipse;
    private coinC!: Phaser.GameObjects.Ellipse;
    private scoreText!: Phaser.GameObjects.Text;
    private resultText!: Phaser.GameObjects.Text;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private jumpKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super("PlatformerLevel");
    }

    editorCreate(): void {
        // background
        const background = this.add.rectangle(480, 320, 960, 640, 0x091322, 1);
        // skyPanel
        const skyPanel = this.add.rectangle(480, 230, 960, 460, 0x0d1b2d, 1);
        // moon
        const moon = this.add.ellipse(790, 94, 74, 74, 0xffd58a, 1);
        // starA
        const starA = this.add.ellipse(118, 92, 8, 8, 0xe8efff, 1);
        // starB
        const starB = this.add.ellipse(270, 132, 6, 6, 0xe8efff, 1);
        // starC
        const starC = this.add.ellipse(414, 76, 7, 7, 0xe8efff, 1);
        // mountainBack
        const mountainBack = this.add.rectangle(190, 426, 380, 170, 0x142a3f, 1);
        // mountainFront
        const mountainFront = this.add.rectangle(690, 442, 540, 145, 0x18344a, 1);
        // ground
        this.ground = this.add.rectangle(480, 614, 960, 52, 0x274b54, 1);
        // platformA
        this.platformA = this.add.rectangle(282, 462, 190, 24, 0x34d6cb, 1);
        // platformB
        this.platformB = this.add.rectangle(570, 372, 166, 24, 0x8b7cff, 1);
        // platformC
        this.platformC = this.add.rectangle(790, 284, 160, 24, 0xffbd69, 1);
        // player
        this.player = this.add.rectangle(90, 540, 36, 48, 0x4de1d4, 1);
        // coinA
        this.coinA = this.add.ellipse(284, 421, 24, 24, 0xffd166, 1);
        // coinB
        this.coinB = this.add.ellipse(570, 330, 24, 24, 0xffd166, 1);
        // coinC
        this.coinC = this.add.ellipse(790, 242, 24, 24, 0xffd166, 1);
        // levelTitle
        const levelTitle = this.add.text(28, 28, "PLATFORMER / ARCADE PHYSICS", { fontFamily: "Arial", fontSize: "22px", fontStyle: "bold", color: "#f4f7ff", align: "left" });
        levelTitle.setOrigin(0, 0.5);
        // controlsHint
        const controlsHint = this.add.text(28, 58, "← → движение · Space прыжок · соберите все три жетона", { fontFamily: "Arial", fontSize: "14px", fontStyle: "normal", color: "#91a4c2", align: "left" });
        controlsHint.setOrigin(0, 0.5);
        // scoreText
        const scoreText = this.add.text(915, 35, "Жетоны: 0 / 3", { fontFamily: "Arial", fontSize: "16px", fontStyle: "bold", color: "#ffdf91", align: "right" });
        scoreText.setOrigin(1, 0.5);
        // resultText
        const resultText = this.add.text(480, 190, "", { fontFamily: "Arial", fontSize: "21px", fontStyle: "bold", color: "#f4f7ff", align: "center" });
        resultText.setOrigin(0.5, 0.5);

        this.events.emit("scene-awake");
    }

    
    private collected = 0;
    
    private collectCoin(coin: Phaser.GameObjects.Ellipse): void {
        if (!coin.active) return;
        coin.disableInteractive();
        coin.destroy();
        this.collected += 1;
        this.scoreText.setText(`Жетоны: ${this.collected} / 3`);
        if (this.collected === 3) {
            this.resultText.setText("УРОВЕНЬ ПРОЙДЕН");
            this.cameras.main.flash(220, 30, 100, 90, false);
        }
    }

    create(): void {
        this.editorCreate();
        this.physics.world.setBounds(0, 0, 960, 640);
                this.physics.add.existing(this.player);
                const body = (this.player as unknown as { body: Phaser.Physics.Arcade.Body }).body;
                body.setCollideWorldBounds(true);
                body.setMaxVelocity(360, 900);
                this.cursors = this.input.keyboard!.createCursorKeys();
                this.jumpKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
                const platforms = [this.ground, this.platformA, this.platformB, this.platformC];
                for (const platform of platforms) {
                    this.physics.add.existing(platform, true);
                    this.physics.add.collider(this.player, platform);
                }
        
                const coins = [this.coinA, this.coinB, this.coinC];
                coins.forEach((coin) => {
                    this.physics.add.existing(coin, true);
                    this.physics.add.overlap(this.player, coin, () => this.collectCoin(coin));
                });
                this.cameras.main.setBounds(0, 0, 960, 640);
                this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    }

    update(time: number, delta: number): void {
        const body = (this.player as unknown as { body: Phaser.Physics.Arcade.Body }).body;
                if (this.cursors.left.isDown) body.setVelocityX(-250);
                else if (this.cursors.right.isDown) body.setVelocityX(250);
                else body.setVelocityX(0);
        
                if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && (body.blocked.down || body.touching.down)) {
                    body.setVelocityY(-470);
                }
    }
}
