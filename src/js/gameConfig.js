// import Menu from "./scenes/menu.js";
// import Lobby from "./scenes/lobby.js";
import Level from "./scenes/level.js";
import UpgradeScene from "./scenes/upgradeScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
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
  scene: [Level, UpgradeScene],
  backgroundColor: "#54e5a7",
};

const game = new Phaser.Game(config);
