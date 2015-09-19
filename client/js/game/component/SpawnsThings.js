define([
    'game',
    'registry',
    'component/Component',
    'entity/Enemy'
],
function(game,registry,Component,Enemy) {
    function SpawnsThings(parent,opts) {
        Component.call(this, parent);
        this.name = 'SpawnsThings';
        
        this.radius = 200;
        this.timeout = 1000; // every 1 second
        this.chanceToSpawn = .33; // 33% chance to spawn
        this.max = 10;
        
        this.children = [];
        
    }
    
    SpawnsThings.prototype = Object.create(Component.prototype);
    SpawnsThings.prototype.constructor = SpawnsThings;
    
    
    SpawnsThings.prototype.spawn = function() {
        var m = this.parent.getMidpoint();
        
        console.log('oh boi george');
        
        var x = m.x + game.rnd.integerInRange(-this.radius, this.radius);
        var y = m.y + game.rnd.integerInRange(-this.radius, this.radius);
    
        var e = new Enemy(x,y);
        this.children.push(e);
        registry.enemies.add(e);

    };
    
    SpawnsThings.prototype.countLiving = function() {
        var count = 0;
        this.children.filter(function(child) {
            if(child.alive) {
                count++;
            }
        });
        return count;
    }

    SpawnsThings.prototype.update = function () {
      
      if(this.countLiving() < this.max) {
          
          this.timeout -= game.time.elapsed;
          
          if(this.timeout <= 0) {
              this.timeout = 1000;
              if(Math.random() < this.chanceToSpawn) {
                  this.spawn();
              }
          }
      }
      
      
    };
    
    return SpawnsThings;

})