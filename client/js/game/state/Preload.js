define(['game'],
function(game){

  function Preload() {}

  Preload.prototype.preload = function () {
    // this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    // this.load.setPreloadSprite(this.asset);

    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // game.load.tilemap('map', 'js/game/resources/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    // game.load.image('NubianTileset', 'img/tileset.png');
    game.load.spritesheet('lolwall', 'img/9shbnqB.png');
    game.load.spritesheet('dude', 'img/dude.png');
    game.load.spritesheet('slime-green', 'img/slime-green.png');
    game.load.spritesheet('slime-red', 'img/slime-red.png');
    game.load.spritesheet('slime-yellow', 'img/slime-yellow.png');
    game.load.spritesheet('slime-blue', 'img/slime-blue.png');

  };

  Preload.prototype.create = function () {
      this.game.state.start('menu');
  };

  return Preload;

});
