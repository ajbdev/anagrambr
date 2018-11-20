
const Player = require('./player');
const Tiles = require('./tiles');
const Dictionary = require('./dictionary');
const Board = require('./Board');
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
const board = new Board();
const dictionary = new Dictionary();

class CommitTileError extends Error {}

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

     commitTiles(player) {
        const tiles = board.getUncommitedTilesFor(player);

        // Check that tiles are contiguous
        // Find the axis that stays constant
        const axis = (tiles[0].y - tiles[1].y === 0) 
                   ? 'x' 
                   : (tiles[0].x - tiles[1].x === 0)
                   ? 'y'
                   : null;

         let words = [];

        for (let i=0;i<tiles.length;i++) {
            if (tiles[i][axis] !== tiles[0][axis]) {
                throw new CommitTileError('Tiles are not contiguous');
            }
            // Find all contiguous letters surrounding this tile
            words.push(board.findNeighboringLettersOnAxis(tiles[i],axis));
        }

        // Remove blanks, transform to set to dedupe
        words = new Set(words.filter(Boolean));

        let nonWords = [];
        words.forEach((word) => {
           if (!dictionary.isWord(word)) {
               nonWords.push(word);
           }
        });

        if (nonWords.length > 0) {
           throw new CommitTileError(words.join() + ' are not words');
        }

        board.commit(player);
     }

     fillTiles(player) {
        player.tiles = tiles.draw(7 - player.tiles.length);
     }

     placeTile(player, letter, x, y) {      
        board.place(tiles.select(player, letter, x, y));
     }

     placeTiles(player, letters, x, y, axis) {
        for (var i=0;i<letters.length;i++) {
           iX = (axis === board.axes.X_AXIS) ? x+i : x;
           iY = (axis === board.axes.Y_AXIS) ? y+i : y;

           this.placeTile(player, letters[i], iX, iY)
        }
     }

     validateWord(player, str) {
        const p = this.players[player.id];

        return dictionary.contains(str, p.tiles) && dictionary.isWord(str);
     }

 }

 module.exports = new Game();