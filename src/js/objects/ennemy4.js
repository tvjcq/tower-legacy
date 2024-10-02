import Player from "../objects/player.js";

export default class Ennemy4 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.08); // ! À CHANGER

    this.damage = 7;
    this.health = 5;

    this.speed = 275;
    this.explosionDelay = 1000;
    this.explosionRadius = 100; // Rayon de l'explosion
    this.explosionDamage = 5; // Dégâts de l'explosion
    this.isExploding = false;
  }

  update(player) {
    if (this.isExploding) return;

    // Calculer l'angle vers le joueur
    this.angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
    // Calculer la distance entre le joueur et l'ennemi
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      player.x,
      player.y
    );
    // Se déplacer vers le joueur
    if (distance > 75) {
      this.scene.physics.moveTo(this, player.x, player.y, this.speed);
    } else {
      this.scene.physics.moveTo(this, player.x, player.y, 0);
      this.isExploding = true;
      this.scene.time.delayedCall(this.explosionDelay, () => {
        if (!this.scene || !this.active) return;
        this.explosion();
      });
    }

    const speed = Math.sqrt(this.body.velocity.x ** 2 + this.body.velocity.y ** 2);
    if (speed > 0) {
      const scaleFactor = 1 + (speed / this.speed) * 0.2;
      const time = this.scene.time.now / 100;
      this.setScale(0.08, 0.08 * (1 + 0.1 * Math.sin(time) * scaleFactor));
    } else {
      this.setScale(0.08);
    }
  }

  dead() {
    this.explosion();
  }

  explosion() {
    // Créer une explosion visuelle
    const explosion = this.scene.add
      .sprite(this.x, this.y, "explosion")
      .setScale(0.5);
    this.scene.explosions.add(explosion);

    // Infliger des dégâts au joueur dans une zone circulaire
    this.scene.physicsOverlapCirc(
      this.x,
      this.y,
      this.explosionRadius,
      (player) => {
        player.health -= this.explosionDamage;
      }
    );

    this.scene.time.delayedCall(500, () => {
      explosion.destroy();
    });

    this.destroy();
  }
}
