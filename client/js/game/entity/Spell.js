define([ 
    'game',
    'entity/Entity',
    'registry'
], 
function(game, Entity, registry) {
    function Spell(source,x,y) {
        Entity.call(this, x, y);
        
        this.name = 'Spell';
        this.source = source;
        
        this.chain = [];
        this.choices = [];
        this.next = null;
        
        this.lifetime = 1000;
        
    }
    
    Spell.prototype = Object.create(Entity.prototype);
    Spell.prototype.constructor = Spell;
    
    Spell.prototype.cast = function(lastSpell) {
        
        this.x = lastSpell.x;
        this.y = lastSpell.y;
        this.chain = lastSpell.chain;
        
        registry.spells.add(this);
    };
    
    Spell.prototype.kill = function() {
        
        // take next combo off the chain and make a new one at this location
        var next = this.chain.unshift();
        
        next.cast(this);
        
        // super.kill
        Entity.prototype.kill.apply(this);
        
        registry.spells.remove(this);
    };
    
    Spell.prototype.update = function() {
        
        // super update
        Entity.prototype.update.apply(this);
    };
    
    return Spell;
})