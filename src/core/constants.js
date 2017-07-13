'use strict';

var hy = require('./core');

var constants = {

    DEBUG: {
        ERROR: 4,
        WARNING: 3,
        INFO: 2,
        VERBOSE: 1
    },


    DEFAULT: {
        WIDTH: 640,
        HEIGHT: 480,
        FRAMERATE: 30
    }

};

hy.prototype.setGlobalConstants = function() {
    this.setInstanceConstants(this);
};

hy.prototype.setInstanceConstants = function(instance) {
    // Attach constants to the current instance
    for ( var index in constants ) {
        instance[index] = constants[index];
    }
};

module.exports = hy;
