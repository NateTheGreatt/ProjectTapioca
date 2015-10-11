define([ 
    'game',
    'entity/Spell',
    'component/SpellMaster',
    'resources/spells'
], 
function(game, Spell, SpellMaster,spells) {
    function Projectile(source,x,y) {
        Spell.call(this, x, y);
        
        this.name = 'Projectile';
        this.source = source;
        this.angle = angle;
        this.speed = 3;
        this.dmg = 25;
        this.lifeTime = 2500;
        
        // this.loadTexture(json.textureKey);
        
        this.width = 8;
        this.height = 8;
        
    }
    
    Projectile.prototype = Object.create(Spell.prototype);
    Projectile.prototype.constructor = Spell;
    
    Projectile.prototype.handleOverlap = function(projectile, enemy) {
        enemy.hit(this.source, this.dmg);
        this.kill();
    };
    
    Projectile.prototype.cast = function() {
        // enable and spawn
    };
    
    Projectile.prototype.update = function() {
        // move forward
        this.updateComponents();
        
        game.physics.arcade.overlap(this,registry.enemies,this.handleOverlap,null,this);
        this.lifeTime -= game.time.elapsed;
        if(this.lifeTime < 0) this.kill();
        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
    };
    
    return Spell;
})