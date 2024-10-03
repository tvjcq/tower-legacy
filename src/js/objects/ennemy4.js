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

    this.blinkInterval = 500; // Intervalle de clignotement initial en millisecondes
    this.blinking = false;

    this.knockbackX = 0;
    this.knockbackY = 0;
    this.knockbackTime = 0;

    this.startBlinking();
  }

  update(player) {
    if (this.isExploding) return;

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
      if (distance > 75) {
        this.scene.physics.moveTo(this, player.x, player.y, this.speed);
      } else {
        this.scene.physics.moveTo(this, player.x, player.y, 0);
        this.isExploding = true;

        // Accélérer le clignotement avant l'explosion
        this.blinkEvent.remove();
        this.blinkInterval = 100; // Intervalle de clignotement rapide en millisecondes
        this.startBlinking();

        this.scene.time.delayedCall(this.explosionDelay, () => {
          if (!this.scene || !this.active) return;
          this.explosion();
        });
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
    }
  }

  dead() {
    this.explosion();
  }

  explosion() {
    // Créer une explosion visuelle
    const explosion = this.scene.add.sprite(this.x, this.y, "explosion");
    explosion.setScale(4);
    explosion.play("explosion");

    setTimeout(() => {
      explosion.destroy();
    }, 200);

    // Infliger des dégâts au joueur dans une zone circulaire
    this.scene.physicsOverlapCirc(
      this.x,
      this.y,
      this.explosionRadius,
      (player) => {
        if (player instanceof Player) {
          player.takeDamage(this.explosionDamage);
        } else {
          player.health -= this.explosionDamage;
          console.log("Dégâts infligés à l'ennemi :" + this.explosionDamage);
        }
      }
    );

    this.destroy();
  }

  startBlinking() {
    this.blinking = true;
    this.blinkEvent = this.scene.time.addEvent({
      delay: this.blinkInterval,
      callback: this.blink,
      callbackScope: this,
      loop: true,
    });
  }

  blink() {
    if (!this.scene || !this.active) return;
    if (this.texture.key === "ennemy4") {
      this.setTexture("ennemy4_blink");
    } else {
      this.setTexture("ennemy4");
    }
  }
}
