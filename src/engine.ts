import init from './game';
import Player from './player';
import * as inits from './initialisers';

export default class Engine {
    constructor() {
        inits.creates.push(this.create);
        inits.updates.push(this.update);

        const game = init();
        this.game = game;
    }

    player: Phaser.Sprite;
    platforms: Phaser.Group;
    cursors: Phaser.CursorKeys;
    game: Phaser.Game;

    create = () => {
        const platforms = this.game.add.group();
        platforms.enableBody = true;
        this.platforms = platforms;

        const ground = platforms.create(0, this.game.world.height - 64, 'platform');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        const highLedge = platforms.create(400, 400, 'platform');
        highLedge.body.immovable = true;

        const lowLedge = platforms.create(-150, 250, 'platform');
        lowLedge.body.immovable = true;

        const playerOpts = {
            game: this.game,
            sprite: 'seikho',
            coordinate: { x: 32, y: this.game.world.height - 150 }
        }
        this.player = new Player(playerOpts).player;
    }

    update = () => {
        this.game.physics.arcade.collide(this.player, this.platforms);
        const cursors = this.game.input.keyboard.createCursorKeys();

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        } else if (cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        } else {
            this.player.animations.stop();
            this.player.frame = 2;
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    }
}