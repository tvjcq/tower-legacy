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
    this.speed = 250;

    this.whipAngle = 60;
    this.whipLength = 200;

    this.attackCone = this.scene.add.graphics({
      fillStyle: { color: 0xff0000, alpha: 0.5 },
    });
    this.canAttack = true;
    this.attackDelay = 1000;
    this.attackDuration = 200;
    this.invincible = false;
  }

  update(cursors, pointer) {
    let velocityX = 0;
    let velocityY = 0;

    // Gérer les contrôles
    if (cursors.left.isDown && cursors.right.isDown) {
      velocityX = 0;
    } else if (cursors.left.isDown) {
      velocityX = -this.speed;
    } else if (cursors.right.isDown) {
      velocityX = this.speed;
    }
    if (cursors.up.isDown && cursors.down.isDown) {
      velocityY = 0;
    } else if (cursors.up.isDown) {
      velocityY = -this.speed;
    } else if (cursors.down.isDown) {
      velocityY = this.speed;
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

    this.scene.physics.overlap(this, this.scene.ennemies, (player, ennemy) => {
      this.takeDamage(ennemy.damage);
    });

    this.scene.physics.overlap(
      this,
      this.scene.projectiles,
      (player, projectile) => {
        this.takeDamage(projectile.damage);
        projectile.destroy();
      }
    );
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

    const enemies = this.scene.ennemies.getChildren();
    enemies.forEach((enemy) => {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        enemy.x,
        enemy.y
      );
      const angleToEnemy = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        enemy.x,
        enemy.y
      );
      const angleDifference = Phaser.Math.Angle.Wrap(angleToEnemy - this.angle);

      if (
        distance <= this.whipLength &&
        Math.abs(angleDifference) <= Phaser.Math.DegToRad(this.whipAngle / 2)
      ) {
        enemy.health -= this.damage;
        if (enemy.health <= 0) {
          enemy.destroy();
        }
      }
    });
  }

  takeDamage(damage) {
    if (this.invincible) return;
    this.invincible = true;
    this.health -= damage;
    console.log(this.health);
    if (this.health <= 0) {
      this.destroy();
    }

    this.scene.time.delayedCall(1000, () => {
      this.invincible = false;
    });
  }
}
