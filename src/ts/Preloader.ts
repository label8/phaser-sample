export class Preloader extends Phaser.State
{
    preloadBar: Phaser.Sprite;

    preload() {
        this.preloadBar = this.add.sprite(200, 250, "preloadBar");
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image("titlepage", "./images/titlepage.jpg");
        this.load.image("logo", "./images/logo.png");
        this.load.audio("music", "./sounds/title.mp3", true);
        this.load.spritesheet("simon", "./images/simon.png", 58, 96, 5);
        this.load.image("level1", "./images/level1.png");
    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);
    }

    startMainMenu() {
        // this.game.state.start("MainMenu", true, false);
    }
}