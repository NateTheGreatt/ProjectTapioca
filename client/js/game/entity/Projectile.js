define([
  'game',
  'entity/Entity',
  'registry'
],
function(game, Entity, registry) {
  function Projectile(source, x,y,angle) {
    Entity.call(this, x, y);

    this.name = 'Projectile';
    this.source = source;
    this.angle = angle;
    this.speed = 3;
    this.dmg = 25;
    this.lifeTime = 2500;
    
    this.width = 8;
    this.height = 8;

  }

  Projectile.prototype = Object.create(Entity.prototype);
  Projectile.prototype.constructor = Projectile;
  
  Projectile.prototype.handleOverlap = function(projectile, enemy) {
    enemy.hit(this.source, this.dmg);
    this.kill(); 
  };
  
  Projectile.prototype.update = function() {
    this.updateComponents();
    
    game.physics.arcade.overlap(this,registry.enemies,this.handleOverlap,null,this);
    this.lifeTime -= game.time.elapsed;
    if(this.lifeTime < 0) this.kill();
    
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  };

  return Projectile;
});
