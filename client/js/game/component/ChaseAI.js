// chases a target. that's all this component does.

define(['game','component/Component'],
function(game, Component) {
  function ChaseAI(parent, opts) {
    Component.call(this, parent);
    this.name = 'ChaseAI';

    this.target = undefined;

    this.flee = false;
    this.speed = 1;

    if(opts){
      for(var key in opts) {
        this[key] = opts[key];
      }
    }

    if(this.flee) this.speed *= -1;
  }

  ChaseAI.prototype = Object.create(Component.prototype);
  ChaseAI.prototype.constructor = ChaseAI;

  ChaseAI.prototype.setTarget = function(target) {
    this.target = target;
    console.log(this.target);
  };

  ChaseAI.prototype.update = function() {
    if(this.target) {
      var angle = game.math.angleBetween(
        this.parent.x+(this.parent.width/2),
        this.parent.y+(this.parent.height/2),
        this.target.x+(this.target.width/2),
        this.target.y+(this.target.height/2)
      );

      var dist = game.math.distance(
        this.parent.x+(this.parent.width/2),
        this.parent.y+(this.parent.height/2),
        this.target.x+(this.target.width/2),
        this.target.y+(this.target.height/2)
      );

      if(dist > 30) {
        this.parent.x += Math.cos(angle)*this.speed;
        this.parent.y += Math.sin(angle)*this.speed;
      }
    }
  }

  return ChaseAI;
})
