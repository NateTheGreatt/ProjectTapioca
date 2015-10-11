define([
  'game',
  'registry'
],
function(game,registry) {
  var entityCount = 0;
  function Entity(x,y) {
    var s = 16;
    this.rect = game.make.bitmapData(s, s);
    this.rect.ctx.fillStyle = '#FFFFFF';
    this.rect.ctx.fillRect(0, 0, s, s);

    Phaser.Sprite.call(this,game,x,y,this.rect);
    
    this.width = s;
    this.height = s;
    // game.physics.enable(this, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.exp = 10;

    this.id = entityCount++;
    this.components = {};
  }

  Entity.prototype = Object.create(Phaser.Sprite.prototype);
  Entity.prototype.constructor = Entity;
  
  Entity.prototype.getMidpoint = function() {
    return {x: this.body.x+this.body.halfWidth, y: this.body.y+this.body.halfHeight-this.body.offset.y};
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
  
  Entity.prototype.handleCollide = function() {
    console.log('hi');
  }
  
  Entity.prototype.update = function() {
    if(this.alive) {
      
      this.body.preUpdate();
      
      this.updateComponents();
      game.physics.arcade.collide(this,registry.walls,this.handleCollide,null,this);
      
      this.body.postUpdate();
      
      game.debug.body(this,'red',false);
      game.debug.spriteBounds(this, 'pink', false);
    }
  }

  return Entity;

});