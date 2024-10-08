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
    this.health = 7;

    this.attackDelay = 2000;
    this.attacking = false;
    this.attackingFireWall = false;

    // Démarrer l'attaque après un délai initial
    this.scheduleNextAttack();
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
    const attacks = [
      // ! Penser à décommenter les attaques
      this.attack1,
      this.attack2,
      this.attack3,
      // this.attack4
    ];
    const randomAttack = Phaser.Math.RND.pick(attacks);
    randomAttack.call(this, player);
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
      "ennemy1",
      "ennemy2",
      "ennemy3",
      "ennemy4",
      "ennemy5",
    ];

    // Générer un nombre aléatoire d'ennemis entre 3 et 6
    const numEnemies = Phaser.Math.Between(3, 6);
    const minDistance = 250; // Distance minimale en pixels
    const maxDistance = 350; // Distance maximale en pixels

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
    this.scene.time.delayedCall(5000, () => {
      this.attacking = false;
    });
  }

  attack3(player) {
    console.log("attack3");
    this.attacking = true;
    // TODO : Attaque de vent avec des tornades (zone ronde un peu partout, font des dégats sur la durée et se dirige vers le joueur lentement)

    const numTornados = Phaser.Math.Between(3, 5); // Nombre aléatoire de tornades
    const tornadoSpeed = 50; // Vitesse de la tornade
    const tornadoDamage = 1; // Dégâts infligés par la tornade
    const tornadoDuration = 5000; // Durée de vie des tornades (5 secondes)
    const tornados = []; // Tableau pour stocker les tornades

    // Générer plusieurs tornades
    for (let i = 0; i < numTornados; i++) {
      // Position aléatoire autour du joueur
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const distance = Phaser.Math.Between(200, 300); // Distance initiale de la tornade
      const tornadoX = player.x + Math.cos(angle) * distance;
      const tornadoY = player.y + Math.sin(angle) * distance;

      // Créer une tornade
      const tornado = this.scene.physics.add.sprite(
        tornadoX,
        tornadoY,
        "tornado"
      );
      tornado.setScale(0.1); // ! Ajuster l'échelle de la tornade
      tornado.setAlpha(0.8); // Légèrement transparent pour un effet visuel
      tornados.push(tornado); // Ajouter la tornade au tableau

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

    this.scene.time.delayedCall(2500, () => {
      this.attacking = false;
    });
  }

  attack4(player) {
    console.log("attack4");
    this.attacking = true;
    // TODO : Attaque d'eau, geysers qui sortent du sol et font des dégats d'un seul coup (un peu comme l'explosion de l'ennemi 4)
    // Implémentez l'attaque 4 ici
    // Simuler la fin de l'attaque après un délai
    this.scene.time.delayedCall(1000, () => {
      this.attacking = false;
    });
  }

  spawnFireWall(player) {
    if (this.attackingFireWall) return;
    if (!this.scene || !this.active) return;
    this.attackingFireWall = true;

    // Définir les positions possibles des murs (ajustez les valeurs selon la largeur de la salle)
    const wallPositions = [
      this.scene.scale.width * 0.17,
      this.scene.scale.width * 0.5,
      this.scene.scale.width * 0.83,
    ];

    let previousPosition = null;
    let spawnCount = 0;

    const spawnWall = () => {
      if (!this.scene || !this.active) return;
      if (spawnCount >= 6) {
        this.attackingFireWall = false;
        this.scene.time.delayedCall(1000, () => {
          this.attacking = false;
        });
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
        100,
        "fireWall"
      ); // Positionner le mur au-dessus de la carte
      wall.setScale(1.1, 0.5); // Ajustez l'échelle pour que le mur soit plus large et moins haut
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

  dead() {
    this.destroy();
  }
}
