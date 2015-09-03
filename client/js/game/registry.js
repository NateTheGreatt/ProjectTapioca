define(['game'],
function(game) {
  function registry() {}

  registry.prototype.init = function() {
    this.enemies = game.add.group();
    this.players = game.add.group();
    this.drops = game.add.group();
    this.projectiles = game.add.group();
  }

  return new registry(); // returning "new registry()" makes it a static object
})
