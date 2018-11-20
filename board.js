

class Board {
    constructor() {
        this.tiles = {};
        this.boundary = [7,7,8,8];
        this.axes = {
            X_AXIS: 'x',
            Y_AXIS: 'y'
        }
    }

    findNeighboringLettersOnAxis(tile, axis) {
        let i = tile[axis],
            word = '';

        const coords = (n = 0) => (axis === this.axes.X_AXIS)
                               ? [i+n,tile.y]
                               : [tile.x,i+n]

        while (this.tiles[coords()]) {
            i--;
        }

        while (this.tiles[coords(1)]) {
            word += this.tiles[coords(1)];
            i++;
        }

        return word;
    }

    place(tile) {
        const coords = [tile.x,tile.y];

        if (this.tiles[coords]) {
            return false;
        }

        // @todo: Check boundaries

        this.tiles[coords] = tile;

        return true;
    }    

    commit(player) {
        this.getUncommitedTilesFor(player).forEach((tile) => {
            tile.committed = true;
        })
    }

    getUncommitedTilesFor(player) {
        return Object.keys(this.tiles).map((coords) => {
            const tile = this.tiles[coords];
            if (!tile.committed && tile.player.id === player.id) {
                return tile;
            }
        }).filter(Boolean);
    }
}


module.exports = Board;