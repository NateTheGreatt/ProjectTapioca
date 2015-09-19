define([
    'game',
    'entity/Entity',
    'component/SpawnsThings'
],
function(game, Entity, SpawnsThings) {
    function Spawner(x,y) {
        Entity.call(this, x, y);
        
        this.name = 'Spawner';
        
        this.spawner = this.addComponent(new SpawnsThings(this));
        
    }
    
    Spawner.prototype = Object.create(Entity.prototype);
    Spawner.prototype.constructor = Spawner;

    
    Spawner.prototype.update = function() {
        Entity.prototype.update.call(this);
    };
    
    return Spawner;
});
