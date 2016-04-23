type Options = {
    game: Phaser.Game;
    sprite: string;
    coordinate: {
        x: number;
        y: number;
    }
}

export default class Enemy {
    constructor(public options: Options) {
        const { sprite, coordinate, game } = options;
        
        const enemy = game.add.sprite(coordinate.x, coordinate.y, sprite);
        console.debug(`Created ${sprite} at x: ${coordinate.x} y: ${coordinate.y}`);
        
        game.physics.arcade.enable(enemy);
        
        enemy.body.bounce.y = 0.2;
        enemy.body.gravity.y = 300;
        enemy.body.collideWorldBounds = true;

        enemy.animations.add('right', [7, 8], 10, true);
        enemy.animations.add('left', [10, 11], 10, true);

        this.enemy = enemy;
    }

    enemy: Phaser.Sprite;

    /**
     * Controls?
     */
}