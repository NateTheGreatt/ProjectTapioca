///<reference path="../d.ts/node.d.ts" />

import Entity = require('./entity');
import Player = require('./player');

[Entity,Player];

class Game {
  clients: Player[];
  entities: Entity[];
  io: any;
  lastProcessedInput: number[];

  constructor(socketServer) {
    this.io = socketServer;
    this.clients = [];
    this.entities = [];
    this.lastProcessedInput = [];

    this.setEventHandlers();
  }

  setEventHandlers() {
    var game = this;

    game.io.sockets.on('connection', function (client) {
      console.log('Player connected: ' + client.id);
      game.clients.push(client.id);

      client.on('disconnect', function(payload) {
        game.removeClient(payload.id);
        client.broadcast.emit('remove player', {id: client.id});
      });
      client.on('newPlayer', function(payload) {
        var eggBoy: Entity = new Entity(payload.x, payload.y, payload.width, payload.height, <string>payload.id, game.io);
        game.entities.push(eggBoy);

        // tell all players on server that a new player joined
        client.broadcast.emit('player joined', payload);

        // send all other players on server to the new player
        for(var i=0;i<game.entities.length;i++) {
          var e = game.entities[i];
          if(e.id != client.id) client.emit('player joined', {id: e.id, x: e.x, y: e.y});
        }
      });
      client.on('movePlayer', function(payload) {
        var player = game.entityById(payload.id);
        if(player != undefined) player.addInput(payload.input);
      });

    });
  }

  removeClient(id) {
    var c;
    for(var i=0;i<this.clients.length;i++) {
      if (c = this.clients.indexOf(id) > -1) {
        this.clients.splice(c, 1);
      }
    }
    // always remove player's entity when they disconnect
    this.removeEntity(id);
  }

  removeEntity(id) {
    var e;
    for(var i=0;i<this.entities.length;i++) {
      if (e = this.entities.indexOf(id) > -1) {
        this.entities.splice(e, 1);
      }
    }
  }

  entityById(id): Entity {
    for(var i=0;i<this.entities.length;i++) {
      if(this.entities[i].id == id) return <Entity>this.entities[i];
    }
  }

  update(delta) {
    /*this.processInputs();
    this.sendWorldState();*/
    this.updateEntities();
  }

  updateEntities() {
    for(var i=0;i<this.entities.length;i++) {
      this.entities[i].update();
    }
  }

}

export = Game;
