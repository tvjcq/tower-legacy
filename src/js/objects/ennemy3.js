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

    this.speed = 50;
    this.shootDelay = 3000;
    this.canShoot = true;
    this.projectileSpeed = 75;
    this.burstCount = 3;
    this.burstDelay = 500;
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
    if (distance > 250) {
      this.scene.physics.moveTo(this, player.x, player.y, this.speed);
    } else if (distance < 200) {
      this.scene.physics.moveTo(this, player.x, player.y, -this.speed);
    } else {
      this.scene.physics.moveTo(this, player.x, player.y, 0);
    }

    const speed = Math.sqrt(
      this.body.velocity.x ** 2 + this.body.velocity.y ** 2
    );
    if (speed > 0) {
      const scaleFactor = 1 + (speed / this.speed) * 0.2;
      const time = this.scene.time.now / 100;
      this.setScale(0.08, 0.08 * (1 + 0.1 * Math.sin(time) * scaleFactor));
    } else {
      this.setScale(0.08);
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

      // Tirer une rafale de projectiles
      for (let i = 0; i < this.burstCount; i++) {
        this.scene.time.addEvent({
          delay: i * this.burstDelay,
          callback: () => {
            // Vérifier si l'ennemi existe toujours
            if (!this.scene || !this.active) return;

            // Créer un projectile
            const projectile = this.scene.projectiles.create(
              this.x,
              this.y,
              "projectile"
            );
            projectile.setScale(0.05);
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
          },
        });
      }
    }
  }

  dead() {
    this.destroy();
  }
}
