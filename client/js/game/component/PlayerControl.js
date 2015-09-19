define(['game','component/Component'],
function(game, Component) {
  function PlayerControl(parent, opts) {
    Component.call(this, parent);
    this.name = 'PlayerControl';
    
    this.stamina = 1000 + this.parent.stats.agi*4;
    this.cooling = this.stamina;
    
    this.speed = this.parent.speed;
    
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    
    this.onAttack = new Phaser.Signal();
  }

  PlayerControl.prototype = Object.create(Component.prototype);
  PlayerControl.prototype.constructor = PlayerControl;

  PlayerControl.prototype.update = function() {
    
    if(this.shift.isDown) {
      
      this.cooling -= game.time.elapsed;
      if(this.cooling <= 0) this.cooling = 0;
      
    } else {
      
      this.cooling += game.time.elapsed;
      if(this.cooling >= this.stamina) this.cooling = this.stamina;
      
    }
    
    if(this.cooling > 0 && this.shift.isDown) {
      this.speed = this.parent.speed + 1 + this.parent.stats.agi/50;
    } else this.speed = this.parent.speed;
    
    if(this.up.isDown) this.parent.body.velocity.y = -this.speed;
    if(this.down.isDown)this.parent.body.velocity.y = this.speed;
    if(!this.down.isDown && !this.up.isDown) this.parent.body.velocity.y = 0;
    if(this.left.isDown)this.parent.body.velocity.x = -this.speed;
    if(this.right.isDown)this.parent.body.velocity.x = this.speed;
    if(!this.left.isDown && !this.right.isDown) this.parent.body.velocity.x = 0;
    if(game.input.activePointer.leftButton.isDown) this.onAttack.dispatch();
  }

  return PlayerControl;
})
