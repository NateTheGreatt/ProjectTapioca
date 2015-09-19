define([
    'game',
    'component/Component'
],
function(game, Component) {
    
    function DataBar(parent,name,context,currentValue,maxValue,color) {
        Component.call(this,parent);
        this.name = name;
        
        this.context = context;
        this.currentValue = currentValue;
        this.maxValue = maxValue;
        
        this.width = this.parent.width;
        this.height = 1;
        this.border = 0;
        
        this.bgGfx = game.make.bitmapData(this.width, this.height);
        this.bgGfx.ctx.fillStyle = '#666666';
        this.bgGfx.ctx.fillRect(0, 0, this.width, this.height);
        
        this.barGfx = game.make.bitmapData(this.width-this.border*2, this.height-this.border*2);
        this.barGfx.ctx.fillStyle = color;
        this.barGfx.ctx.fillRect(0, 0, this.width-this.border*2, this.height-this.border*2);
        
        this.bg = new Phaser.Sprite(game, 0,-20, this.bgGfx);
        this.bar = new Phaser.Sprite(game, this.border, this.border, this.barGfx);
        
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