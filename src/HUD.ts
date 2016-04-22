type Options = {
    game: Phaser.Game;
    coordinate: {
        x: number;
        y: number;
    }
    score: number;
    style: {
        font: string;
        fontStyle: string;
        fontVariant: string;
        fontWeight: string;
        fontSize: string | number;
        backgroundColor: string;
        fill: string;
        align: string;
        boundsAlignH: string;
        boundAlignV: string;
        stroke: string;
        strokeThickness: number;
        wordWrap: boolean;
        wordWrapWidth: number;
        tabs: number;
    }
    
}

export default class HUD {
    constructor(public options: Options){
        const { game, score, coordinate} = options;
        
        const displayText = game.add.text( coordinate.x, coordinate.y, (score)?'Score: '+score: 'Score: 0', 
        {fontSize: '32px', fill: '#000'});
        
        this.hud = displayText;
    }
    
    hud: Phaser.Text;
}