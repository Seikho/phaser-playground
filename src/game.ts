import * as inits from './initialisers';

var game: Phaser.Game;

export default function init() {
    const update = () => inits.updates.forEach(u => u());

    const create = () => {
        createGame();
        inits.creates.forEach(c => c())
    }

    const preload = () => {
        preloadGame();
        inits.preloads.forEach(p => p())
    }

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
        update,
        create,
        preload
    });

    return game;
}

export function get() {
    return game;
}

function preloadGame() {
    const assets = [
        'sky',
        'platform',
        'star',
        'dude' // Unused?
    ]

    assets.forEach(asset => game.load.image(asset, `assets/${asset}.png`));
    game.load.spritesheet('seikho', 'assets/seikho.png', 32, 32, 12);
}

function createGame() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    game.add.sprite(0, 0, 'star');
}