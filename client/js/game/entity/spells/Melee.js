define([ 
    'game',
    'entity/Spell',
    'component/SpellMaster'
], 
function(game, Spell, SpellMaster) {
    function Melee(source,x,y) {
        Spell.call(this, x, y);
        
        this.name = 'Spell';
        this.source = source;
        
    }
    
    Melee.prototype = Object.create(Spell.prototype);
    Melee.prototype.constructor = Spell;
    
    Melee.prototype.cast = function() {
        // enable and spawn
    };
    
    Melee.prototype.update = function() {
        // move forward
    };
    
    return Spell;
})