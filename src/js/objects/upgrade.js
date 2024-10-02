export default class Upgrade {
  constructor(scene, x, y, texture, effect) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, texture).setInteractive();
    this.effect = effect;

    this.sprite.on("pointerdown", () => {
      this.applyEffect();
      this.destroy();
      this.scene.scene.resume("Level");
      this.scene.scene.stop();
    });
  }

  applyEffect() {
    this.effect(this.scene.player);
    console.log(
      this.scene.player.maxHealth,
      this.scene.player.health,
      this.scene.player.speed,
      this.scene.player.damage
    );
  }

  destroy() {
    this.sprite.destroy();
  }
}
