'use strict';


var PI = Math.PI;

module.exports = {

    DEBUG: {
        ERROR: 4,
        WARNING: 3,
        INFO: 2,
        VERBOSE: 1
    },

    DEFAULT: {
        WIDTH: 640,
        HEIGHT: 480,
        DRAWRATE: 60,
        STROKE: '#000000',
        FILL: '#FFFFFF',
        TEXT: {
            SIZE: '12px',
            LINESPACING: '15px',
            FONT: 'Arial'
        }
    },

    DRAW: {
        STROKE: 1,
        FILL: 2
    },

    MODE: {
        SIZE: 1,
        CORNERS: 2,
        CENTER: 3,
        RADIUS: 4
    },

    BASE: {
        TOP: 'top',
        BOTTOM: 'bottom',
        MIDDLE: 'middle',
        ALPHABETIC: 'alphabetic',
        IDEOGRAPHIC: 'ideographic',
        HANGING: 'hanging'
    },

    ALIGN: {
        LEFT: 'left',
        RIGHT: 'right',
        CENTER: 'center',
        START: 'start',
        END: 'end'
    },

    STYLE: {
        EMPTY: 'rgba(0, 0, 0, 0)',
        NORMAL: 'normal',
        ITALIC: 'italic',
        OBLIQUE: 'oblique',
        SMALLCAPS: 'small-caps',
        BOLD: 'bold',
        BOLDER: 'bolder'
    },

    // Math constants
    PI: PI,
    TWO_PI: PI * 2,
    QUARTER_PI: PI / 4,
    HALF_PI: PI / 2,
    TAU: PI * 2

};

