'use strict';

var hy = require('../../core/core');

hy.prototype.colour = function() {

    if ( Object.prototype.toString.call(arguments[0]) === '[object Arguments]' ) {
        return new hy.Colour(arguments[0]);
    }

    return new hy.Colour(arguments);
};

hy.Colour = function(args) {

    var result = this.resolveFormat(args);
    if ( result === undefined || result === null ) {
        throw new TypeError('Invalid colour notation');
    }

    this.rgb = result.map(function(value) {
        return parseInt(value * 255, 10);
    });

    this.normal = result;

    this.notation = Object.keys(args).map(function(key) {
        return args[key];
    });

};

var colourRegex = {

    // Regex for #RGB
    HEX3: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,

    // Regex for #RRGGBB
    HEX6: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,

    // Regex for rgb() / rgba() format
    // Supports percentages and integers. Example:
    // rgb(21,50,64) - rgb(20%,50%,30%) - rgba(21,50,60,0.5) - rgba(20%,50%,30%,0.5)
    RGB: /^rgba?\(((?:\d{0,3}\.)?\d+%?),((?:\d{0,3}\.)?\d+%?),((?:\d{0,3}\.)?\d+%?)(?:(?:\);?)|,(?:((?:\d{0,3}\.)?\d+%?)(?:\);?)))$/i
};

hy.Colour.prototype.resolveFormat = function(args) {
    var result = null;
    if ( typeof(args[0]) === 'string' ) {

        var string = args[0].replace(/ /g, '');

        if ( colourRegex.HEX3.test(string) ) { // #RGB
            result = colourRegex.HEX3.exec(string).slice(1).map(function(colour) {
                return parseInt(colour + colour, 16) / 255;
            });

        } else if ( colourRegex.HEX6.test(string) ) { // #RRGGBB
            result = colourRegex.HEX6.exec(string).slice(1).map(function(colour) {
                return parseInt(colour, 16) / 255;
            });
        } else if ( colourRegex.RGB.test(string) ) { // rgb(r, g, b) AND rgb(r%, g%, b%)
            var index = 0;
            result    = colourRegex.RGB.exec(string).slice(1).map(function(colour) {
                if ( colour !== undefined ) {
                    index++;

                    if ( colour[colour.length - 1] === '%' ) {
                        return parseFloat(colour.slice(0, colour.length - 1)) / 100;
                    }
                    if ( colour <= 1 ) {
                        return parseFloat(colour);
                    }
                    return parseInt(colour, 10) / 255;
                }
            });
        }

        // Set to white if can't determine colour
        if ( result === null ) {
            return null;
        }

        if ( result[3] === undefined ) {
            result[3] = 1;
        }
        return result;
    }
    else if ( args.length === 3 || args.length === 4 ) {
        result = Object.keys(args).map(function(key) {
            var val = args[key];
            if ( typeof(val) === 'number' ) {

                if ( val < 0 || val > 255 ) {
                    return 1;
                }
                return val / 255;

            }
            return 1;
        });
        if ( result[3] === undefined ) {
            result[3] = 1;
        }
        return result;
    }
    else if ( args.length === 1 || args.length === 2 ) {
        if ( args.length === 1 && args[0] instanceof Array && args[0].length >= 3 ) {
            result = [];
            var value;
            for ( var i = 0; i < 3; i++ ) {
                value = args[0][i];
                if ( typeof value !== 'number' || value < 0 || value > 255 ) {
                    return null;
                }
                result[i] = parseInt(value, 10) / 255;
            }
            value     = args[0][3];
            result[3] = 1;
            if ( value !== undefined && value >= 0 && value <= 255 ) {
                result[3] = parseInt(value, 10) / 255;
            }
            return result;
        }

        else if ( typeof args[0] === 'number' ) {

            if ( args[0] < 0 || args[0] > 255 || ( args[1] !== undefined && ( args[1] < 0 || args[1] > 255 )) ) {
                return null;
            }

            var val   = parseInt(args[0], 10) / 255;
            var alpha = args[1] !== undefined ? ( parseInt(args[1], 10) / 255 ) : 1;
            result    = [val, val, val, alpha];

            return result;
        }
    }
    return null;

};

hy.Colour.prototype.hex = function() {
    var hex = this.rgb.map(function(val) {
        return val.toString(16);
    });
    return '#' + hex[0] + hex[1] + hex[2];
};

module.exports = hy.Colour;
