define([
    'game',
    'component/Component'
],
function(game, Component) {
    
    function DataBar(parent,context,currentValue,maxValue,color) {
        Component.call(this,parent);
        this.name = 'DataBar';
        
        this.context = context;
        this.currentValue = currentValue;
        this.maxValue = maxValue;
        
        this.width = 32;
        this.height = 8;
        this.border = 0;
        
        var bgGfx = game.make.bitmapData(this.width, this.height);
        bgGfx.ctx.fillStyle = '#666666';
        bgGfx.ctx.fillRect(0, 0, this.width, this.height);
        
        var barGfx = game.make.bitmapData(this.width-this.border*2, this.height-this.border*2);
        barGfx.ctx.fillStyle = color;
        barGfx.ctx.fillRect(0, 0, this.width-this.border*2, this.height-this.border*2);
        
        this.bg = new Phaser.Sprite(game, 0,-20, bgGfx);
        this.bar = new Phaser.Sprite(game, this.border, this.border, barGfx);
        
        this.parent.addChild(this.bg);
        this.bg.addChild(this.bar);
        
        
    }
    
    DataBar.prototype = Object.create(Component.prototype);
    DataBar.prototype.constructor = DataBar;
    
    DataBar.prototype.update = function() {
        this.bar.scale.x = this.context[this.currentValue] / this.context[this.maxValue];
    };
    
    return DataBar;
});