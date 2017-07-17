'use strict';

var hy = require('../core/core');

hy.Display.prototype.drawLoop = function() {
    if ( this.drawLoop && typeof this.drawLoop === 'function' ) {

        this._frameCount++;
        var currentTime = new Date();
        this._frameRate  = 1000 / (currentTime - this._lastFrameTime);
        this._lastFrameTime  = currentTime;

        this.drawLoop.apply(this);

        window.requestAnimationFrame(this._display.drawLoop.bind(this));
    } else {
        this.log('No draw loop defined');
    }
};

module.exports = hy;
