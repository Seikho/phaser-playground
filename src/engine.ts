// Phaser is available globally via index.html

/**
 * Singleton.. Why the hell would we want multiple of this monstrosity
 */

export default class Engine {
    static player;
    static platforms;

    static game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
        preload: Engine.preload,
        create: Engine.create,
        update: Engine.update
    });

    static preload() {
        Engine.game.load.image('sky', 'assets/sky.png');
        Engine.game.load.image('ground', 'assets/platform.png');
        Engine.game.load.image('star', 'assets/star.png');
        Engine.game.load.image('dude', 'assets/dude.png');
        Engine.game.load.spritesheet('catRunning', 'assets/runningcat.png', 512, 256, 8);
    }

    static create() {

        Engine.game.physics.startSystem(Phaser.Physics.ARCADE);

        Engine.game.add.sprite(0, 0, 'sky');
        Engine.game.add.sprite(0, 0, 'star');

        Engine.platforms = Engine.game.add.group();
        Engine.platforms.enableBody = true;

        var ground = Engine.platforms.create(0, Engine.game.world.height - 64, 'ground');

        ground.scale.setTo(2, 2);
        ground.body.immovable = true;


        var ledge = Engine.platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;
        ledge = Engine.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        Engine.player = Engine.game.add.sprite(32, Engine.game.world.height - 150, 'catRunning');
        Engine.player.scale.setTo(.3, .3);

        Engine.game.physics.arcade.enable(Engine.player);

        Engine.player.body.bounce.y = .2;
        Engine.player.body.gravity.y = 300;
        Engine.player.body.collideWorldBounds = true;

        var run = Engine.player.animations.add('run');
        Engine.player.animations.play('run', 15, true);
        
        Engine.game.math.snapToFloor(1, 32);
    }

    static update() {

        Engine.game.physics.arcade.collide(Engine.player, Engine.platforms);

    }

}