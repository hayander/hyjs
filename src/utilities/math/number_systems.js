'use strict';

var hy = require('../../core/core');

hy.prototype.decToHex = function(value) {
    return value.toString(16);
};

hy.prototype.hexToDec = function(value) {
    return parseInt(value, 16);
};


module.exports = hy;
