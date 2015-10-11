define([
    'game',
    'component/Component',
    'registry',
    'resources/items',
    'entity/WorldItem'
],
function(game, Component, registry, items, WorldItem) {
    
    function Projectile(parent,opts ) {
        Component.call(this,parent);
        this.name = 'Projectile';
        
        
        
    }
    
    Projectile.prototype = Object.create(Component.prototype);
    Projectile.prototype.constructor = Projectile;
    
    Projectile.prototype.update = function() {
        this.parent.velocity.x = Math.cos(this.angle)*this.speed;
        this.parent.velocity.y = Math.sin(this.angle)*this.speed;
    };
    
    
    return Projectile;
});