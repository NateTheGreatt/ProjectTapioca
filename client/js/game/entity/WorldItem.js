define([
  'game',
  'entity/Entity',
  'registry'
],
function(game, Entity, registry) {
  function WorldItem(x,y,json) {
    Entity.call(this, x, y);

    this.name = 'WorldItem';
    
    this.json = json;
    
    this.width = 12;
    this.height = 12;
    
    this.tint = json.color;
    
  }

  WorldItem.prototype = Object.create(Entity.prototype);
  WorldItem.prototype.constructor = WorldItem;
  
  WorldItem.prototype.handleOverlap = function(item,player) {
      item.kill();
      player.inventory.addItem(item.json);
  };

  WorldItem.prototype.update = function() {
    
    game.physics.arcade.overlap(registry.players,this,this.handleOverlap,null,this);
    
  };

  return WorldItem;
});
