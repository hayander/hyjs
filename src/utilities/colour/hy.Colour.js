'use strict';

var hy = require('../../core/core');

// Helper method
hy.prototype.colour = function(args) {
    if ( args[0] instanceof Array ) {
        return new hy.Colour(args[0]);
    } else {
        return new hy.Colour(args);
    }
};

hy.Colour = function(args) {
    var result = this.resolveFormat(args);

    if ( result === undefined ) {
        throw new Error('Unable to resolve colour');
    }
  //  console.log(result);

    this.rgb = result.slice(0, result.length - 1).map(function(value) {
        return parseInt(value * 255, 10);
    });

    this.array = result;

    this.notation = Object.keys(args).map(function(key) {
        return args[key];
    });


    console.log(this);
};

var colourRegex = {

    // Regex for #RGB
    HEX3: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,

    // Regex for #RRGGBB
    HEX6: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,

    // Regex for rgb() / rgba() format
    // Supports percentages and integers. Example:
    // rgb(21,50,64) - rgb(20%,50%,30%) - rgba(21,50,60,0.5) - rgba(20%,50%,30%,0.5)
    RGB: /^rgba?\((\d{0,3}%?),(\d{0,3}%?),(\d{0,3}%?)(?:(?:\);?)|,(?:((?:\d?\.)?\d{1,})(?:\);?)))$/i
};

hy.Colour.prototype.resolveFormat = function(args) {

    if ( args.length === 1 && typeof(args[0]) === 'string' ) {

        var string = args[0].replace(/ /g, '');


        if ( colourRegex.HEX3.test(string) ) { // #RGB
            var result = colourRegex.HEX3.exec(string).slice(1).map(function(colour) {
                return parseInt(colour + colour, 16) / 255;
            });

        } else if ( colourRegex.HEX6.test(string) ) { // #RRGGBB
            var result = colourRegex.HEX6.exec(string).slice(1).map(function(colour) {
                return parseInt(colour, 16) / 255;
            });
        } else if ( colourRegex.RGB.test(string) ) { // rgb(r, g, b) AND rgb(r%, g%, b%)
            var index  = 0;
            var result = colourRegex.RGB.exec(string).slice(1).map(function(colour) {
                if ( colour !== undefined ) {
                    index++;
                    if ( index == 4 ) {
                        return parseFloat(colour);
                    }
                    if ( colour[colour.length - 1] === '%' ) {
                        return parseFloat(colour.slice(0, colour.length - 1)) / 100;
                    }
                    return parseInt(colour, 10) / 255;
                }
            });
        }

        // Set to white if can't determine colour
        if ( result === undefined ) {
            result = [1, 1, 1, 1];
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
                if ( key >= 0 && key <= 2 ) {
                    if ( val < 0 || val > 255 ) {
                        return 1;
                    }
                    return val / 255;
                }
                if ( val < 0 || val > 1 ) {
                    return 1;
                }
            }
            return 1;
        });
        if ( result[3] === undefined ) {
            result[3] = 1;
        }

        return result;
    }

};


module.exports = hy.Colour;
