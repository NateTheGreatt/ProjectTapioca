define([
  'game',
  'entity/Alive',
  'component/Aggro',
  'component/ChaseAI',
  'component/Drops'
],
function(game, Alive, Aggro, ChaseAI, Drops) {
  function Critter(x,y) {
    Alive.call(this, x, y);

    this.name = 'Critter';

    this.stats.hp = this.stats.maxHP = 50;
    this.drops = this.addComponent(new Drops(this));
    this.aggro = this.addComponent(new Aggro(this,{passive: true}));
    this.chaseAI = this.addComponent(new ChaseAI(this,{flee: true}));

    this.aggro.onTargetAquired.add(this.chaseAI.setTarget, this.chaseAI);

  }

  Critter.prototype = Object.create(Alive.prototype);
  Critter.prototype.constructor = Critter;

  Critter.prototype.hit = function(source, dmg) {
    Alive.prototype.hit.call(this,source,dmg); // super call
    
    if(!this.aggro.target) {
      this.aggro.setTarget(source);
    }
  }
  Critter.prototype.update = function() {
    Alive.prototype.update.call(this);
  };

  return Critter;
});
