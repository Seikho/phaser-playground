type Options = {
    game: Phaser.Game;
    sprite: string;
    coordinate: {
        x: number;
        y: number;
    }
}

export default class Reward {
    constructor (public options: Options) {
        const { sprite, coordinate, game } = options;
        
        const reward = game.add.sprite(coordinate.x, coordinate.y, sprite);
        console.debug(`Created ${sprite} at x: ${coordinate.x} y: ${coordinate.y}`);
        
        
        
    }
}