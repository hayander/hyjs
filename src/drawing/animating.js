'use strict';

var hy = require('../core/core');


hy.prototype.drawRate = function(val) {
    if ( typeof(val) !== 'number' || val <= 0 ) {
        return this._drawRate;
    } else {
        this._setKey('_targetDrawRate', val);
    }
};

hy.prototype._draw = function() {
    var currentTime  = new Date();
    var frameRateGap = ( 1000 / this._targetDrawRate ) - 5;
    if ( ( currentTime - this._lastDrawTime ) >= frameRateGap ) {
        this._setKey('_drawCycles', ++this._drawCycles);
        this._setKey('_drawRate', (1000 / (currentTime - this._lastDrawTime)));
        this._setKey('_lastDrawTime', currentTime);

        this._userMethods.frame.apply(this);

    }

    window.requestAnimationFrame(this._draw.bind(this));

};

module.exports = hy;
