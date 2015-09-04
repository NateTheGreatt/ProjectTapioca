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
    this.dmg = 25;

    this.hitbox = new Phaser.Sprite(game, 0, 0);
    game.physics.enable(this.hitbox, Phaser.Physics.ARCADE);
    parent.addChild(this.hitbox);
  }

  Melee.prototype = Object.create(Component.prototype);
  Melee.prototype.constructor = Melee;
  
  Melee.prototype.setTarget = function(target) {
    this.target = target;
  }

  Melee.prototype.setHitboxPos = function() {
    var parentMidpoint = {x: this.parent.x+(this.parent.width/2), y: this.parent.y+(this.parent.height/2)};
    var targetMidpoint = {x: this.target.x, y: this.target.y};
    if(this.parent.name != 'Player') {
      targetMidpoint.x += this.target.width/2;
      targetMidpoint.y += this.target.height/2;
    }
    var angle = game.math.angleBetween(
      parentMidpoint.x,
      parentMidpoint.y,
      targetMidpoint.x,
      targetMidpoint.y
    );
    var d = 32;
    this.hitbox.pivot.x = -Math.cos(angle)*d;
    this.hitbox.pivot.y = -Math.sin(angle)*d;
  }

  Melee.prototype.attack = function() {
    if(this.cooling <= 0) {
      if(this.parent.name == 'Player') game.physics.arcade.overlap(this.hitbox,registry.enemies,this.handleOverlap,null,this);
      else game.physics.arcade.overlap(this.hitbox,registry.players,this.handleOverlap,null,this);
      this.cooling = this.cooldown;
      this.swinging = true;
      var self = this;
      setTimeout(function(){self.swinging = false}, 20);
    }
  }

  Melee.prototype.handleOverlap = function(hitbox, entity) {
    entity.hit(this.parent,this.dmg);
  }

  Melee.prototype.update = function() {
    if(this.parent.alive) {
      this.cooling -= game.time.elapsed;
      if(this.parent.name == 'Player') {
        
        this.setHitboxPos();
      
      } else {
        if(this.target) {
          if(!this.target.alive) this.target = null;
          else {
            this.setHitboxPos();
          }
        }
        
      }
  
      if(this.swinging) {
      }
        game.debug.body(this.hitbox);
    }
  }

  return Melee;
})
