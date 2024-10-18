export default class CreditScene extends Phaser.Scene {
  constructor() {
    super({ key: "CreditScene" });
  }

  preload() {
    this.load.image("creditBackground", "src/assets/creditBackground.png");
    this.load.image("backButton", "src/assets/backButton.png");
  }

  create() {
    this.add.image(960, 540, "creditBackground");

    const backButton = this.add.image(960, 925, "backButton");
    backButton.setScale(0.2);
    backButton.setOrigin(0.5);

    backButton.setInteractive({ useHandCursor: true });
    backButton.on("pointerup", () => {
      this.scene.scene.sound.stopByKey("menuMusic");
      this.scene.start("Menu");
    });
    backButton.on("pointerover", () => {
      this.tweens.add({
        targets: backButton,
        scale: 0.25,
        duration: 200,
        ease: "Power1",
      });
    });

    backButton.on("pointerout", () => {
      this.tweens.add({
        targets: backButton,
        scale: 0.2,
        duration: 200,
        ease: "Power1",
      });
    });
  }
}
