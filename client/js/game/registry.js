define(['game'],
function(game) {
  function registry() {}

  registry.prototype.init = function() {
    this.enemies = game.add.group();
    this.players = game.add.group();
  }

  return new registry(); // returning "new registry()" makes it a static object
})
