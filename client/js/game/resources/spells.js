define([],
function() {
    
    var spells = {
        'melee': {
            name: 'melee',
            type: 'melee',
            texture: 'melee',
            dmg: 7,
            cooldown: 1000
        },
        'arrow': {
            name: 'arrow',
            type: 'projectile',
            texture: 'arrow',
            dmg: 4,
            cooldown: 1,
            lifetime: 4000
        },
        'fireball': {
            name: 'fireball',
            type: 'projectile',
            texture: 'fireball',
            dmg: 10,
            cooldown: 3,
            lifetime: 2000
        }
    };
    
    return spells;
});