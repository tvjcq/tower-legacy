export default class Ennemy1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.08); // ! À CHANGER

    this.damage = 2;
    this.health = 7;

    this.speed = 150;
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
    if (distance > 10) {
      this.scene.physics.moveTo(this, player.x, player.y, this.speed);
    }
  }

  dead() {
    this.destroy();
  }
}
