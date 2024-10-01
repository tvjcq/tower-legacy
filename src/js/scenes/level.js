import Player from "../objects/player.js";
import Ennemy1 from "../objects/ennemy1.js";
import Ennemy2 from "../objects/ennemy2.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "Level" });
  }

  preload() {
    this.load.image("player", "src/assets/playerIdle.png");
    this.load.image("ennemy1", "src/assets/ennemy1Idle.avif");
    this.load.image("ennemy2", "src/assets/ennemy2Idle.webp");
    this.load.image("projectile", "src/assets/projectile.png");
  }

  create() {
    const { width, height } = this.scale;
    this.player = new Player(this, width / 2, height / 2, "player");
    this.ennemies = this.physics.add.group();
    this.ennemies.add(new Ennemy1(this, 100, 100, "ennemy1"));
    this.ennemies.add(new Ennemy2(this, 200, 200, "ennemy2"));

    this.projectiles = this.physics.add.group();

    // Gérer les contrôles
    this.cursors = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // Gérer la souris
    this.pointer = this.input.activePointer;
  }

  update() {
    this.player.update(this.cursors, this.pointer);
    if (this.ennemies.getChildren().length > 0) {
      this.ennemies.getChildren().forEach((ennemy) => {
        ennemy.update(this.player);
      });
    }
  }
}
