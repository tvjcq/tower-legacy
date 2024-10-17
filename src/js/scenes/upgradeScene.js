import Upgrade from "../objects/upgrade.js";

export default class UpgradeScene extends Phaser.Scene {
  constructor() {
    super({ key: "UpgradeScene" });
  }

  init(data) {
    this.player = data.player;
    console.log("UpgradeScene initialized with player:", this.player);
  }

  create() {
    console.log("Creating UpgradeScene...");

    // Ajouter un fond noir semi-transparent avec un fondu
    const background = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000
    );
    background.setAlpha(0); // Initialiser l'alpha à 0

    this.tweens.add({
      targets: background,
      alpha: 0.5,
      duration: 500,
      ease: "Power2",
      onComplete: () => {
        console.log("Background fade-in complete");
      },
    });

    const upgrades = [
      { texture: "upgrade1", effect: (player) => (player.maxHealth += 5) },
      { texture: "upgrade2", effect: (player) => (player.speed += 50) },
      { texture: "upgrade3", effect: (player) => (player.damage += 2) },
      { texture: "upgrade4", effect: (player) => (player.dashTaked = true) },
      { texture: "upgrade5", effect: (player) => (player.attackDelay -= 100) },
      {
        texture: "upgrade6",
        effect: (player) => (player.whipLength += 25),
      },
    ];

    // Filtrer les upgrades pour exclure l'upgrade 4 si elle est déjà prise
    const availableUpgrades = upgrades.filter(
      (upgrade) => !(upgrade.texture === "upgrade4" && this.player.dashTaked)
    );
    console.log("Available upgrades:", availableUpgrades);

    // Choisir trois upgrades aléatoires parmi les disponibles
    const chosenUpgrades = Phaser.Utils.Array.Shuffle(availableUpgrades).slice(
      0,
      3
    );
    console.log("Chosen upgrades:", chosenUpgrades);

    // Afficher les upgrades à l'écran
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    const offset = 500;

    chosenUpgrades.forEach((upgrade, index) => {
      const upgradeCard = this.add
        .sprite(
          x + (index - 1) * offset,
          y + this.cameras.main.height, // Commencer en dehors de l'écran
          upgrade.texture
        )
        .setInteractive();
      upgradeCard.setScale(0.25); // Changer la taille des cartes
      console.log(
        `Creating upgrade card ${index + 1} at position:`,
        upgradeCard.x,
        upgradeCard.y
      );

      // Animer l'arrivée des cartes du bas une par une
      this.tweens.add({
        targets: upgradeCard,
        y: y,
        delay: index * 300, // Délai entre chaque carte
        duration: 500,
        ease: "Power2",
        onComplete: () => {
          console.log(`Upgrade card ${index + 1} animation complete`);
        },
      });

      upgradeCard.on("pointerover", () => {
        this.tweens.add({
          targets: upgradeCard,
          scale: 0.3,
          duration: 200,
          ease: "Power1",
        });
        this.input.manager.canvas.style.cursor = "pointer";
      });
      upgradeCard.on("pointerout", () => {
        this.tweens.add({
          targets: upgradeCard,
          scale: 0.25,
          duration: 200,
          ease: "Power1",
        });
        this.input.manager.canvas.style.cursor = "default";
      });

      upgradeCard.on("pointerup", () => {
        upgrade.effect(this.player);
        this.player.health = this.player.maxHealth;
        console.log(
          this.player.maxHealth,
          this.player.health,
          this.player.speed,
          this.player.damage
        );
        upgradeCard.destroy();
        this.events.emit("upgradeSelected");
      });
    });

    // Écouter l'événement de sélection d'amélioration
    this.events.on("upgradeSelected", () => {
      console.log("Upgrade selected, stopping UpgradeScene");
      this.scene.stop(); // Fermer la scène des améliorations
    });
  }
}
