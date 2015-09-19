define([],
function(){

  function Boot() {}

  Boot.prototype.preload = function() {
    // this.load.image('id','img/id.jpg')
  };

  Boot.prototype.create = function () {
    // configure game
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
      
      // this.game.scale.maxWidth = 320;
      // this.game.scale.maxHeight = 240;
      // this.game.stage.smoothed = false;
      // this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
      
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      
      // Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
      // console.log(Phaser.Canvas.getSmoothingEnabled(this.game.context));
      Phaser.Canvas.setImageRenderingCrisp(this.game.renderer.view);
      
      this.game.renderer.view.oncontextmenu = function (e) {
        e.preventDefault();
      };
      
      // this.game.scale.setUserScale(2,2);
      
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
    }
    this.game.state.start('preload');
  };

  return Boot;

});
