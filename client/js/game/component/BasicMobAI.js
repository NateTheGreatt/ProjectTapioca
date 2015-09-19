// chases a target. that's all this component does.

define(['game','component/Component'],
function(game, Component) {
  function BasicMobAI(parent, opts) {
    Component.call(this, parent);
    this.name = 'BasicMobAI';

    this.target = undefined;

    this.flee = false;
    this.speed = this.parent.speed;
    this.aggroRange = 40;

    if(opts){
      for(var key in opts) {
        this[key] = opts[key];
      }
    }

    if(this.flee) this.speed *= -1;
    
    this.onAttack = new Phaser.Signal();
  }

  BasicMobAI.prototype = Object.create(Component.prototype);
  BasicMobAI.prototype.constructor = BasicMobAI;

  BasicMobAI.prototype.setTarget = function(target) {
    this.target = target;
  };

  BasicMobAI.prototype.update = function() {
    if(this.target) {
      var parentMidpoint = this.parent.getMidpoint();
      var targetMidpoint = this.target.getMidpoint();
      
      var angle = game.math.angleBetween(
        parentMidpoint.x,
        parentMidpoint.y,
        targetMidpoint.x,
        targetMidpoint.y
      );

      var dist = game.math.distance(
        parentMidpoint.x,
        parentMidpoint.y,
        targetMidpoint.x,
        targetMidpoint.y
      );

      if(dist > this.target.width) {
        this.parent.x += Math.cos(angle)*this.speed;
        this.parent.y += Math.sin(angle)*this.speed;
      } else {
        this.onAttack.dispatch();
      }
    }
  }

  return BasicMobAI;
})
