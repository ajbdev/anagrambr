class Tile {
    constructor(letter, x, y, player) {
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.player = player;
        this.committed = false;
    }
}

class SelectTileError extends Error {}

class Tiles {
    constructor() {
        this.tiles = {
            __: 0,
            EEEEEEEEEEEE: 1,
            AAAAAAAAA: 1,
            IIIIIIIII: 1,
            OOOOOOOO: 1,
            NNNNNN: 1,
            RRRRRR: 1,
            TTTTTT: 1,
            LLLL: 1,
            SSSS: 1,
            UUUU: 1,
            DDDD: 2,
            GGG: 2,
            BB: 3,
            CC: 3,
            MM: 2,
            PP: 2,
            FF: 4,
            HH: 4,
            VV: 4,
            WW: 4,
            YY: 4,
            K: 5,
            J: 8,
            X: 8
        };

        this.distribution = Object.keys(this.tiles).map((letter) => letter).join('');
    }

    select(player, letter, x, y) {
        
        if (player.tiles.indexOf(letter) === -1) {
           throw new SelectTileError('Player does not have this letter');
        }  

        return new Tile(letter, player, x, y);
    }

    draw(amount = 1) {
        let tiles = '';

        while (tiles.length < amount) {
            tiles += this.distribution.charAt(Math.floor(Math.random() * this.distribution.length));
        }

        return tiles;
    }
}

module.exports = Tiles;