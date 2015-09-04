define([
  'game'
],
function(game) {
  var entityCount = 0;
  function Entity(x,y) {
    this.rect = game.make.bitmapData(32, 32);
    this.rect.ctx.fillStyle = '#FFFFFF';
    this.rect.ctx.fillRect(0, 0, 32, 32);

    Phaser.Sprite.call(this,game,x,y,this.rect);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.id = entityCount++;
    this.components = {};
  }

  Entity.prototype = Object.create(Phaser.Sprite.prototype);
  Entity.prototype.constructor = Entity;
  
  Entity.prototype.getMidpoint = function() {
    return {x: this.x+this.width/2, y: this.y+this.height/2};
  };

  Entity.prototype.updateComponents = function() {
    for(var key in this.components) {
      this.components[key].update();
    }
  };
  Entity.prototype.addComponent = function (component) {
    this.components[component.name] = component;
    return this.components[component.name];
  };
  Entity.prototype.removeComponent = function(component) {
    var name;
    if(typeof component === 'function') {
      name = component.name;
    } else name = component;
    delete this.components[name];
    return this;
  };
  Entity.prototype.update = function() {
    if(this.alive) this.updateComponents();
  }

  return Entity;

});