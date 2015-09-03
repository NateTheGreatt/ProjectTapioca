define([
  'game',
  'entity/Player',
  'entity/Enemy',
  'entity/Critter',
  'registry'
],
function(game, Player, Enemy, Critter, registry){

  var player,enemy,critter;

  function World() {

  }
  
  World.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    registry.init();

    player = new Player(10,10);
    registry.players.add(player);
    
    window.player = player;

    enemy = new Enemy(100,100);
    registry.enemies.add(enemy);

    critter = new Critter(200,200);
    registry.enemies.add(critter);

    // enemy = new Enemy(200,110);
    // registry.enemies.add(enemy);
    //
    // enemy = new Enemy(300,120);
    // registry.enemies.add(enemy);
  }


  World.prototype.update = function() {
    game.debug.body(player);
  }

  return World;

});
