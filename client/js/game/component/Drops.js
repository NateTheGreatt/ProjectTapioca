define([
    'game',
    'component/Component',
    'registry',
    'resources/items',
    'entity/WorldItem'
],
function(game, Component, registry, items, WorldItem) {
    
    function Drops(parent,opts ) {
        Component.call(this,parent);
        this.name = 'Drops';
        
        this.items = [];
        
        for(var key in items) {
            this.items.push(new WorldItem(0,0,items[key]));
        }
    }
    
    Drops.prototype = Object.create(Component.prototype);
    Drops.prototype.constructor = Drops;
    
    Drops.prototype.dropItems = function() {
        var self = this;
        this.items.filter(function(item) {
            item.x = self.parent.x + (Math.random()*64)-32;
            item.y = self.parent.y + (Math.random()*64)-32;
            registry.drops.add(item);
        });
    };
    
    
    return Drops;
});