// Phaser is available globally via index.html

/**
 * Singleton.. Why the hell would we want multiple of this monstrosity
 */
export default class Engine {
    
    static game = new Phaser.Game(800, 600, Phaser.AUTO, 'content',  {
        preload: Engine.preload,
        create: Engine.create,
        update: Engine.update
    });
    
    static preload() {
        Engine.game.load.image('terrain', 'assets/terrain_atlas.png');
        Engine.game.load.spritesheet('seikho', 'assets/seikho.png', 32, 32);
        Engine.game.load.spritesheet('catRunning', 'assets/runningcat.png', 512, 256, 8);
        
        
    }
    
    static create() {
        Engine.game.add.sprite(0, 0, 'seikho');
        var cat = Engine.game.add.sprite(100, 250, 'catRunning');
        
        var run = cat.animations.add('run');
        
        cat.animations.play('run', 15, true); 
        
        Engine.game.math.snapToFloor(1, 32);
    }
    
    static update() {
        
    }
    
}