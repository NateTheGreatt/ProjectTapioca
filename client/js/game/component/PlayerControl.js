define(['game','component/Component'],
function(game, Component) {
  function PlayerControl(parent, opts) {
    Component.call(this, parent);
    this.name = 'PlayerControl';

    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    this.onAttack = new Phaser.Signal();
  }

  PlayerControl.prototype = Object.create(Component.prototype);
  PlayerControl.prototype.constructor = PlayerControl;

  PlayerControl.prototype.update = function() {
    if(this.up.isDown) this.parent.y-=this.parent.speed;
    if(this.down.isDown) this.parent.y+=this.parent.speed;
    if(this.left.isDown) this.parent.x-=this.parent.speed;
    if(this.right.isDown) this.parent.x+=this.parent.speed;
    if(game.input.activePointer.leftButton.isDown) {
      this.onAttack.dispatch();
    }
  }

  return PlayerControl;
})
