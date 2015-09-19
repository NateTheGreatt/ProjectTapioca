define([ 
    'game',
    'entity/Entity',
    'component/SpellMaster'
], 
function(game, Entity, SpellMaster) {
    function Spell(source,x,y) {
        Entity.call(this, x, y);
        
        this.name = 'Spell';
        this.source = source;
        
    }
    
    Spell.prototype = Object.create(Entity.prototype);
    Spell.prototype.constructor = Spell;
    
    
    
    Spell.prototype.update = function() {
        
    };
    
    return Spell;
})