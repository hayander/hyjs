'use strict';

var hy = require('../core/core');


hy.prototype.frameRate = function(val) {
    if ( typeof(val) !== 'number' || val <= 0 ) {
        return this._frameRate;
    } else {
        this._setKey('_targetFrameRate', val);
    }
};

hy.prototype._draw = function() {
    var currentTime  = new Date();
    var frameRateGap = ( 1000 / this._targetFrameRate ) - 5;
    if ( ( currentTime - this._lastFrameTime ) >= frameRateGap ) {
        this._setKey('_framesDrawn', ++this._framesDrawn);
        this._setKey('_frameRate', (1000 / (currentTime - this._lastFrameTime)));
        this._setKey('_lastFrameTime', currentTime);

        this._userMethods.frame.apply(this);

    }

    window.requestAnimationFrame(this._draw.bind(this));

};

module.exports = hy;
