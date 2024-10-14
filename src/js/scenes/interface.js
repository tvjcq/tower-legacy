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

  showStageText(stage, callback) {
    const stageText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 150,
        `Étage ${stage}`,
        {
          fontSize: "96px",
          fontFamily: "Riffic",
          stroke: "#000000",
          strokeThickness: 5,
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5);

    // Faire disparaître le texte après 2 secondes
    // Faire apparaître le texte avec un fondu
    this.tweens.add({
      targets: stageText,
      alpha: { from: 0, to: 1 },
      duration: 1000,
      onComplete: () => {
        // Attendre 0.5s avant de changer la couleur du texte
        this.time.delayedCall(500, () => {
          // Transformer le texte en rouge après l'apparition
          this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 1500,
            onUpdate: (tween) => {
              const value = tween.getValue();
              const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                Phaser.Display.Color.ValueToColor("#ffffff"),
                Phaser.Display.Color.ValueToColor("#b8001f"),
                100,
                value
              );
              stageText.setColor(
                Phaser.Display.Color.RGBToString(
                  color.r,
                  color.g,
                  color.b,
                  color.a
                )
              );
            },
            onComplete: () => {
              // Faire disparaître le texte avec un fondu après 1 seconde
              this.time.delayedCall(1000, () => {
                this.tweens.add({
                  targets: stageText,
                  alpha: { from: 1, to: 0 },
                  duration: 1000,
                  onComplete: () => {
                    stageText.destroy();
                    if (callback) {
                      callback();
                    }
                  },
                });
              });
            },
          });
        });
      },
    });
  }
}
