export default class Enemy5 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.08); // Ajuster la taille si nécessaire

    this.damage = 6;
    this.health = 9;

    this.speed = 25;
    this.shootDelay = 3000;
    this.canShoot = true;
    this.canMove = true;

    // Propriétés du laser
    this.laserWarningDuration = 2000; // 2 secondes de suivi
    this.laserLockDuration = 1000; // 1 seconde de blocage avant le tir
    this.laserGraphics = this.scene.add.graphics({
      lineStyle: { width: 2, color: 0xff0000 },
    });
    this.laserAngle = 0;
    this.lockedLaserAngle = 0;
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

    // Déplacement en fonction de la distance
    if (this.canMove) {
      if (distance > 400) {
        this.scene.physics.moveTo(this, player.x, player.y, this.speed);
      } else if (distance < 350) {
        this.scene.physics.moveTo(this, player.x, player.y, -this.speed);
      }
    } else {
      this.scene.physics.moveTo(this, player.x, player.y, 0);
    }

    // Animation de l'ennemi
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
    if (!this.scene || !this.active) return;
    if (this.canShoot) {
      console.log("Préparation du tir laser");
      this.canShoot = false;
      this.canMove = false;

      // Dessiner le trait fin qui suit le joueur pendant 2 secondes
      this.scene.time.addEvent({
        delay: 50,
        repeat: this.laserWarningDuration / 50,
        callback: () => {
          this.laserAngle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            player.x,
            player.y
          );

          // Calculer les coordonnées de départ avec un offset
          const offset = 35; // Pour que le laser parte devant l'ennemie et pas depuis le centre
          const startX = this.x + Math.cos(this.laserAngle) * offset;
          const startY = this.y + Math.sin(this.laserAngle) * offset;

          this.laserGraphics.clear();
          this.laserGraphics.lineStyle(2, 0xff0000);
          this.laserGraphics.beginPath();
          this.laserGraphics.moveTo(startX, startY);
          this.laserGraphics.lineTo(
            startX + Math.cos(this.laserAngle) * 1000,
            startY + Math.sin(this.laserAngle) * 1000
          );
          this.laserGraphics.strokePath();
          this.laserGraphics.closePath();
        },
      });

      // Après 2 secondes, bloquer l'angle du laser
      this.scene.time.addEvent({
        delay: this.laserWarningDuration,
        callback: () => {
          if (!this.scene || !this.active) return;
          console.log("Laser bloqué");
          this.lockedLaserAngle = this.laserAngle; // Verrouiller l'angle du laser

          // Effacer l'ancien laser fin et maintenir l'angle bloqué pendant 1 seconde
          this.scene.time.addEvent({
            delay: this.laserLockDuration,
            callback: () => {
              if (!this.scene || !this.active) return;
              console.log("Tir laser");
              this.laserGraphics.clear();
              this.fireLaser(player); // Tir du vrai laser après le blocage de l'angle

              // Réactiver la capacité de tirer après un délai
              this.scene.time.delayedCall(this.shootDelay, () => {
                this.canShoot = true;
              });
            },
          });
        },
      });
    }
  }

  fireLaser(player) {
    if (!this.scene || !this.active) return;
    // Créer le laser final qui inflige des dégâts au joueur
    const laserLength = 1000;
    const offset = 35; // Pour que le laser parte devant l'ennemie et pas depuis le centre
    const startX = this.x + Math.cos(this.lockedLaserAngle) * offset;
    const startY = this.y + Math.sin(this.lockedLaserAngle) * offset;
    const endX = startX + Math.cos(this.lockedLaserAngle) * laserLength;
    const endY = startY + Math.sin(this.lockedLaserAngle) * laserLength;

    const laser = this.scene.add.graphics({
      lineStyle: { width: 10, color: 0xff0000 },
    });

    laser.beginPath();
    laser.moveTo(startX, startY);
    laser.lineTo(endX, endY);
    laser.strokePath();
    laser.closePath();

    // Représenter le laser sous forme de ligne pour la détection
    const laserLine = new Phaser.Geom.Line(startX, startY, endX, endY);

    // Vérifier la collision avec le joueur
    if (Phaser.Geom.Intersects.LineToRectangle(laserLine, player.getBounds())) {
      player.takeDamage(this.damage);
    }

    // Supprimer le laser après 500ms
    this.scene.time.delayedCall(500, () => {
      laser.destroy();
      this.canMove = true;
    });
  }

  cleanup() {
    if (this.laserGraphics) {
      this.laserGraphics.clear();
      this.laserGraphics.destroy();
    }
  }

  dead() {
    this.cleanup();
    this.destroy();
  }
}
