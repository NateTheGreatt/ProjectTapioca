define(['game','state/World','component/Component','entity/Player','registry'],
function(game, World, Component, Player,registry) {
  function Melee(parent, opts) {
    Component.call(this, parent);
    this.name = 'Melee';
    if(this.parent.name == 'Player') this.target = game.input.activePointer;
    else this.target = null;

    this.cooldown = 700; // ms
    this.cooling = this.cooldown;
    this.swinging = false;

    this.hitbox = new Phaser.Sprite(game, 0, 0);
    game.physics.enable(this.hitbox, Phaser.Physics.ARCADE);
    parent.addChild(this.hitbox);
  }

  Melee.prototype = Object.create(Component.prototype);
  Melee.prototype.constructor = Melee;

  Melee.prototype.setHitboxPos = function() {
      var angle = game.math.angleBetween(this.parent.x+(this.parent.width/2),this.parent.y+(this.parent.height/2),this.target.x,this.target.y);
      var d = 32;
      this.hitbox.pivot.x = -Math.cos(angle)*d;
      this.hitbox.pivot.y = -Math.sin(angle)*d;
  }

  Melee.prototype.attack = function() {
    console.log('attacking');
    game.physics.arcade.overlap(this.hitbox,registry.enemies,this.handleOverlap,null,this);
    this.attackNextFrame = false;
    this.cooling = this.cooldown;
    this.swinging = true;
    var self = this;
    setTimeout(function(){self.swinging = false}, 20);
  }

  Melee.prototype.handleOverlap = function(hitbox, enemy) {
    enemy.hit(this.parent,25);
  }

  Melee.prototype.update = function() {

    this.cooling -= game.time.elapsed;


    if(this.parent.name == 'Player') {

      this.setHitboxPos();

      if(game.input.activePointer.leftButton.isDown) {
        if(this.cooling < 0) this.attack();
      }

      if(this.swinging) game.debug.body(this.hitbox);
    }

  }

  return Melee;
})
