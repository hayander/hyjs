'use strict';

var hy = require('../core/core');

hy.prototype.adjustPointsForMode = function(mode, x1, y1, x2, y2) {
    if ( mode === this._c.MODE.SIZE ) {
        return [x1, y1, x2, y2];
    }
    else if ( mode === this._c.MODE.CORNERS ) {
        return [x1, y1, x2 - x1, y2 - y1];
    }
    else if ( mode === this._c.MODE.CENTER ) {

        return [x1 - x2*0.5, y1 - y2*0.5, x2, y2];
    }
    return [x1, y1, x2, y2];
};


module.exports = hy;
