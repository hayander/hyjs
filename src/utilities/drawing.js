'use strict';

var hy = require('../core/core');

hy.prototype.adjustPointsForMode = function(mode, x1, y1, x2, y2) {
    if ( mode === this.MODE.SIZE ) {
        if ( y2 === undefined ) {
            y2 = x2;
        }
        return [x1, y1, x2, y2];
    }
    else if ( mode === this.MODE.CORNERS ) {
        return [x1, y1, x2 - x1, y2 - y1];
    }
    else if ( mode === this.MODE.CENTER ) {
        return [x1 - x2 * 0.5, y1 - y2 * 0.5, x2, y2];
    }
    else if ( mode === this.MODE.RADIUS ) {

        return [x1 - x2, y1 - y2, x2 * 2, y2 * 2];
    }
    console.log('Not adjusted');
    return [x1, y1, x2, y2];
};


module.exports = hy;
