'use strict';

var hy = require('../../core/core');


hy.prototype.rgbToHex = function(rgb) {
    var hex = '';
    for ( var i = 0; i < rgb.length; i++ ) {
        hex += this.decToHex(rgb[i]);
    }
    return hex;
};

hy.prototype.hexToRgb = function(hex) {
    var rgb = [];
    for ( var i = 0; i < hex.length; i += 2 ) {
        rgb.push(this.hexToDec(hex[i] + hex[i + 1]));
    }
    return rgb;
};

hy.prototype.color = function(args) {
    if ( args[0] ) {
        if ( args[0][0] === '#' ) {
            return args[0];
        } else {
            if ( !args[1] ) {
                return '#' + this.rgbToHex([args[0], args[0], args[0]]);
            }

            return '#' + this.rgbToHex(args);
        }
    }
};

module.exports = hy;
