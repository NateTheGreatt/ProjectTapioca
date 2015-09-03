define([
  'game',
  'entity/Entity',
  'component/PlayerControl',
  'component/Stats',
  'component/Melee',
  'component/ProjectileAttack',
  'component/Inventory',
  'component/Healthbar'
],
function(game, Entity, PlayerControl, Stats, Melee, ProjectileAttack, Inventory, Healthbar) {
  function Player(x,y) {
    Entity.call(this, x, y);
    console.log('player added');

    this.name = 'Player';

    this.addComponent(new PlayerControl(this));
    //this.melee = this.addComponent(new Melee(this));
    this.projectile = this.addComponent(new ProjectileAttack(this));
    this.stats = this.addComponent(new Stats(this));
    this.inventory = this.addComponent(new Inventory(this));

    this.healthbar = this.addComponent(new Healthbar(this));
  }

  Player.prototype = Object.create(Entity.prototype);
  Player.prototype.constructor = Player;
  
  Player.prototype.pickup = function(item) {
    this.inventory.addItem(item);
  };

  Player.prototype.update = function() {
    this.updateComponents();
  };

  return Player;
});
