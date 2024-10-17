export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }

  preload() {
    // Charger les assets nécessaires pour le menu
    this.load.image("menuBackground", "src/assets/menuBackground.png");
    this.load.image("startButton", "src/assets/startButton.png");
    this.load.audio("menuMusic", "src/assets/menuMusic.mp3");
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
      // ! Changer pour démarrer la scène de la BD
      this.sound.stopByKey("menuMusic");
      this.scene.start("Level");
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
  }
}
