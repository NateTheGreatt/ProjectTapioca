define([
  'game',
  'entity/Alive',
  'component/Melee',
  'component/Aggro',
  'component/BasicMobAI',
  'component/Drops'
],
function(game, Alive, Melee, Aggro, BasicMobAI, Drops) {
  function Enemy(x,y) {
    Alive.call(this, x, y);

    this.name = 'Enemy';

    this.melee = this.addComponent(new Melee(this));
    this.melee.dmg = 10;
    this.aggro = this.addComponent(new Aggro(this, {aggressive: true}));
    this.ai = this.addComponent(new BasicMobAI(this));
    this.drops = this.addComponent(new Drops(this));

    this.aggro.onTargetAquired.add(this.ai.setTarget, this.ai);
    this.aggro.onTargetAquired.add(this.melee.setTarget, this.melee);

  }

  Enemy.prototype = Object.create(Alive.prototype);
  Enemy.prototype.constructor = Enemy;

  Enemy.prototype.hit = function(source, dmg) {
    Alive.prototype.hit.call(this,source,dmg); // super call
    
    if(this.stats.hp <= 0) {
      this.drops.dropItems();
    }
    
    if(!this.aggro.target) this.aggro.setTarget(source);
    var angle = game.math.angleBetween(
      this.x+(this.width/2),
      this.y+(this.height/2),
      source.x+(source.width/2),
      source.y+(source.height/2)
    );
    this.x -= Math.cos(angle)*15;
    this.y -= Math.sin(angle)*15;
  };
  
  Enemy.prototype.update = function() {
    Alive.prototype.update.call(this);
  };

  return Enemy;
});
