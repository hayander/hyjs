'use strict';

var hy = require('../core/core');


hy.prototype.frameRate = function(val) {
    if ( typeof(val) !== 'number' || val <= 0 ) {
        return this._frameRate;
    } else {
        this._targetFrameRate = val;
    }
};

hy.Display.prototype.drawLoop = function() {
    if ( this.drawLoop && typeof this.drawLoop === 'function' ) {
        var currentTime = new Date();
        var frameRateGap = ( 1000 / this._targetFrameRate ) - 5;
        if ( ( currentTime - this._lastFrameTime ) >= frameRateGap ) {
            this._frameCount++;
            this._frameRate     = 1000 / (currentTime - this._lastFrameTime);
            this._lastFrameTime = currentTime;

            this.drawLoop.apply(this);
        }

        window.requestAnimationFrame(this._display.drawLoop.bind(this));
    } else {
        this.log('No draw loop defined');
    }
};

module.exports = hy;
