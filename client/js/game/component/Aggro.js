// if aggressive, targets the entity entering aggro range
// if passive, targets entity that hits it

define(['game','component/Component','registry'],
function(game, Component, registry) {
  function Aggro(parent, opts) {
    Component.call(this, parent);
    this.name = 'Aggro';

    this.target = null;
    this.dist = 64;

    this.passive = false;

    if(opts) {
      for(var key in opts) {
        this[key] = opts[key]
      }
    }

    // events
    this.onTargetAquired = new Phaser.Signal();

  }

  Aggro.prototype = Object.create(Component.prototype);
  Aggro.prototype.constructor = Aggro;

  Aggro.prototype.setTarget = function(target) {
    this.target = target;
    this.onTargetAquired.dispatch(target);
  }

  Aggro.prototype.update = function() {
    var self = this;
    if(!this.passive) {
      if(!this.target) {
        registry.players.children.filter(function(player) {
          var d = game.math.distance(self.parent.x, self.parent.y, player.x, player.y);
          if(d < self.dist) {
            self.setTarget(player);
          }
        });
      }
    }
    // todo: add logic for disengagement
  }

  return Aggro;
})
