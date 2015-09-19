define([
    'game',
    'entity/Entity',
    'component/ProjectileAttack'
],
function(game, Entity, ProjectileAttack) {
    function BossTurret(x,y) {
        Entity.call(this, x, y);
        
        this.name = 'BossTurret';
        
        this.shooter = this.addComponent(new ProjectileAttack(this));
        
        this.shooter.cooldown = 10;
        this.shooter.target = new Phaser.Point(0,0);
        
        this.time = 0;
        
    }
    
    BossTurret.prototype = Object.create(Entity.prototype);
    BossTurret.prototype.constructor = BossTurret;

    
    BossTurret.prototype.update = function() {
        Entity.prototype.update.call(this);
        
        this.time+=game.time.elapsed;
        
        var t = game.time.totalElapsedSeconds();
        var d = this.width/2;
        var m = this.getMidpoint();
        
        this.shooter.target.x = m.x * Math.cos(this.time) * d;
        this.shooter.target.y = m.y * Math.sin(this.time) * d;
        
        this.shooter.attack();
    };
    
    return BossTurret;
});
