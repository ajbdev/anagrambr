
const Board = require('./board');

it('allows a tile to be placed', () => {
    const board = new Board();

    const result = board.place({
        x: 0,
        y: 0
    });

    expect(result).toBe(true);
});

it('does not allow a tile to be placed on top of another tile', () => {
    const board = new Board();

    const tile = { x: 0, y:0 };

    board.place(tile);

    const result = board.place(tile);

    expect(result).toBe(false);

});

it('finds the nearest neighboring letters on an axis', () => {

});