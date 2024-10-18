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

    // Ajouter la barre de vie du boss
    this.bossHealthBarContainer = this.add.graphics();
    this.bossHealthBar = this.add.graphics();
    this.bossHealthText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 60,
        "Oclaz",
        {
          fontSize: "46px",
          fontFamily: "Riffic",
          stroke: "#000000",
          strokeThickness: 5,
          fill: "#fff",
        }
      )
      .setOrigin(0.5);

    // Initialement, rendre la barre de vie du boss invisible
    this.bossHealthBarContainer.setVisible(false);
    this.bossHealthBar.setVisible(false);
    this.bossHealthText.setVisible(false);

    // Écouter les événements de mise à jour de la santé du boss
    this.registry.events.on("bossHealthUpdate", this.updateBossHealthBar, this);
    this.registry.events.on("bossSpawned", this.showBossHealthBar, this);
    this.registry.events.on("bossDefeated", this.hideBossHealthBar, this);
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
    setTimeout(() => {
      this.sound.play("bellSound", { volume: 0.2 });
    }, 2000);
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

  updateBossHealthBar(health) {
    // Mettre à jour la barre de vie du boss
    const barWidth = 500;
    const barHeight = 20;
    const x = (this.cameras.main.width - barWidth) / 2;
    const y = this.cameras.main.height - 30;

    this.bossHealthBar.clear();
    this.bossHealthBar.fillStyle(0xb8001f);
    this.bossHealthBar.fillRect(x, y, health, barHeight);

    // Dessiner le contour de la barre de santé
    this.bossHealthBar.lineStyle(5, 0x000000);
    this.bossHealthBar.strokeRect(x, y, barWidth, barHeight);
  }

  showBossHealthBar() {
    this.bossHealthBarContainer.setVisible(true);
    this.bossHealthBar.setVisible(true);
    this.bossHealthText.setVisible(true);
    this.updateBossHealthBar(500);
  }

  hideBossHealthBar() {
    this.bossHealthBarContainer.setVisible(false);
    this.bossHealthBar.setVisible(false);
    this.bossHealthText.setVisible(false);
  }
}
