export class Game extends Phaser.Game {
    constructor() {
        super(360, 480, Phaser.AUTO, "content", null);

        this.state.add("Boot", Boot, false);
    }
}