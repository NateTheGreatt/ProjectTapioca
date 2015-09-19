define([
  'game',
  'entity/Entity',
  'component/Stats',
  'component/DataBar'
],
function(game, Entity, Stats, DataBar) {
  function Alive(x,y) {
    Entity.call(this, x, y);

    this.name = 'Alive';
    
    this.stats = this.addComponent(new Stats(this));
    this.healthbar = this.addComponent(new DataBar(this,'hpbar',this.stats,'hp','maxHP','#00ff00'));
    this.manabar = this.addComponent(new DataBar(this,this.stats,'mp','maxMP','#0000ff'));

    this.healthbar.bg.y = -6;
    this.manabar.bg.y = -4;
   
  }

  Alive.prototype = Object.create(Entity.prototype);
  Alive.prototype.constructor = Alive;

  Alive.prototype.hit = function(source,dmg) {
    this.stats.hp -= dmg;
    if(this.stats.hp <= 0) {
      this.kill();
      source.stats.addExp(this.exp);
    }
  }
  
  Alive.prototype.update = function() {
    Entity.prototype.update.call(this);
  };

  return Alive;
});
