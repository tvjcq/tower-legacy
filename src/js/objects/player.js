import Ennemy4 from "../objects/ennemy4.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.2); // ! À CHANGER
    this.setSize(150, 250); // Ajustez les valeurs selon vos besoins
    this.setOffset(185, 250); // Ajustez les valeurs selon vos besoins
    this.setOrigin(0.5, 0.5); // Centrer le point d'origine pour la rotation

    this.spriteAngle = 0; // Propriété pour l'angle de rotation du sprite

    this.damage = 5;
    this.maxHealth = 10;
    this.health = 10;
    this.speed = 250;

    this.whipAngle = 60;
    this.whipLength = 200;

    this.attackCone = this.scene.add.graphics({
      lineStyle: { width: 3, color: 0xffffff },
    });
    this.canAttack = true;
    this.attackDelay = 1000;
    this.attackDuration = 200;
    this.invincible = false;
    this.knockbackDistance = 20;

    this.rollDistance = 200;
    this.rollDuration = 300;
    this.rollActive = false;
    this.dashTaked = false;
    // Ajout des propriétés pour la barre de récupération de roulade
    this.rollCooldown = 1500; // Temps de récupération en millisecondes
    this.rollCooldownTimer = 0;
    this.rollCooldownBar = this.scene.add.graphics();

    this.dashDistance = 200; // Distance de téléportation
    this.dashCooldown = 1500; // Temps de récupération en millisecondes
    this.dashActive = false;
    this.dashCooldownTimer = 0;
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
    this.attackAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.worldX,
      pointer.worldY
    );

    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);

    if (!this.dashTaked) {
      if (this.rollCooldownTimer > 0) {
        this.rollCooldownTimer -= this.scene.game.loop.delta;
        const cooldownProgress = Math.max(
          this.rollCooldownTimer / this.rollCooldown,
          0
        );
        this.rollCooldownBar.clear();
        this.rollCooldownBar.fillStyle(0x00ff00, 0.5);
        this.rollCooldownBar.fillRect(
          this.x - 25,
          this.y + 70,
          50 * cooldownProgress,
          10
        );
        this.rollCooldownBar.lineStyle(2, 0xffffff, 0.5);
        this.rollCooldownBar.strokeRect(this.x - 25, this.y + 70, 50, 10);
      } else {
        this.rollCooldownBar.clear();
      }
    } else {
      if (this.dashCooldownTimer > 0) {
        this.dashCooldownTimer -= this.scene.game.loop.delta;
        const cooldownProgress = Math.max(
          this.dashCooldownTimer / this.dashCooldown,
          0
        );
        this.rollCooldownBar.clear();
        this.rollCooldownBar.fillStyle(0x00ff00, 0.5);
        this.rollCooldownBar.fillRect(
          this.x - 25,
          this.y + 70,
          50 * cooldownProgress,
          10
        );
        this.rollCooldownBar.lineStyle(2, 0xffffff, 0.5);
        this.rollCooldownBar.strokeRect(this.x - 25, this.y + 70, 50, 10);
      } else {
        this.rollCooldownBar.clear();
      }
    }

    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    const maxSpeed = this.speed;

    // Appliquer l'animation de déformation seulement si le joueur se déplace
    if (speed > 0) {
      const scaleFactor = 1 + (speed / maxSpeed) * 0.2; // Ajuster le facteur de déformation
      const time = this.scene.time.now / 50; // Ajuster la vitesse de l'animation
      this.setScale(0.2, 0.2 * (1 + 0.1 * Math.sin(time) * scaleFactor));
    } else {
      // Réinitialiser l'échelle lorsque le joueur ne se déplace pas
      this.setScale(0.2);
    }

    if (pointer.isDown) {
      this.Attack();
    }

    if (cursors.space.isDown && (velocityX !== 0 || velocityY !== 0)) {
      if (!this.dashTaked) {
        this.roll();
      } else {
        this.dash();
      }
    }

    if (this.rollActive) {
      this.scene.physics.world.collide(this, this.scene.wallsLayer, () => {
        this.stopRoll();
      });
    }

    // Vérification de collision avec les murs pendant le dash
    if (this.dashActive) {
      this.scene.physics.world.collide(this, this.scene.wallsLayer, () => {
        this.stopDash();
      });
    }

    this.scene.physics.overlap(this, this.scene.ennemies, (player, ennemy) => {
      if (!(ennemy instanceof Ennemy4)) {
        this.takeDamage(ennemy.damage);
      }
    });

    this.scene.physics.overlap(
      this,
      this.scene.projectiles,
      (player, projectile) => {
        if (!this.dashActive) {
          // Ne pas détruire les projectiles pendant le dash
          this.takeDamage(projectile.damage);
          projectile.destroy();
        }
      }
    );
  }

  Attack() {
    if (!this.canAttack) return;
    this.canAttack = false;
    const attackSprite = this.scene.add.sprite(this.x, this.y, "attackSprite");
    attackSprite.setScale(0.4); // Ajuster la taille de l'image
    attackSprite.setOrigin(-0.1, 0.5); // Ajuster l'origine pour que l'image pivote autour du joueur
    attackSprite.setRotation(this.attackAngle); // Placer l'image dans le même angle que le joueur

    this.scene.tweens.add({
      targets: attackSprite,
      alpha: { from: 1, to: 0 },
      duration: this.attackDuration,
      onComplete: () => {
        attackSprite.destroy(); // Détruire le sprite après l'animation
      },
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
      const angleDifference = Phaser.Math.Angle.Wrap(
        angleToEnemy - this.attackAngle
      );

      if (
        distance <= this.whipLength + 20 &&
        Math.abs(angleDifference) <=
          Phaser.Math.DegToRad(this.whipAngle / 2 + 10)
      ) {
        enemy.health -= this.damage;
        this.scene.cameras.main.shake(100, 0.01);
        const blood = this.scene.add.sprite(enemy.x, enemy.y, "blood");
        blood.setScale(enemy.scaleX * 25, enemy.scaleY * 25);
        blood.play("bloodAnim");
        if (enemy.health <= 0) {
          enemy.dead();
          // Appliquer le recul
          const knockbackDistance = this.knockbackDistance; // Ajustez cette valeur selon vos besoins
          const knockbackAngle = angleToEnemy; // Angle opposé à l'attaque
          enemy.knockbackX = Math.cos(knockbackAngle) * knockbackDistance;
          enemy.knockbackY = Math.sin(knockbackAngle) * knockbackDistance;
          enemy.knockbackTime = 50; // Durée du recul en millisecondes
        } else {
          // Appliquer le recul
          const knockbackDistance = this.knockbackDistance; // Ajustez cette valeur selon vos besoins
          const knockbackAngle = angleToEnemy; // Angle opposé à l'attaque
          enemy.knockbackX = Math.cos(knockbackAngle) * knockbackDistance;
          enemy.knockbackY = Math.sin(knockbackAngle) * knockbackDistance;
          enemy.knockbackTime = 50; // Durée du recul en millisecondes
        }
      }
    });
  }

  takeDamage(damage) {
    if (this.invincible) return;
    this.invincible = true;
    this.scene.cameras.main.shake(100, 0.01);
    this.health -= damage;
    console.log(this.health);
    if (this.health <= 0) {
      this.destroy();
    }

    this.scene.time.delayedCall(1000, () => {
      this.invincible = false;
    });
  }

  roll() {
    if (this.rollActive || this.rollCooldownTimer > 0) return; // Empêcher la roulade si déjà en cours ou en cooldown
    console.log("Roulade");
    this.rollActive = true;

    const rollDistance = this.rollDistance;
    const rollDuration = this.rollDuration;

    // Calculer la direction de la roulade
    const rollDirection = new Phaser.Math.Vector2(
      this.body.velocity
    ).normalize();

    const rotationAngle = rollDirection.x < 0 ? -360 : 360;

    // Appliquer la roulade
    this.rollTween = this.scene.tweens.add({
      targets: this,
      x: this.x + rollDirection.x * rollDistance,
      y: this.y + rollDirection.y * rollDistance,
      duration: rollDuration,
      onComplete: () => {
        this.rollCooldownTimer = this.rollCooldown;
        this.rollActive = false;
      },
    });

    this.scene.tweens.add({
      targets: this,
      spriteAngle: rotationAngle,
      duration: rollDuration,
      ease: "Sine.easeInOut",
      onUpdate: () => {
        this.setRotation(Phaser.Math.DegToRad(this.spriteAngle));
      },
      onComplete: () => {
        this.spriteAngle = 0; // Réinitialiser l'angle de rotation
        this.setRotation(0); // Réinitialiser la rotation du sprite
      },
    });
  }

  stopRoll() {
    if (this.rollActive) {
      if (this.rollTween) {
        this.rollTween.stop();
      }
      this.rollActive = false;
      this.rollCooldownTimer = this.rollCooldown;
      setTimeout(() => {
        this.rollCooldownTimer = 0;
      }, this.rollCooldown);
    }
  }

  dash() {
    if (this.dashActive || this.dashCooldownTimer > 0) return; // Empêcher le dash si déjà en cours
    console.log("Dash");
    this.dashActive = true;
    this.invincible = true; // Rendre le joueur invincible pendant le dash

    // Calculer la direction du dash
    const dashDirection = new Phaser.Math.Vector2(
      this.body.velocity
    ).normalize();

    const dashDistance = this.dashDistance;
    const dashDuration = 100; // Durée très courte pour donner l'impression de téléportation

    // Appliquer le dash avec easing
    this.dashTween = this.scene.tweens.add({
      targets: this,
      x: this.x + dashDirection.x * dashDistance,
      y: this.y + dashDirection.y * dashDistance,
      duration: dashDuration,
      ease: "Sine.easeInOut", // Ajouter easing
      onComplete: () => {
        this.dashCooldownTimer = this.dashCooldown;
        this.dashActive = false;
        this.invincible = false; // Rendre le joueur vulnérable après le dash
      },
    });

    this.scene.time.delayedCall(50, () => {
      const dashSprite = this.scene.add.sprite(this.x, this.y, "dashSprite");
      dashSprite.setScale(0.4);
      dashSprite.setOrigin(0.25, 0.5);
      dashSprite.setRotation(dashDirection.angle());

      this.scene.tweens.add({
        targets: dashSprite,
        alpha: { from: 1, to: 0 },
        duration: 200,
        onComplete: () => {
          dashSprite.destroy(); // Détruire le sprite après l'animation
        },
      });
    });

    // Vérification de collision avec les murs pendant le dash
    this.scene.physics.world.collide(this, this.scene.wallsLayer, () => {
      this.stopDash();
    });
  }

  stopDash() {
    if (this.dashTween) {
      this.dashTween.stop();
    }
    this.dashActive = false;
    this.invincible = false; // Rendre le joueur vulnérable après le dash
    this.dashCooldownTimer = this.dashCooldown;
    setTimeout(() => {
      this.dashCooldownTimer = 0;
    }, this.dashCooldown);
  }
}
