define([
    'game',
    'component/Component'
],
function(game,Component) {
    
    function Inventory(parent) {
        Component.call(this,parent);
        
        this.items = [];
    }
    
    Inventory.prototype = Object.create(Component.prototype);
    Inventory.prototype.constructor = Inventory;
    
    Inventory.prototype.addItem = function(item) {
        this.items.push(item);
    }
    
    Inventory.prototype.update = function() {
        
    };
    
    return Inventory;
    
});