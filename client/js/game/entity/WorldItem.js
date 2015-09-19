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
    
    this.stack = 1;
    this.maxStack = json.stack;
    
    this.width = 6;
    this.height = 6;
    
    this.tint = json.color;
    
  }

  WorldItem.prototype = Object.create(Entity.prototype);
  WorldItem.prototype.constructor = WorldItem;
  
  WorldItem.prototype.handleOverlap = function(item,player) {
      // item.kill();
      player.pickUp(item);
  };

  WorldItem.prototype.update = function() {
    
    game.physics.arcade.overlap(registry.players,this,this.handleOverlap,null,this);
    
  };

  return WorldItem;
});
