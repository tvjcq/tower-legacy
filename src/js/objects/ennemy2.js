export default class Ennemy2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.08); // ! À CHANGER

    this.damage = 2;
    this.health = 7;

    this.speed = 25;
    this.shootDelay = 5000;
    this.canShoot = true;
    this.projectileSpeed = 75;
  }

  update(player) {
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
    if (distance > 350) {
      this.scene.physics.moveTo(this, player.x, player.y, this.speed);
    } else if (distance < 300) {
      this.scene.physics.moveTo(this, player.x, player.y, -this.speed);
    } else {
      this.scene.physics.moveTo(this, player.x, player.y, 0);
    }

    // Tirer
    this.shoot(player);
  }

  shoot(player) {
    if (this.canShoot) {
      console.log("Tirer");
      this.canShoot = false;
      this.scene.time.addEvent({
        delay: this.shootDelay,
        callback: () => {
          this.canShoot = true;
        },
      });
      // Créer un projectile
      const projectile = this.scene.projectiles.create(
        this.x,
        this.y,
        "projectile"
      );
      projectile.setScale(0.1);
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        player.x,
        player.y
      );
      this.scene.physics.velocityFromRotation(
        angle,
        this.projectileSpeed,
        projectile.body.velocity
      );
      projectile.angle = Phaser.Math.RadToDeg(angle);
      projectile.damage = this.damage;
    }
  }
}
