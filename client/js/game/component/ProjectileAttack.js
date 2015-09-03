define(['game','state/World','component/Component','entity/Projectile','registry'],
function(game,World,Component,Projectile,registry) {
    function ProjectileAttack(parent,opts) {
        Component.call(this, parent);
        this.name = 'ProjectileAttack';
        if(this.parent.name == 'Player') this.target = game.input.activePointer;
        else this.target = null;
        
        this.cooldown = 700; //ms
        this.cooling = this.cooldown;
        this.shooting = false;
        this.projectileLife = 500;
        
        this.pointClicked = null;
        this.trajectory = null;
        this.speed = 5;
    }
    
    ProjectileAttack.prototype = Object.create(Component.prototype);
    ProjectileAttack.prototype.constructor = ProjectileAttack;
    

  ProjectileAttack.prototype.attack = function() {
      this.cooling = this.cooldown;
      console.log('attacking');
       this.pointClicked = {x: game.input.activePointer.x, y: game.input.activePointer.y};
       var angle = game.math.angleBetween(
       this.parent.x+(this.parent.width/2),
       this.parent.y+(this.parent.height/2), 
       this.pointClicked.x,
       this.pointClicked.y);
       var dist = 26;
       
       registry.projectiles.add(new Projectile(this.parent, this.parent.x+(this.parent.width/2),this.parent.y+(this.parent.height/2), angle));
  }
  
  ProjectileAttack.prototype.update = function () {
      
      this.cooling -=game.time.elapsed;
      
      if(this.parent.name == 'Player') {
          
        //   this.setHitboxPos();
          
          if(game.input.activePointer.leftButton.isDown) {
              if(this.cooling < 0) this.attack();
          }
      }
       
      
  };
  
  return ProjectileAttack;
  
})