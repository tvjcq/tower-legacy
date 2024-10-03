import Player from "../objects/player.js";
import Ennemy1 from "../objects/ennemy1.js";
import Ennemy2 from "../objects/ennemy2.js";
import Ennemy3 from "../objects/ennemy3.js";
import Ennemy4 from "../objects/ennemy4.js";
import Ennemy5 from "../objects/ennemy5.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "Level" });
  }

  preload() {
    this.load.image("player", "src/assets/playerIdle.png");
    this.load.image("attackSprite", "src/assets/attackSprite.png");
    this.load.image("dashSprite", "src/assets/dashSprite.png");
    this.load.image("ennemy1", "src/assets/ennemy1Idle.png");
    this.load.image("ennemy2", "src/assets/ennemy2Idle.png");
    this.load.image("ennemy3", "src/assets/ennemy3Idle.png");
    this.load.image("ennemy4", "src/assets/ennemy4Idle.png");
    this.load.image("ennemy4_blink", "src/assets/ennemy4Blink.png");
    this.load.image("ennemy5", "src/assets/ennemy5Idle.png");
    this.load.image("projectile", "src/assets/projectile.png");
    this.load.spritesheet("explosion", "src/assets/explosionAnim.png", {
      frameWidth: 65,
      frameHeight: 65,
    });
    this.load.spritesheet("blood", "src/assets/bloodAnim.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("upgrade1", "src/assets/upgrade1.png");
    this.load.image("upgrade2", "src/assets/upgrade2.png");
    this.load.image("upgrade3", "src/assets/upgrade3.png");
    this.load.image("upgrade4", "src/assets/upgrade4.png");
  }

  create() {
    const { width, height } = this.scale;
    this.player = new Player(this, width / 2, height / 2, "player");
    this.scene.launch("Interface", { player: this.player });
    this.ennemies = this.physics.add.group();
    this.ennemies.add(new Ennemy1(this, 100, 100, "ennemy1"));
    this.ennemies.add(new Ennemy2(this, 200, 200, "ennemy2"));
    this.ennemies.add(new Ennemy3(this, 300, 300, "ennemy3"));
    this.ennemies.add(new Ennemy4(this, 400, 100, "ennemy4"));
    this.ennemies.add(new Ennemy5(this, 500, 200, "ennemy5"));

    this.projectiles = this.physics.add.group();
    this.explosions = this.add.group();

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

    // Afficher les upgrades toutes les 10 secondes
    this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: this.showUpgrades,
      callbackScope: this,
    });

    this.anims.create({
      key: "bloodAnim",
      frames: this.anims.generateFrameNumbers("blood", {
        start: 2,
        end: 15,
      }),
      frameRate: 45,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 5,
      }),
      frameRate: 30,
      repeat: 0,
    });
  }

  update() {
    this.player.update(this.cursors, this.pointer);
    if (this.ennemies.getChildren().length > 0) {
      this.ennemies.getChildren().forEach((ennemy) => {
        ennemy.update(this.player);
      });
    }
  }

  physicsOverlapCirc(x, y, radius, callback) {
    const objects = this.physics.overlapCirc(x, y, radius);
    objects.forEach((object) => {
      callback(object.gameObject);
    });
  }

  showUpgrades() {
    // Mettre le jeu en pause
    this.scene.pause();

    // Lancer la scène des améliorations
    this.scene.launch("UpgradeScene", { player: this.player });
  }
}
