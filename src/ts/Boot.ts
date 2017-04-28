export class Boot extends Phaser.State
{
    preload() {
        this.load.image("preloadBar", "./images/loader.png");
    }

    create() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        if (this.game.device.desktop) {
            this.game.scale.pageAlignHorizontally = true;
        }
        else {
            // Same goes for mobile settings.
        }

        this.game.state.start("Preloader", true, false);
    }
}