define(['game'],
function(game){

  function Preload() {}

  Preload.prototype.create = function () {
    // this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    // this.load.setPreloadSprite(this.asset);

    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.loadResources();

    this.ready = true;
  };

  Preload.prototype.update = function () {
      this.game.state.start('menu');
  };

  return Preload;

});
