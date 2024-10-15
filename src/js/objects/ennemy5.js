export default class Enemy5 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.15); // Ajuster la taille si nécessaire

    this.damage = 4;
    this.health = 9;

    this.speed = 25;
    this.shootDelay = 3000;
    this.canShoot = true;
    this.canMove = true;

    this.knockbackX = 0;
    this.knockbackY = 0;
    this.knockbackTime = 0;

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
        this.setScale(0.15, 0.15 * (1 + 0.1 * Math.sin(time) * scaleFactor));
      } else {
        this.setScale(0.15);
      }

      // Tirer
      this.shoot(player);
    }
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
    const laserWidth = 50; // Augmenter l'épaisseur du laser
    const startX = this.x + Math.cos(this.lockedLaserAngle) * offset;
    const startY = this.y + Math.sin(this.lockedLaserAngle) * offset;
    const endX = startX + Math.cos(this.lockedLaserAngle) * laserLength;
    const endY = startY + Math.sin(this.lockedLaserAngle) * laserLength;

    const laser = this.scene.add.graphics({
      lineStyle: { width: laserWidth, color: 0xff0000 },
    });

    laser.beginPath();
    laser.moveTo(startX, startY);
    laser.lineTo(endX, endY);
    laser.strokePath();
    laser.closePath();

    // Représenter le laser sous forme de polygone pour la détection
    const halfWidth = laserWidth / 2;
    const anglePerpendicular = this.lockedLaserAngle + Math.PI / 2;

    const points = [
      new Phaser.Geom.Point(
        startX + Math.cos(anglePerpendicular) * halfWidth,
        startY + Math.sin(anglePerpendicular) * halfWidth
      ),
      new Phaser.Geom.Point(
        startX - Math.cos(anglePerpendicular) * halfWidth,
        startY - Math.sin(anglePerpendicular) * halfWidth
      ),
      new Phaser.Geom.Point(
        endX - Math.cos(anglePerpendicular) * halfWidth,
        endY - Math.sin(anglePerpendicular) * halfWidth
      ),
      new Phaser.Geom.Point(
        endX + Math.cos(anglePerpendicular) * halfWidth,
        endY + Math.sin(anglePerpendicular) * halfWidth
      ),
    ];

    const laserPolygon = new Phaser.Geom.Polygon(points);

    // Dessiner le polygone de collision pour le débogage
    const debugGraphics = this.scene.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
    });
    debugGraphics.strokePoints(points, true);

    // Convertir le rectangle du joueur en polygone
    const playerBounds = player.getBounds();
    const playerPoints = [
      new Phaser.Geom.Point(playerBounds.x, playerBounds.y),
      new Phaser.Geom.Point(
        playerBounds.x + playerBounds.width,
        playerBounds.y
      ),
      new Phaser.Geom.Point(
        playerBounds.x + playerBounds.width,
        playerBounds.y + playerBounds.height
      ),
      new Phaser.Geom.Point(
        playerBounds.x,
        playerBounds.y + playerBounds.height
      ),
    ];
    const playerPolygon = new Phaser.Geom.Polygon(playerPoints);

    // Vérifier la collision avec le joueur
    let collisionDetected = false;
    for (const point of playerPoints) {
      if (Phaser.Geom.Polygon.ContainsPoint(laserPolygon, point)) {
        collisionDetected = true;
        break;
      }
    }

    if (collisionDetected) {
      player.takeDamage(this.damage);
    }

    // Supprimer le laser et le polygone de débogage après 500ms
    this.scene.time.delayedCall(500, () => {
      laser.destroy();
      debugGraphics.destroy();
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
