define([
  'game',
  'registry',
  'entity/Player',
  'entity/Enemy',
  'entity/Critter',
  'entity/Spawner',
  'entity/Entity'
],
function(game, registry, Player, Enemy, Critter, Spawner, Entity){

  var player, map, pointsTxt, top;
  
  function World() {

  }
  
  World.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // map = game.add.tilemap('map');
    // map.addTilesetImage('dungeon tileset calciumtrice','dungeon');
    // var bg = map.createLayer('bg');
    // var decor = map.createLayer('decor');
    // var decorBg = map.createLayer('decor bg');
    // var objects = map.createLayer('objects');
    
    game.world.setBounds(0, 0, 28800, 28800);
    // map = game.add.tilemap('map');
    // map.addTilesetImage('NubianTileset','NubianTileset');
    // var outline = map.createLayer('Outline');
    // var foreground = map.createLayer('Foreground');
    // var desert = map.createLayer('desert');
    
    registry.init();
    
    // map.createFromObjects('Collision Objects', 'Collision Objects', 'lolwall', 0, true, false, registry.walls);
    
    
    // map.objects['Collision Objects'].forEach(function(wall) {
    //   var sprite = new Phaser.Sprite(game, wall.x, wall.y);
    //   sprite.width = wall.width;
    //   sprite.height = wall.height;
      
    //   game.physics.enable(sprite, Phaser.Physics.ARCADE);
    //   sprite.body.immovable = true;
    //   // sprite.body.moves = false;
      
    //   registry.walls.add(sprite);
    // });
    
    
    
    var tileSize = 32;
    
    // player = new Player(487 * tileSize, 406 * tileSize);
    player = new Player(500,500);
    registry.players.add(player);
    
    game.camera.follow(player);
    window.player = player; // for debug access in console
    
    registry.enemies.add(new Critter(200,200));
    
    game.add.existing(new Spawner(700,300));
    
    
    // game.add.existing(new BossTurret(300,300));
    
    
    // top = map.createLayer('top');
    
    // 115 - 190
    // map.setCollisionBetween(7, 8,true,top);
    // map.setCollisionBetween(21, 22,true,top);
  
    // function handleOverlap (sprite,tile) {
    //   console.log('under something');
    // };
    
    // map.setTileIndexCallback([7,8], handleOverlap, this, top);
    // map.setTileIndexCallback([21,22], handleOverlap, this, top);
    // map.setTileIndexCallback([0,500], handleOverlap, this, top);

    // game.physics.enable(top, Phaser.Physics.ARCADE);
    // top.resizeWorld();
    
    pointsTxt = game.add.text(10, 10, "Points: "+player.inventory.items.length, { font: "10px Courier New", fill: "#ffffff"});
    

  }

  World.prototype.update = function() {
    // game.physics.arcade.collide(player, top);
    // game.physics.arcade.overlap(player, top, handleOverlap);
    // if(top.overlap(player)) console.log('under');
    
    registry.walls.forEach(function(s) {
      // game.debug.body(s);
    });
    
    pointsTxt.text = 'Points: '+player.inventory.items.length;
    
  }

  return World;

});
