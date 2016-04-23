import init from './game';
import Player from './player';
import headsUpDisplay from './HUD';
import * as inits from './initialisers';

export default class Engine {
    constructor() {
        inits.creates.push(this.create);
        inits.updates.push(this.update);

        const game = init();
        this.game = game;
    }

    player: Phaser.Sprite;
    headsUpDisplay: headsUpDisplay;
    platforms: Phaser.Group;
    stars: Phaser.Group;
    cursors: Phaser.CursorKeys;
    keyboard: Phaser.Keyboard;
    game: Phaser.Game;
    devMode: boolean;

    create = () => {
        this.devMode = true;

        const stars = this.game.add.group();
        stars.enableBody = true;
        this.stars = stars;

        const star = (i) => {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 6;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
            return star;
        }


        var starList = [];

        for (var i = 0; i < 12; i++) {
            starList.push(star(i));
        }
        console.log(starList);

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

        const headsUpDisplayOpts = {
            game: this.game,
            coordinate: {
                x: 16,
                y: 16
            },
            score: null,
            style: {
                font: null,
                fontStyle: null,
                fontVariant: null,
                fontWeight: null,
                fontSize: null,
                backgroundColor: null,
                fill: null,
                align: null,
                boundsAlignH: null,
                boundAlignV: null,
                stroke: null,
                strokeThickness: null,
                wordWrap: null,
                wordWrapWidth: null,
                tabs: null
            }
        }

        this.headsUpDisplay = new headsUpDisplay(headsUpDisplayOpts);

    }

    update = () => {

        this.game.physics.arcade.collide(this.stars, this.platforms);
        this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.collide(this.player, this.platforms);
        const keyboard = this.game.input.keyboard;
        const cursors = keyboard.createCursorKeys();

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
        if (this.devMode) {
            if (keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
                this.gameOver();
            }
        }

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

    collectStar(player: Player, star: Phaser.Sprite): void {
        var HUDoptions = this.headsUpDisplay.options;
        star.kill();
        this.headsUpDisplay.options.score += 10;
        this.headsUpDisplay.hud.text = (HUDoptions.score) ? 'Score: ' + HUDoptions.score : 'Score: 0';
        this.checkGameOver(HUDoptions.score);
    }

    checkGameOver(score: number): void {
        (score === 120) ? this.gameOver() : null;
    }

    gameOver(): void {
        const style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundAlignV: "middle" };

        const displayText = this.game.add.text(0, 0, 'You Win!', style);
        displayText.setTextBounds(0, 100, this.game.width, this.game.height);

        this.headsUpDisplay.hud = displayText;
        this.player.kill();
    }
}