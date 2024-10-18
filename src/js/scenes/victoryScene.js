export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "VictoryScene" });
  }

  preload() {
    // Charger l'image de victoire
    this.load.image("victory", "src/assets/victory.png");
    this.load.image("replay", "src/assets/replay.png");
    this.load.image("quit", "src/assets/quit.png");

    // Charger la musique de victoire
    this.load.audio("victoryMusic", "src/assets/victoryMusic.mp3");

    // Charger la vidéo de victoire
    this.load.video("victoryVideo", "src/assets/victoryVideo.mp4");
  }

  create() {
    this.sound.play("victoryMusic", { loop: true, volume: 0.2 });
    const video = this.add.video(960, 540, "victoryVideo");
    video.setOrigin(0.5);
    video.play(true);

    // Utiliser un délai basé sur la durée de la vidéo pour afficher les boutons de menu
    this.time.delayedCall(10000, () => {
      // Ajouter l'image de victoire
      this.add.image(960, 540, "victory");

      // Ajouter les boutons de menu
      const replayButton = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 250,
        "replay"
      );

      replayButton.setOrigin(0.5);
      replayButton.setScale(0.2);

      replayButton.setInteractive();
      replayButton.on("pointerdown", () => {
        this.scene.start("Level"); // Remplacez 'LevelScene' par la scène de votre niveau
      });

      replayButton.on("pointerover", () => {
        this.tweens.add({
          targets: replayButton,
          scale: 0.25,
          duration: 200,
          ease: "Power1",
        });
      });

      replayButton.on("pointerout", () => {
        this.tweens.add({
          targets: replayButton,
          scale: 0.2,
          duration: 200,
          ease: "Power1",
        });
      });

      const quitButton = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 350,
        "quit"
      );

      quitButton.setOrigin(0.5);
      quitButton.setScale(0.2);

      quitButton.setInteractive();
      quitButton.on("pointerdown", () => {
        this.scene.start("Menu"); // Remplacez 'MenuScene' par la scène de votre menu principal
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
    });
  }
}
