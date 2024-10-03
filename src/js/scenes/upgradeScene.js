import Upgrade from "../objects/upgrade.js";

export default class UpgradeScene extends Phaser.Scene {
  constructor() {
    super({ key: "UpgradeScene" });
  }

  init(data) {
    this.player = data.player;
  }

  create() {
    const upgrades = [
      { texture: "upgrade1", effect: (player) => (player.maxHealth += 5) },
      { texture: "upgrade2", effect: (player) => (player.speed += 50) },
      { texture: "upgrade3", effect: (player) => (player.damage += 2) },
      { texture: "upgrade4", effect: (player) => (player.dashTaked = true) },
    ];

    // Choisir trois upgrades aléatoires
    const chosenUpgrades = Phaser.Utils.Array.Shuffle(upgrades).slice(0, 3);

    // Afficher les upgrades à l'écran
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    const offset = 300;

    chosenUpgrades.forEach((upgrade, index) => {
      new Upgrade(
        this,
        x + (index - 1) * offset,
        y,
        upgrade.texture,
        upgrade.effect
      );
    });
  }
}
