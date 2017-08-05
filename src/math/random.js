'use strict';

var hy = require('../core/core');

hy.prototype.random = function(min, max) {

    var randNum = Math.random();

    if ( typeof min !== 'number' ) {
        return randNum;
    }

    // If only supplied a maximum value
    if ( typeof max !== 'number' ) {
        return randNum * min;
    }
    return (randNum * (max - min) + min);
};

hy.prototype.randomInt = function(min, max) {
    return Math.floor(this.random(min,max));
};

module.exports = hy;
