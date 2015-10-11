define([
    'game'
],
function(game) {
    
    function Slot(x,y) {
        
    }
    
    Slot.prototype = Object.create(Phaser.Sprite.prototype);
    Slot.prototype.constructor = Slot;
    
    return Slot;
    
});