export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  preload() {
    // Charger l'image de game over
    this.load.image("gameOver", "src/assets/gameOver.png");
    this.load.image("replay", "src/assets/replay.png");
    this.load.image("quit", "src/assets/quit.png");
  }

  create() {
    // Ajouter l'image de game over
    const background = this.add.image(960, 540, "gameOver");
    background.setScale(0.235);

    // Ajouter un bouton pour redémarrer le jeu
    const restartButton = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 200,
      "replay"
    );
    restartButton.setScale(0.2);
    restartButton.setOrigin(0.5);

    restartButton.setInteractive({ useHandCursor: true });
    restartButton.on("pointerup", () => {
      this.scene.start("Level");
    });
    restartButton.on("pointerover", () => {
      this.tweens.add({
        targets: restartButton,
        scale: 0.25,
        duration: 200,
        ease: "Power1",
      });
    });

    restartButton.on("pointerout", () => {
      this.tweens.add({
        targets: restartButton,
        scale: 0.2,
        duration: 200,
        ease: "Power1",
      });
    });

    const quitButton = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 300,
      "quit"
    );
    quitButton.setScale(0.2);
    quitButton.setOrigin(0.5);

    quitButton.setInteractive({ useHandCursor: true });
    quitButton.on("pointerup", () => {
      this.scene.start("Menu");
    });
    quitButton.on("pointerover", () => {
      this.tweens.add({
        targets: quitButton,
        scale: 0.25,
        duration: 200,
        ease: "Power1",
      });
    });

    quitButton.on("pointerout", () => {
      this.tweens.add({
        targets: quitButton,
        scale: 0.2,
        duration: 200,
        ease: "Power1",
      });
    });
  }
}
