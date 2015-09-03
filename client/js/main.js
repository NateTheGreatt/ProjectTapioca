requirejs.config({
  baseUrl: 'js/game'
  // paths: {
  //   app: '../app' e.g.
  // }
});

requirejs(['game', 'state/Boot', 'state/Preload', 'state/Menu', 'state/World'],
function(game, Boot, Preload, Menu, World) {
    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('menu', Menu);
    game.state.add('world', World);

    game.state.start('boot');
});