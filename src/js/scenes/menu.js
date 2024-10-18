export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }

  preload() {
    // Charger les assets nécessaires pour le menu
    this.load.image("menuBackground", "src/assets/menuBackground.png");
    this.load.image("startButton", "src/assets/startButton.png");
    this.load.image("creditsButton", "src/assets/creditsButton.png");
    this.load.image("controlsButton", "src/assets/controlsButton.png");
    this.load.audio("menuMusic", "src/assets/menuMusic.mp3");

    this.load.video("introVideo", "src/assets/introVideo.mp4");
  }

  create() {
    // Jouer la musique du menu
    this.sound.add("menuMusic", { loop: true, volume: 0.2 }).play();
    // Afficher l'arrière-plan du menu
    this.add.image(960, 540, "menuBackground");

    // Ajouter un bouton pour lancer la vidéo
    const startButton = this.add.image(960, 925, "startButton");
    startButton.setScale(0.2);
    startButton.setOrigin(0.5);

    startButton.setInteractive({ useHandCursor: true });
    startButton.on("pointerup", () => {
      const introVideo = this.add.video(960, 540, "introVideo");
      introVideo.play(true);
      this.time.delayedCall(10000, () => {
        introVideo.stop();
        this.sound.stopByKey("menuMusic");
        this.scene.start("Level");
      });
    });
    startButton.on("pointerover", () => {
      this.tweens.add({
        targets: startButton,
        scale: 0.25,
        duration: 200,
        ease: "Power1",
      });
    });

    startButton.on("pointerout", () => {
      this.tweens.add({
        targets: startButton,
        scale: 0.2,
        duration: 200,
        ease: "Power1",
      });
    });

    const creditsButton = this.add.image(760, 925, "creditsButton");
    creditsButton.setScale(0.2);
    creditsButton.setOrigin(0.5);

    creditsButton.setInteractive({ useHandCursor: true });
    creditsButton.on("pointerup", () => {
      this.scene.start("CreditScene");
    });
    creditsButton.on("pointerover", () => {
      this.tweens.add({
        targets: creditsButton,
        scale: 0.25,
        duration: 200,
        ease: "Power1",
      });
    });

    creditsButton.on("pointerout", () => {
      this.tweens.add({
        targets: creditsButton,
        scale: 0.2,
        duration: 200,
        ease: "Power1",
      });
    });

    const controlsButton = this.add.image(1160, 925, "controlsButton");
    controlsButton.setScale(0.2);
    controlsButton.setOrigin(0.5);

    controlsButton.setInteractive({ useHandCursor: true });
    controlsButton.on("pointerup", () => {
      this.scene.start("ControlScene");
    });
    controlsButton.on("pointerover", () => {
      this.tweens.add({
        targets: controlsButton,
        scale: 0.25,
        duration: 200,
        ease: "Power1",
      });
    });

    controlsButton.on("pointerout", () => {
      this.tweens.add({
        targets: controlsButton,
        scale: 0.2,
        duration: 200,
        ease: "Power1",
      });
    });
  }
}
