'use strict';

var hy = require('../core/core');


hy.prototype.drawRate = function(val) {
    if ( typeof(val) !== 'number' || val <= 0 ) {
        return this._drawRate;
    } else {
        this._setKey('_drawRateTarget', val);
    }
};

hy.prototype._draw = function() {
    var drawFunc = this.drawFrame || window.drawFrame;
    if ( drawFunc && typeof drawFunc === 'function' ) {
        var currentTime  = new Date();
        var frameRateGap = ( 1000 / this._drawRateTarget ) - 5;
        if ( ( currentTime - this._lastDrawTime ) >= frameRateGap ) {
            this._setKey('_drawCycles', ++this._drawCycles);
            this._setKey('_drawRate', (1000 / (currentTime - this._lastDrawTime)));
            this._setKey('_lastDrawTime', currentTime);

            drawFunc.apply(this);
        }

        window.requestAnimationFrame(this._draw.bind(this));
    } else {
        this.log('No draw loop defined');
    }
};

module.exports = hy;
