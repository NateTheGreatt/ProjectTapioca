define([
  'game',
  'entity/Alive',
  'component/PlayerControl',
  'component/Melee',
  'component/ProjectileAttack',
  'component/Inventory'
],
function(game, Alive, PlayerControl, Melee, ProjectileAttack, Inventory) {
  function Player(x,y) {
    Alive.call(this, x, y);
    console.log('player added');

    this.name = 'Player';
    this.speed = 2;

    this.inputCtrl = this.addComponent(new PlayerControl(this));
    // this.attack = this.addComponent(new Melee(this));
    this.attack = this.addComponent(new ProjectileAttack(this));
    this.inventory = this.addComponent(new Inventory(this));
    
    
    this.inputCtrl.onAttack.add(this.attack.attack, this.attack);

  }

  Player.prototype = Object.create(Alive.prototype);
  Player.prototype.constructor = Player;
  
  Player.prototype.pickup = function(item) {
    this.inventory.addItem(item);
  };

  Player.prototype.update = function() {
    Alive.prototype.update.call(this);
  };

  return Player;
});
