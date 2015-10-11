// SpellBook is a factory for Spells

define([
    'game',
    'component/Component',
    'entity/Spell',
    'resources/spells',
    'component/spell/Projectile',
    'component/spell/Splitter',
    'component/spell/Homing',
    'component/spell/Explode'
],
function(game, Component, Spell, spellsJSON, Projectile, Splitter, Homing, Explode) {
    
    function SpellBook() {
        Component.call(this,parent);
        
        // initial spell
        var projectileSpell = new Spell(parent, 0,0);
        projectileSpell.addComponent(new Projectile(projectileSpell));
        
        // next spell in the chain
        var splitterSpell = new Spell(parent, 0,0);
        splitterSpell.addComponent(new Splitter(splitterSpell));
        
        // next spell in the chain to be applied to both projectiles emitted from the splitter spell
        var explodeSpell = new Spell(parent,0,0);
        explodeSpell.addComponent(new Explode(explodeSpell));
        
        projectileSpell.next = splitterSpell;
        splitterSpell.next = explodeSpell;
        
        // hypothetically populated with chains of Spells with behaviors already added on by this factory
        this.spells = [
            {
                name: 'Spell1', // auto-generate name or let player name it
                spells: [
                    // new Spell()
                ]
            }
        ];
    }
    SpellBook.prototype = Object.create(Component.prototype);
    SpellBook.prototype.constructor = SpellBook;
    
    // create a new spell object from nth ability binding
    SpellBook.prototype.create = function(n) {
        this.spells[n-1]
    };
    
    return SpellBook;
    
});