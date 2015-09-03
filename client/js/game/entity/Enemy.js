define([
  'game',
  'entity/Entity',
  'component/Stats',
  'component/Melee',
  'component/Aggro',
  'component/ChaseAI',
  'component/Drops',
  'component/Healthbar'
],
function(game, Entity, Stats, Melee, Aggro, ChaseAI, Drops, Healthbar) {
  function Enemy(x,y) {
    Entity.call(this, x, y);

    this.name = 'Enemy';

    this.stats = this.addComponent(new Stats(this));
    this.addComponent(new Melee(this));
    this.aggro = this.addComponent(new Aggro(this, {aggressive: true}));
    this.chaseAI = this.addComponent(new ChaseAI(this));
    this.drops = this.addComponent(new Drops(this));

    this.aggro.onTargetAquired.add(this.chaseAI.setTarget, this.chaseAI);

    this.healthbar = this.addComponent(new Healthbar(this));
  }

  Enemy.prototype = Object.create(Entity.prototype);
  Enemy.prototype.constructor = Enemy;

  Enemy.prototype.hit = function(source, dmg) {
    this.stats.hp -= dmg;
    if(this.stats.hp <= 0) {
      this.kill();
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
  }
  Enemy.prototype.update = function() {
    this.updateComponents();
    if(this.alive) game.debug.body(this);
  };

  return Enemy;
});
