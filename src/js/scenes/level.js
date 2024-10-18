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
    this.load.image("playerAttack", "src/assets/playerAttack.png");
    this.load.image("attackSprite", "src/assets/attackSprite.png");
    this.load.image("wandBullet", "src/assets/wandBullet.png");
    this.load.image("dashSprite", "src/assets/dashSprite.png");
    this.load.image("wand", "src/assets/wand.png");
    this.load.image("ennemy1Fire", "src/assets/ennemy1Fire.png");
    this.load.image("ennemy1Water", "src/assets/ennemy1Water.png");
    this.load.image("ennemy1Earth", "src/assets/ennemy1Earth.png");
    this.load.image("ennemy1Air", "src/assets/ennemy1Air.png");
    this.load.image("ennemy2Fire", "src/assets/ennemy2Fire.png");
    this.load.image("ennemy2Water", "src/assets/ennemy2Water.png");
    this.load.image("ennemy2Earth", "src/assets/ennemy2Earth.png");
    this.load.image("ennemy2Air", "src/assets/ennemy2Air.png");
    this.load.image("ennemy3Fire", "src/assets/ennemy3Fire.png");
    this.load.image("ennemy3Water", "src/assets/ennemy3Water.png");
    this.load.image("ennemy3Earth", "src/assets/ennemy3Earth.png");
    this.load.image("ennemy3Air", "src/assets/ennemy3Air.png");
    this.load.image("ennemy4Fire", "src/assets/ennemy4Fire.png");
    this.load.image("ennemy4BlinkFire", "src/assets/ennemy4BlinkFire.png");
    this.load.image("ennemy4Water", "src/assets/ennemy4Water.png");
    this.load.image("ennemy4BlinkWater", "src/assets/ennemy4BlinkWater.png");
    this.load.image("ennemy4Earth", "src/assets/ennemy4Earth.png");
    this.load.image("ennemy4BlinkEarth", "src/assets/ennemy4BlinkEarth.png");
    this.load.image("ennemy4Air", "src/assets/ennemy4Air.png");
    this.load.image("ennemy4BlinkAir", "src/assets/ennemy4BlinkAir.png");
    this.load.image("ennemy5Fire", "src/assets/ennemy5Fire.png");
    this.load.image("ennemy5Water", "src/assets/ennemy5Water.png");
    this.load.image("ennemy5Earth", "src/assets/ennemy5Earth.png");
    this.load.image("ennemy5Air", "src/assets/ennemy5Air.png");
    this.load.image("projectile", "src/assets/projectile.png");
    this.load.image("laser", "src/assets/laser.png");
    this.load.spritesheet("explosion", "src/assets/explosionAnim.png", {
      frameWidth: 65,
      frameHeight: 65,
    });
    this.load.spritesheet("explosionWater", "src/assets/explosionWater.png", {
      frameWidth: 142,
      frameHeight: 138,
    });

    this.load.spritesheet("blood", "src/assets/bloodAnim.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("portalFire", "src/assets/portalFire.png");
    this.load.image("portalWater", "src/assets/portalWater.png");
    this.load.image("portalEarth", "src/assets/portalEarth.png");
    this.load.image("portalAir", "src/assets/portalAir.png");
    this.load.image("boss", "src/assets/boss.png");
    this.load.image("bossAttack1", "src/assets/bossAttack1.png");
    this.load.image("bossAttack2", "src/assets/bossAttack2.png");
    this.load.image("bossAttack3", "src/assets/bossAttack3.png");
    this.load.image("bossAttack4", "src/assets/bossAttack4.png");
    this.load.image("fireWall", "src/assets/fireWall.png");
    this.load.image("tornado", "src/assets/tornado.png");
    this.load.image("warningImage", "src/assets/warningImage.png");
    this.load.image("upgrade1", "src/assets/upgrade1.png");
    this.load.image("upgrade2", "src/assets/upgrade2.png");
    this.load.image("upgrade3", "src/assets/upgrade3.png");
    this.load.image("upgrade4", "src/assets/upgrade4.png");
    this.load.image("upgrade5", "src/assets/upgrade5.png");
    this.load.image("upgrade6", "src/assets/upgrade6.png");

    // Charger les sons
    this.load.audio("battleMusic", "src/assets/battleMusic.mp3");
    this.load.audio("bossBattleMusic", "src/assets/bossBattleMusic.mp3");
    this.load.audio("bellSound", "src/assets/bellSound.mp3");
    this.load.audio("playerHurt", "src/assets/playerHurt.mp3");
    this.load.audio("playerDeath", "src/assets/playerDeath.mp3");
    this.load.audio("rollSound", "src/assets/rollSound.mp3");
    this.load.audio("bossAttackSound", "src/assets/bossAttackSound.mp3");
    this.load.audio("popSound", "src/assets/popSound.mp3");
    this.load.audio("whoosh1", "src/assets/whooshSound1.mp3");
    this.load.audio("whoosh2", "src/assets/whooshSound2.mp3");
    this.load.audio("whoosh3", "src/assets/whooshSound3.mp3");
    this.load.audio("whoosh4", "src/assets/whooshSound4.mp3");
    this.load.audio("whoosh5", "src/assets/whooshSound5.mp3");
    this.load.audio("hit1", "src/assets/hitSound1.mp3");
    this.load.audio("hit2", "src/assets/hitSound2.mp3");
    this.load.audio("hit3", "src/assets/hitSound3.mp3");
    this.load.audio("hit4", "src/assets/hitSound4.mp3");
    this.load.audio("hit5", "src/assets/hitSound5.mp3");
    this.load.audio("hit6", "src/assets/hitSound6.mp3");
    this.load.audio("hit7", "src/assets/hitSound7.mp3");
    this.load.audio("hit8", "src/assets/hitSound8.mp3");
    this.load.audio("hit9", "src/assets/hitSound9.mp3");
    this.load.audio("hit10", "src/assets/hitSound10.mp3");
    this.load.audio("hit11", "src/assets/hitSound11.mp3");
    this.load.audio("hit12", "src/assets/hitSound12.mp3");
    this.load.audio("hit13", "src/assets/hitSound13.mp3");
    this.load.audio("hit14", "src/assets/hitSound14.mp3");
    this.load.audio("hit15", "src/assets/hitSound15.mp3");
    this.load.audio("hit16", "src/assets/hitSound16.mp3");
    this.load.audio("hit17", "src/assets/hitSound17.mp3");
    this.load.audio("hit18", "src/assets/hitSound18.mp3");
    this.load.audio("laserSound", "src/assets/laserSound.mp3");
    this.load.audio("projectileSound", "src/assets/projectileSound.mp3");
    this.load.audio("explosionSound", "src/assets/explosionSound.mp3");
    this.load.audio("monsterDeath1", "src/assets/monsterDeath1.mp3");
    this.load.audio("monsterDeath2", "src/assets/monsterDeath2.mp3");
    this.load.audio("monsterDeath3", "src/assets/monsterDeath3.mp3");
    this.load.audio("monsterDeath4", "src/assets/monsterDeath4.mp3");
    this.load.audio("monsterDeath5", "src/assets/monsterDeath5.mp3");
    this.load.audio("monsterDeath6", "src/assets/monsterDeath6.mp3");

    // Charger la carte JSON
    this.load.tilemapTiledJSON("map", "src/assets/map.json");
    this.load.image("tiles", "src/assets/tileset.png");
  }

  create() {
    // Créer la carte
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");

    // Créer les couches de la carte
    const backgroundLayer = map.createLayer("Background", tileset);
    const groundLayer = map.createLayer("Ground", tileset);
    const objectsLayer = map.createLayer("Object", tileset);
    const wallsLayer = map.createLayer("Walls", tileset);

    wallsLayer.setCollisionByProperty({ collision: true });

    this.groundLayer = groundLayer;
    this.wallsLayer = wallsLayer;

    // Définir les salles et les points de téléportation
    this.rooms = [
      { x: 1280, y: 896, width: 1856, height: 1600, name: "Fire" },
      { x: 7552, y: 896, width: 1856, height: 1600, name: "Air" },
      { x: 1280, y: 3776, width: 1856, height: 1600, name: "Water" },
      { x: 7552, y: 3776, width: 1856, height: 1600, name: "Earth" },
    ];

    this.lastRoomIndex = -1;

    this.player = new Player(this, 100, 100, "player");

    this.firstTP = true;

    this.teleportPlayerToRoom();

    this.sound.add("battleMusic", { loop: true, volume: 0.05 }).play();

    // Ajouter les collisions entre le joueur et les murs
    this.physics.add.collider(this.player, wallsLayer, () => {
      if (this.player.rollActive) {
        this.player.stopRoll();
      }
      if (this.player.dashActive) {
        this.player.stopDash();
      }
    });
    this.scene.launch("Interface", { player: this.player });

    this.ennemies = this.physics.add.group();
    this.physics.add.collider(this.ennemies, wallsLayer);

    this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.overlap(
      this.player.playerProjectiles,
      this.ennemies,
      this.handleProjectileCollision,
      null,
      this
    );

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

    // Initialiser les étages et les vagues
    this.stageIndex = 0;
    this.totalStages = 10; // 10 étages
    this.wavesPerStage = 2; // 2 vagues par étage le premier étage puis +1 tout les 2 étages
    this.enemiesPerWave = [2, 3, 4, 5]; // Nombre d'ennemis par vague
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

    this.anims.create({
      key: "explosionWater",
      frames: this.anims.generateFrameNumbers("explosionWater", {
        start: 0,
        end: 7,
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
    if (
      this.isStageActive &&
      this.ennemies.countActive(true) === 0 && // Vérifier si tous les ennemis sont morts
      this.waveIndex >= this.wavesPerStage &&
      !this.isWaveActive
    ) {
      console.log("Tous les ennemis de l'étage ont été éliminés !");
      this.isStageActive = false;
      this.stageIndex++;
      this.startNextStage(); // Passer au prochain étage uniquement si toutes les conditions sont remplies
    }
  }

  teleportPlayerToRoom() {
    // Filtrer la salle précédente pour éviter la répétition
    const availableRooms = this.rooms.filter(
      (_, index) => index !== this.lastRoomIndex
    );

    // Choisir une nouvelle salle parmi celles disponibles
    const randomRoom = Phaser.Utils.Array.GetRandom(availableRooms);

    // Obtenir l'indice de la nouvelle salle
    this.lastRoomIndex = this.rooms.indexOf(randomRoom);

    this.player.setVelocity(0, 0);
    this.player.playerControlsEnabled = false;

    if (this.firstTP) {
      this.firstTP = false;
      // Téléportation du joueur à la salle choisie
      console.log("Téléportation du joueur à la salle", randomRoom);
      this.player.setPosition(
        randomRoom.x + randomRoom.width / 2,
        randomRoom.y + randomRoom.height / 2
      );
      this.cameras.main.setScroll(
        this.player.x - this.cameras.main.width / 2,
        this.player.y - this.cameras.main.height / 2
      );

      this.cameras.main.zoomTo(1.25, 0);

      // Faire apparaître le joueur avec un effet ressort
      this.sound.play("popSound");
      this.tweens.add({
        targets: this.player,
        scale: { from: 0, to: 0.2 }, // Le joueur grandit de 0 à sa taille normale
        alpha: 1, // Le joueur devient visible (fondu)
        ease: "Back.easeOut", // Effet ressort
        duration: 250, // Durée de l'animation (1 seconde)
        onComplete: () => {
          // Retour de la caméra au zoom normal après l'animation du joueur
          this.cameras.main.zoomTo(1, 500, "Cubic.easeInOut"); // Retour au zoom x1 en 0,5 seconde avec un effet ease in out

          // Réactiver les contrôles après l'animation complète
          this.player.playerControlsEnabled = true;
        },
      });
    } else {
      // Animation de disparition du joueur
      this.tweens.add({
        targets: this.player,
        scale: { from: 0.2, to: 0 }, // Le joueur rétrécit de sa taille normale à 0
        ease: "Back.easeIn", // Effet ressort
        duration: 500, // Durée de l'effet de disparition
        onComplete: () => {
          console.log("Téléportation du joueur à la salle", randomRoom);
          setTimeout(() => {
            this.player.setPosition(
              randomRoom.x + randomRoom.width / 2,
              randomRoom.y + randomRoom.height / 2
            );
            this.cameras.main.setScroll(
              this.player.x - this.cameras.main.width / 2,
              this.player.y - this.cameras.main.height / 2
            );

            this.player.setVelocity(0, 0);
            this.player.setScale(0).setAlpha(0);
            this.player.playerControlsEnabled = false;

            this.cameras.main.zoomTo(1.25, 0);

            setTimeout(() => {
              // Faire apparaître le joueur avec un effet ressort
              this.sound.play("popSound");
              this.tweens.add({
                targets: this.player,
                scale: { from: 0, to: 0.2 }, // Le joueur grandit de 0 à sa taille normale
                alpha: 1, // Le joueur devient visible (fondu)
                ease: "Back.easeOut", // Effet ressort
                duration: 250, // Durée de l'animation (1 seconde)
                onComplete: () => {
                  // Retour de la caméra au zoom normal après l'animation du joueur
                  this.cameras.main.zoomTo(1, 500, "Cubic.easeInOut"); // Retour au zoom x1 en 0,5 seconde avec un effet ease in out

                  // Réactiver les contrôles après l'animation complète
                  this.player.playerControlsEnabled = true;
                },
              });
            }, 500);
          }, 500);
        },
      });
    }
  }

  startNextStage() {
    console.log(
      `Étape actuelle: ${this.stageIndex}, Étapes totales: ${this.totalStages}`
    );
    if (this.stageIndex >= this.totalStages) {
      console.log("Tous les étages ont été complétés !");
      this.teleportPlayerToSpecialRoom();
      return; // Ne plus lancer de nouveaux étages
    }

    if (!this.isStageActive && this.stageIndex > 0) {
      // Si l'étage est terminé, afficher les améliorations
      this.showUpgrades(() => {
        this.teleportPlayerToRoom();
        // Afficher le texte de l'étage après la sélection des améliorations
        setTimeout(() => {
          this.scene.get("Interface").showStageText(this.stageIndex + 1, () => {
            this.startNextWave();
          });
          setTimeout(() => {
            this.sound.play("bellSound");
          }, 1000);
        }, 1000);
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
  }

  spawnEnemy() {
    if (this.spawnedEnemiesInWave >= this.currentWaveEnemies) {
      return;
    }

    const playerX = this.player.x;
    const playerY = this.player.y;

    // Déterminer la salle du joueur
    const currentRoom = this.rooms.find(
      (room) =>
        playerX >= room.x &&
        playerX < room.x + room.width &&
        playerY >= room.y &&
        playerY < room.y + room.height
    );

    this.textureName = currentRoom.name;

    // Déterminer la zone où se trouve le joueur
    let playerZone;
    if (playerX < currentRoom.x + currentRoom.width / 2) {
      if (playerY < currentRoom.y + currentRoom.height / 2) {
        playerZone = "topLeft";
      } else {
        playerZone = "bottomLeft";
      }
    } else {
      if (playerY < currentRoom.y + currentRoom.height / 2) {
        playerZone = "topRight";
      } else {
        playerZone = "bottomRight";
      }
    }

    const margin = 150; // Ajouter une marge pour chaque zone

    const zones = {
      topLeft: {
        xMin: currentRoom.x + margin,
        xMax: currentRoom.x + currentRoom.width / 2 - margin,
        yMin: currentRoom.y + margin,
        yMax: currentRoom.y + currentRoom.height / 2 - margin,
      },
      topRight: {
        xMin: currentRoom.x + currentRoom.width / 2 + margin,
        xMax: currentRoom.x + currentRoom.width - margin,
        yMin: currentRoom.y + margin,
        yMax: currentRoom.y + currentRoom.height / 2 - margin,
      },
      bottomLeft: {
        xMin: currentRoom.x + margin,
        xMax: currentRoom.x + currentRoom.width / 2 - margin,
        yMin: currentRoom.y + currentRoom.height / 2 + margin,
        yMax: currentRoom.y + currentRoom.height - margin,
      },
      bottomRight: {
        xMin: currentRoom.x + currentRoom.width / 2 + margin,
        xMax: currentRoom.x + currentRoom.width - margin,
        yMin: currentRoom.y + currentRoom.height / 2 + margin,
        yMax: currentRoom.y + currentRoom.height - margin,
      },
    };

    // Filtrer les zones de spawn pour exclure la zone actuelle du joueur
    const spawnZones = Object.keys(zones).filter((zone) => zone !== playerZone);

    // Choisir une zone de spawn aléatoire parmi les zones disponibles
    const spawnZoneKey = Phaser.Utils.Array.GetRandom(spawnZones);
    const spawnZone = zones[spawnZoneKey];

    // Choisir une position de spawn aléatoire dans la zone de spawn choisie
    const spawnX = Phaser.Math.Between(spawnZone.xMin, spawnZone.xMax);
    const spawnY = Phaser.Math.Between(spawnZone.yMin, spawnZone.yMax);

    // Créer un portail avant de faire apparaître l'ennemi
    const portal = this.add.sprite(spawnX, spawnY, `portal${this.textureName}`);
    portal.setScale(0.1);
    this.tweens.add({
      targets: portal,
      alpha: 0.5,
      duration: 500,
      ease: "Cubic.easeInOut",
      yoyo: true,
      repeat: -1,
    });
    this.time.delayedCall(1000, () => {
      portal.destroy();
      this.createEnemy(spawnX, spawnY);
    });

    this.spawnedEnemiesInWave++;

    if (this.spawnedEnemiesInWave === this.currentWaveEnemies) {
      this.time.delayedCall(4500, () => {
        this.waveIndex++;
      });
    }
  }

  createEnemy(x, y) {
    let enemy;
    if (this.stageIndex === 0 || this.stageIndex === 1) {
      const enemyType = Phaser.Math.Between(1, 2);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, `ennemy1${this.textureName}`);
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, `ennemy2${this.textureName}`);
          break;
      }
    } else if (this.stageIndex === 2 || this.stageIndex === 3) {
      const enemyType = Phaser.Math.Between(1, 3);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, `ennemy1${this.textureName}`);
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, `ennemy2${this.textureName}`);
          break;
        case 3:
          enemy = new Ennemy3(this, x, y, `ennemy3${this.textureName}`);
          break;
      }
    } else if (this.stageIndex === 4 || this.stageIndex === 5) {
      const enemyType = Phaser.Math.Between(1, 4);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, `ennemy1${this.textureName}`);
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, `ennemy2${this.textureName}`);
          break;
        case 3:
          enemy = new Ennemy3(this, x, y, `ennemy3${this.textureName}`);
          break;
        case 4:
          enemy = new Ennemy4(this, x, y, `ennemy4${this.textureName}`);
          break;
      }
    } else {
      const enemyType = Phaser.Math.Between(1, 5);
      switch (enemyType) {
        case 1:
          enemy = new Ennemy1(this, x, y, `ennemy1${this.textureName}`);
          break;
        case 2:
          enemy = new Ennemy2(this, x, y, `ennemy2${this.textureName}`);
          break;
        case 3:
          enemy = new Ennemy3(this, x, y, `ennemy3${this.textureName}`);
          break;
        case 4:
          enemy = new Ennemy4(this, x, y, `ennemy4${this.textureName}`);
          break;
        case 5:
          enemy = new Ennemy5(this, x, y, `ennemy5${this.textureName}`);
          break;
      }
    }

    this.ennemies.add(enemy);
  }

  teleportPlayerToSpecialRoom() {
    const music = this.sound.get("battleMusic");
    if (music) {
      this.tweens.add({
        targets: music,
        volume: 0,
        duration: 2000, // Durée du fondu en millisecondes
        onComplete: () => {
          music.stop();
        },
      });
    }
    this.player.setVelocity(0, 0);
    this.player.playerControlsEnabled = false;

    // Ajouter le bâton en haut de la salle spéciale
    const wand = this.add.sprite(12799, 6200, "wand");
    wand.setScale(0.1);

    this.physics.add.existing(wand);
    wand.body.setAllowGravity(false);

    // Ajouter une zone de détection pour le bâton
    this.physics.add.overlap(this.player, wand, () => {
      // Afficher le texte indiquant que le bâton a été ramassé
      const text = this.add.text(
        this.player.x - this.player.width / 4,
        this.player.y - 150,
        "Bâton ramassé !",
        {
          fontSize: "32px",
          fontFamily: "Riffic",
          stroke: "#000000",
          strokeThickness: 5,
          fill: "#ffffff",
        }
      );
      this.time.delayedCall(2000, () => {
        text.destroy();
      });

      // Détruire le bâton
      wand.destroy();

      // Téléporter le joueur à la salle du boss
      this.teleportPlayerToBossRoom();

      this.player.wandTaked = true;
    });

    // Animation de disparition du joueur
    this.tweens.add({
      targets: this.player,
      scale: { from: 0.2, to: 0 }, // Le joueur rétrécit de sa taille normale à 0
      ease: "Back.easeIn", // Effet ressort
      duration: 500, // Durée de l'effet de disparition
      onComplete: () => {
        console.log("Téléportation du joueur à la salle spéciale");
        setTimeout(() => {
          this.player.setPosition(12799, 7872);
          this.cameras.main.setScroll(
            this.player.x - this.cameras.main.width / 2,
            this.player.y - this.cameras.main.height / 2
          );
          setTimeout(() => {
            // Faire apparaître le joueur avec un effet ressort
            this.sound.play("popSound");
            this.tweens.add({
              targets: this.player,
              scale: { from: 0, to: 0.2 }, // Le joueur grandit de 0 à sa taille normale
              alpha: 1, // Le joueur devient visible (fondu)
              ease: "Back.easeOut", // Effet ressort
              duration: 250, // Durée de l'animation (1 seconde)
              onComplete: () => {
                // Retour de la caméra au zoom normal après l'animation du joueur
                this.cameras.main.zoomTo(1, 500, "Cubic.easeInOut"); // Retour au zoom x1 en 0,5 seconde avec un effet ease in out

                // Réactiver les contrôles après l'animation complète
                this.player.playerControlsEnabled = true;
              },
            });
          }, 500);
        }, 500);
      },
    });
  }

  teleportPlayerToBossRoom() {
    const music = this.sound.get("battleMusic");
    if (music) {
      this.tweens.add({
        targets: music,
        volume: 0,
        duration: 2000, // Durée du fondu en millisecondes
        onComplete: () => {
          music.stop();
        },
      });
    }
    this.player.setVelocity(0, 0);
    this.player.playerControlsEnabled = false;

    // Animation de disparition du joueur
    this.tweens.add({
      targets: this.player,
      scale: { from: 0.2, to: 0 }, // Le joueur rétrécit de sa taille normale à 0
      ease: "Back.easeIn", // Effet ressort
      duration: 500, // Durée de l'effet de disparition
      onComplete: () => {
        console.log("Téléportation du joueur à la salle spéciale");
        setTimeout(() => {
          this.player.setPosition(12992, 2368); // ! Changer les coordonnées
          this.cameras.main.setScroll(
            this.player.x - this.cameras.main.width / 2,
            this.player.y - this.cameras.main.height / 2
          );
          setTimeout(() => {
            // Faire apparaître le joueur avec un effet ressort
            this.sound.play("popSound");
            this.tweens.add({
              targets: this.player,
              scale: { from: 0, to: 0.2 }, // Le joueur grandit de 0 à sa taille normale
              alpha: 1, // Le joueur devient visible (fondu)
              ease: "Back.easeOut", // Effet ressort
              duration: 250, // Durée de l'animation (1 seconde)
              onComplete: () => {
                // Retour de la caméra au zoom normal après l'animation du joueur
                this.cameras.main.zoomTo(0.8, 500, "Cubic.easeInOut"); // Retour au zoom x1 en 0,5 seconde avec un effet ease in out

                // Réactiver les contrôles après l'animation complète
                this.player.playerControlsEnabled = true;
                this.textureName = "Earth";

                // Faire apparaître le boss après 2 secondes
                this.time.delayedCall(2000, () => {
                  const boss = new Boss(this, 12992, 1024, "boss");
                  this.ennemies.add(boss);

                  // Animation d'apparition du boss
                  boss.setScale(0);
                  this.tweens.add({
                    targets: boss,
                    scale: { from: 0, to: 1 }, // Le boss grandit de 0 à sa taille normale
                    alpha: 1, // Le boss devient visible (fondu)
                    ease: "Back.easeOut", // Effet ressort
                    duration: 500, // Durée de l'animation (0.5 seconde)
                    onComplete: () => {
                      this.sound.play("bossBattleMusic", {
                        loop: true,
                        volume: 0.1,
                      });
                    },
                  });
                });
              },
            });
          }, 500);
        }, 500);
      },
    });
  }

  physicsOverlapCirc(x, y, radius, callback) {
    const objects = this.physics.overlapCirc(x, y, radius);
    objects.forEach((object) => {
      callback(object.gameObject);
    });
  }

  handleProjectileCollision(projectile, ennemy) {
    // Infliger des dégâts à l'ennemi
    if (ennemy instanceof Boss) {
      ennemy.takeDamage(projectile.damage);
    } else {
      ennemy.health -= projectile.damage;
    }
    console.log(`Dégâts infligés à l'ennemi : ${projectile.damage}`);

    // Détruire le projectile
    projectile.destroy();

    // Vérifier si l'ennemi est mort
    if (ennemy.health <= 0) {
      ennemy.dead();
    }
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

  deathSound() {
    const sounds = [
      "monsterDeath1",
      "monsterDeath2",
      "monsterDeath3",
      "monsterDeath4",
      "monsterDeath5",
      "monsterDeath6",
    ];
    const randomSound = Phaser.Utils.Array.GetRandom(sounds);
    this.sound.play(randomSound, { volume: 0.2 });
  }
}
