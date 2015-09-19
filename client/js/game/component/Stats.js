define(['component/Component'],
function(Component) {
  function Stats(parent, opts) {
    Component.call(this, parent);
    this.name = 'Stats';

    // defaults
    this.maxHP = 100;
    this.maxMP = 100;
    this.hp = 100;
    this.mp = 100;
    this.str = 1;
    this.agi = 1;
    this.int = 1;
    this.def = 1;
    this.mdef = 1;
    this.exp = 0;
    this.expCap = 30;
    this.level = 1;
    this.points = 0;

    this.modifiers = [];
  }

  Stats.prototype = Object.create(Component.prototype);
  Stats.prototype.constructor = Stats;
  
  Stats.prototype.levelUp = function() {
    
    this.level++;
    this.expCap = this.expCap + Math.round(this.expCap*1.33);
    console.log('leveled up: '+this.level);
    // give stat/talent/whatever points
    this.points += 3;
    this.maxHP += Math.round(this.str/this.level);
    this.hp = this.maxHP;
    this.maxMP += Math.round(this.int/this.level);
    this.mp = this.maxMP;
    
  };
  
  Stats.prototype.addExp = function(exp) {
    this.exp += exp;
    if(this.exp >= this.expCap) {
      this.levelUp();
    }
    
    console.log('exp: '+this.exp+'/'+this.expCap)
  };

  Stats.prototype.addMod = function(mod) {
    // mod = {name: '', stat: 'stat',  add: ## || mult: ##}
    this.modifiers.push(mod);
  };

  Stats.prototype.removeMod = function(mod) {
    for(var i=0;i<this.modifiers.length;i++){
      if(this.modifiers[i].name == mod.name) {
        this.modifiers.splice(i,1);
        break;
      }
    }
  };

  Stats.prototype.getStatBase = function(stat) {
    return this[stat];
  };

  Stats.prototype.getStat = function(stat) {
    var value = this[stat];
    this.modifiers.filter(function(mod) {
      if(mod.stat == stat) {
        if(mod.add) x += mod.add;
        if(mod.mult) x *= mod.mult;
      }
    });
    return value;
  };

  return Stats;

});
