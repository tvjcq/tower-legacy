export default class Ennemy1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.1); // ! À CHANGER

    this.damage = 2;
    this.health = 7;

    this.speed = 150;

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
      if (distance > 10) {
        this.scene.physics.moveTo(this, player.x, player.y, this.speed);
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
        this.setScale(0.1, 0.1 * (1 + 0.1 * Math.sin(time) * scaleFactor));
      } else {
        this.setScale(0.1);
      }
    }
  }

  dead() {
    this.destroy();
  }
}
