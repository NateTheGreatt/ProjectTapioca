define([
  'game',
  'entity/Entity',
  'component/Stats',
  'component/Aggro',
  'component/ChaseAI'
],
function(game, Entity, Stats, Aggro, ChaseAI) {
  function Critter(x,y) {
    Entity.call(this, x, y);

    this.name = 'Critter';

    this.stats = this.addComponent(new Stats(this));
    this.aggro = this.addComponent(new Aggro(this,{passive: true}));
    this.chaseAI = this.addComponent(new ChaseAI(this,{flee: true}));

    this.aggro.onTargetAquired.add(this.chaseAI.setTarget, this.chaseAI);

  }

  Critter.prototype = Object.create(Entity.prototype);
  Critter.prototype.constructor = Critter;

  Critter.prototype.hit = function(source, dmg) {
    this.stats.hp -= dmg;
    if(this.stats.hp <= 0) {
      this.kill();
    }
    if(!this.aggro.target) {
      this.aggro.setTarget(source);
    }
  }
  Critter.prototype.update = function() {
    this.updateComponents();
    if(this.alive) game.debug.body(this);
  };

  return Critter;
});
