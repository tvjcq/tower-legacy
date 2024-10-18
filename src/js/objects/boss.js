import Ennemy1 from "./ennemy1.js";
import Ennemy2 from "./ennemy2.js";
import Ennemy3 from "./ennemy3.js";
import Ennemy4 from "./ennemy4.js";
import Ennemy5 from "./ennemy5.js";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(1, 0.5); // ! À CHANGER

    this.damage = 2;
    this.health = 500;

    this.attackDelay = 2000;
    this.attacking = false;
    this.attackingFireWall = false;

    this.spawnEnnemiesDelay = 5000;

    // Démarrer l'attaque après un délai initial
    this.scheduleNextAttack();

    this.scene.registry.events.emit("bossSpawned");
  }

  update(player) {}

  scheduleNextAttack() {
    if (!this.scene || !this.active) return;
    this.scene.time.addEvent({
      delay: this.attackDelay,
      callback: () => {
        if (!this.attacking) {
          this.chooseRandomAttack(this.scene.player);
        }
        this.scheduleNextAttack();
      },
      callbackScope: this,
    });
  }

  chooseRandomAttack(player) {
    console.log("chooseRandomAttack");
    const attacks = [this.attack1, this.attack2, this.attack3, this.attack4];
    const randomAttack = Phaser.Math.RND.pick(attacks);
    this.scene.sound.play("bossAttackSound", { volume: 0.1 }); // Son d'attaque du boss
    switch (randomAttack) {
      case this.attack1:
        const originalTexture = this.texture.key;
        const alternateTexture = "bossAttack1"; // Remplacez par la texture souhaitée
        const textureChangeInterval = 200; // Intervalle de changement de texture en millisecondes
        const textureChangeCount = 5; // Nombre de changements de texture

        let changeCount = 0;
        const changeTexture = () => {
          if (changeCount >= textureChangeCount) {
            this.setTexture(originalTexture); // Remettre la texture originale
            randomAttack.call(this, player); // Lancer l'attaque après les changements de texture
            return;
          }

          this.setTexture(
            this.texture.key === originalTexture
              ? alternateTexture
              : originalTexture
          );
          changeCount++;
          this.scene.time.delayedCall(
            textureChangeInterval,
            changeTexture,
            [],
            this
          );
        };

        changeTexture();
        break;
      case this.attack2:
        const originalTexture1 = this.texture.key;
        const alternateTexture1 = "bossAttack2"; // Remplacez par la texture souhaitée
        const textureChangeInterval1 = 200; // Intervalle de changement de texture en millisecondes
        const textureChangeCount1 = 5; // Nombre de changements de texture

        let changeCount1 = 0;
        const changeTexture1 = () => {
          if (changeCount1 >= textureChangeCount1) {
            this.setTexture(originalTexture1); // Remettre la texture originale
            randomAttack.call(this, player); // Lancer l'attaque après les changements de texture
            return;
          }

          this.setTexture(
            this.texture.key === originalTexture1
              ? alternateTexture1
              : originalTexture1
          );
          changeCount1++;
          this.scene.time.delayedCall(
            textureChangeInterval1,
            changeTexture1,
            [],
            this
          );
        };

        changeTexture1();
        break;
      case this.attack3:
        const originalTexture2 = this.texture.key;
        const alternateTexture2 = "bossAttack3"; // Remplacez par la texture souhaitée
        const textureChangeInterval2 = 200; // Intervalle de changement de texture en millisecondes
        const textureChangeCount2 = 5; // Nombre de changements de texture

        let changeCount2 = 0;
        const changeTexture2 = () => {
          if (changeCount2 >= textureChangeCount2) {
            this.setTexture(originalTexture2); // Remettre la texture originale
            randomAttack.call(this, player); // Lancer l'attaque après les changements de texture
            return;
          }

          this.setTexture(
            this.texture.key === originalTexture2
              ? alternateTexture2
              : originalTexture2
          );
          changeCount2++;
          this.scene.time.delayedCall(
            textureChangeInterval2,
            changeTexture2,
            [],
            this
          );
        };

        changeTexture2();
        break;
      case this.attack4:
        const originalTexture3 = this.texture.key;
        const alternateTexture3 = "bossAttack4"; // Remplacez par la texture souhaitée
        const textureChangeInterval3 = 200; // Intervalle de changement de texture en millisecondes
        const textureChangeCount3 = 5; // Nombre de changements de texture

        let changeCount3 = 0;
        const changeTexture3 = () => {
          if (changeCount3 >= textureChangeCount3) {
            this.setTexture(originalTexture3); // Remettre la texture originale
            randomAttack.call(this, player); // Lancer l'attaque après les changements de texture
            return;
          }

          this.setTexture(
            this.texture.key === originalTexture3
              ? alternateTexture3
              : originalTexture3
          );
          changeCount3++;
          this.scene.time.delayedCall(
            textureChangeInterval3,
            changeTexture3,
            [],
            this
          );
        };

        changeTexture3();
        break;
    }

    setTimeout(() => randomAttack.call(this, player), 1000);
  }

  attack1(player) {
    console.log("attack1");
    this.attacking = true;
    this.spawnFireWall(player);
  }

  attack2(player) {
    // TODO : Faire que ce sois des ennemies de terre qui spawn
    console.log("attack2");
    this.attacking = true;

    // Tableau des classes d'ennemis disponibles
    const enemyClasses = [Ennemy1, Ennemy2, Ennemy3, Ennemy4, Ennemy5];
    const ennemyTexture = [
      "ennemy1Earth",
      "ennemy2Earth",
      "ennemy3Earth",
      "ennemy4Earth",
      "ennemy5Earth",
    ];

    // Générer un nombre aléatoire d'ennemis entre 3 et 6
    const numEnemies = Phaser.Math.Between(3, 6);
    const minDistance = 450; // Distance minimale en pixels
    const maxDistance = 650; // Distance maximale en pixels

    // Obtenir les dimensions de la carte
    const mapWidth = this.scene.physics.world.bounds.width;
    const mapHeight = this.scene.physics.world.bounds.height;

    for (let i = 0; i < numEnemies; i++) {
      // Choisir une classe d'ennemi aléatoire
      const ennemyNumber = Phaser.Math.Between(0, enemyClasses.length - 1);
      const EnemyClass = enemyClasses[ennemyNumber];
      const EnemyTexture = ennemyTexture[ennemyNumber];

      // Générer une position aléatoire dans un cercle autour du joueur
      let enemyX, enemyY;
      do {
        const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const distance = Phaser.Math.FloatBetween(minDistance, maxDistance);
        enemyX = player.x + Math.cos(angle) * distance;
        enemyY = player.y + Math.sin(angle) * distance;
      } while (
        enemyX < 0 ||
        enemyX > mapWidth ||
        enemyY < 0 ||
        enemyY > mapHeight
      );

      // Ajouter un délai pour l'apparition de chaque ennemi
      this.scene.time.delayedCall(i * 250, () => {
        // Créer un ennemi et l'ajouter à la scène
        const enemy = new EnemyClass(this.scene, enemyX, enemyY, EnemyTexture);
        this.scene.add.existing(enemy);
        this.scene.physics.add.existing(enemy);

        // Ajouter l'ennemi au groupe de physique de la scène
        this.scene.ennemies.add(enemy);
      });
    }

    // Simuler la fin de l'attaque après un délai
    this.scene.time.delayedCall(this.spawnEnnemiesDelay, () => {
      this.attacking = false;
    });
  }

  attack3(player) {
    console.log("attack3");
    this.attacking = true;

    const numTornados = Phaser.Math.Between(3, 5); // Nombre aléatoire de tornades
    const tornadoSpeed = 150; // Vitesse de la tornade
    const tornadoDamage = 1; // Dégâts infligés par la tornade
    const tornadoDuration = 5000; // Durée de vie des tornades (5 secondes)
    const tornados = []; // Tableau pour stocker les tornades

    // Générer plusieurs tornades
    for (let i = 0; i < numTornados; i++) {
      // Position aléatoire autour du joueur
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const distance = Phaser.Math.Between(600, 900); // Distance initiale de la tornade
      const tornadoX = player.x + Math.cos(angle) * distance;
      const tornadoY = player.y + Math.sin(angle) * distance;

      // Créer une tornade
      const tornado = this.scene.physics.add.sprite(
        tornadoX,
        tornadoY,
        "tornado"
      );
      tornado.setScale(0.25); // ! Ajuster l'échelle de la tornade
      tornado.setSize(250, 250); // Ajuster la taille de la zone de collision
      tornado.setAlpha(0.8); // Légèrement transparent pour un effet visuel
      tornados.push(tornado); // Ajouter la tornade au tableau

      // Faire tourner les tornades
      this.scene.tweens.add({
        targets: tornado,
        angle: 360,
        duration: 2000,
        repeat: -1, // Rotation continue
      });
      // Gérer les dégâts de la tornade si elle touche le joueur
      const damageLoop = this.scene.time.addEvent({
        delay: 500, // Les dégâts sont infligés toutes les 0.5 secondes si le joueur est à l'intérieur
        callback: () => {
          if (this.scene.physics.overlap(tornado, player)) {
            player.takeDamage(tornadoDamage); // Infliger des dégâts au joueur
          }
        },
        loop: true,
      });

      // Détruire la tornade après sa durée de vie
      this.scene.time.delayedCall(tornadoDuration, () => {
        tornado.destroy();
        damageLoop.remove(false); // Arrêter les dégâts de la tornade
      });
    }

    // Faire suivre les tornades au joueur en continu
    this.scene.time.addEvent({
      delay: 100, // Actualiser la direction des tornades toutes les 0.1 secondes
      callback: () => {
        tornados.forEach((tornado) => {
          if (tornado.active) {
            this.scene.physics.moveTo(
              tornado,
              player.x,
              player.y,
              tornadoSpeed
            );
          }
        });
      },
      loop: true,
    });

    this.attacking = false;
  }

  attack4(player) {
    console.log("attack4");
    this.attacking = true;

    const numGeysers = Phaser.Math.Between(5, 8); // Nombre aléatoire de geysers
    const warningDuration = 2000; // Durée pendant laquelle l'image clignote (1 seconde)
    const explosionDuration = 500; // Durée de l'animation d'explosion
    const explosionDamage = 3; // Dégâts de l'explosion
    const geysers = []; // Tableau pour stocker les geysers

    // Créer plusieurs geysers
    for (let i = 0; i < numGeysers; i++) {
      // Générer une position aléatoire autour du joueur
      const geyserX = Phaser.Math.Between(player.x - 400, player.x + 400);
      const geyserY = Phaser.Math.Between(player.y - 400, player.y + 400);

      // Ajouter une image de pré-attaque clignotante (ex : un cercle)
      const warning = this.scene.add.sprite(geyserX, geyserY, "warningImage");
      warning.setScale(0.3); // Ajuster l'échelle de l'image
      warning.setAlpha(0.5); // Semi-transparent
      this.scene.tweens.add({
        targets: warning,
        alpha: { from: 0.5, to: 1 },
        duration: 200,
        yoyo: true,
        repeat: -1, // Clignotement
      });

      // Après un délai, remplacer l'image clignotante par une explosion
      this.scene.time.delayedCall(warningDuration, () => {
        warning.destroy(); // Supprimer l'image de pré-attaque

        // Créer une explosion à la place
        const explosion = this.scene.add.sprite(
          geyserX,
          geyserY,
          "explosionWater"
        );
        explosion.setScale(1); // Ajuster l'échelle de l'explosion
        explosion.play("explosionWater"); // Jouer l'animation d'explosion

        // Gérer les dégâts si le joueur est à proximité
        const explosionArea = this.scene.physics.add.sprite(
          geyserX - 50,
          geyserY - 70
        );
        explosionArea.setCircle(75); // Ajuster la zone d'effet de l'explosion

        this.scene.physics.add.overlap(explosionArea, player, () => {
          player.takeDamage(explosionDamage);
        });

        // Détruire l'explosion après l'animation
        this.scene.time.delayedCall(explosionDuration, () => {
          explosion.destroy();
          explosionArea.destroy(); // Supprimer la zone d'explosion
        });
      });
    }

    // Fin de l'attaque après un délai
    this.scene.time.delayedCall(2000, () => {
      this.attacking = false;
    });
  }

  spawnFireWall(player) {
    if (this.attackingFireWall) return;
    if (!this.scene || !this.active) return;
    this.attackingFireWall = true;

    // Définir les positions possibles des murs (ajustez les valeurs selon la largeur de la salle)
    const wallPositions = [
      12500, // Gauche
      13000, // Centre
      13550, // Droite
    ];

    let previousPosition = null;
    let spawnCount = 0;

    const spawnWall = () => {
      if (!this.scene || !this.active) return;
      if (spawnCount >= 6) {
        this.attackingFireWall = false;
        this.attacking = false;
        return;
      }

      // Choisir une position aléatoire pour le mur qui n'est pas la même que la précédente
      let randomPosition;
      do {
        randomPosition = Phaser.Math.RND.pick(wallPositions);
      } while (randomPosition === previousPosition);

      previousPosition = randomPosition;

      // Créer le mur
      const wall = this.scene.physics.add.sprite(
        randomPosition,
        1234,
        "fireWall"
      ); // Positionner le mur au-dessus de la carte
      wall.setScale(1.25, 1); // Ajustez l'échelle pour que le mur soit plus large et moins haut
      wall.setVelocityY(200); // Ajustez la vitesse de descente du mur
      wall.setSize(wall.width, 50, true);
      wall.setOffset(0, wall.height - 50); // Ajustez l'offset pour que la collision se fasse au bas du mur

      // Détecter les collisions avec le joueur
      this.scene.physics.add.overlap(wall, player, () => {
        player.takeDamage(this.damage);
        wall.destroy(); // Détruire le mur après la collision
      });

      // Détruire le mur lorsqu'il sort de l'écran
      wall.setCollideWorldBounds(true);
      wall.body.onWorldBounds = true;
      this.scene.physics.world.on("worldbounds", (body) => {
        if (body.gameObject === wall) {
          wall.destroy();
        }
      });

      spawnCount++;
      this.scene.time.addEvent({
        delay: 1250,
        callback: spawnWall,
        callbackScope: this,
      });
    };

    spawnWall();
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.dead();
      this.scene.registry.events.emit("bosDeafeated");
    }
    this.scene.registry.events.emit("bossHealthUpdate", this.health);
  }

  dead() {
    // Faire trembler le boss
    this.scene.tweens.add({
      targets: this,
      x: this.x + 80,
      yoyo: true,
      repeat: 10,
      duration: 50,
      onComplete: () => {
        // Réduire l'échelle du boss à 0
        this.scene.tweens.add({
          targets: this,
          scaleX: 0,
          scaleY: 0,
          duration: 1000,
          onComplete: () => {
            // Lancer la scène de victoire
            this.scene.sound.stopAll();
            this.scene.scene.stop("Interface");
            this.scene.scene.start("VictoryScene");
          },
        });
      },
    });
  }
}
