import Menu from "./scenes/menu.js";
import Level from "./scenes/level.js";
import UpgradeScene from "./scenes/upgradeScene.js";
import Interface from "./scenes/interface.js";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, // ! PENSER À LE PASSER À FALSE À LA FIN
    },
  },
  scene: [Menu, Level, UpgradeScene, Interface],
};

const game = new Phaser.Game(config);
