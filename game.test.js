it('creates a new player', () => {
    const game = require('./game');
    const player = game.createPlayer('Andrew');

    expect(player.id.length).toBeGreaterThan(0);
});