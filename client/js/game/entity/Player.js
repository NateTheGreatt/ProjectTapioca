define(['game','entity/Entity','component/PlayerControl','component/Stats','component/Melee'],
function(game, Entity, PlayerControl, Stats, Melee) {
  function Player(x,y) {
    Entity.call(this, x, y);
    console.log('player added');

    this.name = 'Player';

    this.addComponent(new PlayerControl(this));
    this.stats = this.addComponent(new Stats(this));
    this.addComponent(new Melee(this));

  }

  Player.prototype = Object.create(Entity.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    this.updateComponents();
  };

  return Player;
});
