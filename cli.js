const readline = require('readline');
const game = require('./game');

var player = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What do you call yourself? ', (name) => {
    player = game.createPlayer(name);

    console.log('Hello, ' + player.name + ' (' + player.id + ')');

    main();
})


function main() {
    console.log('Your tiles:');
    console.log(player.tiles);

    rl.question('Type your word: ', (word) => {
        if (!game.validateWord(player, word)) {
            console.log(word + ' is not a valid word.');
        }

        main();
    });
}