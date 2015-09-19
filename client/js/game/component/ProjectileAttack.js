define(['game','component/Component','entity/Projectile','registry'],
function(game,Component,Projectile,registry) {
    function ProjectileAttack(parent,opts) {
        Component.call(this, parent);
        this.name = 'ProjectileAttack';
        if(this.parent.name == 'Player') this.target = game.input.activePointer;
        else this.target = null;
        
        this.cooldown = 200; //ms
        this.cooling = this.cooldown;
        this.shooting = false;
        this.projectileLife = 500;
        
        this.pointClicked = null;
        this.speed = 5;
    }
    
    ProjectileAttack.prototype = Object.create(Component.prototype);
    ProjectileAttack.prototype.constructor = ProjectileAttack;
    

    ProjectileAttack.prototype.attack = function() {
        if(this.cooling <= 0) {
            this.cooling = this.cooldown;
            
            this.pointClicked = {x: this.target.x, y: this.target.y};
            var parentMidpoint = this.parent.getMidpoint();
            var angle = game.math.angleBetween(
                parentMidpoint.x,
                parentMidpoint.y,
                this.pointClicked.x,
                this.pointClicked.y
            );
            
            registry.projectiles.add(
                new Projectile(
                    this.parent, 
                    parentMidpoint.x,
                    parentMidpoint.y, 
                    angle
                )
            );
        }
    }
    
    ProjectileAttack.prototype.update = function () {
      
        this.cooling -=game.time.elapsed;
        
        if(this.parent.name == 'Player') {
          
            // if(game.input.activePointer.leftButton.isDown) {
            //     if(this.cooling < 0) this.attack();
            // }
            
            if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
                if(this.cooling < 0) this.attack();
            }
        }
       
      
    };
    
    return ProjectileAttack;

})