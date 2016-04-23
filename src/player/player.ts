type Options = {
    game: Phaser.Game;
    sprite: string;
    coordinate: {
        x: number;
        y: number;
    }
}

export default class Player {
    constructor(public options: Options) {
        const { sprite, coordinate, game } = options;
        
        const player = game.add.sprite(coordinate.x, coordinate.y, sprite);
        console.debug(`Created ${sprite} at x: ${coordinate.x} y: ${coordinate.y}`);
        
        game.physics.arcade.enable(player);
        
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        player.animations.add('right', [7, 8], 10, true);
        player.animations.add('left', [10, 11], 10, true);

        this.player = player;
    }

    player: Phaser.Sprite;

    /**
     * Controls?
     */
}