import Player from "../objects/player.js";
import Ennemy1 from "../objects/ennemy1.js";
import Ennemy2 from "../objects/ennemy2.js";
import Ennemy3 from "../objects/ennemy3.js";
import Ennemy4 from "../objects/ennemy4.js";
import Ennemy5 from "../objects/ennemy5.js";
import Boss from "../objects/boss.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super({ key: "Level" });
  }

  preload() {
    this.load.image("player", "src/assets/playerIdle.png");
    this.load.image("attackSprite", "src/assets/attackSprite.png");
    this.load.image("dashSprite", "src/assets/dashSprite.png");
    this.load.image("ennemy1", "src/assets/ennemy1Idle.png");
    this.load.image("ennemy2", "src/assets/ennemy2Idle.png");
    this.load.image("ennemy3", "src/assets/ennemy3Idle.png");
    this.load.image("ennemy4", "src/assets/ennemy4Idle.png");
    this.load.image("ennemy4_blink", "src/assets/ennemy4Blink.png");
    this.load.image("ennemy5", "src/assets/ennemy5Idle.png");
    this.load.image("projectile", "src/assets/projectile.png");
    this.load.spritesheet("explosion", "src/assets/explosionAnim.png", {
      frameWidth: 65,
      frameHeight: 65,
    });
    this.load.spritesheet("blood", "src/assets/bloodAnim.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("boss", "src/assets/boss.png");
    this.load.image("fireWall", "src/assets/fireWall.jpeg");
    this.load.image("tornado", "src/assets/tornado.jpg");
    this.load.image("upgrade1", "src/assets/upgrade1.png");
    this.load.image("upgrade2", "src/assets/upgrade2.png");
    this.load.image("upgrade3", "src/assets/upgrade3.png");
    this.load.image("upgrade4", "src/assets/upgrade4.png");
  }

  create() {
    const { width, height } = this.scale;
    this.player = new Player(this, width / 2, height / 2, "player");
    this.scene.launch("Interface", { player: this.player });
    this.ennemies = this.physics.add.group();
    // this.ennemies.add(new Ennemy1(this, 100, 100, "ennemy1"));
    // this.ennemies.add(new Ennemy2(this, 200, 200, "ennemy2"));
    // this.ennemies.add(new Ennemy3(this, 300, 300, "ennemy3"));
    // this.ennemies.add(new Ennemy4(this, 400, 100, "ennemy4"));
    // this.ennemies.add(new Ennemy5(this, 500, 200, "ennemy5"));
    // this.ennemies.add(new Boss(this, width / 2, 100, "boss"));
    this.projectiles = this.physics.add.group();
    this.explosions = this.add.group();

    // Gérer les contrôles
    this.cursors = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // Gérer la souris
    this.pointer = this.input.activePointer;

    // Afficher les upgrades toutes les 10 secondes
    // this.time.addEvent({
    //   delay: 10000,
    //   loop: true,
    //   callback: this.showUpgrades,
    //   callbackScope: this,
    // });

    // Initialiser les étages et les vagues
    this.stageIndex = 0;
    this.totalStages = 10; // 10 étages
    this.wavesPerStage = 2; // 2 vagues par étage le premier étage puis +1 tout les 2 étages
    this.enemiesPerWave = [3, 4, 5, 6]; // Nombre d'ennemis par vague
    this.waveInterval = 5000; // Intervalle entre chaque vague en millisecondes
    this.spawnInterval = 100; // Intervalle de spawn en millisecondes
    this.spawnRadius = 300; // Rayon de spawn autour du joueur

    this.isWaveActive = false;
    this.isStageActive = false;

    this.startNextStage(); // ! À décommenter pour lancer le jeu

    this.anims.create({
      key: "bloodAnim",
      frames: this.anims.generateFrameNumbers("blood", {
        start: 2,
        end: 15,
      }),
      frameRate: 45,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 5,
      }),
      frameRate: 30,
      repeat: 0,
    });
  }

  update() {
    // Mettre à jour les objets (joueur, ennemis)
    this.player.update(this.cursors, this.pointer);
    if (this.ennemies.getChildren().length > 0) {
      this.ennemies.getChildren().forEach((ennemy) => {
        ennemy.update(this.player);
      });
    }

    // Si tous les ennemis de la vague actuelle ont été spawnés, désactiver le spawn d'ennemis pour cette vague
    if (this.spawnedEnemiesInWave >= this.currentWaveEnemies) {
      this.isWaveActive = false;
    }

    // Vérifier si tous les ennemis de l'étage ont été éliminés
    // Vérifier si tous les ennemis de l'étage ont été éliminés
    if (
      this.isStageActive &&
      this.ennemies.countActive(true) === 0 && // Vérifier si tous les ennemis sont morts
      this.waveIndex >= this.wavesPerStage
    ) {
      console.log("Tous les ennemis de l'étage ont été éliminés !");
      this.isStageActive = false;
      this.stageIndex++;
      this.startNextStage(); // Passer au prochain étage uniquement si toutes les conditions sont remplies
    }
  }

  startNextStage() {
    console.log(
      `Étape actuelle: ${this.stageIndex}, Étapes totales: ${this.totalStages}`
    );
    if (this.stageIndex >= this.totalStages) {
      console.log("Tous les étages ont été complétés !");
      return;
    }

    if (!this.isStageActive && this.stageIndex > 0) {
      // Si l'étage est terminé, afficher les améliorations
      this.showUpgrades(() => {
        // Afficher le texte de l'étage après la sélection des améliorations
        this.scene.get("Interface").showStageText(this.stageIndex + 1, () => {
          this.startNextWave();
        });
      });
    }

    console.log(`Début de l'étage ${this.stageIndex + 1}`);

    this.waveIndex = 0;

    if (this.stageIndex % 2 === 0 && this.stageIndex > 0) {
      this.wavesPerStage++;
    }

    this.isStageActive = true;

    // Afficher le texte de l'étage avant de lancer la première vague
    if (this.stageIndex == 0) {
      this.scene.get("Interface").showStageText(this.stageIndex + 1, () => {
        this.startNextWave();
      });
    }
  }

  startNextWave() {
    console.log(
      `Vague actuelle: ${this.waveIndex}, Vagues par étage: ${this.wavesPerStage}`
    );
    if (this.waveIndex >= this.wavesPerStage) {
      console.log("Toutes les vagues de l'étage ont été complétées !");
      return; // Ne plus lancer de nouvelles vagues pour cet étage
    }

    console.log(`Début de la vague ${this.waveIndex + 1}`);

    this.currentWaveEnemies =
      this.enemiesPerWave[
        Phaser.Math.Between(0, this.enemiesPerWave.length - 1)
      ];
    this.spawnedEnemiesInWave = 0;
    this.remainingEnemiesInWave = this.currentWaveEnemies;

    this.isWaveActive = true;

    // Lancer un intervalle pour le spawn des ennemis
    for (let i = 0; i < this.currentWaveEnemies; i++) {
      this.time.delayedCall(i * this.spawnInterval, this.spawnEnemy, [], this);
    }

    // Démarrer la vague suivante après le délai défini, que les ennemis soient morts ou non
    this.time.delayedCall(this.waveInterval, this.startNextWave, [], this);

    this.waveIndex++;
  }

  spawnEnemy() {
    if (this.spawnedEnemiesInWave >= this.currentWaveEnemies) {
      return;
    }

    const { width, height } = this.scale;
    const playerX = this.player.x;
    const playerY = this.player.y;

    let x, y;
    do {
      x = Phaser.Math.Between(
        playerX - this.spawnRadius,
        playerX + this.spawnRadius
      );
      y = Phaser.Math.Between(
        playerY - this.spawnRadius,
        playerY + this.spawnRadius
      );
    } while (x < 0 || x > width || y < 0 || y > height);

    // Créer un portail avant de faire apparaître l'ennemi
    const portal = this.add.sprite(x, y, "portal");
    this.time.delayedCall(1000, () => {
      portal.destroy();
      this.createEnemy(x, y);
    });

    this.spawnedEnemiesInWave++;
  }

  createEnemy(x, y) {
    let enemy;
    if (this.stageIndex === 0 || this.stageIndex === 1) {
      const enemyType = Phaser.Math.Between(1, 2);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, "ennemy1");
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, "ennemy2");
          break;
      }
    } else if (this.stageIndex === 2 || this.stageIndex === 3) {
      const enemyType = Phaser.Math.Between(1, 3);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, "ennemy1");
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, "ennemy2");
          break;
        case 3:
          enemy = new Ennemy3(this, x, y, "ennemy3");
          break;
      }
    } else if (this.stageIndex === 4 || this.stageIndex === 5) {
      const enemyType = Phaser.Math.Between(1, 4);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, "ennemy1");
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, "ennemy2");
          break;
        case 3:
          enemy = new Ennemy3(this, x, y, "ennemy3");
          break;
        case 4:
          enemy = new Ennemy4(this, x, y, "ennemy4");
          break;
      }
    } else {
      const enemyType = Phaser.Math.Between(1, 5);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, "ennemy1");
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, "ennemy2");
          break;
        case 3:
          enemy = new Ennemy3(this, x, y, "ennemy3");
          break;
        case 4:
          enemy = new Ennemy4(this, x, y, "ennemy4");
          break;
        case 5:
          enemy = new Ennemy5(this, x, y, "ennemy5");
          break;
      }
    }

    this.ennemies.add(enemy);
  }

  physicsOverlapCirc(x, y, radius, callback) {
    const objects = this.physics.overlapCirc(x, y, radius);
    objects.forEach((object) => {
      callback(object.gameObject);
    });
  }

  showUpgrades(callback) {
    // Mettre le jeu en pause
    this.scene.pause();

    // Lancer la scène des améliorations
    this.scene.launch("UpgradeScene", { player: this.player });

    // Écouter l'événement de fermeture de la scène des améliorations
    this.scene.get("UpgradeScene").events.once("shutdown", () => {
      // Reprendre le jeu
      this.scene.resume();

      // Appeler le callback pour lancer l'animation de texte de l'étage
      if (callback) {
        callback();
      }
    });
  }
}
