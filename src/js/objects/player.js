export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.025); // ! À CHANGER

    this.damage = 5;
    this.health = 10;

    this.whipAngle = 60;
    this.whipLength = 200;

    this.attackCone = this.scene.add.graphics({
      fillStyle: { color: 0xff0000, alpha: 0.5 },
    });
    this.canAttack = true;
    this.attackDelay = 1000;
    this.attackDuration = 200;
  }

  update(cursors, pointer) {
    let velocityX = 0;
    let velocityY = 0;

    // Gérer les contrôles
    if (cursors.left.isDown && cursors.right.isDown) {
      velocityX = 0;
    } else if (cursors.left.isDown) {
      velocityX = -250;
    } else if (cursors.right.isDown) {
      velocityX = 250;
    }
    if (cursors.up.isDown && cursors.down.isDown) {
      velocityY = 0;
    } else if (cursors.up.isDown) {
      velocityY = -250;
    } else if (cursors.down.isDown) {
      velocityY = 250;
    }

    // Normaliser la vitesse en diagonale
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= Math.SQRT1_2;
      velocityY *= Math.SQRT1_2;
    }

    if (velocityX > 0) {
      this.setFlipX(false);
    }
    if (velocityX < 0) {
      this.setFlipX(true);
    }

    // Calculer l'angle vers le curseur de la souris
    this.angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.worldX,
      pointer.worldY
    );

    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);

    if (pointer.isDown) {
      this.Attack();
    }
  }

  updateAttackCone(angle) {
    // Effacer le cône d'attaque
    this.attackCone.clear();
    // Calculer les points du cône d'attaque
    const halfAttackAngle = Phaser.Math.DegToRad(this.whipAngle / 2);

    // Définir les points du cône d'attaque
    const startAngle = angle - halfAttackAngle;
    const endAngle = angle + halfAttackAngle;

    // Calculer le point de départ légèrement devant le joueur
    const offsetDistance = 10; // Ajustez cette valeur selon vos besoins
    const startX = this.x + Math.cos(angle) * offsetDistance;
    const startY = this.y + Math.sin(angle) * offsetDistance;

    // Créer les points du cône d'attaque
    const points = [];
    points.push(new Phaser.Math.Vector2(startX, startY));
    for (let a = startAngle; a <= endAngle; a += Phaser.Math.DegToRad(1)) {
      const x = startX + Math.cos(a) * this.whipLength;
      const y = startY + Math.sin(a) * this.whipLength;
      points.push(new Phaser.Math.Vector2(x, y));
    }

    // Dessiner le cône d'attaque
    this.attackCone.fillPoints(points, true);
  }

  Attack() {
    if (!this.canAttack) return;
    this.canAttack = false;
    this.updateAttackCone(this.angle);
    this.scene.time.delayedCall(this.attackDuration, () => {
      this.attackCone.clear();
    });
    this.scene.time.delayedCall(this.attackDelay, () => {
      this.canAttack = true;
    });
  }
}
