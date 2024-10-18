import Menu from "./scenes/menu.js";
import Level from "./scenes/level.js";
import UpgradeScene from "./scenes/upgradeScene.js";
import Interface from "./scenes/interface.js";
import GameOverScene from "./scenes/gameOverScene.js";
import VictoryScene from "./scenes/victoryScene.js";
import CreditScene from "./scenes/creditScene.js";
import ControlScene from "./scenes/controlScene.js";

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
      debug: false, // ! PENSER À LE PASSER À FALSE À LA FIN
    },
  },
  scene: [
    Menu,
    Level,
    CreditScene,
    ControlScene,
    UpgradeScene,
    Interface,
    GameOverScene,
    VictoryScene,
  ],
};

const game = new Phaser.Game(config);
