/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(1);
const Preloader_1 = __webpack_require__(5);
const MainMenu_1 = __webpack_require__(3);
const Level1_1 = __webpack_require__(2);
class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, "content", null);
        this.state.add("Boot", Boot_1.Boot, false);
        this.state.add('Preloader', Preloader_1.Preloader, false);
        this.state.add('MainMenu', MainMenu_1.MainMenu, false);
        this.state.add('Level1', Level1_1.Level1, false);
        this.state.start("Boot");
    }
}
exports.Game = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Boot extends Phaser.State {
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
exports.Boot = Boot;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(4);
class Level1 extends Phaser.State {
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.add.sprite(0, 0, "level1");
        this.music = this.add.audio("music", 1, false);
        this.music.play();
        this.player = new Player_1.Player(this.game, 130, 284);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.velocity.set(0, 0);
    }
}
exports.Level1 = Level1;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MainMenu extends Phaser.State {
    create() {
        this.background = this.add.sprite(0, 0, "titlepage");
        this.background.alpha = 0;
        this.logo = this.add.sprite(this.world.centerX, -300, "logo");
        this.logo.anchor.setTo(0.5, 0.5);
        this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
        this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
        this.input.onDown.addOnce(this.fadeOut, this);
    }
    fadeOut() {
        this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startGame, this);
    }
    startGame() {
        this.game.state.start("Level1", true, false);
    }
}
exports.MainMenu = MainMenu;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, "simon", 0);
        this.anchor.setTo(0.5, 0);
        this.animations.add("walk", [0, 1, 2, 3, 4], 10, true);
        game.add.existing(this);
    }
    update() {
        this.body.velocity.x = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.velocity.x = -150;
            this.animations.play("walk");
            if (this.scale.x == 1) {
                this.scale.x = -1;
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.body.velocity.x = 150;
            this.animations.play("walk");
            if (this.scale.x == -1) {
                this.scale.x = 1;
            }
        }
        else {
            this.animations.frame = 0;
        }
    }
}
exports.Player = Player;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Preloader extends Phaser.State {
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
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);
    }
    startMainMenu() {
        this.game.state.start("MainMenu", true, false);
    }
}
exports.Preloader = Preloader;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __webpack_require__(0);
window.onload = () => {
    new Game_1.Game();
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map