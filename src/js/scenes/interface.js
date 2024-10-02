import Player from "../objects/player.js";

export default class Interface extends Phaser.Scene {
  constructor() {
    super({ key: "Interface" });
  }

  init(data) {
    this.player = data.player;
  }

  create() {
    this.healthBarBackground = this.add.graphics();
    this.healthBarBackground.fillStyle(0x3c3d37);
    this.healthBarBackground.fillRect(20, 20, 250, 35);
    this.healthBar = this.add.graphics();
    this.healthBar.fillStyle(0xb8001f);
    this.healthBar.fillRect(20, 20, 250, 35); // Dessiner le remplissage de la barre de santé

    // Dessiner le contour de la barre de santé
    this.healthBar.lineStyle(5, 0x000000);
    this.healthBar.strokeRect(20, 20, 250, 10);

    this.healthText = this.add
      .text(150, 38, `${this.player.health}/${this.player.maxHealth}`, {
        fontSize: "25px",
        fontFamily: "Riffic",
        stroke: "#000000",
        strokeThickness: 5,
        fill: "#ffffff",
      })
      .setOrigin(0.5);
  }

  update() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xb8001f);
    this.healthBar.fillRect(
      20,
      20,
      (this.player.health / this.player.maxHealth) * 250,
      35
    );

    // Dessiner le contour de la barre de santé
    this.healthBar.lineStyle(5, 0x000000);
    this.healthBar.strokeRect(20, 20, 250, 35);

    this.healthText.setText(`${this.player.health}/${this.player.maxHealth}`);
  }
}
