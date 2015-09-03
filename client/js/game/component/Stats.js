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

    // optional
    if(opts) {
      this.maxHP = opts.hp;
      this.maxMP = opts.mp;
      this.hp = opts.hp;
      this.mp = opts.mp;
      this.str = opts.str;
      this.agi = opts.agi;
      this.int = opts.int;
    }

    this.modifiers = [];
  }

  Stats.prototype = Object.create(Component.prototype);
  Stats.prototype.constructor = Stats;

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
