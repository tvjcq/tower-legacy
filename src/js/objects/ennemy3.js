export default class Ennemy2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.125); // ! À CHANGER

    this.damage = 2;
    this.health = 7;

    this.speed = 50;
    this.shootDelay = 3000;
    this.canShoot = true;
    this.projectileSpeed = 125;
    this.firstShoot = true;
    this.burstCount = 3;
    this.burstDelay = 500;

    this.knockbackX = 0;
    this.knockbackY = 0;
    this.knockbackTime = 0;
  }

  update(player) {
    if (this.knockbackTime > 0) {
      this.knockbackTime -= this.scene.game.loop.delta;
      this.x += this.knockbackX;
      this.y += this.knockbackY;
    } else {
      // Calculer l'angle vers le joueur
      this.angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        player.x,
        player.y
      );
      // Calculer la distance entre le joueur et l'ennemi
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        player.x,
        player.y
      );
      // Se déplacer vers le joueur
      if (distance > 550) {
        this.scene.physics.moveTo(this, player.x, player.y, this.speed);
      } else if (distance < 400) {
        this.scene.physics.moveTo(this, player.x, player.y, -this.speed);
      } else {
        this.scene.physics.moveTo(this, player.x, player.y, 0);
      }

      if (this.body.velocity.x < 0) {
        this.setFlipX(true);
      } else {
        this.setFlipX(false);
      }

      const speed = Math.sqrt(
        this.body.velocity.x ** 2 + this.body.velocity.y ** 2
      );
      if (speed > 0) {
        const scaleFactor = 1 + (speed / this.speed) * 0.2;
        const time = this.scene.time.now / 100;
        this.setScale(0.125, 0.125 * (1 + 0.1 * Math.sin(time) * scaleFactor));
      } else {
        this.setScale(0.125);
      }

      let firstShootDelay = Phaser.Math.Between(500, 2500);
      // Tirer
      if (this.firstShoot) {
        this.scene.time.addEvent({
          delay: firstShootDelay,
          callback: () => {
            this.shoot(player);
            this.firstShoot = false;
          },
        });
      } else {
        this.shoot(player);
      }
    }
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
            projectile.setSize(20, 20);
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

            // Détruire le projectile après 20 secondes
            this.scene.time.delayedCall(20000, () => {
              if (projectile.active) {
                projectile.destroy();
              }
            });
          },
        });
      }
    }
  }

  dead() {
    this.destroy();
  }
}
