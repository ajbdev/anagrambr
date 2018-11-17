
const Player = require('./player');
const Tiles = require('./tiles');
const Dictionary = require('./dictionary');
const uuid = require('uuid/v4');

/**
 * board is a giant, infinite grid
 * players initiate a game by giving a name and receive 7 letters
 * players can play any english word on the grid along the x or y axis
 * the first play can place anywhere, all other plays must chain off an existing word
 * as soon as a player plays a word, if it is accepted, the player receives up to 7 letters again
 * players can play in any order, there are no turns
 */

const tiles = new Tiles();
const dictionary = new Dictionary();

class Game {
     constructor() {
        this.players = [];
     }

     createPlayer(name) {
        const id = uuid();

        this.players[id] = new Player(id, name);

        this.fillTiles(this.players[id]);

        return this.players[id];
     }

     fillTiles(player) {
        player.tiles = tiles.draw(7 - player.tiles.length);
     }

     validateWord(player, str) {
        const p = this.players[player.id];

        return dictionary.contains(str, p.tiles) && dictionary.isWord(str);
     }

 }

 module.exports = new Game();