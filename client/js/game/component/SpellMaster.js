define([
    'game',
    'component/Component'
],
function(game, Component) {
    
    function SpellMaster(parent) {
        Component.call(this,parent);
    
        
        this.chain = [];
    }
    
    SpellMaster.prototype = Object.create(Component.prototype);
    SpellMaster.prototype.constructor = SpellMaster;
    
    SpellMaster.prototype.add = function(spell) {
        this.chain.push(spell);
    };
    
    SpellMaster.prototype.cast = function() {
        
    };
    
    SpellMaster.prototype.update = function() {
        
    };
    
    return SpellMaster;
    
});