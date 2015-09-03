define([
    'game',
    'component/Component'
],
function(game, Component) {
    
    function Healthbar(parent,opts ) {
        Component.call(this,parent);
        this.name = 'Healthbar';
        
        this.width = 32;
        this.height = 8;
        
        var bgGfx = game.make.bitmapData(this.width, this.height);
        bgGfx.ctx.fillStyle = '#cccccc';
        bgGfx.ctx.fillRect(0, 0, this.width, this.height);
        
        var barGfx = game.make.bitmapData(this.width-2, this.height-2);
        barGfx.ctx.fillStyle = '#00ff00';
        barGfx.ctx.fillRect(0, 0, this.width-2, this.height-2);
        
        this.bg = new Phaser.Sprite(game, 0,-20, bgGfx);
        this.bar = new Phaser.Sprite(game, 0,-19, barGfx);

        this.parent.addChild(this.bg);
        this.parent.addChild(this.bar);
        
        
    }
    
    Healthbar.prototype = Object.create(Component.prototype);
    Healthbar.prototype.constructor = Healthbar;
    
    Healthbar.prototype.update = function() {
        
    };
    
    return Healthbar;
});