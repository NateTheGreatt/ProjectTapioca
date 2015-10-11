define([
  'game',
  'entity/Alive',
  'component/PlayerControl',
  'component/Melee',
  'component/SpellBook',
  'component/Inventory',
  'component/DataBar'
],
function(game, Alive, PlayerControl, Melee, SpellBook, Inventory, DataBar) {
  function Player(x,y) {
    Alive.call(this, x, y);
    console.log('player added');
  
    this.loadTexture('dude');
    
    this.body.offset.y = 16;
    
    this.name = 'Player';
    this.speed = 100;

    this.playerCtrl = this.addComponent(new PlayerControl(this));
    // this.attack = this.addComponent(new Melee(this));
    // this.attack = this.addComponent(new ProjectileAttack(this));
    this.spellBook = this.addComponent(new SpellBook(this));
    this.inventory = this.addComponent(new Inventory(this));
    this.expbar = this.addComponent(new DataBar(this,'expbar',this.stats,'exp','expCap',"#aaaaaa"));
    
    this.sprint = this.speed*this.stats.agi;
    this.expbar.bg.y = 34;
    
    
    // this.playerCtrl.onAttack.add(this.attack.attack, this.attack);
    // this.playerCtrl.onAttack.add(this.spellBook.castSpell, this.spellBook);
    
    this.body.velocity.y = 10;

  }

  Player.prototype = Object.create(Alive.prototype);
  Player.prototype.constructor = Player;
  
  Player.prototype.pickUp = function(item) {
    
    // if(this.inventory.items.length < this.inventory.slots) {
      // if(this.stats.hp < this.stats.maxHP) this.stats.hp += 10;
      this.inventory.addItem(item);
    //   item.kill();
    // }
    
  };

  Player.prototype.update = function() {
    Alive.prototype.update.call(this);
  };

  return Player;
});
