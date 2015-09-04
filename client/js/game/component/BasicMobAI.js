// chases a target. that's all this component does.

define(['game','component/Component'],
function(game, Component) {
  function BasicMobAI(parent, opts) {
    Component.call(this, parent);
    this.name = 'BasicMobAI';

    this.target = undefined;

    this.flee = false;
    this.speed = 1;
    this.aggroRange = 40;

    if(opts){
      for(var key in opts) {
        this[key] = opts[key];
      }
    }

    if(this.flee) this.speed *= -1;
  }

  BasicMobAI.prototype = Object.create(Component.prototype);
  BasicMobAI.prototype.constructor = BasicMobAI;

  BasicMobAI.prototype.setTarget = function(target) {
    this.target = target;
  };

  BasicMobAI.prototype.update = function() {
    if(this.target) {
      var angle = game.math.angleBetween(
        this.parent.getMidpoint().x,
        this.parent.getMidpoint().y,
        this.target.getMidpoint().x,
        this.target.getMidpoint().y
      );

      var dist = game.math.distance(
        this.parent.getMidpoint().x,
        this.parent.getMidpoint().y,
        this.target.getMidpoint().x,
        this.target.getMidpoint().y
      );

      if(dist > this.target.width) {
        this.parent.x += Math.cos(angle)*this.speed;
        this.parent.y += Math.sin(angle)*this.speed;
      }
    }
  }

  return BasicMobAI;
})
